"use client";

import { useCallback } from "react";

interface AvailableProps {
    title: string;
    subtitle: string;
    value: 'yes' | 'no';
    onChange: (value: 'yes' | 'no') => void;
}

const AvailableOrNot = ({ title, subtitle, value, onChange }: AvailableProps) => {
    const handleToggle = useCallback(() => {
        onChange(value === 'yes' ? 'no' : 'yes');
    }, [onChange, value]);

    return ( 
        <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
            <div className="font-medium">
                {title}
            </div>
            <div className="font-light text-gray-600">
                {subtitle}
            </div>
        </div>

        <div className="flex items-center">
                <span className={`text-neutral-600 ${value === 'yes' ? 'visible' : 'invisible'}`}>
                    YES
                </span>
                <label className="relative cursor-pointer mx-2">
                    <input 
                        type="checkbox" 
                        className="peer sr-only"
                        checked={value === 'yes'}
                        onChange={handleToggle} 
                    />
                    <div className="peer h-5 w-9 rounded-full bg-gray-400 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-indigo-900 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200"></div>
                </label>
                <span className={`text-neutral-600 ${value === 'no' ? 'visible' : 'invisible'}`}>
                    NO
                </span>
            </div>

      
    </div>
     );
}
 
export default AvailableOrNot;