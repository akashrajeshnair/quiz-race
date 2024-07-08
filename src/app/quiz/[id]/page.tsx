// app/page.js (or app/index.js)
"use client"
import React from 'react';
import QuizComponent from '../../(components)/Quiz/QuizComponent';
import ProtectedRoute from '../../(components)/ProtectedRoutes/ProtectedRoutes'
import { usePathname } from 'next/navigation';

const questions = [
  {
    type: 'mcq',
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Rome', 'Berlin'],
  },
  {
    type: 'match',
    question: 'Match the countries to their capitals.',
    questions: ['France', 'England', 'Italy'],
    options: ['Paris', 'London', 'Rome'],
  },
  {
    type: 'blank',
    question: 'The capital of Germany is _____',
    answer: '',
  },
];

export default function Quizzes() {
  const path = usePathname();
  console.log(path)

  function getLastSegment(inputString : string|null) {
    // Split the string by '/' and return the last element
    const segments = inputString?.split('/');
    return segments?.pop();
  }
  
  // Example usage:
  const inputString = path
  const slug = getLastSegment(inputString);
  console.log(slug); // Outputs: "text"
  

  return (
    <div>
      <ProtectedRoute>
        <QuizComponent quizId={slug}/>
      </ProtectedRoute>
    </div>
  );
}
