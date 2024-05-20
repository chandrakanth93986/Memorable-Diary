"use client";

import "./login.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import logo from "../../../../public/logo.webp";
import Image from "next/image";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import SigninWithGoogle from "@/components/SignInWithGoogle";

const Login = () => {
  const router = useRouter();
  const [err, setErr] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // useEffect(() => {
  //   console.log(session);
  //   console.log(session.data?.user?.email);
  // }, [session]);

  const handleFormSubmit = async (data) => {
    console.log(data);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.email,
        password: data.password,
      });
      console.log(result);
      if (result?.error) {
        setErr(result?.error)
        return toast.error('Login Failed!')
      }
      if (result?.url) {
        toast.success('Login Successful!')
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center">
      <div className="h-screen flex flex-col items-center justify-center mx-auto md:mx-4">
        {err.length > 0 && (
          <p className="text-red-500 text-center mb-4 text-xl">{err}</p>
        )}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="b min-w-96 min-h-[50%] bg-diary text-white p-8 rounded-xl"
        >
          <div className="text-center mb-5">
            <Image
              src={logo}
              width={150}
              height={150}
              alt="Logo"
              className="r rounded-full block m-auto"
            />
            <h1 className="text-3xl text-yellow-300">Login</h1>
          </div>
          <div>
            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="email">Email/Username</label>
              <input
                type="text"
                className="rounded-md w-full p-2 text-black"
                placeholder="test@gmail.com"
                {...register("email", { required: true })}
              />
              {errors.email?.type === "required" && (
                <p className="text-amber-200">*Email/Username is required!</p>
              )}
            </div>

            <div className="flex flex-col gap-1 mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="rounded-md w-full p-2 text-black"
                placeholder="password"
                {...register("password", { required: true })}
              />
              {errors.password?.type === "required" && (
                <p className="text-amber-200">*Password is Required!</p>
              )}
            </div>
            <div className="text-center mt-8">
              <button
                type="submit"
                className="px-4 py-2 bg-amber-300 text-diary rounded-md"
              >
                Login
              </button>
            </div>

            <SigninWithGoogle />
          </div>
        </form>
      </div>

      <div className="reg md:w-[75%] md:h-screen rounded-tl-full"></div>
    </div>
  );
};

export default Login;
