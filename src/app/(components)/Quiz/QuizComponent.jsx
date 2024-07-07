"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import MCQComponent from '@/app/(components)/Quiz/MCQComponent';
import MatchComponent from '@/app/(components)/Quiz/Match_the_FollowingComponent';
import BlankComponent from '@/app/(components)/Quiz/FillInTheBlanksComponent';
import Scoreboard from '@/app/(components)/Scoreboard/Scoreboard';
import styles from './QuizComponent.module.css';

const QuizComponent = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const router = useRouter();

  const players = [
    { name: 'Alice', points: 50 },
    { name: 'Bob', points: 40 },
    { name: 'Charlie', points: 60 },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelect = (questionIndex, answer) => {
    console.log(`Selected answer for question ${questionIndex}: ${answer}`);
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
    console.log('Updated answers:', newAnswers);
  };

  const handleMatchSelect = (questionIndex, matchIndex, answer) => {
    console.log(`Selected answer for match question ${questionIndex}, match index ${matchIndex}: ${answer}`);
    const newAnswers = [...answers];
    if (!newAnswers[questionIndex]) {
      newAnswers[questionIndex] = [];
    }
    newAnswers[questionIndex][matchIndex] = answer;
    setAnswers(newAnswers);
    console.log('Updated match answers:', newAnswers);
  };

  const handleSubmit = () => {
    console.log('Answers submitted:', answers);
    setShowLeaderboard(true);
  };

  const goToNextQuestion = () => {
    console.log('Going to the next question');
    setShowLeaderboard(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      console.log('Current question index:', currentQuestionIndex + 1);
    } else {
      alert('Quiz Completed!');
      console.log('Quiz Completed!');
    }
  };

  const renderQuestion = () => {
    console.log('Rendering question:', currentQuestion);
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

  if (showLeaderboard) {
    return (
      <div className={styles.leaderboardContainer}>
        <Scoreboard players={players}></Scoreboard>
        <button onClick={goToNextQuestion} className={styles.nextButton}>
          Next Question
        </button>
      </div>
    );
  }

  return (
    <div className={styles.quizComponent}>
      {renderQuestion()}
      <button onClick={handleSubmit} className={styles.submitButton}>
        Submit Answer
      </button>
    </div>
  );
};

export default QuizComponent;
