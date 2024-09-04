/* eslint-disable react/prop-types */
// import { nanoid } from "nanoid";
// import { useState } from "react";

// const Quiz = (props) => {
//   const [answer, setAnswer] = useState(false);

//   const correctAnswer = () => {
//     console.log("you are correct!");
//   };
//   const wrongAnswer = () => {
//     console.log("Wrong answer");
//   };

//   return (
//     <div className="quiz-container">
//       {props.quizData.map((quiz) => {
//         return (
//           <div className="quiz-info" key={nanoid()}>
//             <h2 className="quiz-question">{quiz.question}</h2>
//             <div className="quiz-buttons">
//               <button onClick={correctAnswer} className="answers correct">
//                 {quiz.correct_answer}
//               </button>
//               <button onClick={wrongAnswer} className="answers wrong">
//                 {quiz.incorrect_answers[0]}
//               </button>
//               <button onClick={wrongAnswer} className="answers wrong">
//                 {quiz.incorrect_answers[1]}
//               </button>
//               <button onClick={wrongAnswer} className="answers wrong">
//                 {quiz.incorrect_answers[2]}
//               </button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Quiz;

import { nanoid } from "nanoid";
import { useState } from "react";

const Quiz = (props) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerClick = (questionId, answer) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [questionId]: answer,
    }));
  };

  const isCorrect = (questionId, answer) => {
    const quiz = props.quizData.find((q) => q.question === questionId);
    return quiz && quiz.correct_answer === answer;
  };

  return (
    <div className="quiz-container">
      {props.quizData.map((quiz) => {
        const selectedAnswer = selectedAnswers[quiz.question];

        return (
          <div className="quiz-info" key={nanoid()}>
            <h2 className="quiz-question">{quiz.question}</h2>
            <div className="quiz-buttons">
              {[quiz.correct_answer, ...quiz.incorrect_answers].map(
                (answer) => {
                  const isSelected = selectedAnswer === answer;
                  const isAnswerCorrect = isCorrect(
                    quiz.question,
                    selectedAnswer
                  );

                  return (
                    <button
                      key={nanoid()}
                      onClick={() => handleAnswerClick(quiz.question, answer)}
                      className={`answers ${
                        isSelected
                          ? isAnswerCorrect
                            ? "correct"
                            : "wrong"
                          : ""
                      }`}
                      disabled={!!selectedAnswer}
                    >
                      {answer}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        );
      })}
      <button className="show-answers">Show Answers</button>
    </div>
  );
};

export default Quiz;
