'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { UserAuth } from "@/lib/firebase/authContext";

export default function Logout() {
  const { user, logout } = UserAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/')
      console.log("logged out!")
    } catch(err) {
      console.error(err);
    }
  }

  console.log(user)

  return (
    <div className="logout-page">
      <button onClick={handleLogout}>Logout</button>
      <style jsx>{`
        .logout-page {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }
        h1 {
          font-size: 24px;
          color: #333;
        }
      `}</style>
    </div>
  );
}
