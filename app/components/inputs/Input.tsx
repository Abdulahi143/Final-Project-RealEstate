'use client';


import { validateWordCount } from '@/app/validators/DescriptionValidation';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  confirmationRequired?: string | boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  rows?: number;
  minWords?: number;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  disabled,
  formatPrice,
  confirmationRequired,
  register,
  required,
  errors,
  value,
  onChange,
  rows,
  minWords,
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
        <div className="relative">
          <textarea
            id={id}
            disabled={disabled}
            {...register(id, {
              required,
              validate: async (value) => {
                const validationResponse = validateWordCount(value);
                return validationResponse.isValid || validationResponse.message;
              },
            })}
            placeholder=" "
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
              ${errors[id] ? 'border border-red-500' : 'border-neutral-300'}
              focus:border-black
            `}
          />
          {errors[id] && (
            <p className="text-red-500">{(errors[id] as any)?.message}</p>
            // Use "as any" to explicitly cast the error message to ReactNode
          )}
        </div>
      ) : (
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
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
            ${errors[id] ? 'border border-red-500' : 'border-neutral-300'}
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
          ${errors[id] ? 'text-red-500' : 'text-zinc-400'}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;