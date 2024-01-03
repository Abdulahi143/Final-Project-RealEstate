"use client"
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineClose } from "react-icons/ai";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

interface ContactFormValues {
  name: string;
  email: string;
  phoneNumber: string;
  rentalDate: string;
  description: string;
}

const ContactRentForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      rentalDate: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    setIsLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Form submitted successfully!");
    }, 2000);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Contact Rent Form"
        subtitle="Fill in the details to inquire about renting"
      />
      <Input
        id="name"
        label="Name"
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
      <Input
        id="phoneNumber"
        label="Phone Number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="rentalDate"
        label="Rental Date"
        type="date"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <Button
        label="Submit"
        isLoading={isLoading}
        type="submit"
        disabled={isLoading}
      />
      <Button
        outline
        label="Close"
        icon={AiOutlineClose}
        onClick={() => {}}
        disabled={isLoading}
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={true} // Set to true for demonstration, adjust as needed
      title="Contact Rent Form"
      onClose={() => {}}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default ContactRentForm;
