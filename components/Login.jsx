"use client";
import React, { useState } from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./LandingPage/Button";
import { useAuth } from "@/context/AuthContext";

const fugaz = Fugaz_One({ subsets: ["latin"], weight: ["400"] });

export default function Login() {
  // State variables for email, password, registration mode, and authentication status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  // Extracting signup and login functions from the useAuth hook
  const { signup, login } = useAuth();

  // Async function to handle form submission for both login and registration
  async function handleSubmit() {
    // Validation for email, password, and password length
    if (!email || !password || password.length < 6) {
      return;
    }
    // Setting authentication status to true
    setAuthenticating(true);
    try {
      // Conditional logic to determine whether to call signup or login based on isRegister state
      if (isRegister) {
        console.log("Sining Up a new user");
        await signup(email, password);
      } else {
        console.log("Logging in existing user");
        await login(email, password);
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Setting authentication status back to false after the operation
      setAuthenticating(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-4">
      <h3 className={`text-4xl sm:text-5xl md:text-6xl ${fugaz.className}`}>
        {isRegister ? "Register" : "Login"}
      </h3>
      <p>You&#39;re one step away!</p>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="max-w-[400px] w-full mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600"
        type="text"
        placeholder="Email"
      />

      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="max-w-[400px] w-full mx-auto px-3 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none duration-200 hover:border-indigo-600 focus:border-indigo-600"
        type="text"
        placeholder="Password"
      />

      <div className="max-w-[400px] w-full mx-auto">
        <Button text={authenticating ? "Submitting" : "Submit"} clickHandler={handleSubmit} full/>
      </div>
      <p className="text-center">
        {isRegister ? "Already have an account ?" : "Don't have an account ? "}
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-indigo-600"
        >
          {isRegister ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
