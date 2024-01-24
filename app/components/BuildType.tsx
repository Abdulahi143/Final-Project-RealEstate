import React from 'react';
import { FaHouse } from 'react-icons/fa6';
import { MdOutlineApartment } from 'react-icons/md';

interface BuildTypeProps {
  buildType?: string | null;
}

const BuildTypeComponent: React.FC<BuildTypeProps> = ({ buildType }) => {
  if (!buildType) {
    return null; // Or some default UI if buildType is not available
  }

  const renderIcon = () => {
    switch (buildType) {
      case 'villa':
        return <FaHouse />;
      case 'apartment':
        return <MdOutlineApartment />;
      // Add more cases for other build types if needed
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-1">
      {renderIcon()}
    </div>
  );
};

export default BuildTypeComponent;
