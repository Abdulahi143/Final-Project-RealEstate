'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { format } from 'date-fns';

import useCountries from "@/app/hooks/useCountries";
import { 
  SafeListing, 
  SafeReservation, 
  SafeUser 
} from "@/app/types";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";
import { FaBath, FaBed, FaCouch,  FaParking } from "react-icons/fa";
import { IoIosResize } from "react-icons/io";
import { MdChevronLeft, MdChevronRight, MdLocationOn } from "react-icons/md";
import { formatNumberWithSpaces } from "@/app/libs/formatNumber";
import FurnishedComponent from "../Furnished";

interface ListingCardProps {
  data: SafeListing;
  reservation?: SafeReservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null
};

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser,
}) => {


  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);
  const [isHovered, setIsHovered] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');

  const handleNavigate = (direction: 'left' | 'right') => {
    // Set the slide direction for the animation
    setSlideDirection(direction);

    // After the animation duration, update the image index
    setTimeout(() => {
      setSlideDirection(''); // Reset slide direction
      setCurrentIndex((prevIndex) => {
        if (direction === 'right') {
          return prevIndex === data.imageSrc.length - 1 ? 0 : prevIndex + 1;
        } else {
          return prevIndex === 0 ? data.imageSrc.length - 1 : prevIndex - 1;
        }
      });
    }, 200); // This should match the CSS transition duration
  };

  const formattedPrice = useMemo(() => {
    let price = formatNumberWithSpaces(data.price);
    if (data.type === "rent" && !reservation) {
      return `$ ${price} /month`;
    }
    return `$ ${price}`;
  }, [data.price, data.type, reservation]);

  const getShortDescription = (description: string) => {
    const words = description.split(' ');
    if (words.length > 13) {
      return words.slice(0, 13).join(' ') + '...';
    }
    return description;
  };

    
  const bathrooms = (bathroomCount: number) => {
    return (
        <div className="flex items-center gap-1">
            <span>{bathroomCount > 0 ? bathroomCount : 0}</span>
            <FaBath />
        </div>
    );
};

const rooms = (roomCount: number) => {
  return (
      <div className="flex items-center gap-1">
          <span>{roomCount > 0 ? roomCount : 0}</span>
          <FaBed />
      </div>
  );
};



const size = (sizeCount: number) => {
  return (
      <div className="flex items-center gap-1">
          <span>{sizeCount > 0 ? sizeCount : 0}</span> m²
          <IoIosResize />
      </div>
  );
};

const parking = (parkingCount: number) => {
  return (
      <div className="flex items-center gap-1">
          <span>{parkingCount > 0 ? parkingCount : 0}</span>
          <FaParking />
      </div>
  );
};



  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId)
  }, [disabled, onAction, actionId]);

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }
  
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <ClientOnly>
    <div
      className="col-span-1 cursor-pointer group hover:shadow-lg border border-gray-300 rounded-lg overflow-hidden w-full sm:max-w-lg"
    >
      <div className="flex flex-col">
        <div
          className="relative aspect-square overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left arrow */}
          {isHovered && currentIndex > 0 && (
          <MdChevronLeft
            className="absolute left-0 top-1/2 z-10 text-white text-3xl cursor-pointer transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1"
            onClick={() => handleNavigate('left')}
          />
        )}
            {/* Right arrow */}
            {isHovered && currentIndex < data.imageSrc.length - 1 && (
          <MdChevronRight
            className="absolute right-0 top-1/2 z-10 text-white text-3xl cursor-pointer transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-1"
            onClick={() => handleNavigate('right')}
          />
        )}
 {/* Images */}
 {data.imageSrc.map((src, index) => (
    <div
      key={index}
      className="absolute inset-0 transition-opacity duration-500 ease-in-out"
      style={{ opacity: currentIndex === index ? 1 : 0 }}
    >
      <Image
        layout="fill"
        className="object-cover h-full w-full transform scale-100 group-hover:scale-110 transition-transform duration-300" // Tailwind classes for zoom effect
        src={src}
        alt={`Listing image ${index + 1}`}
      />
    </div>
  ))}
            <div
              className="
          absolute
          top-3
          right-3
        "
            >
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>

       {/* Ribbon */}
       <div className="ribbon absolute -top-10 -left-5 h-40 w-40 overflow-hidden before:absolute before:top-0 before:right-0 before:-z-10 before:border-4 before:border-transparent after:absolute after:left-0 after:bottom-0 after:-z-10 after:border-4 after:border-transparent">
          <div className={`absolute -left-14 top-[43px] w-40 -rotate-45 ${data.type === 'rent' ? 'bg-gradient-to-br from-green-600 via-green-400 to-green-500' : 'bg-gradient-to-br from-red-600 via-red-400 to-red-500'} py-2.5 text-center text-white shadow-md`}>
            {data.type === 'rent' ? 'For Rent' : 'For Sale'}
          </div>
        </div>
          </div>
          <div
          onClick={() => router.push(`/listings/${data.id}`)} 
           className="p-3 flex flex-col gap-2 w-full">
            <p className="truncate text-lg font-semibold text-slate-700">
              {data.title}
            </p>
            <div className="flex items-center gap-1">
              <MdLocationOn className="h-4 w-4 text-green-700" />
              <p className="text-sm text-gray-600 truncate w-full">
                {location?.label}, {location?.region}{" "}
                {/* Adjusted to use location data */}
              </p>
            </div>
            <div className="font-light text-neutral-500">
              {reservationDate || data.category}
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {data.description}
            </p>

            <div className="flex flex-row justify-start items-center gap-2 mt-2">
              {bathrooms(data.bathroomCount)}
              {rooms(data.roomCount)}
              {size(data.sizeCount)}
              {parking(data.parkingCount)}
              <FurnishedComponent furnished={data.furnished} />
            </div>

            {/* Additional details like bedrooms and bathrooms can be added here if available in your data */}
          </div>

          <div className="flex flex-row items-center gap-1">
            <div className="font-semibold">{formattedPrice}</div>
            {!reservation && <div className="font-light"></div>}
          </div>
          {onAction && actionLabel && (
            <Button
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
            />
          )}
        </div>
   


  </div>




    </ClientOnly>
   

   );
}
 
export default ListingCard;













// HOLD

// <section>
//   <div className="mantine-Container-root mt-20 mantine-10nsg3v">
//     <div className="my-4 flex items-center justify-between">
//       <h1 className="tablet:text-4xl pc:text-2xl text-xl font-bold text-primary ">
//         Top properties
//       </h1>
//       <div className="flex font-bold cursor-pointer">
//         View all
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width={24}
//           height={24}
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth={2}
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="tabler-icon tabler-icon-chevron-right"
//         >
//           <path d="M9 6l6 6l-6 6" />
//         </svg>
//       </div>
//     </div>
//     <section>
//       <div className="grid pc:grid-cols-4 laptop:grid-cols-3 tablet:grid-cols-2 grid-cols-1 gap-4">
//         <div className="css-0" style={{ animationDelay: "0ms" }}>
//           <a href="/property/dell-resident">
//             <div className="bg-white rounded-default hover:shadow-lg duration-300 flex flex-col items-center text-left group">
//               <div className="relative">
//                 <span
//                   style={{
//                     boxSizing: "border-box",
//                     display: "inline-block",
//                     overflow: "hidden",
//                     width: "initial",
//                     height: "initial",
//                     background: "none",
//                     opacity: 1,
//                     border: 0,
//                     margin: 0,
//                     padding: 0,
//                     position: "relative",
//                     maxWidth: "100%"
//                   }}
//                 >
//                   <span
//                     style={{
//                       boxSizing: "border-box",
//                       display: "block",
//                       width: "initial",
//                       height: "initial",
//                       background: "none",
//                       opacity: 1,
//                       border: 0,
//                       margin: 0,
//                       padding: 0,
//                       maxWidth: "100%"
//                     }}
//                   >
//                     <img
//                       style={{
//                         display: "block",
//                         maxWidth: "100%",
//                         width: "initial",
//                         height: "initial",
//                         background: "none",
//                         opacity: 1,
//                         border: 0,
//                         margin: 0,
//                         padding: 0
//                       }}
//                       alt=""
//                       aria-hidden="true"
//                       src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27500%27%20height=%27300%27/%3e"
//                     />
//                   </span>
//                   <img
//                     alt="properties images"
//                     src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
//                     decoding="async"
//                     data-nimg="intrinsic"
//                     className="rounded-t-default group-hover:scale-110 duration-300"
//                     style={{
//                       position: "absolute",
//                       top: 0,
//                       left: 0,
//                       bottom: 0,
//                       right: 0,
//                       boxSizing: "border-box",
//                       padding: 0,
//                       border: "none",
//                       margin: "auto",
//                       display: "block",
//                       width: 0,
//                       height: 0,
//                       minWidth: "100%",
//                       maxWidth: "100%",
//                       minHeight: "100%",
//                       maxHeight: "100%",
//                       objectFit: "cover",
//                       backgroundSize: "cover",
//                       backgroundPosition: "0% 0%",
//                       filter: " ",
//                       backgroundImage:
//                         'url("https://images.unsplash.com/photo-1494526585095-c41746248156?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")'
//                     }}
//                   />
//                   <noscript>
//                     &lt;img alt="properties images"
//                     srcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1494526585095-c41746248156%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1470%26q%3D80&amp;amp;w=640&amp;amp;q=75
//                     1x,
//                     /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1494526585095-c41746248156%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1470%26q%3D80&amp;amp;w=1080&amp;amp;q=75
//                     2x"
//                     src="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1494526585095-c41746248156%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1470%26q%3D80&amp;amp;w=1080&amp;amp;q=75"
//                     decoding="async" data-nimg="intrinsic"
//                     style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%;object-fit:cover"
//                     class="rounded-t-default group-hover:scale-110 duration-300"
//                     loading="lazy"/&gt;
//                   </noscript>
//                 </span>
//                 <div className="absolute p-1 top-0 left-0 flex flex-col text-left text-white">
//                   <div>
//                     <span
//                       style={{
//                         boxSizing: "border-box",
//                         display: "inline-block",
//                         overflow: "hidden",
//                         width: "initial",
//                         height: "initial",
//                         background: "none",
//                         opacity: 1,
//                         border: 0,
//                         margin: 0,
//                         padding: 0,
//                         position: "relative",
//                         maxWidth: "100%"
//                       }}
//                     >
//                       <span
//                         style={{
//                           boxSizing: "border-box",
//                           display: "block",
//                           width: "initial",
//                           height: "initial",
//                           background: "none",
//                           opacity: 1,
//                           border: 0,
//                           margin: 0,
//                           padding: 0,
//                           maxWidth: "100%"
//                         }}
//                       >
//                         <img
//                           style={{
//                             display: "block",
//                             maxWidth: "100%",
//                             width: "initial",
//                             height: "initial",
//                             background: "none",
//                             opacity: 1,
//                             border: 0,
//                             margin: 0,
//                             padding: 0
//                           }}
//                           alt=""
//                           aria-hidden="true"
//                           src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e"
//                         />
//                       </span>
//                       <img
//                         alt="icon"
//                         src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
//                         decoding="async"
//                         data-nimg="intrinsic"
//                         style={{
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           bottom: 0,
//                           right: 0,
//                           boxSizing: "border-box",
//                           padding: 0,
//                           border: "none",
//                           margin: "auto",
//                           display: "block",
//                           width: 0,
//                           height: 0,
//                           minWidth: "100%",
//                           maxWidth: "100%",
//                           minHeight: "100%",
//                           maxHeight: "100%"
//                         }}
//                       />
//                       <noscript>
//                         &lt;img alt="icon" srcSet="/icons/image.svg 1x,
//                         /icons/image.svg 2x" src="/icons/image.svg"
//                         decoding="async" data-nimg="intrinsic"
//                         style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
//                         loading="lazy"/&gt;
//                       </noscript>
//                     </span>
//                   </div>
//                   <div>
//                     <span
//                       style={{
//                         boxSizing: "border-box",
//                         display: "inline-block",
//                         overflow: "hidden",
//                         width: "initial",
//                         height: "initial",
//                         background: "none",
//                         opacity: 1,
//                         border: 0,
//                         margin: 0,
//                         padding: 0,
//                         position: "relative",
//                         maxWidth: "100%"
//                       }}
//                     >
//                       <span
//                         style={{
//                           boxSizing: "border-box",
//                           display: "block",
//                           width: "initial",
//                           height: "initial",
//                           background: "none",
//                           opacity: 1,
//                           border: 0,
//                           margin: 0,
//                           padding: 0,
//                           maxWidth: "100%"
//                         }}
//                       >
//                         <img
//                           style={{
//                             display: "block",
//                             maxWidth: "100%",
//                             width: "initial",
//                             height: "initial",
//                             background: "none",
//                             opacity: 1,
//                             border: 0,
//                             margin: 0,
//                             padding: 0
//                           }}
//                           alt=""
//                           aria-hidden="true"
//                           src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e"
//                         />
//                       </span>
//                       <img
//                         alt="icon"
//                         src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
//                         decoding="async"
//                         data-nimg="intrinsic"
//                         style={{
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           bottom: 0,
//                           right: 0,
//                           boxSizing: "border-box",
//                           padding: 0,
//                           border: "none",
//                           margin: "auto",
//                           display: "block",
//                           width: 0,
//                           height: 0,
//                           minWidth: "100%",
//                           maxWidth: "100%",
//                           minHeight: "100%",
//                           maxHeight: "100%"
//                         }}
//                       />
//                       <noscript>
//                         &lt;img alt="icon" srcSet="/icons/video.svg 1x,
//                         /icons/video.svg 2x" src="/icons/video.svg"
//                         decoding="async" data-nimg="intrinsic"
//                         style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
//                         loading="lazy"/&gt;
//                       </noscript>
//                     </span>
//                   </div>
//                   <div>
//                     <span
//                       style={{
//                         boxSizing: "border-box",
//                         display: "inline-block",
//                         overflow: "hidden",
//                         width: "initial",
//                         height: "initial",
//                         background: "none",
//                         opacity: 1,
//                         border: 0,
//                         margin: 0,
//                         padding: 0,
//                         position: "relative",
//                         maxWidth: "100%"
//                       }}
//                     >
//                       <span
//                         style={{
//                           boxSizing: "border-box",
//                           display: "block",
//                           width: "initial",
//                           height: "initial",
//                           background: "none",
//                           opacity: 1,
//                           border: 0,
//                           margin: 0,
//                           padding: 0,
//                           maxWidth: "100%"
//                         }}
//                       >
//                         <img
//                           style={{
//                             display: "block",
//                             maxWidth: "100%",
//                             width: "initial",
//                             height: "initial",
//                             background: "none",
//                             opacity: 1,
//                             border: 0,
//                             margin: 0,
//                             padding: 0
//                           }}
//                           alt=""
//                           aria-hidden="true"
//                           src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e"
//                         />
//                       </span>
//                       <img
//                         alt="icon"
//                         src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
//                         decoding="async"
//                         data-nimg="intrinsic"
//                         style={{
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           bottom: 0,
//                           right: 0,
//                           boxSizing: "border-box",
//                           padding: 0,
//                           border: "none",
//                           margin: "auto",
//                           display: "block",
//                           width: 0,
//                           height: 0,
//                           minWidth: "100%",
//                           maxWidth: "100%",
//                           minHeight: "100%",
//                           maxHeight: "100%"
//                         }}
//                       />
//                       <noscript>
//                         &lt;img alt="icon" srcSet="/icons/map.svg 1x,
//                         /icons/map.svg 2x" src="/icons/map.svg" decoding="async"
//                         data-nimg="intrinsic"
//                         style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
//                         loading="lazy"/&gt;
//                       </noscript>
//                     </span>
//                   </div>
//                   <div>
//                     <span
//                       style={{
//                         boxSizing: "border-box",
//                         display: "inline-block",
//                         overflow: "hidden",
//                         width: "initial",
//                         height: "initial",
//                         background: "none",
//                         opacity: 1,
//                         border: 0,
//                         margin: 0,
//                         padding: 0,
//                         position: "relative",
//                         maxWidth: "100%"
//                       }}
//                     >
//                       <span
//                         style={{
//                           boxSizing: "border-box",
//                           display: "block",
//                           width: "initial",
//                           height: "initial",
//                           background: "none",
//                           opacity: 1,
//                           border: 0,
//                           margin: 0,
//                           padding: 0,
//                           maxWidth: "100%"
//                         }}
//                       >
//                         <img
//                           style={{
//                             display: "block",
//                             maxWidth: "100%",
//                             width: "initial",
//                             height: "initial",
//                             background: "none",
//                             opacity: 1,
//                             border: 0,
//                             margin: 0,
//                             padding: 0
//                           }}
//                           alt=""
//                           aria-hidden="true"
//                           src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2720%27%20height=%2720%27/%3e"
//                         />
//                       </span>
//                       <img
//                         alt="icon"
//                         src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
//                         decoding="async"
//                         data-nimg="intrinsic"
//                         style={{
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           bottom: 0,
//                           right: 0,
//                           boxSizing: "border-box",
//                           padding: 0,
//                           border: "none",
//                           margin: "auto",
//                           display: "block",
//                           width: 0,
//                           height: 0,
//                           minWidth: "100%",
//                           maxWidth: "100%",
//                           minHeight: "100%",
//                           maxHeight: "100%"
//                         }}
//                       />
//                       <noscript>
//                         &lt;img alt="icon" srcSet="/icons/3d.svg 1x,
//                         /icons/3d.svg 2x" src="/icons/3d.svg" decoding="async"
//                         data-nimg="intrinsic"
//                         style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%"
//                         loading="lazy"/&gt;
//                       </noscript>
//                     </span>
//                   </div>
//                 </div>
//                 <div className="absolute top-1 right-1">
//                   <div className="bg-white text-primary font-bold px-4 text-lg rounded-default">
//                     ${/* */}
//                     20,000
//                   </div>
//                 </div>
//               </div>
//               <div className="p-2">
//                 <div className="flex flex-row justify-center items-center space-x-2">
//                   <div>
//                     <span
//                       style={{
//                         boxSizing: "border-box",
//                         display: "inline-block",
//                         overflow: "hidden",
//                         width: "initial",
//                         height: "initial",
//                         background: "none",
//                         opacity: 1,
//                         border: 0,
//                         margin: 0,
//                         padding: 0,
//                         position: "relative",
//                         maxWidth: "100%"
//                       }}
//                     >
//                       <span
//                         style={{
//                           boxSizing: "border-box",
//                           display: "block",
//                           width: "initial",
//                           height: "initial",
//                           background: "none",
//                           opacity: 1,
//                           border: 0,
//                           margin: 0,
//                           padding: 0,
//                           maxWidth: "100%"
//                         }}
//                       >
//                         <img
//                           style={{
//                             display: "block",
//                             maxWidth: "100%",
//                             width: "initial",
//                             height: "initial",
//                             background: "none",
//                             opacity: 1,
//                             border: 0,
//                             margin: 0,
//                             padding: 0
//                           }}
//                           alt=""
//                           aria-hidden="true"
//                           src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27100%27%20height=%27100%27/%3e"
//                         />
//                       </span>
//                       <img
//                         alt="properties images"
//                         src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
//                         decoding="async"
//                         data-nimg="intrinsic"
//                         className="rounded-default"
//                         style={{
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           bottom: 0,
//                           right: 0,
//                           boxSizing: "border-box",
//                           padding: 0,
//                           border: "none",
//                           margin: "auto",
//                           display: "block",
//                           width: 0,
//                           height: 0,
//                           minWidth: "100%",
//                           maxWidth: "100%",
//                           minHeight: "100%",
//                           maxHeight: "100%",
//                           objectFit: "cover",
//                           backgroundSize: "cover",
//                           backgroundPosition: "0% 0%",
//                           filter: " ",
//                           backgroundImage:
//                             'url("https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80")'
//                         }}
//                       />
//                       <noscript>
//                         &lt;img alt="properties images"
//                         srcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1580587771525-78b9dba3b914%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1074%26q%3D80&amp;amp;w=128&amp;amp;q=75
//                         1x,
//                         /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1580587771525-78b9dba3b914%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1074%26q%3D80&amp;amp;w=256&amp;amp;q=75
//                         2x"
//                         src="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1580587771525-78b9dba3b914%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1074%26q%3D80&amp;amp;w=256&amp;amp;q=75"
//                         decoding="async" data-nimg="intrinsic"
//                         style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%;object-fit:cover"
//                         class="rounded-default" loading="lazy"/&gt;
//                       </noscript>
//                     </span>
//                   </div>
//                   <div>
//                     <span
//                       style={{
//                         boxSizing: "border-box",
//                         display: "inline-block",
//                         overflow: "hidden",
//                         width: "initial",
//                         height: "initial",
//                         background: "none",
//                         opacity: 1,
//                         border: 0,
//                         margin: 0,
//                         padding: 0,
//                         position: "relative",
//                         maxWidth: "100%"
//                       }}
//                     >
//                       <span
//                         style={{
//                           boxSizing: "border-box",
//                           display: "block",
//                           width: "initial",
//                           height: "initial",
//                           background: "none",
//                           opacity: 1,
//                           border: 0,
//                           margin: 0,
//                           padding: 0,
//                           maxWidth: "100%"
//                         }}
//                       >
//                         <img
//                           style={{
//                             display: "block",
//                             maxWidth: "100%",
//                             width: "initial",
//                             height: "initial",
//                             background: "none",
//                             opacity: 1,
//                             border: 0,
//                             margin: 0,
//                             padding: 0
//                           }}
//                           alt=""
//                           aria-hidden="true"
//                           src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27100%27%20height=%27100%27/%3e"
//                         />
//                       </span>
//                       <img
//                         alt="properties images"
//                         src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
//                         decoding="async"
//                         data-nimg="intrinsic"
//                         className="rounded-default"
//                         style={{
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           bottom: 0,
//                           right: 0,
//                           boxSizing: "border-box",
//                           padding: 0,
//                           border: "none",
//                           margin: "auto",
//                           display: "block",
//                           width: 0,
//                           height: 0,
//                           minWidth: "100%",
//                           maxWidth: "100%",
//                           minHeight: "100%",
//                           maxHeight: "100%",
//                           objectFit: "cover",
//                           backgroundSize: "cover",
//                           backgroundPosition: "0% 0%",
//                           filter: " ",
//                           backgroundImage:
//                             'url("https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1467&q=80")'
//                         }}
//                       />
//                       <noscript>
//                         &lt;img alt="properties images"
//                         srcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1448630360428-65456885c650%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1467%26q%3D80&amp;amp;w=128&amp;amp;q=75
//                         1x,
//                         /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1448630360428-65456885c650%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1467%26q%3D80&amp;amp;w=256&amp;amp;q=75
//                         2x"
//                         src="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1448630360428-65456885c650%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1467%26q%3D80&amp;amp;w=256&amp;amp;q=75"
//                         decoding="async" data-nimg="intrinsic"
//                         style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%;object-fit:cover"
//                         class="rounded-default" loading="lazy"/&gt;
//                       </noscript>
//                     </span>
//                   </div>
//                   <div>
//                     <span
//                       style={{
//                         boxSizing: "border-box",
//                         display: "inline-block",
//                         overflow: "hidden",
//                         width: "initial",
//                         height: "initial",
//                         background: "none",
//                         opacity: 1,
//                         border: 0,
//                         margin: 0,
//                         padding: 0,
//                         position: "relative",
//                         maxWidth: "100%"
//                       }}
//                     >
//                       <span
//                         style={{
//                           boxSizing: "border-box",
//                           display: "block",
//                           width: "initial",
//                           height: "initial",
//                           background: "none",
//                           opacity: 1,
//                           border: 0,
//                           margin: 0,
//                           padding: 0,
//                           maxWidth: "100%"
//                         }}
//                       >
//                         <img
//                           style={{
//                             display: "block",
//                             maxWidth: "100%",
//                             width: "initial",
//                             height: "initial",
//                             background: "none",
//                             opacity: 1,
//                             border: 0,
//                             margin: 0,
//                             padding: 0
//                           }}
//                           alt=""
//                           aria-hidden="true"
//                           src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27100%27%20height=%27100%27/%3e"
//                         />
//                       </span>
//                       <img
//                         alt="properties images"
//                         src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
//                         decoding="async"
//                         data-nimg="intrinsic"
//                         className="rounded-default"
//                         style={{
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           bottom: 0,
//                           right: 0,
//                           boxSizing: "border-box",
//                           padding: 0,
//                           border: "none",
//                           margin: "auto",
//                           display: "block",
//                           width: 0,
//                           height: 0,
//                           minWidth: "100%",
//                           maxWidth: "100%",
//                           minHeight: "100%",
//                           maxHeight: "100%",
//                           objectFit: "cover",
//                           backgroundSize: "cover",
//                           backgroundPosition: "0% 0%",
//                           filter: " ",
//                           backgroundImage:
//                             'url("https://images.unsplash.com/photo-1584109409244-cc0ba316ee1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")'
//                         }}
//                       />
//                       <noscript>
//                         &lt;img alt="properties images"
//                         srcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1584109409244-cc0ba316ee1a%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1470%26q%3D80&amp;amp;w=128&amp;amp;q=75
//                         1x,
//                         /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1584109409244-cc0ba316ee1a%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1470%26q%3D80&amp;amp;w=256&amp;amp;q=75
//                         2x"
//                         src="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1584109409244-cc0ba316ee1a%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1470%26q%3D80&amp;amp;w=256&amp;amp;q=75"
//                         decoding="async" data-nimg="intrinsic"
//                         style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%;object-fit:cover"
//                         class="rounded-default" loading="lazy"/&gt;
//                       </noscript>
//                     </span>
//                   </div>
//                   <div>
//                     <span
//                       style={{
//                         boxSizing: "border-box",
//                         display: "inline-block",
//                         overflow: "hidden",
//                         width: "initial",
//                         height: "initial",
//                         background: "none",
//                         opacity: 1,
//                         border: 0,
//                         margin: 0,
//                         padding: 0,
//                         position: "relative",
//                         maxWidth: "100%"
//                       }}
//                     >
//                       <span
//                         style={{
//                           boxSizing: "border-box",
//                           display: "block",
//                           width: "initial",
//                           height: "initial",
//                           background: "none",
//                           opacity: 1,
//                           border: 0,
//                           margin: 0,
//                           padding: 0,
//                           maxWidth: "100%"
//                         }}
//                       >
//                         <img
//                           style={{
//                             display: "block",
//                             maxWidth: "100%",
//                             width: "initial",
//                             height: "initial",
//                             background: "none",
//                             opacity: 1,
//                             border: 0,
//                             margin: 0,
//                             padding: 0
//                           }}
//                           alt=""
//                           aria-hidden="true"
//                           src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27100%27%20height=%27100%27/%3e"
//                         />
//                       </span>
//                       <img
//                         alt="properties images"
//                         src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
//                         decoding="async"
//                         data-nimg="intrinsic"
//                         className="rounded-default"
//                         style={{
//                           position: "absolute",
//                           top: 0,
//                           left: 0,
//                           bottom: 0,
//                           right: 0,
//                           boxSizing: "border-box",
//                           padding: 0,
//                           border: "none",
//                           margin: "auto",
//                           display: "block",
//                           width: 0,
//                           height: 0,
//                           minWidth: "100%",
//                           maxWidth: "100%",
//                           minHeight: "100%",
//                           maxHeight: "100%",
//                           objectFit: "cover",
//                           backgroundSize: "cover",
//                           backgroundPosition: "0% 0%",
//                           filter: " ",
//                           backgroundImage:
//                             'url("https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80")'
//                         }}
//                       />
//                       <noscript>
//                         &lt;img alt="properties images"
//                         srcSet="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1493809842364-78817add7ffb%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1470%26q%3D80&amp;amp;w=128&amp;amp;q=75
//                         1x,
//                         /_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1493809842364-78817add7ffb%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1470%26q%3D80&amp;amp;w=256&amp;amp;q=75
//                         2x"
//                         src="/_next/image?url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1493809842364-78817add7ffb%3Fixlib%3Drb-1.2.1%26ixid%3DMnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8%26auto%3Dformat%26fit%3Dcrop%26w%3D1470%26q%3D80&amp;amp;w=256&amp;amp;q=75"
//                         decoding="async" data-nimg="intrinsic"
//                         style="position:absolute;top:0;left:0;bottom:0;right:0;box-sizing:border-box;padding:0;border:none;margin:auto;display:block;width:0;height:0;min-width:100%;max-width:100%;min-height:100%;max-height:100%;object-fit:cover"
//                         class="rounded-default" loading="lazy"/&gt;
//                       </noscript>
//                     </span>
//                   </div>
//                 </div>
//                 <div className="font-bold text-gray-800 text-left" />
//                 <div className="font-bold text-black/60 text-left text-sm">
//                   Apartment
//                 </div>
//                 <div className="font-bold text-black/50 text-left text-sm mb-4">
//                   Dell road,Canada
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <div>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={24}
//                         height={24}
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="text-primary"
//                       >
//                         <path d="M3 7v11m0 -4h18m0 4v-8a2 2 0 0 0 -2 -2h-8v6" />
//                         <path d="M7 10m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
//                       </svg>
//                     </div>
//                     <div>
//                       <span className="font-bold text-primary">Beds</span>
//                     </div>
//                     <div>
//                       <span className="font-bold text-primary">3</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div>
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         width={24}
//                         height={24}
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth={2}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         className="text-primary"
//                       >
//                         <path d="M4 12h16a1 1 0 0 1 1 1v3a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4v-3a1 1 0 0 1 1 -1z" />
//                         <path d="M6 12v-7a2 2 0 0 1 2 -2h3v2.25" />
//                         <path d="M4 21l1 -1.5" />
//                         <path d="M20 21l-1 -1.5" />
//                       </svg>
//                     </div>
//                     <div>
//                       <span className="font-bold text-primary">Bathrooms</span>
//                     </div>
//                     <div>
//                       <span className="font-bold text-primary">2</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2 mt-4">
//                   <div className="mantine-Badge-root bg-primary text-white mantine-jx1rb5">
//                     <span className="mantine-h9iq4m mantine-Badge-inner">
//                       rent
//                     </span>
//                   </div>
//                   <div className="mantine-Badge-root bg-primary text-white mantine-jx1rb5">
//                     <span className="mantine-h9iq4m mantine-Badge-inner">
//                       negotialble
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </a>
//         </div>
//       </div>
//     </section>
//   </div>
// </section>


