import React from 'react'
import Avatar from '../components/Avatar'
import { SafeUser } from '../types';
import Image from 'next/image';


interface UserMenuProps {
    currentUser?: SafeUser | null;
}


const View = ({currentUser}: UserMenuProps) => {

    const userImage = currentUser?.image;
    console.log("UserImage", userImage)
  return (
    <div className='pt-24'>
        <Image width={100} height={100} src={currentUser?.image}/> 
    </div>
  )
}

export default View