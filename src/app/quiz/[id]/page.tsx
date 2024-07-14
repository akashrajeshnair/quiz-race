// app/page.js (or app/index.js)
"use client"
import React from 'react';
import QuizComponent from '../../(components)/Quiz/QuizComponent';
import ProtectedRoute from '../../(components)/ProtectedRoutes/ProtectedUserRoutes'
import { UserAuth } from '@/lib/firebase/authContext';
import { usePathname } from 'next/navigation';
import styles from '@/app/quiz/[id]/quiz.module.css'

export default function Quizzes() {
  const {user} = UserAuth();
  const path = usePathname();
  console.log(path)

  function getLastSegment(inputString : string|null) {
      const segments = inputString?.split('/');
      return Number(segments?.pop()); // Ensure the last segment is converted to an integer
  }
  
  // Example usage:
  const inputString = path
  const slug = getLastSegment(inputString);
  console.log(slug); // Outputs: "text"
  console.log(user.userid)
  

  return (
    <div>
      <ProtectedRoute>
        <div className={styles.container}>
        <QuizComponent quizId={slug} userId={user.uid}/>
        </div>
      </ProtectedRoute>
    </div>
  );
}
