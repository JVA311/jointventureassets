import { useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/hooks/hooks";

interface RequestItem {
  _id: string;
  userId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  budget: string;
  timeline: string;
  requestType: string;
  description: string;
  documents: string[];
  createdAt: string;
  updatedAt: string;
}

interface UseSearchRequestsResult {
  data: RequestItem[] | null;
  loading: boolean;
  error: string | null;
  searchRequests: (type?: string) => Promise<void>;
}

export const useSearchRequests = (): UseSearchRequestsResult => {
  const [data, setData] = useState<RequestItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = useAppSelector((state) => state.auth.token);

  const searchRequests = async (type?: string) => {
    try {
      setLoading(true);
      setError(null);

      // Construct query param
      const queryParam = type ? `?requestType=${type}` : "";

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/request/search${queryParam}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data.data || []);
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "An error occurred while fetching requests";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, searchRequests };
};
