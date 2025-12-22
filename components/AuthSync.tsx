"use client"

import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { setCredentials } from "@/store/authSlice"
import axios from "axios"
import { AppDispatch } from "@/store/store"
import { useSession, signOut } from "next-auth/react"
import toast from "react-hot-toast"

export default function AuthSync() {
  const { data: session, status } = useSession()
  const dispatch = useDispatch<AppDispatch>()
  
  // Prevent multiple runs per session
  const hasSynced = useRef(false)

  useEffect(() => {
    // Only sync once when fully authenticated
    if (status !== "authenticated" || !session || hasSynced.current) return

    hasSynced.current = true // mark as synced

    const syncUser = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
          { googleEmail: session.user?.email },
          { headers: { "Content-Type": "application/json" } }
        )

        dispatch(
          setCredentials({
            user: response.data.user,
            token: response.data.token,
          })
        )
        
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data?.message)
          console.error("Sync error:", error)
          await signOut({ redirect: false })
        }
      }
    }

    syncUser()
  }, [session, status, dispatch])

  return null
}
