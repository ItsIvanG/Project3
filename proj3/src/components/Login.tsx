"use client";
import { LoginAcc } from "@/lib/definitions";
import React, { useState } from "react";
import { CiUser, CiLock } from "react-icons/ci";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { BsEnvelope } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { SubmitHandler, useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store";

export default function Login() {
  // const { toast } = useToast();
  const router = useRouter();
  const setName = useUserStore((state) => state.setName);
  const setRole = useUserStore((state) => state.setRole);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const methods = useForm<LoginAcc>({
    mode: "onSubmit",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<LoginAcc> = async (data) => {
    console.log("Form submitted:", data);
    try {
      const response = await fetch(
        "https://rp2mrfczwf.execute-api.ap-southeast-1.amazonaws.com/init/auth/signin",
        {
          method: "POST", // Ensure the method is POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // Stringify the data to send as JSON
        }
      );
      if (response.status !== 200) {
        throw new Error("Failed to create account");
      }
      const responseData = await response.json(); // Parse the JSON response
      console.log("Response below", responseData);

      toast({
        title: JSON.stringify(
          responseData?.body?.message ||
            responseData?.body ||
            "No response message"
        ),
      });

      if (responseData?.statusCode === 200) {
        setName(responseData?.body?.full_name);
        setRole(responseData?.body?.role);
      }

      if (responseData?.body?.role === "instructor") {
        router.push("/instructor/settings");
      } else if (responseData?.body?.role === "student") {
        router.push("/");
      }
      // reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error creating account", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-start h-fit md:px-20 w-[90%] xl:w-full xl:px-0">
      <div className="relative xl:static shadow-lg xl:shadow-none w-full h-fit bg-secondary flex items-center flex-col p-10 lg:p-20 rounded-2xl min-h-[500px] xl:min-h-[700px] ">
        <div className=" h-10 flex justify-start xl:absolute top-6  xl:right-8  w-full xl:w-auto ">
          <Link href="/">
            <img src="/logo.png" className="object-contain h-8" />
          </Link>
        </div>
        <div className="relative w-full flex flex-col justify-start items-start md:gap-2 min-h-[75px] pt-10">
          <p className="font-bold text-2xl md:text-5xl text-primary">
            Welcome back.
          </p>
          <p className="font-normal text-xs md:text-base text-primary md:ml-2">
            Continue learning and growing. Your future starts now.
          </p>
        </div>
        <div className="relative flex flex-col justify-start items-start w-full gap-4 md:gap-6">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 md:gap-6 mt-8 items-center w-full "
              noValidate
            >
              {/* Email */}
              <div className="w-full flex flex-col items-start relative">
                <BsEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />
                <Input
                  className={`w-full h-[30px] md:h-[44px] text-xs md:text-base border ${
                    errors.email ? "border-red-500" : "border-primary"
                  } focus:outline-none focus:border-2 bg-secondary text-primary placeholder-primary/50 rounded-xl p-4 pl-9`}
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                    // pattern: {
                    //   value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    //   message: "Invalid email address",
                    // },
                  })}
                />
                {errors.email && (
                  <p className="absolute mt-0 text-[10px] text-red-500 top-full">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="w-full flex flex-col items-start relative">
                {/* Lock Icon */}
                <CiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary" />

                {/* Password Input Field */}
                <Input
                  type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                  className={`w-full h-[30px] md:h-[44px] text-xs md:text-base border ${
                    errors.password ? "border-red-500" : "border-primary"
                  } focus:outline-none focus:border-2 bg-secondary text-primary placeholder-primary/50 rounded-xl p-4 pl-9 pr-10`} // 🔹 Added "pr-10" to create space for the eye icon
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    // minLength: {
                    //   value: 8,
                    //   message: "Password must be at least 8 characters long",
                    // },
                  })}
                />

                {/* Eye Icon for Toggle */}
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary"
                  onClick={() => setShowPassword((prev: boolean) => !prev)}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </Button>

                {/* Error Message */}
                {errors.password && (
                  <p className="absolute mt-1 text-[10px] text-red-500 top-full">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="w-full flex items-center justify-between">
                {/* Remember Me Checkbox */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    className="border-primary data-[state=checked]:bg-primary"
                  />
                  <label
                    htmlFor="remember"
                    className="text-xs text-primary font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>

                {/* Forgot Password Link */}
                <Link
                  href="/forgotpass"
                  className="text-xs text-primary underline hover:font-semibold"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <Button
                //href to /student homepage
                className="flex w-full h-[30px] md:h-[44px] items-center justify-center rounded-xl text-secondary text-xs md:text-base font-semibold"
              >
                Sign in
              </Button>
            </form>
          </FormProvider>
          {/* <div className="flex justify-center items-center w-full">
            <p className="text-xs text-primary font-normal">Or continue with</p>
          </div>
          <div className="flex justify-center items-center w-full">
            <Button
              className="flex items-center justify-center w-[200px] md:w-[280px] h-[30px] md:h-[44px] rounded-xl text-primary text-xs md:text-base font-normal gap-3 "
              variant="outline"
              onClick={() => console.log("Google Sign-Up Clicked")} // Replace with actual Google auth function
            >
              <FcGoogle className="text-red-500 w-5 h-5" />
              Google
            </Button>
          </div> */}
          <div className="flex justify-center items-center w-full flex-row gap-1">
            <p className="text-xs font-normal text-primary">
              Don't have an account?
            </p>
            <a href="/signup">
              <p className="text-xs font-semibold text-primary">SIGN UP</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
