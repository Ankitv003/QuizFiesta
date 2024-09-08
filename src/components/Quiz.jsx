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

// import { nanoid } from "nanoid";
// import { useState } from "react";

// const Quiz = (props) => {
//   const [selectedAnswers, setSelectedAnswers] = useState({});

//   const handleAnswerClick = (questionId, answer) => {
//     setSelectedAnswers((prevSelectedAnswers) => ({
//       ...prevSelectedAnswers,
//       [questionId]: answer,
//     }));
//   };

//   const isCorrect = (questionId, answer) => {
//     const quiz = props.quizData.find((q) => q.question === questionId);
//     return quiz && quiz.correct_answer === answer;
//   };

//   return (
//     <div className="quiz-container">
//       {props.quizData.map((quiz) => {
//         const selectedAnswer = selectedAnswers[quiz.question];

//         return (
//           <div className="quiz-info" key={nanoid()}>
//             <h2 className="quiz-question">{quiz.question}</h2>
//             <div className="quiz-buttons">
//               {[quiz.correct_answer, ...quiz.incorrect_answers].map(
//                 (answer) => {
//                   const isSelected = selectedAnswer === answer;
//                   const isAnswerCorrect = isCorrect(
//                     quiz.question,
//                     selectedAnswer
//                   );

//                   return (
//                     <button
//                       key={nanoid()}
//                       onClick={() => handleAnswerClick(quiz.question, answer)}
//                       className={`answers ${
//                         isSelected
//                           ? isAnswerCorrect
//                             ? "correct"
//                             : "wrong"
//                           : ""
//                       }`}
//                       disabled={!!selectedAnswer}
//                     >
//                       {answer}
//                     </button>
//                   );
//                 }
//               )}
//             </div>
//           </div>
//         );
//       })}
//       <button className="show-answers">Show Answers</button>
//     </div>
//   );
// };

// export default Quiz;
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

// Function to decode HTML entities
const decodeHtmlEntities = (text) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
};

// Function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Quiz = (props) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState({});

  // Shuffle and decode answers for each quiz question when the quiz data is loaded
  useEffect(() => {
    const shuffled = {};
    props.quizData.forEach((quiz) => {
      const decodedQuestion = decodeHtmlEntities(quiz.question);
      const decodedCorrectAnswer = decodeHtmlEntities(quiz.correct_answer);
      const decodedIncorrectAnswers =
        quiz.incorrect_answers.map(decodeHtmlEntities);

      const answers = shuffleArray([
        decodedCorrectAnswer,
        ...decodedIncorrectAnswers,
      ]);
      shuffled[decodedQuestion] = answers;

      // Update quiz data with decoded question and answers
      quiz.question = decodedQuestion;
      quiz.correct_answer = decodedCorrectAnswer;
      quiz.incorrect_answers = decodedIncorrectAnswers;
    });
    setShuffledAnswers(shuffled);
  }, [props.quizData]);

  // Handle answer click for each question
  const handleAnswerClick = (question, answer) => {
    setSelectedAnswers((prevSelectedAnswers) => ({
      ...prevSelectedAnswers,
      [question]: answer,
    }));
  };

  // Check if the answer is correct
  const isCorrect = (question, answer) => {
    const quiz = props.quizData.find((q) => q.question === question);
    return quiz && quiz.correct_answer === answer;
  };

  // Check if all questions have been answered
  const allQuestionsAnswered =
    Object.keys(selectedAnswers).length === props.quizData.length;

  return (
    <div className="quiz-container">
      {props.quizData.map((quiz) => {
        const selectedAnswer = selectedAnswers[quiz.question];
        const answers = shuffledAnswers[quiz.question] || [];

        return (
          <div className="quiz-info" key={nanoid()}>
            <h2 className="quiz-question">{quiz.question}</h2>
            <div className="quiz-buttons">
              {answers.map((answer, index) => {
                const isSelected = selectedAnswer === answer;
                const isAnswerCorrect = isCorrect(quiz.question, answer);

                let buttonClass = "";
                if (showAnswers) {
                  buttonClass = isAnswerCorrect
                    ? "correct"
                    : isSelected
                    ? "wrong"
                    : "";
                } else if (isSelected) {
                  buttonClass = isAnswerCorrect ? "correct" : "wrong";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(quiz.question, answer)}
                    className={`answers ${buttonClass}`}
                    disabled={!!selectedAnswer || showAnswers} // Disable when answer is selected or when showing answers
                  >
                    {answer}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Show Answers Button */}
      <button
        className="show-answers"
        onClick={() => setShowAnswers(true)} // Set to show answers when clicked
        disabled={!allQuestionsAnswered} // Disable until all questions are answered
      >
        Show Answers
      </button>
    </div>
  );
};

export default Quiz;
