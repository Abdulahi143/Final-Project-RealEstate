"use client"

interface RadioInputProps {
    label: string;
    subtitle: string;
    id: string;
    value: string;
    onChange: (newValue: string) => void;
}


// components/inputs/RadioInput.jsx

// components/inputs/RadioInput.jsx

// components/inputs/RadioInput.jsx

const RadioInput = ({ label, subtitle, id, value, onChange }: RadioInputProps) => {
    const toggleValue = () => {
        onChange(value === 'yes' ? 'no' : 'yes');
    };

    return (
      <div className="flex justify-between items-center">
        <div>
          <label htmlFor={id} className="text-lg font-semibold">{label}</label>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
        <div
          className="relative w-14 h-8 flex items-center rounded-full p-1 cursor-pointer"
          onClick={toggleValue}
          style={{ backgroundColor: value === 'yes' ? '#10B981' : '#D1D5DB' }} // Tailwind green-500 and gray-300
        >
          <div
            className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${value === 'yes' ? 'translate-x-6' : 'translate-x-0'}`}
          ></div>
          {value === 'yes' && (
            <span className="absolute text-xs font-medium text-white" style={{ bottom: '-20px', right: '0px' }}>
              Yes
            </span>
          )}
        </div>
      </div>
    );
};

export default RadioInput;


  