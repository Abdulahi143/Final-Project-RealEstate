'use client';


import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface TextAreaProps {
  name: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  rows?: number;
  onChange?: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  label,
  value,
  type = 'text',
  disabled,
  register,
  required,
  errors,
  rows = 3,
}) => {
  return (
    <div className="w-full relative mb-4">
      <textarea
        id={name}
        disabled={disabled}
        placeholder=" "
        rows={rows}
        
      />
      <label
        htmlFor={name}
        className={`
          absolute 
          text-md
          duration-150 
          transform 
          -translate-y-3 
          top-5 
          z-10 
          origin-[0] 
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

export default TextArea;