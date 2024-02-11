'use client';
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback, useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
  var cloudinary: any
}

const uploadPreset = "warvnwkg";

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
  folder: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  folder
}) => {
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const handleUpload = useCallback((result: any) => {
    // Check if the maximum number of images has been reached
    if (value.length < 5) {
      setImageLoading(true);

      // Simulate delay for illustration purposes
      setTimeout(() => {
        onChange([...value, result.info.secure_url]);
        setImageLoading(false);
      }, 1000);
    }
  }, [onChange, value]);

  const handleDelete = (index: number) => {
    // Remove the image at the specified index
    const updatedValue = value.filter((_, i) => i !== index);
    onChange(updatedValue);

    // TODO: Make a call to Cloudinary API to delete the image by its public ID
    // Note: You need to implement a server-side function to securely delete the image from Cloudinary

    // For illustration purposes, assuming cloudinary.delete is a function that deletes the image
    if (cloudinary.delete) {
      cloudinary.delete(value[index], (error: any) => {
        if (error) {
          console.error("Error deleting image from Cloudinary:", error);
        } else {
        }
      });
    }
  };

  return (
    <div className="relative">
      {/* Display uploaded images */}
      {value && value.length > 0 && (
        <div className="w-full flex flex-wrap p-2">
          <div className="w-full flex justify-center">
            {/* Larger first image */}
            <div className="w-1/2 p-1 box-border relative">
              <span
                className="absolute top-2 left-2 text-white cursor-pointer"
                onClick={() => handleDelete(0)}
              >
                <ImCancelCircle size={20} className="text-red-500 bg-slate-400 rounded-xl" />
              </span>
              {!imageLoading && (
                <Image
                  layout="responsive"
                  width={200}
                  height={200}
                  objectFit="cover"
                  src={value[0]}
                  alt="Uploaded image 1"
                  loading="lazy"
                />
              )}
              <div className="absolute bottom-0 left-0 bg-green-500 rounded-full text-white p-1">
                <span className="font-bold">1 (Cover)</span>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center">
            {/* Remaining images in rows */}
            {value.slice(1).map((src, index) => (
              <div key={index} className="w-1/4 p-1 box-border relative">
                <span
                  className="absolute top-2 left-2 text-white cursor-pointer"
                  onClick={() => handleDelete(index + 1)}
                >
                  <ImCancelCircle size={20} className="text-red-500 bg-slate-400 rounded-xl" />
                </span>
                {!imageLoading && (
                  <Image
                    layout="responsive"
                    width={100}
                    height={100}
                    objectFit="cover"
                    src={src}
                    alt={`Uploaded image ${index + 2}`}
                    loading="lazy"
                  />
                )}
                <div className="absolute bottom-0 left-0 bg-green-500 rounded-full text-white p-1">
                  <span className="font-bold">{index + 2}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Click to upload area */}
      {value.length < 5 && (
        <CldUploadWidget
          onUpload={handleUpload}
          uploadPreset={uploadPreset}
          options={{
            maxFiles: 5 - value.length, // Calculate the remaining allowed files
            folder: folder
          }}
        >
          {(widgetProps) => (
            <div
            onClick={() => widgetProps && widgetProps.open && widgetProps.open()}
              className="
                cursor-pointer
                hover:opacity-70
                transition
                border-dashed
                border-2
                p-20
                border-neutral-300
                flex
                flex-col
                justify-center
                items-center
                gap-4
                text-neutral-600
              "
            >
              <TbPhotoPlus size={50} />
              <div className="font-semibold text-lg">Click to upload</div>
            </div>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
};

export default ImageUpload;