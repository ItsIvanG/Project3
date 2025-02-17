'use client';
import { Register } from '@/lib/definitions';
import React, { useState } from 'react';
import { CiUser, CiLock } from 'react-icons/ci';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { BsEnvelope } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { Checkbox } from './ui/checkbox';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const methods = useForm<Register>({
    mode: 'onSubmit',
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<Register> = async (data) => {
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
      <div className='relative flex flex-col justify-start items-start gap-2 pt-14'>
        <p className='font-bold text-5xl text-primary'>Create your account.</p>
        <p className='font-regular text-md text-primary ml-2'>
          Build skills for today, tomorrow, and beyond. <br /> Education to
          future-proof your career.
        </p>
      </div>
      <div className='relative flex flex-col justify-start lg:justify-start items-start w-full gap-6'>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-6 mt-8 w-full items-start'
            noValidate
          >
            <div className='flex flex-row justify-start items-start w-full gap-8'>
              {/* First Name */}
              <div className='flex flex-col items-start relative'>
                <CiUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary' />
                <input
                  className={`w-[314px] h-[44px] text-md border ${
                    errors.first_name ? 'border-red-500' : 'border-primary'
                  } focus:outline-none focus:border-2 bg-secondary text-primary placeholder-primary/50 rounded-xl p-4 pl-9`}
                  placeholder='First Name'
                  {...register('first_name', {
                    required: 'First Name is required',
                  })}
                />
                {errors.first_name && (
                  <p className='absolute mt-0 text-[10px] text-red-500 top-full'>
                    {errors.first_name.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className='flex flex-col items-start relative'>
                <CiUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary' />
                <input
                  className={`w-[314px] h-[44px] text-md border ${
                    errors.last_name ? 'border-red-500' : 'border-primary'
                  } focus:outline-none focus:border-2 bg-secondary text-primary placeholder-primary/50 rounded-xl p-4 pl-9`}
                  placeholder='Last Name'
                  {...register('last_name', {
                    required: 'Last Name is required',
                  })}
                />
                {errors.last_name && (
                  <p className='absolute mt-0 text-[10px] text-red-500 top-full'>
                    {errors.last_name.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className='flex flex-col items-start relative'>
              <BsEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary' />
              <input
                className={`w-[660px] h-[44px] text-md border ${
                  errors.email ? 'border-red-500' : 'border-primary'
                } focus:outline-none focus:border-2 bg-secondary text-primary placeholder-primary/50 rounded-xl p-4 pl-9`}
                placeholder='Email'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className='absolute mt-0 text-[10px] text-red-500 top-full'>
                  {errors.email.message}
                </p>
              )}
            </div>

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
                placeholder='Enter your password'
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

            <div className='flex items-center space-x-2'>
              <Checkbox
                id='terms1'
                className='border-primary data-[state=checked]:bg-primary'
              />
              <label
                htmlFor='terms1'
                className='text-xs text-primary font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                I agree to{' '}
                <a
                  href='/terms' // Replace with the actual Terms & Conditions page link
                  className='text-primary underline font-semibold'
                  target='_blank' // Opens in a new tab
                  rel='noopener noreferrer' // Security best practice
                >
                  Terms & Conditions
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='flex w-[660px] h-[44px] items-center justify-center bg-primary hover:bg-primary/90 rounded-xl text-secondary text-md font-semibold'
            >
              Create Account
            </button>
          </form>
        </FormProvider>
        <div className='flex justify-center items-center w-full'>
          <p className='text-xs text-primary font-normal'>Or register with</p>
        </div>
        <div className='flex justify-center items-center w-full'>
          <button
            className='flex items-center justify-center w-[280px] h-[44px] border border-primary rounded-xl text-primary font-normal gap-3 hover:bg-primary/5 transition-all duration-300 ease-in-out'
            onClick={() => console.log('Google Sign-Up Clicked')} // Replace with actual Google auth function
          >
            <FcGoogle className='text-red-500 w-5 h-5' />
            Google
          </button>
        </div>
        <div className='flex justify-center items-center w-full flex-row gap-1'>
          <p className='text-xs font-normal text-primary'>
            Already have an account?
          </p>
          <a href='/login'>
            <p className='text-xs font-semibold text-primary'>SIGN IN</p>
          </a>
        </div>
      </div>
    </div>
  );
}
