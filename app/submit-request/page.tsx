"use client";

import { motion } from "framer-motion";
import { FiArrowRight, FiUpload, FiX } from "react-icons/fi";
import { useState } from "react";
import Link from "next/link";
import axios from "axios"
import { useAppSelector } from "@/hooks/hooks";
import { Spinner } from "@/components/Spinner";

// Animation variants
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
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
} as const;

const inputFocusVariants = {
  focus: {
    scale: 1.01,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
  blur: {
    scale: 1,
  },
} as const;

export default function SubmitRequestPage() {
  interface FormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    requestType: "land" | "development" | "partnership" | "other";
    location: string;
    budget: string;
    timeline: string;
    description: string;
    files: File[];
  }

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    requestType: "land",
    location: "",
    budget: "",
    timeline: "",
    description: "",
    files: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const token = useAppSelector(state => state.auth.token)
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...newFiles],
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = new FormData();

    // Append text fields
    submitData.append("fullName", formData.fullName);
    submitData.append("email", formData.email);
    submitData.append("phoneNumber", formData.phoneNumber);
    submitData.append("requestType", formData.requestType);
    submitData.append("location", formData.location);
    submitData.append("budget", formData.budget);
    submitData.append("timeline", formData.timeline);
    submitData.append("description", formData.description);

    formData.files.forEach((file) => {
      submitData.append("documents", file); 
    });

    try {
      setIsSubmitting(true)
      setSubmitSuccess(false)
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/request/create`, submitData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      setIsSubmitting(false)
      setSubmitSuccess(true)
    } catch (error) {
      setIsSubmitting(false)
      setSubmitSuccess(false)
      console.log(error)
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4">
        <motion.div
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Request Submitted Successfully!
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Thank you for submitting your request. Our team will review your
            information and get back to you within 24-48 hours.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-full transition-colors duration-200"
          >
            Return to Home
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Submit Your Request
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to submit your land or development
            opportunity. Our team will review your request and get back to you
            shortly.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          variants={itemVariants}
          whileHover={{
            y: -5,
            transition: { type: "spring", stiffness: 300, damping: 15 },
          }}
        >
          <div className="p-6 sm:p-8 md:p-10">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Name and Email */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <motion.div
                      variants={inputFocusVariants}
                      animate={focusedField === "name" ? "focus" : "blur"}
                      className="relative"
                    >
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("fullName")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400"
                        placeholder="John Doe"
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <motion.div
                      variants={inputFocusVariants}
                      animate={focusedField === "email" ? "focus" : "blur"}
                      className="relative"
                    >
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400"
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <motion.div
                    variants={inputFocusVariants}
                    animate={focusedField === "phone" ? "focus" : "blur"}
                    className="relative"
                  >
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("phoneNumber")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400"
                      placeholder="+1 (555) 000-0000"
                    />
                  </motion.div>
                </motion.div>

                {/* Location, Budget, Timeline */}
                <motion.div
                  variants={itemVariants}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <motion.div
                      variants={inputFocusVariants}
                      animate={focusedField === "location" ? "focus" : "blur"}
                      className="relative"
                    >
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("location")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400"
                        placeholder="e.g. Lagos, Nigeria"
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget
                    </label>
                    <motion.div
                      variants={inputFocusVariants}
                      animate={focusedField === "budget" ? "focus" : "blur"}
                      className="relative"
                    >
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("budget")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400"
                        placeholder="e.g. $50,000"
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timeline
                    </label>
                    <motion.div
                      variants={inputFocusVariants}
                      animate={focusedField === "timeline" ? "focus" : "blur"}
                      className="relative"
                    >
                      <input
                        type="text"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        onFocus={() => setFocusedField("timeline")}
                        onBlur={() => setFocusedField(null)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400"
                        placeholder="e.g. 6 months"
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Request Type */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Request Type <span className="text-red-500">*</span>
                  </label>
                  <motion.div
                    variants={inputFocusVariants}
                    animate={focusedField === "requestType" ? "focus" : "blur"}
                    className="relative"
                  >
                    <select
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("requestType")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400"
                    >
                      <option value="land">Land</option>
                      <option value="development">Development</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </motion.div>
                </motion.div>

                {/* Description */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <motion.div
                    variants={inputFocusVariants}
                    animate={focusedField === "description" ? "focus" : "blur"}
                    className="relative"
                  >
                    <textarea
                      name="description"
                      required
                      rows={5}
                      value={formData.description}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("description")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 resize-none"
                      placeholder="Tell us about your project or opportunity..."
                    />
                  </motion.div>
                </motion.div>

                {/* File Upload */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Documents (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
                    <div className="space-y-1 text-center">
                      <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="document"
                            type="file"
                            multiple
                            className="sr-only"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, JPG, PNG up to 10MB
                      </p>
                    </div>
                  </div>

                  {formData.files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Selected files:
                      </p>
                      <ul className="space-y-2">
                        {formData.files.map((file, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                          >
                            <span className="text-sm text-gray-600 truncate max-w-xs">
                              {file.name}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(index)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <FiX className="w-5 h-5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants} className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl text-base font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none hover:cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed bg-gray-800" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <Spinner />
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Submit Request
                        <FiArrowRight className="ml-2 w-5 h-5" />
                      </span>
                    )}
                  </button>
                </motion.div>
              </div>
            </form>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 text-center text-sm text-gray-500"
          variants={itemVariants}
        >
          <p>
            Have questions?{" "}
            <Link
              href="/contact"
              className="text-yellow-600 hover:text-yellow-700 font-medium"
            >
              Contact our team
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
