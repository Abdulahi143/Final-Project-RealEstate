'use client';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  name: string; // Add name prop to the interface
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number;
}

const ContactInput: React.FC<InputProps> = ({
  id,
  name,
  label,
  type = 'text',
  disabled,
  formatPrice,
  required,
  value,
  onChange,
  rows,
}) => {
  const isTextarea = type === 'textarea';

  return (
    <div className="w-full relative mb-4">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      {isTextarea ? (
        <textarea
          id={id}
          name={name} 
          disabled={disabled}
          placeholder=""
          rows={rows || 1}
          value={value}
          onChange={onChange}
          className={`
            peer
            w-full
            p-4
            pt-6 
            font-light 
            bg-white 
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            pl-4
             ? 'border border-red-500' : 'border-neutral-300'}
            focus:border-black
          `}
        />
      ) : (
        <input
          id={id}
          name={name} 
          disabled={disabled}
          placeholder=" "
          type={type}
          value={value}
          onChange={onChange}
          className={`
            peer
            w-full
            p-4
            pt-6 
            font-light 
            bg-white 
            border-2
            rounded-md
            outline-none
            transition
            disabled:opacity-70
            disabled:cursor-not-allowed
            pl-4
            ${formatPrice ? 'pl-9' : 'pl-4'}
            ? 'border border-red-500' : 'border-neutral-300'}
            focus:border-black
          `}
        />
      )}
      <label
        htmlFor={id}
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
          ${formatPrice ? 'left-9' : 'left-4'}
          peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ? 'text-red-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default ContactInput;