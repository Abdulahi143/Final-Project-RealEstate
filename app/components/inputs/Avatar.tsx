"use client"
import React, { useCallback, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsPatchPlus } from 'react-icons/bs';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { TbPhotoPlus } from 'react-icons/tb';

declare global {
  var cloudinary: any;
}

const uploadPreset = "warvnwkg";

interface AvatarUploadProps {
    onChange: (value: string) => void;
    value: string;
    folder: string;
  }
  
  const AvatarProfile: React.FC<AvatarUploadProps> = ({
    onChange,
    value,
    folder
  }) => {
    const [isAvatarClicked, setIsAvatarClicked] = useState(false);
  
    const handleUpload = useCallback((result: any) => {
      onChange(result.info.secure_url);
      setIsAvatarClicked(false);
    }, [onChange]);
  
    return (
      <CldUploadWidget 
        onUpload={handleUpload} 
        uploadPreset={uploadPreset}
        options={{
          maxFiles: 1
        }}
      >
        {({ open }) => {
          return (
            <>
              {isAvatarClicked ? (
                <div>
                  <div
                    onClick={() => open?.()}
                    className="
                      relative
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
                    <TbPhotoPlus
                      size={50}
                    />
                    <div className="font-semibold text-lg">
                      Click to upload
                    </div>
                    {value && (
                      <div className="
                        absolute inset-0 w-full h-full">
                        <Image
                          fill 
                          style={{ objectFit: 'cover' }} 
                          src={value} 
                          alt="House" 
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <Avatar onClick={() => setIsAvatarClicked(true)}>
                  <AvatarImage src={value || "/images/addAvatar1.png"} />
                  <AvatarFallback>Change to the user's uploaded image to the avatar.png and hide the div under here</AvatarFallback>
                </Avatar>
              )}
            </>
          );
        }}
      </CldUploadWidget>
    );
  }
  
  export default AvatarProfile;