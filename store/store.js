// store.js
import { configureStore } from '@reduxjs/toolkit';
import quizReducer from './quizSlice'; // Import your slice

const store = configureStore({
  reducer: {
    quiz: quizReducer, // Add your slice reducer here
  },
});

export default store;