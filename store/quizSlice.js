// quizSlice.js
import {createSlice} from '@reduxjs/toolkit';

const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        questions: [],
        usersEmail: '',
        answers: []
    },
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
        },
        setUsersEmail: (state, action) => {
            state.usersEmail = action.payload;
        },
        setAnswers: (state, action) => {
            state.answers = action.payload;
        }
    }
});

export const {setQuestions, setUsersEmail, setAnswers} = quizSlice.actions;

export default quizSlice.reducer;
