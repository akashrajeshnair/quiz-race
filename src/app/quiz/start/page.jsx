// pages/quizzes.js

"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedUserRoute from '../../(components)/ProtectedRoutes/ProtectedUserRoutes'
import styles from '../quizzes.module.css';
import { startQuiz, stopQuiz } from '../../../lib/firebase/database';

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [updates, setUpdates] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchQuizzes = async () => {
      fetch('/api/getAllQuizzes')
      .then((response) => response.json())
      .then((data) => {console.log(data); setQuizzes(data)})
      .catch((error) => console.error('Error fetching quizzes:', error));
    }
    fetchQuizzes();
  }, [quizzes]);

  const incrementUpdate = () => {
    setUpdates((prev) => prev++)
  }

  const startQuizEvent = async (id) => {
    try{
        await startQuiz(id);

        const res = fetch('/api/startQuiz', {
            method: "PUT",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({q_id: id})
        })
        setTimeout(router.refresh(), 1000);
        console.log(updates);
        incrementUpdate();
      } catch (err) {
        console.error(err);
      }
  };

  const stopQuizEvent = async (id) => {
    try{
      await stopQuiz(id);

      const res = fetch('/api/stopQuiz', {
          method: "PUT",
          headers: { 'Content-Type' : 'application/json' },
          body: JSON.stringify({q_id: id})
      })
      setTimeout(router.refresh(), 1000);
      console.log(updates);
      setUpdates((prev) => prev+1);
    } catch (err) {
      console.error(err);
    }
  }

  const deleteQuiz = async (id) => {
    try{
        const res = fetch('/api/deletequiz', {
            method: "DELETE",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({q_id: id})
        })

        if (res.error) {
          alert("Error while deleting: Quiz has Statistics associated with it!")
        }
        setTimeout(router.refresh(), 1000);
        console.log(updates);
        setUpdates((prev) => prev+1);
      } catch (err) {
        console.error(err);
      }
  };

  return (
    <ProtectedUserRoute>
    <div className={styles.container}>
      <h1>Available Quizzes</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.sort((a,b) => (a.q_id - b.q_id)).map((quiz) => (
            <tr key={quiz.q_id}>
              <td>{quiz.title}</td>
              <td>{quiz.description}</td>
              <td>{
                quiz.RunningStatus ?
                <button onClick={() => stopQuizEvent(quiz.q_id)} className={styles.button}>
                  Stop Quiz
                </button> :
                <button onClick={() => startQuizEvent(quiz.q_id)} className={styles.button}>
                  Start Quiz
                </button>
                }
              </td>
              <td>
                <button onClick={() => deleteQuiz(quiz.q_id)} className={styles.button}>
                  Delete Quiz
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </ProtectedUserRoute>
  );
};

export default Quizzes;
