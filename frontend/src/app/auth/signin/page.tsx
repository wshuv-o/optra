"use client"
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGoogle } from "react-icons/fa"; // React Icon for Google
import {useRouter} from "next/navigation"

const SignIn: React.FC = () => {
  const router= useRouter()
  const [email, setEmail] =useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = async () => {
    if (email && password) {
      try {
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, password })
        });
  
        if (!res.ok) {
          console.error("Login failed");
          alert("Invalid Credentials!")
          return;
        }
  
        const data = await res.json();
        if(data.access_token){
           localStorage.setItem("authToken", data.access_token);
           document.cookie = `authToken=${data.access_token}; path=/; secure; samesite=strict`;
           router.push('http://localhost:3001')
        }
        console.log("Login successful:", data);
      } catch (error) {
        console.error("Error during login:", error);
      }
    } else {
      console.error("Email and password must not be empty");
    }
  };
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-7xl flex bg-white rounded-lg shadow-lg dark:bg-gray-800 overflow-hidden">
        {/* Left Side Section */}
        <div className="w-full xl:w-1/2 p-6 xl:p-10 flex flex-col justify-center items-center bg-gray-200 dark:bg-gray-700">
          <Link href="/" className="mb-5.5 inline-block text-center">
            <Image
              className="hidden dark:block"
              src="/images/logo/logo.svg"
              alt="Logo"
              width={176}
              height={32}
            />
            <Image
              className="dark:hidden"
              src="/images/logo/logo-dark.svg"
              alt="Logo"
              width={176}
              height={32}
            />
          </Link>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
          </p>

          <div className="text-center mt-10">
            {/* Optional SVG Illustration */}
            <svg
              className="mx-auto mb-5"
              width="350"
              height="350"
              viewBox="0 0 350 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* SVG content here */}
            </svg>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full xl:w-1/2 border-l-2 border-gray-300 p-6 xl:p-10">
          <div className="w-full max-w-sm mx-auto">
            <span className="mb-1.5 block font-medium">Start for free</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign In to Optra
            </h2>

            <div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="mb-2.5 block font-medium text-gray-600 dark:text-gray-200"
                >
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary"
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="mb-2.5 block font-medium text-gray-600 dark:text-gray-200"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder="6+ Characters, 1 Capital letter"
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary"
                    onChange={(e)=>setPassword(e.target.value)}

                  />
                  <span className="absolute right-4 top-4">
                    <svg
                      className="fill-current"
                      width="22"
                      height="22"
                      viewBox="0 0 22 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.5">
                        <path
                          d="M16.1547 6.80626V5.91251C16.1547 3.16251 14.0922 0.825009 11.4797 0.618759C10.0359 0.481259 8.59219 0.996884 7.52656 1.95938C6.46094 2.92188 5.84219 4.29688 5.84219 5.70626V6.80626C3.84844 7.18438 2.33594 8.93751 2.33594 11.0688V17.2906C2.33594 19.5594 4.19219 21.3813 6.42656 21.3813H15.5016C17.7703 21.3813 19.6266 19.525 19.6266 17.2563V11C19.6609 8.93751 18.1484 7.21876 16.1547 6.80626ZM8.55781 3.09376C9.31406 2.40626 10.3109 2.06251 11.3422 2.16563C13.1641 2.33751 14.6078 3.98751 14.6078 5.91251V6.70313H7.38906V5.67188C7.38906 4.70938 7.80156 3.78126 8.55781 3.09376ZM18.1141 17.2906C18.1141 18.7 16.9453 19.8688 15.5359 19.8688H6.46094C5.05156 19.8688 3.91719 18.7344 3.91719 17.325V11.0688C3.91719 9.52189 5.15469 8.28438 6.70156 8.28438H15.2953C16.8422 8.28438 18.1141 9.52188 18.1141 11V17.2906Z"
                          fill="currentColor"
                        />
                      </g>
                    </svg>
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <button
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  onClick={()=>handleLogin()}

                > Sign In </button>
              </div>

              <button className="flex w-full items-center justify-center gap-3.5 rounded-lg border border-stroke bg-gray-300 p-4 hover:bg-opacity-50 dark:border-strokedark dark:bg-meta-4 dark:hover:bg-opacity-50">
                <FaGoogle className="text-blue-500" />
                Sign in with Google
              </button>

              <div className="mt-6 text-center">
                <p>
                  Don’t have an account?{" "}
                  <Link href="/auth/signup" className="text-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
