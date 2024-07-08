"use client"
import ProtectedRoute from "../(components)/ProtectedRoutes/ProtectedRoutes";
import HomeComponent from "@/app/(components)/Home/HomeComponent"


export default function Home() {

  return (
    <ProtectedRoute>
      <HomeComponent></HomeComponent>
    </ProtectedRoute>
    )
}
