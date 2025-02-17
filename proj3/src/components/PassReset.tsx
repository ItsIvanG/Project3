'use client';
import { PasswordReset } from '@/lib/definitions';
import React, { useState } from 'react';
import { CiUser, CiLock } from 'react-icons/ci';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { BsEnvelope } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { Checkbox } from './ui/checkbox';
import { IoMdArrowRoundBack } from 'react-icons/io';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export default function PassReset() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const methods = useForm<PasswordReset>({
    mode: 'onSubmit',
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<PasswordReset> = async (data) => {
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
      {/* Title & Subheading (Left-Aligned) */}
      <div className='relative flex flex-col justify-start items-start gap-2'>
        <p className='font-bold text-5xl text-primary'>Password Reset</p>
        <p className='font-normal text-md text-primary ml-2'>
          We sent a code to <strong>juandelacruz@gmail.com</strong>
        </p>
      </div>

      {/* Centered OTP Input & Button */}
      <div className='relative flex flex-col justify-center items-center w-full gap-6 mt-8'>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-6 w-full items-center'
            noValidate
          >
            {/* OTP Input */}
            <div className='flex flex-col items-center relative'>
              <InputOTP maxLength={4}>
                <InputOTPGroup className='flex space-x-6'>
                  {[...Array(4)].map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className={`w-16 h-16 text-2xl border rounded-lg text-center ${
                        errors.otp ? 'border-red-500' : 'border-primary'
                      }`}
                      {...register('otp', {
                        required: 'OTP is required',
                        pattern: {
                          value: /^\d{4}$/,
                          message: 'OTP must be a 4-digit number',
                        },
                      })}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              {/* Error Message */}
              {errors.otp && (
                <p className='absolute mt-1 text-[10px] text-red-500 top-full'>
                  {errors.otp.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='flex w-[660px] h-[44px] items-center justify-center bg-primary hover:bg-primary/90 rounded-xl text-secondary text-md font-semibold'
            >
              Continue
            </button>
          </form>
        </FormProvider>

        {/* Didn't receive email? */}
        <div className='flex flex-row justify-center items-center w-full text-primary text-sm font-normal gap-1'>
          <p>Didn't receive email?</p>
          <button className='underline font-semibold'>Click to resend</button>
        </div>

        {/* Back to Sign In */}
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
