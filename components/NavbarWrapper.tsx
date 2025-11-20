"use client"

import { usePathname } from "next/navigation"
import Navbar from "./Navbar"

export default function NavbarWrapper() {
    const pathname = usePathname();
    const hideNav = pathname === "/login" || pathname === "/register" || pathname === "/complete-profile" || pathname === "/forgot-password" || pathname === "/forgot-password/verify-otp" || pathname === "/reset-password";

    return !hideNav ? <Navbar /> : null;
}