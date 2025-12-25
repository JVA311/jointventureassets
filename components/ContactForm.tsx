"use client"

import { useAppSelector } from "@/hooks/hooks";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import axios from "axios";
import { FiArrowRight } from "react-icons/fi";
import { Spinner } from "./Spinner";

const cardVariants: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function ContactForm() {
    const [loading, setLoading] = useState<boolean>(false);
    const [successMsg, setSuccessMsg] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [formData, setFormData] = useState({
        fullName: "",
        emailAddress: "",
        phoneNumber: "",
        consultationType: "",
        subject: "",
        message: "",
    });
    const token = useAppSelector((state) => state.auth.token);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      try {
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/contact/create`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log(response.data);
        setSuccessMsg(response.data.message);
        
        // Reset form
        setFormData({
          fullName: "",
          emailAddress: "",
          phoneNumber: "",
          consultationType: "",
          subject: "",
          message: "",
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMsg("");
        }, 5000);
        
      } catch (error: unknown) {
        console.error("Error submitting form:", error);
        if (axios.isAxiosError(error)) {
          setErrorMsg(error.response?.data?.message || "Something went wrong. Please try again.");
        } else {
          setErrorMsg("Something went wrong. Please try again.");
        }
        
        // Clear error message after 5 seconds
        setTimeout(() => {
          setErrorMsg("");
        }, 5000);
        
      } finally {
        setLoading(false);
      }
    }

    return (
        <div className="flex-1">
          <motion.form
            className="bg-white rounded-xl shadow p-7 flex flex-col gap-5"
            variants={cardVariants}
            whileHover={{ boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)" }}
            onSubmit={handleSubmit}
            
          >
            <h2 className="font-bold text-lg text-gray-900 mb-2">Send us a Message</h2>
            
            {(errorMsg || successMsg) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`${
                  errorMsg
                    ? "bg-red-50 border-2 border-red-300 text-red-800"
                    : "bg-green-50 border-2 border-green-300 text-green-800"
                } px-5 py-4 rounded-xl text-sm font-medium shadow-sm mb-4`}
              >
                <div className="flex justify-center items-center gap-3">
                  <span className="flex-1 text-sm">{errorMsg || successMsg}</span>
                </div>
              </motion.div>
            )}
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="fullName" className="font-medium text-gray-700">Full Name *</label>
                <input 
                  id="fullName" 
                  name="fullName"
                  type="text" 
                  required 
                  value={formData.fullName}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400" 
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="emailAddress" className="font-medium text-gray-700">Email Address *</label>
                <input 
                  id="emailAddress" 
                  name="emailAddress"
                  type="email" 
                  required 
                  value={formData.emailAddress}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400" 
                />
              </div>
            </div>
            <div className="flex sm:flex-row flex-col gap-4">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="phoneNumber" className="font-medium text-gray-700">Phone Number</label>
                <input 
                  id="phoneNumber" 
                  name="phoneNumber"
                  type="tel" 
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400" 
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="consultationType" className="font-medium text-gray-700">Consultation Type</label>
                <select 
                  id="consultationType" 
                  name="consultationType"
                  value={formData.consultationType}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400"
                >
                  <option value="">Select an option</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Landowner Consultation">Landowner Consultation</option>
                  <option value="Investor/Developer Consultation">Investor/Developer Consultation</option>
                  <option value="Mandate Consultation">Mandate Consultation</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="subject" className="font-medium text-gray-700">Subject *</label>
              <input 
                id="subject" 
                name="subject"
                type="text" 
                required 
                value={formData.subject}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400" 
                placeholder="e.g. Joint Venture Consultation Request" 
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-medium text-gray-700">Message *</label>
              <textarea 
                id="message" 
                name="message"
                required 
                rows={4} 
                value={formData.message}
                onChange={handleChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-yellow-400" 
                placeholder="Tell us about your project, requirements, or questions..." 
              />
            </div>
            <motion.button
              type="submit"
              className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 group overflow-hidden relative transition-colors duration-300 ${
                loading 
                  ? 'bg-gray-800 text-white cursor-wait' 
                  : 'bg-yellow-500 text-gray-900 hover:cursor-pointer hover:bg-yellow-400'
              }`}
              whileHover={!loading ? { 
                scale: 1.02,
                boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.5)"
              } : {}}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              {loading ? (
                <span className="relative z-10 flex items-center gap-2">
                  <Spinner />
                </span>
              ) : (
                <>
                  <span className="relative z-10">Send Message</span>
                  <motion.span
                    className="relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut",
                    }}
                  >
                    <FiArrowRight size={20} />
                  </motion.span>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
    )
}