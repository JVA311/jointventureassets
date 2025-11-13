"use client";

import { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiDollarSign, FiMapPin, FiClock, FiUser, FiCalendar, FiTag } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
import { useAppSelector } from "@/hooks/hooks";

type Request = {
  id: string;
//   title: string;
  description: string;
  requestType: string;
  category: string;
  budget: string;
  location: string;
  duration: string;
  fullName: string;
  createdAt: string;
  status: string;
};

export default function BrowseRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const token = useAppSelector((state) => state.auth.token)
  // Simulated data - replace with actual API call
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/request`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(response.data)
        // const mockData: Request[] = [
        //   {
        //     id: "1",
        //     title: "Need a reliable business partner for my startup",
        //     description: "Looking for a business partner to join my startup in the tech industry. Must have experience in software development and business development.",
        //     category: "Business Partner",
        //     budget: "Negotiable",
        //     location: "Lagos, Nigeria",
        //     duration: "Long-term",
        //     postedBy: "John Doe",
        //     postedDate: "2 days ago",
        //     status: "Open"
        //   },
        //   // Add more mock data as needed
        // ];
        
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load requests. Please try again later.");
        setLoading(false);
        console.error("Error fetching requests:", err);
      }
    };

    fetchRequests();
  }, []);

  const categories = ["All", "Business Partner", "Investor", "Co-founder", "Mentor"];

  const filteredRequests = requests.filter(request => {
    // const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || request.category === selectedCategory;
    // return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center p-4">
          <p className="text-lg font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Requests</h1>
          <p className="text-gray-600">Find business partners, investors, and opportunities</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search requests..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiFilter className="text-gray-400" />
              </div>
              <select
                className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.length > 0 ? (
            requests.map((request, key) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    {/* <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                      {request.requestType}
                    </span> */}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                    {request.requestType}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {request.description}
                  </p>
                  
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <FiDollarSign className="mr-2" />
                      <span>Budget: {request.budget}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiMapPin className="mr-2" />
                      <span>{request.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiClock className="mr-2" />
                      <span>Duration: {request.duration}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiUser className="mr-2" />
                      <span>Posted by: {request.fullName}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FiCalendar className="mr-2" />
                      <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {/* <div className="mt-6">
                    <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                      View Details
                    </button>
                  </div> */}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No requests found</h3>
              <p className="mt-1 text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
