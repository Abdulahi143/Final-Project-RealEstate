'use client';

import { ReactNode } from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label?: string;
  type?: "button" | "submit" | "reset";
  onClick: (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => void;  // Updated type
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  iconColor?: string;
  children?: ReactNode;
}


const EditButton: React.FC<ButtonProps> = ({ 
  label,
  type,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  iconColor = "blue",
  children,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
    type={type}
    disabled={disabled}
    onClick={handleClick}
    className={`
      relative
      disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-lg
      hover:opacity-80
      transition
      w-full
      ${outline ? 'bg-white' : 'bg-yellow-800'}
      ${outline ? 'border-black' : 'border-green-500'}
      ${outline ? 'text-black' : 'text-white'}
      ${small ? 'text-sm' : 'text-md'}
      ${small ? 'py-1' : 'py-3'}
      ${small ? 'font-light' : 'font-semibold'}
      ${small ? 'border-[1px]' : 'border-2'}
    `}
  >
    {Icon && (
      <Icon
        size={24}
        color={iconColor}
        className="
          absolute
          left-4
          top-3
        "
      />
    )}
    {label}
  </button>
   );
}

export default EditButton;
