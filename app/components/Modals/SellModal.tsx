'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
  FieldValues, 
  SubmitHandler, 
  useForm
} from 'react-hook-form';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";


import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from '../inputs/CategoryInput';
import CountrySelect from "../inputs/CountrySelect";
import { categories } from '../navbar/Categories';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import Heading from '../Heading';
import useSellModal from '@/app/hooks/useSellModal';

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const SellModal = () => {
  const router = useRouter();
  const sellModal = useSellModal();

  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: '',
      location: null,
      roomCount: 1,
      bathroomCount: 1,
      parkingCount: 1,
      imageSrc: '',
      price: 1,
      title: '',
      description: '',
    }
  });

  const location = watch('location');
  const category = watch('category');
  const parkingCount = watch('parkingCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');

  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);


  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const onBack = () => {
    setStep((value) => value - 1);
  }

  const onNext = () => {
    setStep((value) => value + 1);
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    
    setIsLoading(true);

    axios.post('/api/forsale', data)
    .then(() => {
      toast.success('Listing created!');
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY)
      sellModal.onClose();
    })
    .catch(() => {
      toast.error('Something went wrong.');
    })
    .finally(() => {
      setIsLoading(false);
    })


  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div 
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
      >
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              onClick={(category) => 
                setCustomValue('category', category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help buyers find you!"
        />
        <CountrySelect 
          value={location} 
          onChange={(value) => setCustomValue('location', value)} 
        />
        <Map center={location?.latlng} />
      </div>
    );
    console.log("location", location);
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter 
          onChange={(value) => setCustomValue('sizeCount', value)}
          value={parkingCount}
          title="Size" 
          subtitle="How big is the object in m²?"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('roomCount', value)}
          value={roomCount}
          title="Rooms" 
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter 
          onChange={(value) => setCustomValue('bathroomCount', value)}
          value={bathroomCount}
          title="Bathrooms" 
          subtitle="How many bathrooms do you have?"
        />

<Counter 
  onChange={(value) => setCustomValue('parkingCount', value)}
  value={parkingCount}
  title="Parking Spaces" 
  subtitle="How many parking spaces are available?"
/>
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show buyers what your place looks like!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue('imageSrc', value)}
          value={imageSrc}
        />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
        />
        <Input
          id="price"
          label="Price"
          formatPrice 
          type="number" 
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={sellModal.isOpen}
      title="Sell your house or apartment!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={sellModal.onClose}
      body={bodyContent}
    />
  );
}

export default SellModal;



// "use client";

// import Modal from "./Modal";
// import { useMemo, useState } from "react";
// import Heading from "../Heading";
// import { categories } from "../navbar/Categories";
// import CategoryInput from "../inputs/CategoryInput";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import CountrySelect from "../inputs/CountrySelect";
// import dynamic from "next/dynamic";
// import Counter from "../inputs/Counter";
// import AvailableOrNot from "../inputs/AvailableOrNot";
// import ImageUpload from "../inputs/ImageUpload";
// import Input from "../inputs/Input";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import useSellModal from "@/app/hooks/useSellModal";


// enum STEPS {
//   CATEGORY = 0,
//   LOCATION = 1,
//   INFO = 2,
//   IMAGES = 3,
//   DESCRIPTION = 4,
//   PRICE = 5,
// }


// const SellModal = () => {
//   const router = useRouter();
//   const sellModal = useSellModal();
//   const [step, setStep] = useState(STEPS.CATEGORY);
//   const [isLoading, setIsLoading] = useState(false);


  // const {register, handleSubmit, setValue, watch, formState: {errors,}, reset} = useForm({
  //   defaultValues: {
  //     category: '',
  //     location: 'Somalia',
  //     roomCount: 1,
  //     parkingCount: 0,
  //     bathroomCount: 1,
  //     imageSrc: '',
  //     price: 1,
  //     title: '',
  //     description: '',
  //   }
  // });

//   const location = watch('location');
//   const category = watch('category');
//   const parkingCount = watch('parkingCount');
//   const roomCount = watch('roomCount');
//   const bathroomCount = watch('bathroomCount');
//   const imageSrc = watch('imageSrc');


//   // Map ka waaye
//   const Map = useMemo(() => dynamic(() => import('../Map'), { 
//     ssr: false 
//   }), [location]);


//   const setCustomValue = (id: string, value: any) => {
//     setValue(id, value, {
//       shouldDirty: true,
//       shouldTouch: true,
//       shouldValidate: true
//     })
//   }

//   // Haddii back la taabto modalka la joogo ayay hal ka jaree oo gadaal ayaa lo noqanaa!
//   const onBack = () => {
//     setStep((value) => value - 1)
//   };

//   // Hore + 1 modal cml
//   const onNext = () => {
//     setStep((value) => value + 1);
//   };


//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     if(step !== STEPS.PRICE) {
//       return onNext();
//     };

//     setIsLoading(true);

//     axios.post('/api/listings', data)
//     .then(() => {
//       toast.success("Selling object is published!");
//       router.refresh();
//       reset();
//     })
//     .catch(() => {
//       toast.error('Something went wrong.');
//     })
//     .finally(() => {
//       setIsLoading(false);
//     })
//   }

//   // Define useMemo hooks before any conditional rendering
//   const actionLabel = useMemo(() => {
//     return step === STEPS.PRICE ? "Create" : "Next";
//   }, [step]);

//   const secondaryActionLabel = useMemo(() => {
//     return step === STEPS.CATEGORY ? undefined : "Back";
//   }, [step]);



//   // Steps all 1 - 6 STEPS

//   let bodyContent = (
//     <div className="flex flex-col gap-8">
//       <Heading
//         title="Select a Category"
//         subtitle="Choose a category that best fits your property."
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
//         {categories.map((item) => (
//           <div key={item.label} className="col-span-1">
//             <CategoryInput
//               onClick={(category) => 
//                 setCustomValue('category', category)}
//               selected={category === item.label}
//               label={item.label}
//               icon={item.icon}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );

  
//   if (step === STEPS.LOCATION) {
//     bodyContent = (
//       <div className="flex flex-col gap-8">
//         <Heading
//           title="Where is your place located?"
//           subtitle="Help guests find you!"
//         />
//         <CountrySelect 
//           value={location} 
//           onChange={(value) => setCustomValue('location', value)} 
//         />
//         <Map center={location?.latlng} />
//       </div>
//     );
//   }

//   if (step === STEPS.INFO) {
//     bodyContent = (
//       <div className="flex flex-col gap-8">
//         <Heading
//           title="Share some basic information about your object."
//         />
//         <Counter 
//           onChange={(value) => setCustomValue('parkingCount', value)}
//           value={parkingCount}
//           title="Parking" 
//           subtitle="How many parking spaces does the object have?"
//         />
//         <hr />
//         <Counter 
//           onChange={(value) => setCustomValue('roomCount', value)}
//           value={roomCount}
//           title="Rooms" 
//           subtitle="How many rooms do you have?"
//         />
//         <hr />
//         <Counter 
//           onChange={(value) => setCustomValue('bathroomCount', value)}
//           value={bathroomCount}
//           title="Bathrooms" 
//           subtitle="How many bathrooms do you have?"
//         />
//       </div>
//     )
//   }

//   if (step === STEPS.IMAGES) {
//     bodyContent = (
//       <div className="flex flex-col gap-8">
//         <Heading
//           title="Add a photo of your place"
//           subtitle="Show guests what your place looks like!"
//         />
//         <ImageUpload
//           onChange={(value) => setCustomValue('imageSrc', value)}
//           value={imageSrc}
//         />
//       </div>
//     )
//   }

//   if (step === STEPS.DESCRIPTION) {
//     bodyContent = (
//       <div className="flex flex-col gap-8">
//         <Heading
//           title="How would you describe your place?"
//           subtitle="Short and sweet works best!"
//         />
//         <Input
//           id="title"
//           label="Title"
//           disabled={isLoading}
//           register={register}
//           errors={errors}
//           required
//         />
//         <hr />
//         <Input
//           id="description"
//           label="Description"
//           disabled={isLoading}
//           register={register}
//           errors={errors}
//           required
//         />
//       </div>
//     )
//   }

//   if (step === STEPS.PRICE) {
//     bodyContent = (
//       <div className="flex flex-col gap-8">
//         <Heading
//           title="Now, set your price"
//           subtitle="How much do you charge per night?"
//         />
//       <Input
//           id="price"
//           label="Price"
//           formatPrice 
//           type="number" 
//           disabled={isLoading}
//           register={register}
//           errors={errors}
//           required
//         />
//       </div>
//     )
//   }

//   return (
//     <Modal 
//       disabled={isLoading}
//       isOpen={sellModal.isOpen}
//       title="Sell your home!"
//       actionLabel={actionLabel}
//       onSubmit={handleSubmit(onSubmit)}
//       secondaryActionLabel={secondaryActionLabel}
//       secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
//       onClose={sellModal.onClose}
//       body={bodyContent}
//     />
//   );
// };

// export default SellModal;
