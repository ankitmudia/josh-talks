import React, { useEffect, useState } from "react";
import styles from "../styles/Quiz-page.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setAnswers } from "../../store/quizSlice";

export default function QuizPage() {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const data = useSelector((state) => state.quiz.questions);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timer, setTimer] = useState(1800); // 30 minutes in seconds
  const router = useRouter();
  const dispatch = useDispatch();

  const setQuestionsData = (data) => {
    if (data && data.initialData) {
      const newQuestions = data.initialData.map((item) => ({
        question: item.question,
        options: [...item.incorrect_answers, item.correct_answer],
        correctOption: item.correct_answer,
        selectedOption: null,
      }));
      setQuestions(newQuestions);
      setSelectedAnswers(new Array(newQuestions.length).fill(null));
      setSelectedOptions(new Array(newQuestions.length).fill(null));
    }
  };

  useEffect(() => {
    setQuestionsData(data);
  }, [data]);

  const handleOptionClick = (optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[selectedQuestionIndex].selectedOption = optionIndex;
    setQuestions(updatedQuestions);

    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[selectedQuestionIndex] = optionIndex;
    setSelectedAnswers(updatedAnswers);

    const updatedOptions = [...selectedOptions];
    updatedOptions[selectedQuestionIndex] =
      questions[selectedQuestionIndex].options[optionIndex];
    setSelectedOptions(updatedOptions);
  };

  const handleSubmit = () => {
    if (selectedAnswers.includes(null)) {
      alert("Please answer all questions before submitting.");
    } else {
      router.push("/ReportPage");
      dispatch(setAnswers(selectedOptions));
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (timer === 0) {
      router.push("/ReportPage");
      dispatch(setAnswers(selectedOptions));
    }
  }, [timer]);

  return (
    <div className={styles["quiz-page"]}>
      <div className={styles["timer"]}>{formatTime(timer)}</div>
      <div className={styles["quiz-container"]}>
        <div className={styles["question-nav"]}>
          Instructions:
        </div>
        <div className={styles["question"]}>
          1. All Questions are Mandatory. <br/>
          2. If question Attempted then black color. <br/>
          3. If visited but not Attempted then red color. <br/>
          4. If on question tab then green color. <br/>
          4. Finish all 15 Questions before timer on the right ends. <br/>
        </div>
      </div>
      <h1 className={styles["heading"]}>Quiz Questions</h1>
      <div className={styles["quiz-container"]}>
        <div className={styles["question-nav"]}>
          {questions.map((_, index) => (
            <div
              key={index}
              className={`${styles["question-number"]} ${
                selectedQuestionIndex === index
                  ? styles["selected"]
                  : index < selectedQuestionIndex
                  ? selectedAnswers[index] !== null
                    ? styles["visited"]
                    : styles["unanswered"]
                  : ""
              }`}
              onClick={() => setSelectedQuestionIndex(index)}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <div className={styles["question"]}>
          {questions.length > 0 && questions[selectedQuestionIndex]?.question}
        </div>
        <ul className={styles["answer-options"]}>
          {questions.length > 0 &&
            questions[selectedQuestionIndex]?.options.map(
              (option, optionIndex) => (
                <li
                  key={optionIndex}
                  className={`${styles["answer-option"]} ${
                    questions[selectedQuestionIndex].selectedOption ===
                    optionIndex
                      ? styles["selected"]
                      : ""
                  }`}
                  onClick={() => handleOptionClick(optionIndex)}
                >
                  {option}
                </li>
              )
            )}
        </ul>
        <button className={styles["submit-button"]} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
