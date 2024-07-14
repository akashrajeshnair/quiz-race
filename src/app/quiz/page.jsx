// pages/quizzes.js

"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../(components)/ProtectedRoutes/ProtectedUserRoutes'
import styles from './quizzes.module.css';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/quizzes')
      .then((response) => response.json())
      .then((data) => setQuizzes(data))
      .catch((error) => console.error('Error fetching quizzes:', error));
  }, []);

  const startQuiz = (id) => {
    router.push(`/quiz/${id}`);
  };

  return (
    <ProtectedRoute>
    <div className={styles.container}>
      <h1>Available Quizzes</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) => (
            <tr key={quiz.q_id}>
              <td>{quiz.title}</td>
              <td>{quiz.description}</td>
              <td>
                <button onClick={() => startQuiz(quiz.q_id)} className={styles.button}>
                  Start Quiz
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </ProtectedRoute>
  );
};

export default Quizzes;
