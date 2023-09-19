import React, { useState, useEffect } from "react";
import "./styles.css";

const QUIZ_API_BASE_URL = "https://api.frontendexpert.io/api/fe/quiz";

export default function App() {
  const [data, setData] = useState([]);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await fetch(QUIZ_API_BASE_URL);
    const data = await res.json();
    await setData(data);
    console.log(data);
  }
  const currentQuestion = data[currentQuestionIndex];

  const updateChosenAnswers = (currentQuestionIndex, optionIndex) => {
    const newChosenAnswer = [...chosenAnswers];

    newChosenAnswer[currentQuestionIndex] = optionIndex;
    setChosenAnswers(newChosenAnswer);
  };
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === data.length - 1;
  console.log("isLastQuestion=" + chosenAnswers[currentQuestionIndex]);
  return (
    <>
      <div>
        <h1>{currentQuestion?.question}</h1>
        <div>
          {currentQuestion?.answers.map((options, index) => {
            //console.log(currentQuestionIndex)
            const chAns = chosenAnswers[currentQuestionIndex];
            console.log("chAns=" + chAns);
            console.log("index=" + index);
            let className = "answer";
            if (chAns === index) {
              className +=
                currentQuestion.correctAnswer === chAns
                  ? " correct"
                  : " incorrect";
            }

            return (
              <h2
                className={className}
                onClick={() => {
                  if (chAns != null) return;
                  updateChosenAnswers(currentQuestionIndex, index);
                }}
              >
                {options}
              </h2>
            );
          })}
          <button
            disabled={isFirstQuestion}
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          >
            Back
          </button>
          <button
            disabled={
              isLastQuestion ||
              chosenAnswers[currentQuestionIndex] === undefined
            }
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
