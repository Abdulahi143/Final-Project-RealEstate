"use client"
import React, { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
// Other necessary imports like Map, Input components, etc.

interface FormValues {
  category: string;
  location: { value: string };
  roomCount: number;
  bathroomCount: number;
  sizeCount: number;
  parkingCount: number;
  imageSrc: string;
  title: string;
  description: string;
  price: number;
  furnished: 'yes' | 'no';
}

const RentPage = () => {
  const { register, handleSubmit, reset, setValue, getValues, control } = useForm<FormValues>({
    defaultValues: {
      furnished: 'no',
      location: { value: '' }, // Set default value as an object
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Location Input:", event.target.value); // Debugging line
    setValue('location', { value: event.target.value });
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log("Form Data:", data); // Add this line
    try {
      setIsLoading(true);
      const response = await axios.post('/api/forrent', data);
      toast.success('Listing created!');
      reset();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='pt-24'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Category:</label>
          <input {...register('category')} />
        </div>
        <div>
          <label>Location:</label>
          <Controller
  name="location"
  control={control}
  render={({ field }) => (
    <input
      value={field.value.value}
      onChange={(e) => field.onChange({ value: e.target.value })}
    />
  )}
/>

        </div>
        <div>
          <label>Room Count:</label>
          <input type="number" {...register('roomCount')} />
        </div>
        <div>
          <label>Bathroom Count:</label>
          <input type="number" {...register('bathroomCount')} />
        </div>
        <div>
          <label>Property Size:</label>
          <input type="number" {...register('sizeCount')} />
        </div>
        <div>
          <label>Parking Spaces:</label>
          <input type="number" {...register('parkingCount')} />
        </div>
        <div>
          <label>Title:</label>
          <input {...register('title')} />
        </div>
        <div>
          <label>Description:</label>
          <textarea {...register('description')} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" {...register('price')} />
        </div>
        <div>
          <label>Furnished:</label>
          <label>
            <input
              type="radio"
              value="yes"
              {...register('furnished')}
            /> Yes
          </label>
          <label>
            <input
              type="radio"
              value="no"
              {...register('furnished')}
              defaultChecked
            /> No
          </label>
        </div>
        <div>
          <label>Image URL:</label>
          <input {...register('imageSrc')} />
          {/* Replace with ImageUpload component as needed */}
        </div>
        <button type="submit" disabled={isLoading}>Create Listing</button>
      </form>
    </div>
  );
};

export default RentPage;
