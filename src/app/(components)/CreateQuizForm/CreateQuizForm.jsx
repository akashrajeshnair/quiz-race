// pages/createQuiz.js
"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CreateQuizForm.module.css'; // Import CSS module

export default function CreateQuiz() {
  const router = useRouter();
  const [quizData, setQuizData] = useState({
    title: '',
    description: '',
    questions: []
  });

  const handleAddQuestion = () => {
    setQuizData(prevState => ({
      ...prevState,
      questions: [...prevState.questions, {
        question_text: '',
        answer: '',
        options: '',
        type: ''
      }]
    }));
  };

  const handleChangeQuestion = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index][field] = value;
    setQuizData(prevState => ({
      ...prevState,
      questions: updatedQuestions
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/createQuiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quizData)
      });

      if (response.ok) {
        const createdQuiz = await response.json();
        console.log('Created quiz:', createdQuiz);
        router.push(`/quiz/${createdQuiz.q_id}`); // Redirect to the quiz page after creation
      } else {
        console.error('Failed to create quiz:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <div className={styles.container}> {/* Apply container class */}
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}> {/* Apply formGroup class */}
          <label>Title:
            <input type="text" value={quizData.title} onChange={(e) => setQuizData({ ...quizData, title: e.target.value })} required />
          </label>
        </div>
        <div className={styles.formGroup}> {/* Apply formGroup class */}
          <label>Description:
            <textarea value={quizData.description} onChange={(e) => setQuizData({ ...quizData, description: e.target.value })} required />
          </label>
        </div>
        <button type="button" className={styles.formGroup} onClick={handleAddQuestion}>Add Question</button>
        {quizData.questions.map((question, index) => (
          <div key={index} className={styles.formGroup}> {/* Apply formGroup class */}
            <label>Question Text:
              <input type="text" value={question.question_text} onChange={(e) => handleChangeQuestion(index, 'question_text', e.target.value)} required />
            </label>
            <br />
            <label>Answer:
              <input type="text" value={question.answer} onChange={(e) => handleChangeQuestion(index, 'answer', e.target.value)} required />
            </label>
            <br />
            <label>Options (comma-separated):
              <input type="text" value={question.options} onChange={(e) => handleChangeQuestion(index, 'options', e.target.value)} />
            </label>
            <br />
            <label>Type:
              <input type="text" value={question.type} onChange={(e) => handleChangeQuestion(index, 'type', e.target.value)} required />
            </label>
            <br />
          </div>
        ))}
        <button type="submit" className={styles.formGroup}>Create Quiz</button>
      </form>
    </div>
  );
}
