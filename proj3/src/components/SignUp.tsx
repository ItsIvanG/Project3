'use client';
import { Register } from '@/lib/definitions';
import React, { Fragment, useState } from 'react';
import { CiUser, CiLock } from 'react-icons/ci';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { BsEnvelope } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { Checkbox } from './ui/checkbox';
import Link from 'next/link';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function SignUp() {
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const methods = useForm<Register>({
    mode: 'onSubmit',
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const getVerificationCode = async () => {
    setStep(2);
  };

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
    <div className=' flex flex-col justify-center items-start h-fit md:px-20 w-[90%] xl:w-full xl:px-0'>
      <div className='relative xl:static shadow-lg xl:shadow-none w-full h-fit bg-secondary flex items-center flex-col p-10 lg:p-20 rounded-2xl min-h-[500px] xl:min-h-[700px]'>
        <div className=' h-10 flex justify-start xl:absolute top-6  xl:right-8  w-full xl:w-auto'>
          <Link href='/'>
            <img src='/logo.png' className='object-contain h-8' />
          </Link>
        </div>

        <div className='relative flex flex-col justify-start items-start w-full gap-4 md:gap-6'>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col gap-4 md:gap-6 mt-8 items-center w-full '
              noValidate
            >
              {step === 1 ? (
                <>
                  <div className='relative w-full flex flex-col justify-start items-start md:gap-2 min-h-[75px]'>
                    <p className='font-bold text-2xl md:text-5xl text-primary'>
                      Create your account.
                    </p>
                    <p className='font-normal text-xs md:text-base text-primary md:ml-2'>
                      Build skills for today, tomorrow, and beyond. <br />{' '}
                      Education to future-proof your career.
                    </p>
                  </div>
                  <div className='w-full flex flex-col gap-4 min-h-[200px]'>
                    <div className='flex flex-col md:flex-row justify-start items-start w-full gap-4 md:gap-8'>
                      {/* First Name */}
                      <div className='flex flex-col items-start relative w-full md:w-1/2 '>
                        <CiUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary' />
                        <Input
                          className={`w-full h-[30px] md:h-[44px] text-xs md:text-base border ${
                            errors.first_name
                              ? 'border-red-500'
                              : 'border-primary'
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
                      <div className='flex flex-col items-start relative w-full md:w-1/2 '>
                        <CiUser className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary' />
                        <Input
                          className={`w-full h-[30px] md:h-[44px] text-xs md:text-base border ${
                            errors.last_name
                              ? 'border-red-500'
                              : 'border-primary'
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
                    <div className='w-full flex flex-col items-start relative'>
                      <BsEnvelope className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary' />
                      <Input
                        className={`w-full h-[30px] md:h-[44px] text-xs md:text-base border ${
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
                    <div className='w-full  flex flex-col items-start relative'>
                      {/* Lock Icon */}
                      <CiLock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-primary' />

                      {/* Password Input Field */}
                      <Input
                        type={showPassword ? 'text' : 'password'} // Toggle between "text" and "password"
                        className={`w-full h-[30px] md:h-[44px] text-xs md:text-base border ${
                          errors.password ? 'border-red-500' : 'border-primary'
                        } focus:outline-none focus:border-2 bg-secondary text-primary placeholder-primary/50 rounded-xl p-4 pl-9 pr-10`} // 🔹 Added "pr-10" to create space for the eye icon
                        placeholder='Enter your password'
                        {...register('password', {
                          required: 'Password is required',
                          minLength: {
                            value: 8,
                            message:
                              'Password must be at least 8 characters long',
                          },
                        })}
                      />

                      {/* Eye Icon for Toggle */}
                      <button
                        type='button'
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-primary'
                        onClick={() =>
                          setShowPassword((prev: boolean) => !prev)
                        }
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

                    <div className='w-full flex items-center justify-start space-x-2'>
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
                  </div>

                  {/* Submit Button */}
                  <Button
                    //href to /accountverify once done creating account
                    onClick={getVerificationCode}
                    className='flex w-full h-[30px] md:h-[44px] items-center justify-center rounded-xl text-secondary text-xs md:text-base font-semibold'
                  >
                    Create Account
                  </Button>

                  <div className='flex justify-center items-center w-full'>
                    <p className='text-xs text-primary font-normal'>
                      Or register with
                    </p>
                  </div>
                  <div className='flex justify-center items-center w-full'>
                    <Button
                      className='flex items-center justify-center w-[200px] md:w-[280px] h-[30px] md:h-[44px] rounded-xl text-primary text-xs md:text-base font-normal gap-3 '
                      variant='outline'
                      onClick={() => console.log('Google Sign-Up Clicked')} // Replace with actual Google auth function
                    >
                      <FcGoogle className='text-red-500 w-5 h-5' />
                      Google
                    </Button>
                  </div>
                  <div className='flex justify-center items-center w-full flex-row gap-1'>
                    <p className='text-xs font-normal text-primary'>
                      Already have an account?
                    </p>
                    <a href='/login'>
                      <p className='text-xs font-semibold text-primary'>
                        SIGN IN
                      </p>
                    </a>
                  </div>
                </>
              ) : (
                <div className='w-full items-center justify-start flex flex-col gap-4 md:gap-6 xl:pt-16'>
                  {/* Title & Subheading (Left-Aligned) */}
                  <div className='relative w-full flex flex-col justify-start items-start md:gap-2 min-h-[75px]'>
                    <p className='font-bold text-2xl sm:text-3xl lg:text-5xl text-primary'>
                      Account Verification
                    </p>
                    <p className='font-normal text-xs md:text-base text-primary md:ml-2'>
                      We sent a code to <strong>juandelacruz@gmail.com</strong>{' '}
                      to verify your account creation.
                    </p>
                  </div>
                  {/* OTP Input */}
                  <div className='flex flex-col items-center relative min-h-[120px]'>
                    <InputOTP maxLength={6}>
                      <InputOTPGroup className='flex space-x-1 lg:space-x-5 w-full'>
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className={`w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-2xl border rounded-lg text-center ${
                              errors.otp ? 'border-red-500' : 'border-primary'
                            }`}
                            {...register('otp', {
                              required: 'OTP is required',
                              pattern: {
                                value: /^\d{4}$/,
                                message: 'OTP must be a 6-digit number',
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
                  <Button
                    //href to /login once verified
                    type='submit'
                    className='flex w-full h-[30px] md:h-[44px] items-center justify-center rounded-xl text-secondary text-xs md:text-base font-semibold'
                  >
                    Verify
                  </Button>
                </div>
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
