import React from "react";
import { useSelector } from "react-redux";
import styles from "../styles/Report-page.module.css";

export default function ReportPage() {
  const answeredQuestions = useSelector((state) => state.quiz.answers);
  const questions = useSelector((state) => state.quiz.questions);
  const correctAnswer = Array.isArray(questions.initialData) && questions?.initialData?.map((item) => item?.correct_answer) || [];

  const calculateScore = () => {
    if (correctAnswer.length === 0) {
      return 0;
    }

    let correctCount = 0;
    for (let i = 0; i < correctAnswer.length; i++) {
      if (correctAnswer[i] === answeredQuestions[i]) {
        correctCount++;
      }
    }

    return ((correctCount / correctAnswer.length) * 100).toFixed(2);
  };

  return (
    <div className={styles["report-page"]}>
      <h1 className={styles["heading"]}>Quiz Report</h1>
      <div className={styles["report-container"]}>
        <div className={styles["score"]}>Score: {calculateScore()}%</div>
        <h2>Questions Report:</h2>
        <ul className={styles["question-report-list"]}>
          {Array.isArray(questions.initialData) && questions.initialData.map((item, index) => (
            <li
              key={index}
              className={`${styles["question-report"]} ${
                answeredQuestions[index] === correctAnswer[index]
                  ? styles["correct"]
                  : styles["incorrect"]
              }`}
            >
              <div className={styles["question-text"]}>{item.question}</div>
              <div className={styles["answer-text"]}>
                Your Answer: {answeredQuestions[index]}
              </div>
              <div className={styles["answer-text"]}>
                Correct Answer: {correctAnswer[index]}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
