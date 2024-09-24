/* eslint-disable react/prop-types */

import Confetti from "react-confetti";
import { useEffect, useState } from "react";

const CorrectAnswer = ({
  selectedAnswers,
  quizData,
  shuffledAnswers,
  resetQuiz,
}) => {
  const isCorrect = (question, answer) => {
    const quiz = quizData.find((q) => q.question === question);
    return quiz && quiz.correct_answer === answer;
  };

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: Math.max(
          document.documentElement.scrollHeight,
          window.innerHeight
        ),
      });
    };

    // Update the size on component mount and window resize
    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const score = Object.keys(selectedAnswers).reduce((acc, question) => {
    const selectedAnswer = selectedAnswers[question];
    const quiz = quizData.find((q) => q.question === question);
    if (quiz && quiz.correct_answer === selectedAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  return (
    <>
      {/* Render confetti if score is 3 or higher */}
      {score >= 3 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={750}
        />
      )}

      <div className="correct-answer">
        {quizData.map((quiz) => {
          const selectedAnswer = selectedAnswers[quiz.question];
          const answers = shuffledAnswers[quiz.question] || [];

          return (
            <div key={quiz.question} className="quiz-review">
              <h3>{quiz.question}</h3>
              <div className="quiz-buttons">
                {answers.map((answer) => {
                  const isAnswerCorrect = isCorrect(quiz.question, answer);
                  const isSelected = selectedAnswer === answer;

                  const buttonClass = isAnswerCorrect
                    ? "correct"
                    : isSelected
                    ? "wrong"
                    : "";

                  return (
                    <button key={answer} className={`answers ${buttonClass}`}>
                      {answer}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        <h3 className="score-text">
          You Scored {score}/{quizData.length} correct answers,
          {score < 3 ? (
            <>
              &nbsp;Nah, you&#39;re just a regular monkey 🐒!
              <p>P.S. Score more than 3 for a special surprise!</p>
            </>
          ) : (
            " Koko 🦍 has been found!"
          )}
        </h3>

        {/* New Game button */}
        <button className="new-game-btn" onClick={resetQuiz}>
          Start New Game
        </button>
      </div>
    </>
  );
};

export default CorrectAnswer;
