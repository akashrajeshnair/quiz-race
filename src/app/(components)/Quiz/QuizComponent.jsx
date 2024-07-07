"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import MCQComponent from '@/app/(components)/Quiz/MCQComponent';
import MatchComponent from '@/app/(components)/Quiz/Match_the_FollowingComponent';
import BlankComponent from '@/app/(components)/Quiz/FillInTheBlanksComponent';
import Scoreboard from '@/app/(components)/Scoreboard/Scoreboard';
import styles from './QuizComponent.module.css';
import { useChannel } from 'ably/react';

const QuizComponent = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [waitingScreen, setWaitingScreen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20);
  const router = useRouter();

  const players = [
    { name: 'Alice', points: 50 },
    { name: 'Bob', points: 40 },
    { name: 'Charlie', points: 60 },
  ];

  const currentQuestion = questions[currentQuestionIndex];
  
  const {channel} = useChannel('quiz-channel', (message) => {
    if (message.name === 'update-question') {
      setCurrentQuestionIndex(message.data.index);
    }
    if (message.name === 'submit-answer') {
      setAnswers(message.data.answers);
    }
  });

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
    setWaitingScreen(true);
    channel.publish('submit-answer', { answers });
  };

  const goToNextQuestion = () => {
    setWaitingScreen(false);
    setShowLeaderboard(false);
    setTimeLeft(20);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      channel.publish('update-question', { index: currentQuestionIndex + 1 });
    } else {
      alert('Quiz Completed!');
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'mcq':
        return (
          <MCQComponent
            question={currentQuestion.question}
            options={currentQuestion.options}
            onSelect={(answer) => handleSelect(currentQuestionIndex, answer)}
          />
        );
      case 'match':
        return (
          <MatchComponent
            question={currentQuestion.question}
            questions={currentQuestion.questions}
            options={currentQuestion.options}
            onSelect={(matchIndex, answer) => handleMatchSelect(currentQuestionIndex, matchIndex, answer)}
            answers={answers[currentQuestionIndex] || []}
          />
        );
      case 'blank':
        return (
          <BlankComponent
            question={currentQuestion.question}
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
      handleSelect(currentQuestionIndex, null);
      handleSubmit();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  if (waitingScreen) {
    return (
      <div className={styles.waitingScreen}>
        <p>Waiting for the next question...</p>
      </div>
    );
  }

  if (showLeaderboard) {
    return (
      <div className={styles.leaderboardContainer}>
        <Scoreboard players={players} />
        <button onClick={goToNextQuestion} className={styles.nextButton}>
          Next Question
        </button>
      </div>
    );
  }

  return (
    <div className={styles.quizComponent}>
      <div className={styles.timer}>
        Time left: {timeLeft} seconds
      </div>
      {renderQuestion()}
      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit Answer
      </button>
    </div>
  );
};

export default QuizComponent;
