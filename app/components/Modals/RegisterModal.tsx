'use client';
import axios from "axios";
import { AiFillFacebook } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import AvatarProfile from "../inputs/Avatar";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');

  const { setValue, register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      image: '',
    },
  });



  const passwordValidation = {
    minLength: {
      value: 8,
      message: 'Password must be at least 8 characters long',
    },
  };


  
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
    setImage(value);
  };


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (data.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

      // Check if image is provided
  if (!data.image) {
    toast.error('Profile image is required');
    return;
  }
  
    setIsLoading(true);
  
    axios.post('/api/register', data)
      .then(() => {
        toast.success('Registered!');
        registerModal.onClose();
        loginModal.onOpen();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  

  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Welcome to Dugsiiye Real Estate"
        subtitle="Create an account!"
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
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        
      />
<Input
  id="confirmPassword"  // Updated id to match the password input
  label="Confirm Password"
  type="password"
  disabled={isLoading}
  register={register}
  errors={errors}
  required
/>

      <span>Upload Your Profile Image</span>
      <AvatarProfile 
        onChange={(value) => setCustomValue("image", value)}
        value={image}
        folder="Dugsiiye-Real-Estate/users"
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')} 
      />
      <Button 
        outline 
        label="Continue with Facebook"
        icon={AiFillFacebook}
        onClick={() => signIn('facebook')} 
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>Already have an account?
          <span 
            onClick={onToggle} 
            className="text-neutral-800 cursor-pointer hover:underline"
          > Log in</span>
        </p>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;