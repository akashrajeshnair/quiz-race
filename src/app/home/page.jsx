"use client"
import styles from "@/app/home.module.css"
import { UserAuth } from "@/lib/firebase/authContext";
import { useRouter } from "next/navigation"
import ProtectedRoute from "../(components)/ProtectedRoutes/ProtectedRoutes";
import HomeComponent from "@/app/(components)/Home/HomeComponent"

const adminids = ['123', '234'];

export default function Home() {

  return (
    <ProtectedRoute>
      <HomeComponent></HomeComponent>
    </ProtectedRoute>
    )
}
