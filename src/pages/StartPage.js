import React, { useState } from 'react';
import { useRouter } from 'next/router';
import style from '../styles/Start-page.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setQuestions, setUsersEmail } from '../../store/quizSlice';

export default function StartPage(props) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const validateEmail = (email) => {
    // Simple email validation (you can use a more robust validation approach)
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const startQuiz = () => {
    if (validateEmail(email)) {
      // Send data to the store
      dispatch(setUsersEmail(email));
      dispatch(setQuestions(props.data));
      router.push('/QuizPage');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <div className={style['start-page']}>
      <h1>Welcome to the Quiz App!</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleEmailChange}
      />
      <button onClick={startQuiz}>Start Quiz</button>
    </div>
  );
}
