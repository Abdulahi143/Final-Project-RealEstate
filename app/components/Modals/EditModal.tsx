"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import useEditModal from "@/app/hooks/useEditModal";
import Modal from "./Modal";
import Counter from "../inputs/Counter";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import { categories } from "../navbar/Categories";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import Heading from "../Heading";
import RadioInput from "../inputs/RadioInput";
import { SafeListing } from "@/app/types";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const EditModal = ({ listing }: {listing?: SafeListing}) => {
  const router = useRouter();
  const EditModal = useEditModal();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: listing?.category || "",
      location: listing?.locationValue || "",
      furnished: listing?.furnished || "no",
      parkingCount: listing?.parkingCount || 0,
      sizeCount: listing?.sizeCount || 1,
      roomCount: listing?.roomCount || 1,
      bathroomCount: listing?.bathroomCount || 1,
      imageSrc: listing?.imageSrc || "",
      price: listing?.price || 1,
      title: listing?.title || "",
      description: listing?.description || "",
      ListingType: listing?.type || "RENT",
      buildType: listing?.buildType || "apartment",
    },
  });
  

  useEffect(() => {
    // Fetch the listing details when the modal is opened
    if (EditModal.isOpen) {
      setIsLoading(true);

      axios
        .get(`/api/listings/${listing?.id}`)
        .then((response) => {
          const listingData = response.data;
          // Set the retrieved values to form fields
          Object.keys(listingData).forEach((key) => {
            setValue(key, listingData[key]);
          });
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching listing details:", error);
          // toast.error("Error fetching listing details");
          setIsLoading(false);
        });
    }
  }, [EditModal.isOpen, listing?.id, setValue]);

  const location = watch("location");
  const category = watch("category");
  const sizeCount = watch("sizeCount");
  const roomCount = watch("roomCount");
  const parkingCount = watch("parkingCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const buildType = watch("buildType");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .patch(`/api/listings/${listing?.id}`, {
        ...data,
        type: listing?.type,
      })
      .then(() => {
        toast.success("Listing updated!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        EditModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
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
              onClick={(category) => setCustomValue("category", category)}
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
        <Map center={location?.latlng} />
      </div>
    );
  }
  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          onChange={(value) => setCustomValue("sizeCount", value)}
          value={watch("sizeCount")}
          title="Size"
          subtitle="How many square meters is the apartment?"
        />
        {errors.sizeCount && (
          <p className="text-red-500">Size must be greater than 0!</p>
        )}
        <hr />
        <Counter
          onChange={(value) => setCustomValue("roomCount", value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        {errors.roomCount && (
          <p className="text-red-500">Rooms must be greater than 0!</p>
        )}
        <hr />
        <Counter
          onChange={(value) => setCustomValue("bathroomCount", value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
        {errors.bathroomCount && (
          <p className="text-red-500">Bathroom must be greater than 0!</p>
        )}
        <Counter
          onChange={(value) => setCustomValue("parkingCount", value)}
          value={parkingCount}
          title="Parking Spaces"
          subtitle="How many parking spaces are available?"
        />
        <label className="text-gray-800 font-semibold">Build Type</label>
        <select
          value={buildType}
          onChange={(e) => setCustomValue("buildType", e.target.value)}
          className="mt-2 block w-full rounded-md border border-gray-200 px-3 py-2 outline-none focus:border-green-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        >
          <option value="apartment">Apartment</option>
          <option value="villa">Villa</option>
        </select>
        <RadioInput
          label="Furnished"
          subtitle="Is furniture included in your rental apartment?"
          id="furnished"
          value={watch("furnished")}
          onChange={(newValue) => setValue("furnished", newValue)}
        />
      </div>
    );
  }
  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show renters how your property looks like, the first image is the cover of the listing!"
        />
        <ImageUpload
          onChange={(value) => setCustomValue("imageSrc", value)}
          value={imageSrc}
          folder="RealEstateDugsiiye"
        />
      </div>
    );
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
        type="textarea"
  id="description"
  label="Description"
  disabled={isLoading}
  register={register}
  errors={errors}
  required
  minWords={20}  // Ensure minWords is passed down
  rows={4}       // Adjust rows as needed
/>

      </div>
    );
  }
  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
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
    );
  }
  return (
    <Modal
      disabled={isLoading}
      isOpen={EditModal.isOpen}
      title="Update your listing!"
      actionLabel={actionLabel}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={EditModal.onClose}
      body={bodyContent}
    />
  );
};

export default EditModal;
