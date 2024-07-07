// app/page.js (or app/index.js)
import QuizComponent from '@/app/(components)/Quiz/QuizComponent';
import ProtectedRoute from '@/app/(components)/ProtectedRoutes/ProtectedRoutes'

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

export default function Home() {
  return (
    <div>
      <ProtectedRoute>
        <QuizComponent questions={questions} />
      </ProtectedRoute>
    </div>
  );
}
