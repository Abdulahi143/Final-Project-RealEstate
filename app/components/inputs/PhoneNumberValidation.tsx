"use client"
import React, { useState } from 'react';
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneNumberValidationProps {
  name: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
}

const PhoneNumberValidation: React.FC<PhoneNumberValidationProps> = ({ name, value, onChange, disabled, required }) => {
  const [valid, setValid] = useState<boolean>(true);

  const handleChange = (newValue: string, data: PhoneInputProps) => {
    // You can pass the updated value to the parent component if needed
    setValid(validatePhoneNumber(newValue));
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div className="mb-4">
      <label className="block" htmlFor={name}>
        Phone Number:
        <PhoneInput
          country={'so'}
          value={value}
          onChange={handleChange}
          inputProps={{
            required: true,
            name: name,
          }}
        />
      </label>
      {!valid && (
        <p className="text-red-500">Please enter a valid phone number.</p>
      )}
    </div>
  );
};

export default PhoneNumberValidation;