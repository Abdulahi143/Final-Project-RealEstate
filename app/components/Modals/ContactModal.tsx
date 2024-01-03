'use client';

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from 'next-auth/react';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook, AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import useContactModal from "@/app/hooks/useContactModal";
import { SafeListing } from "@/app/types";
import ListingCard from "../listings/ListingCard";
import PhoneNumberValidation from "../inputs/PhoneNumberValidation";
import TextArea from "../inputs/TextArea";


interface ContactModalProps {
  listing: SafeListing;
}


const ContactModal = () => {
  const router = useRouter();
  const contactModal = useContactModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const listing = useContactModal((state) => state.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      description: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);



    setIsLoading(false);

    contactModal.onClose();
    toast.success('Message sent successfully!');
  };

  const onToggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">

      
<Heading
        title="Contact the renter"
        subtitle="Please complete all the fields to submit full information."
      />

      <form action="">

        
      </form>

{listing && listing.title && (
        <div>
                       <ListingCard  key={listing.id} data={listing} />

        </div>
      )}

      <Input
        id="fullName"
        label="Full Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      
<TextArea
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
          rows={4} // You can adjust the number of rows as needed
        />
 <PhoneNumberValidation />


    </div>
  );


  return (
    <Modal
      disabled={isLoading}
      isOpen={contactModal.isOpen}
      title="Further Details"
      actionLabel="Contact"
      onClose={contactModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default ContactModal;