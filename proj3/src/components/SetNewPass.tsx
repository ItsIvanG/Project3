'use client';
import { SetNewPassword } from '@/lib/definitions';
import React, { useState } from 'react';
import { CiUser, CiLock } from 'react-icons/ci';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { BsEnvelope } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { Checkbox } from './ui/checkbox';
import { IoMdArrowRoundBack } from 'react-icons/io';

export default function SetNewPass() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const methods = useForm<SetNewPassword>({
    mode: 'onSubmit',
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<SetNewPassword> = async (data) => {
    // console.log('Form submitted:', data);
    // try {
    //   const response = await fetch("http://127.0.0.1:8000/api/accounts/", {
    //     method: 'POST', // Ensure the method is POST
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data), // Stringify the data to send as JSON
    //   });
    //   if (!response.ok) {
    //     throw new Error('Failed to create account');
    //   }
    //   const responseData = await response.json(); // Parse the JSON response
    //   console.log('Account created', responseData);
    //   reset(); // Reset the form after successful submission
    // } catch (error) {
    //   console.error('Error creating account', error);
    // }
  };

  return (
    <div className='relative flex flex-col justify-center items-start h-full px-20'>
      <div className='absolute top-6 right-8'>
        <a href='/'>
          <img src='/logo.png' />
        </a>
      </div>
      <div className='relative flex flex-col justify-start items-start gap-2'>
        <p className='font-bold text-5xl text-primary'>Set New Password</p>
        <p className='font-normal text-md text-primary ml-2'>
          Must be at least 8 characters.
        </p>
      </div>
      <div className='relative flex flex-col justify-start lg:justify-start items-start w-full gap-6 '>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-6 mt-8 w-full items-start'
            noValidate
          >
            {/* Password */}
            <div className='flex flex-col items-start relative w-[660px]'>
              {/* Lock Icon */}
              <CiLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary' />

              {/* Password Input Field */}
              <input
                type={showPassword ? 'text' : 'password'} // Toggle between "text" and "password"
                className={`w-full h-[44px] text-md border ${
                  errors.password ? 'border-red-500' : 'border-primary'
                } focus:outline-none focus:border-2 bg-secondary text-primary placeholder-primary/50 rounded-xl p-4 pl-9 pr-10`} // 🔹 Added "pr-10" to create space for the eye icon
                placeholder='Password'
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                })}
              />

              {/* Eye Icon for Toggle */}
              <button
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-primary'
                onClick={() => setShowPassword((prev: boolean) => !prev)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>

              {/* Error Message */}
              {errors.password && (
                <p className='absolute mt-1 text-[10px] text-red-500 top-full'>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className='flex flex-col items-start relative w-[660px]'>
              {/* Lock Icon */}
              <CiLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary' />

              {/* Password Input Field */}
              <input
                type={showPassword ? 'text' : 'password'} // Toggle between "text" and "password"
                className={`w-full h-[44px] text-md border ${
                  errors.confirmpass ? 'border-red-500' : 'border-primary'
                } focus:outline-none focus:border-2 bg-secondary text-primary placeholder-primary/50 rounded-xl p-4 pl-9 pr-10`} // 🔹 Added "pr-10" to create space for the eye icon
                placeholder='Confirm password'
                {...register('confirmpass', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters long',
                  },
                })}
              />

              {/* Eye Icon for Toggle */}
              <button
                type='button'
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-primary'
                onClick={() => setShowPassword((prev: boolean) => !prev)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </button>

              {/* Error Message */}
              {errors.confirmpass && (
                <p className='absolute mt-1 text-[10px] text-red-500 top-full'>
                  {errors.confirmpass.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='flex w-[660px] h-[44px] items-center justify-center bg-primary hover:bg-primary/90 rounded-xl text-secondary text-md font-semibold'
            >
              Reset Password
            </button>
          </form>
        </FormProvider>
        <div className='flex justify-center items-center w-full'>
          <a
            href='/login'
            className='flex items-center text-primary text-sm font-normal gap-3'
          >
            <IoMdArrowRoundBack className='text-md' />
            Back to Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
