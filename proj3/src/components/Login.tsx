'use client';
import { LoginAcc } from '@/lib/definitions';
import React, { useState } from 'react';
import { CiUser, CiLock } from 'react-icons/ci';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { BsEnvelope } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { Checkbox } from './ui/checkbox';

export default function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const methods = useForm<LoginAcc>({
    mode: 'onSubmit',
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<LoginAcc> = async (data) => {
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
        <p className='font-bold text-5xl text-primary'>Welcome back.</p>
        <p className='font-regular text-md text-primary ml-2'>
          Continue learning and growing. Your future starts now.
        </p>
      </div>
      <div className='relative flex flex-col justify-start lg:justify-start items-start w-full gap-6'>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-6 mt-8 w-full items-start'
            noValidate
          >
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

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between w-[660px]'>
              {/* Remember Me Checkbox */}
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='remember'
                  className='border-primary data-[state=checked]:bg-primary'
                />
                <label
                  htmlFor='remember'
                  className='text-xs text-primary font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Remember me
                </label>
              </div>

              {/* Forgot Password Link */}
              <a
                href='/forgotpass'
                className='text-xs text-primary underline hover:font-semibold'
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='flex w-[660px] h-[44px] items-center justify-center bg-primary rounded-xl text-secondary text-md font-semibold hover:bg-primary/90 transition-all duration-300 ease-in-out'
            >
              Sign In
            </button>
          </form>
        </FormProvider>
        <div className='flex justify-center items-center w-full'>
          <p className='text-xs text-primary font-normal'>Or continue with</p>
        </div>
        <div className='flex justify-center items-center w-full'>
          <button
            className='flex items-center justify-center w-[280px] h-[44px] border border-primary rounded-xl text-primary hover:bg-primary/5 font-normal gap-3'
            onClick={() => console.log('Google Sign-Up Clicked')} // Replace with actual Google auth function
          >
            <FcGoogle className='text-red-500 w-5 h-5' />
            Google
          </button>
        </div>
        <div className='flex justify-center items-center w-full flex-row gap-1'>
          <p className='text-xs font-normal text-primary'>
            Don't have an account?
          </p>
          <a href='/signup'>
            <p className='text-xs font-semibold text-primary'>SIGN UP</p>
          </a>
        </div>
      </div>
    </div>
  );
}
