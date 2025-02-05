"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const SignIn: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      try {
        const res = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!res.ok) {
          alert("Invalid Credentials!");
          return;
        }

        const data = await res.json();
        if (data.access_token) {
          localStorage.setItem("authToken", data.access_token);
          document.cookie = `authToken=${data.access_token}; path=/; secure; samesite=strict`;
          router.push("http://localhost:3001");
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Sign In to Optra</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              placeholder="6+ Characters, 1 Capital letter"
              className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-opacity-90 transition"
            onClick={handleLogin}
          >
            Sign In
          </button>

          <button className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-200 transition">
            <FaGoogle />
            Sign in with Google
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-primary font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
