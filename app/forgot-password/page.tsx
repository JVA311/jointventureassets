"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiArrowLeft, FiMail } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Spinner } from "@/components/Spinner";

// Reuse the same animation variants from login page
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
} as const;

const inputFocusVariants = {
  focus: {
    scale: 1.02,
    transition: { type: "spring" as const, stiffness: 300, damping: 20 },
  },
  blur: {
    scale: 1,
  },
} as const;

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Replace with your actual API endpoint
      const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/password/otp`, { email });
      
      setSuccess(response.data.message);

      router.push(`/forgot-password/verify-otp?email=${encodeURIComponent(email)}`);
      
    } catch (error: unknown) {
      console.error("Error sending reset email:", error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Something went wrong. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setError("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <motion.div
        className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-yellow-500/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="p-8">
          <div className="flex items-center mb-8">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-full hover:bg-yellow-500/10 mr-4 transition-colors"
              aria-label="Go back"
            >
              <FiArrowLeft className="w-5 h-5 text-yellow-500" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Reset Password</h1>
          </div>

          <motion.p 
            className="text-gray-600 mb-8"
            variants={itemVariants}
          >
            Enter your email address and we'll send you a link to reset your password.
          </motion.p>

          {error && (
            <motion.div
              className="mb-6 p-4 bg-red-900/10 text-red-500 border border-red-500/30 rounded-xl text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {error}
            </motion.div>
          )}

          {success ? (
            <motion.div
              className="mb-6 p-4 bg-green-900/10 text-green-500 border border-green-500/30 rounded-xl text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {success}
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <motion.div
                  className="relative"
                  variants={inputFocusVariants}
                  animate={focused ? "focus" : "blur"}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-yellow-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-700 bg-gray-800 text-white rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    placeholder="you@example.com"
                  />
                </motion.div>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-3 px-4 border border-yellow-500/30 rounded-xl shadow-sm text-sm font-medium 
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 
                    transition-colors duration-200 disabled:opacity-70
                    ${loading 
                    ? 'bg-gray-800 text-white cursor-wait' 
                    : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400 cursor-pointer'
                    }`}
                >

                  {loading ? (
                    <Spinner />
                  ) : (
                    "Send Reset Link"
                  )}
                </button>
              </motion.div>
            </form>
          )}

          <motion.div 
            className="mt-6 text-center text-sm"
            variants={itemVariants}
          >
            <p className="text-gray-300">
              Remember your password?{' '}
              <Link 
                href="/login" 
                className="font-medium text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                Back to login
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
