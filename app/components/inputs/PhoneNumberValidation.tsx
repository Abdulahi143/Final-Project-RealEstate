"use client"
import React, { useState } from 'react';
import PhoneInput, { PhoneInputProps } from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneNumberValidationProps {
  // You can add any additional props needed for your component here
}

const PhoneNumberValidation: React.FC<PhoneNumberValidationProps> = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [valid, setValid] = useState<boolean>(true);

  const handleChange = (value: string, data: PhoneInputProps) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;
    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div>
      <label>
        Phone Number:
        <PhoneInput
          country={'so'}
          value={phoneNumber}
          onChange={handleChange}
          inputProps={{
            required: true,
          }}
        />
      </label>
      {!valid && (
        <p>Please enter a valid phone number.</p>
      )}
    </div>
  );
};

export default PhoneNumberValidation;
