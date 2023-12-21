'use client';
import React, { useState, useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
  allowZero?: boolean;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
  allowZero = false, // Default to false if not provided
}) => {
  const [inputValue, setInputValue] = useState<string>(value.toString());

  
  const isNumeric = (value: string) => /^[0-9]+$/.test(value); // Regex to check for numeric values


  const updateValue = useCallback((newValue: number) => {
    setInputValue(newValue.toString());
    onChange(newValue);
  }, [onChange]);

  
  const onAdd = useCallback(() => updateValue(value + 1), [updateValue, value]);
  const onReduce = useCallback(() => {
    if (value > 0) updateValue(value - 1);
  }, [updateValue, value]);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    if (newValue === '' || isNumeric(newValue)) {
      setInputValue(newValue); // Update local state
    }

    const numericValue = parseInt(newValue, 10);
    if (!isNaN(numericValue) && (allowZero || numericValue > 0)) {
      onChange(numericValue); // Update parent state if value is valid
    }
  }, [onChange, allowZero]);

  const handleBlur = useCallback(() => {
    const numericValue = parseInt(inputValue, 10);
    if (inputValue === '' || isNaN(numericValue) || (!allowZero && numericValue <= 0)) {
      const resetValue = allowZero ? 0 : 1;
      setInputValue(resetValue.toString()); // Reset to 0 or 1 based on allowZero
      onChange(resetValue); // Update parent state
    }
  }, [inputValue, onChange, allowZero]);


  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button onClick={onReduce} className="w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition">
          <AiOutlineMinus />
        </button>
        <input type="text" value={inputValue} onChange={handleChange} onBlur={handleBlur} className="w-20 text-center font-light text-xl text-neutral-600" />
        <button onClick={onAdd} className="w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600 cursor-pointer hover:opacity-80 transition">
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
}

export default Counter;
