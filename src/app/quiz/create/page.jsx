"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserAuth } from '@/lib/firebase/authContext';
import { storage } from '@/lib/firebase/firebase'; // Make sure to import Firebase storage
import { ref, uploadBytes, getDownloadURL, updateMetadata } from 'firebase/storage'; // Firebase storage functions
import styles from './createquiz.module.css';

const defaultOptions = ['1', '2', '3', '4'];

export default function CreateQuiz() {
  const router = useRouter();
  let { user } = UserAuth();
  user = user.uid;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [quizNum, setQuizNum] = useState();

  useEffect(() => {
    fetch('/api/numberOfQuizzes')
      .then((response) => response.json())
      .then((data) => {console.log(data); setQuizNum(data)})
      .catch((error) => console.error('Error fetching quizzes:', error));
  }, [])

  const handleAddQuestion = (type) => {
    if (type === 'MCQ' || type === 'MCQMedia') {
      setQuestions([...questions, { type, question: '', options: [...defaultOptions], answer: '', media: [], mediaLink: '' }]);
    } else {
      setQuestions([...questions, { type, question: '', answer: '' }]);
    }
  };

  const handleChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleMediaChange = async (index, file, option) => {
    const newQuestions = [...questions];
    if (!newQuestions[index].media){
      newQuestions[index].media = [];
    }
    console.log(file.name)
    newQuestions[index].media[option] = file;
    setQuestions(newQuestions);
    console.log(questions);
  };

  const uploadMedia = async (qIndex) => {
    const newQuestions = [...questions];
    let count = 0
    for (let media in newQuestions[qIndex].media) {
      const storageRef = ref(storage, 'media/' + (quizNum+ 1) + "/" + qIndex + "/" + newQuestions[qIndex].media[count].name);
      // const newMetadata = {
      //   contentType: 'image/jpeg'
      // }
      await uploadBytes(storageRef, newQuestions[qIndex].media[count]);
      const downloadURL = await getDownloadURL(storageRef);
      if (newQuestions[qIndex].mediaLink === "")
        newQuestions[qIndex].mediaLink = downloadURL;
      else
        newQuestions[qIndex].mediaLink = newQuestions[qIndex].mediaLink + "," + downloadURL;
      count++;
    }
    setQuestions(newQuestions)
    console.log(newQuestions[qIndex].mediaLink)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/createquiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, questions, user }),
    });
    if (res.ok) {
      // Handle successful submission
      console.log('Quiz created successfully');
      router.push('/quiz/start');
    } else {
      // Handle error
      console.error('Error creating quiz');
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>Create a Quiz</h1>
        <label className={styles.label}>
          Quiz Name:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={styles.label}>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            required
          />
        </label>
        <div className={styles.questions}>
          {questions.map((q, index) => (
            <div key={index} className={styles.question}>
              <label className={styles.label}>
                Question:
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => handleChange(index, 'question', e.target.value)}
                  className={styles.input}
                  required
                />
              </label>
              {q.type === 'MCQ' && (
                <div className={styles.options}>
                  {q.options.map((option, oIndex) => (
                    <label key={oIndex} className={styles.label}>
                      Option {oIndex + 1}:
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                        className={styles.input}
                        required
                      />
                    </label>
                  ))}
                </div>
              )}
              {q.type === 'MCQMedia' && (
                <>
                  <div className={styles.options}>
                    {q.options.map((option, oIndex) => (
                      
                      <label key={oIndex} className={styles.label}>
                        Option {oIndex + 1}:
                        <input
                          type="file"
                          onChange={(e) => handleMediaChange(index, e.target.files[0], oIndex)}
                          className={styles.input}
                          accept="image/*,video/*"
                        />
                      </label>
                      
                    ))}
                    <button type='button' onClick={() => uploadMedia(index)}>Upload Media</button>
                  </div>
                </>
              )}
              <label className={styles.label}>
                Answer:
                <input
                  type="text"
                  value={q.answer}
                  onChange={(e) => handleChange(index, 'answer', e.target.value)}
                  className={styles.input}
                  required
                />
              </label>
            </div>
          ))}
        </div>
        <div className={styles.addQuestionButtons}>
          <button type="button" onClick={() => handleAddQuestion('MCQ')} className={styles.button}>
            Add MCQ
          </button>
          <button type="button" onClick={() => handleAddQuestion('MCQMedia')} className={styles.button}>
            Add MCQ with Media
          </button>
          <button type="button" onClick={() => handleAddQuestion('Blank')} className={styles.button}>
            Add Fill in the Blanks
          </button>
        </div>
        <button type="submit" className={styles.submitButton} onClick={(e) => handleSubmit(e)}>Submit Quiz</button>
      </form>
    </div>
  );
}
