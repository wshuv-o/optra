"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

const SignUp: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Step 1: Handle user sign up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== rePassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await axios.post("http://localhost:3000/auth/signup/", {
        name,
        email,
        password,
        confirm_pass:rePassword
      });
      if (response.status===201) {
        alert(response.data.message)
        setStep(2);
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError("Error signing up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle OTP verification
  const handleOTPVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const response = await axios.post("http://localhost:3000/auth/verify-otp/", {
        email,
        otp,
      });
      if (response.data.message) {
        alert("Signup complete! Welcome to Optra!");
        // Redirect or handle success here
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Error verifying OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
      <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
        {step === 1 ? (
          <form onSubmit={handleSignUp}>
            <span className="mb-1.5 block font-medium">Start for free</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Sign Up to Optra
            </h2>

            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Re-type Password
              </label>
              <input
                type="password"
                placeholder="Re-enter your password"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            >
              {loading ? "Signing up..." : "Create Account"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOTPVerify}>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Verify Your Email
            </h2>

            <div className="mb-4">
              <label className="mb-2.5 block font-medium text-black dark:text-white">
                Enter OTP sent to {email}
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
            >
              {loading ? "Verifying OTP..." : "Verify & Complete Signup"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          {step === 1 ? (
            <p>
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-primary">
                Sign in
              </Link>
            </p>
          ) : (
            <p>
              Didn’t receive an OTP?{" "}
              <button
                className="text-primary underline"
                onClick={() => setStep(1)}
              >
                Resend
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
