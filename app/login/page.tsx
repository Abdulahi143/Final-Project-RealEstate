import React from 'react'
import LoginForm from './LoginPage'

const Login = () => {
  return (
    <div className='flex w-full h-screen'>
        <div className='w-full flex items-center justify-center lg:w-1/2 '>
        <LoginForm />
        </div>
        <div className='hidden relative lg:flex items-center justify-center w-1/2 h-full bg-gray-200'>
           <img src='/images/tayoo.jpg' className='w-60 h-60 bg-gradient-to-tr rounded-lg animate-pulse'/>
           {/* <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'/> */}
        </div>
    </div>
  )
}

export default Login