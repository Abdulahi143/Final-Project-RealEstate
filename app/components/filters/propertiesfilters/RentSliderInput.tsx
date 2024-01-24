import React, { CSSProperties } from "react";
import { Slider } from "@nextui-org/react";

interface propertiesSliderInputProps {
  onChange: (value: number | [number, number]) => void;
  value: [number, number];
  orientation?: string;
  className?: string;
}

const propertiesSliderInput: React.FC<propertiesSliderInputProps> = ({
  onChange,
  value,
  orientation,
  className,
}) => {
  const colors = [
    "foreground",
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
  ];

  const trackStyle: CSSProperties = {
    position: 'relative',
    touchAction: 'none',
  };

  return (
    <Slider
      label="Price Range"
      step={50}
      minValue={0}
      maxValue={2000}
      defaultValue={[100, 1000]}
      formatOptions={{ style: 'currency', currency: 'USD' }}
      onChange={(newValue) => onChange(newValue as number)}
      className="max-w-md"
      style={trackStyle}
      color="success"
    >
      <div
        data-slot="track"
        className={`flex w-full relative rounded-full bg-default-300/50 border-x-transparent h-3 my-[calc((theme(spacing.6)-theme(spacing.3))/2)] data-[thumb-hidden=false]:border-x-[calc(theme(spacing.6)/2)]`}
      >
        <div
          data-slot="filler"
          style={{
            height: '100%',
            position: 'absolute',
            left: '10%', // Set the left position to start from 10% for the default minimum value
            width: '90%',
            backgroundColor: 'var(--nextui-bg-success)', // Use the bg-success color from Next UI
          }}
        ></div>
        <div
          data-slot="thumb"
          className={`flex justify-center items-center before:absolute before:w-11 before:h-11 
            before:rounded-full after:shadow-small after:bg-background 
            data-[focused=true]:z-0 outline-none data-[focus-visible=true]:z-10 
            data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus 
            data-[focus-visible=true]:outline-offset-2 w-6 h-6 after:w-5 after:h-5 
            rounded-full after:rounded-full bg-primary top-1/2 cursor-grab 
            data-[dragging=true]:cursor-grabbing ring-transparent border-0 
            after:transition-all motion-reduce:after:transition-none 
            data-[dragging=true]:after:scale-80 shadow-small ${className}`}
        ></div>
        <div
          data-slot="thumb"
          className={`flex justify-center items-center before:absolute before:w-11 before:h-11 
            before:rounded-full after:shadow-small after:bg-background 
            data-[focused=true]:z-0 outline-none data-[focus-visible=true]:z-10 
            data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus 
            data-[focus-visible=true]:outline-offset-2 w-6 h-6 after:w-5 after:h-5 
            rounded-full after:rounded-full bg-primary top-1/2 cursor-grab 
            data-[dragging=true]:cursor-grabbing ring-transparent border-0 
            after:transition-all motion-reduce:after:transition-none 
            data-[dragging=true]:after:scale-80 shadow-small ${className}`}
        ></div>
      </div>
    </Slider>
  );
};

export default propertiesSliderInput;
