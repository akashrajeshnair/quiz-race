"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import MCQComponent from '@/app/(components)/Quiz/MCQComponent';
import MatchComponent from '@/app/(components)/Quiz/Match_the_FollowingComponent';
import BlankComponent from '@/app/(components)/Quiz/FillInTheBlanksComponent';
import Scoreboard from '@/app/(components)/Scoreboard/Scoreboard';
import styles from './QuizComponent.module.css';

const QuizComponent = ({ quizId }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [players, setPlayers] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (!quizId) return;

    fetch(`/api/quizzes/${quizId}`)
      .then((response) => response.json())
      .then((data) => {
        setQuiz(data);
      })
      .catch((error) => {
        console.error('Error fetching quiz:', error);
      });
  }, [quizId]);

  const currentQuestion = quiz?.Questions[currentQuestionIndex];

  const handleSelect = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleMatchSelect = (questionIndex, matchIndex, answer) => {
    const newAnswers = [...answers];
    if (!newAnswers[questionIndex]) {
      newAnswers[questionIndex] = [];
    }
    newAnswers[questionIndex][matchIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (currentQuestion.correct_answer === answers[currentQuestionIndex]) {
      setPlayerScore(playerScore + 50);
    }
    setShowLeaderboard(true);
  };

  const goToNextQuestion = () => {
    setShowLeaderboard(false);
    setTimeLeft(30);
    if (currentQuestionIndex < quiz.Questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert('Quiz Completed!');
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'MCQ':
        return (
          <MCQComponent
            question={currentQuestion.question_text}
            options={currentQuestion.options.split(',')}
            onSelect={(answer) => handleSelect(currentQuestionIndex, answer)}
          />
        );
      case 'Blank':
        return (
          <BlankComponent
            question={currentQuestion.question_text}
            answer={answers[currentQuestionIndex] || ''}
            onChange={(e) => handleSelect(currentQuestionIndex, e.target.value)}
          />
        );
      default:
        return <div>Unknown question type</div>;
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  if (!quiz) {
    return <div>Loading...</div>;
  }

  if (showLeaderboard) {
    return (
      <div className={styles.leaderboardContainer}>
        <Scoreboard players={[{ name: "Player", points: playerScore }]} />
        <button onClick={goToNextQuestion} className={styles.nextButton}>
          Next Question
        </button>
      </div>
    );
  }

  return (
    <div className={styles.quizComponent}>
      <div className={styles.timer}>Time left: {timeLeft} seconds</div>
      {renderQuestion()}
      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit Answer
      </button>
    </div>
  );
};

export default QuizComponent;
