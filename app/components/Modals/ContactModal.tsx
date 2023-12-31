'use client';
// ... (existing imports)
import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useContactModal from '@/app/hooks/useContactModal';
import Modal from './Modal';
import Heading from '../Heading';
import { sendEmail } from '@/app/api/contact/route';
import ContactInput from '../inputs/ContactInput';
import Button from '../Button';
import SpecialModal from './SpecialModal';
import { usePathname, useRouter } from 'next/navigation';

const ContactModal = () => {
  
  const pathName = usePathname;
  const contactModal = useContactModal();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const result = await sendEmail(formData);

      if (result.success) {
        toast.success('Email sent successfully');
      } else {
        toast.error(result.error || 'Failed to send email!');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Internal server error');
    } finally {
      setIsLoading(false);
      setFormData({
        fullName: '',
        email: '',
        message: '',
        phoneNumber: '',
      });
      contactModal.onClose();
    }
  };

  useEffect(() => {

    const currentPath = pathName;
    
    return () => {
      // Cleanup function to close the modal when the component is unmounted
      contactModal.onClose();
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Leave your contact details to be contacted by the renter/seller!"
        subtitle="Important information!"
      />
      <form onSubmit={onSubmit}>
        <ContactInput
          id="fullName"
          name="fullName"
          label="Full name"
          disabled={isLoading}
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <ContactInput
          id="email"
          name="email"
          label="Email"
          disabled={isLoading}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <ContactInput
          id="message"
          name="message"
          label="Why do you want to rent or buy and how is your income?"
          disabled={isLoading}
          value={formData.message}
          onChange={handleChange}
          required
          type="textarea"
          rows={4}
        />
        <ContactInput
          name="phoneNumber"
          id="phoneNumber"
          label="Phone number"
          type="number"
          disabled={isLoading}
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <Button
          onClick={(e: React.MouseEvent | React.FormEvent) => onSubmit(e as React.FormEvent)}
          type="submit"
          label="Contact"
          disabled={isLoading}
        />
      </form>
    </div>
  );

  return (
    <SpecialModal
      disabled={isLoading}
      isOpen={contactModal.isOpen}
      title="Buy or rent"
      actionLabel="Contact"
      onClose={contactModal.onClose}
      body={bodyContent}
    />
  );
};

export default ContactModal;
