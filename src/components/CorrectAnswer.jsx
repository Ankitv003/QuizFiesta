// /* eslint-disable react/prop-types */

// import { useContext } from "react";
// import { QuizStartContext } from "../App";
// import Confetti from "react-confetti";
// import useWindowSize from "react-use/lib/useWindowSize";

// const CorrectAnswer = ({
//   selectedAnswers,
//   quizData,
//   shuffledAnswers,
//   resetQuiz,
// }) => {
//   const isCorrect = (question, answer) => {
//     const quiz = quizData.find((q) => q.question === question);
//     return quiz && quiz.correct_answer === answer;
//   };
//   const { width, height } = useWindowSize();

//   const { callQuiz } = useContext(QuizStartContext);

//   const score = Object.keys(selectedAnswers).reduce((acc, question) => {
//     const selectedAnswer = selectedAnswers[question];
//     const quiz = quizData.find((q) => q.question === question);
//     if (quiz && quiz.correct_answer === selectedAnswer) {
//       return acc + 1;
//     }
//     return acc;
//   }, 0);

//   return (
//     <>
//       <Confetti width={width} height={height} />
//       <div className="correct-answer">
//         <h1>Correct Answers</h1>
//         {quizData.map((quiz) => {
//           const selectedAnswer = selectedAnswers[quiz.question];
//           const answers = shuffledAnswers[quiz.question] || [];

//           return (
//             <div key={quiz.question} className="quiz-review">
//               <h2>{quiz.question}</h2>
//               <div className="quiz-buttons">
//                 {answers.map((answer) => {
//                   const isAnswerCorrect = isCorrect(quiz.question, answer);
//                   const isSelected = selectedAnswer === answer;

//                   const buttonClass = isAnswerCorrect
//                     ? "correct"
//                     : isSelected
//                     ? "wrong"
//                     : "";

//                   return (
//                     <button key={answer} className={`answers ${buttonClass}`}>
//                       {answer}
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })}

//         <h3 className="score-text">
//           You Scored {score}/{quizData.length} correct answers
//         </h3>

//         {/* New Game button */}
//         <button className="new-game-btn" onClick={resetQuiz}>
//           Start New Game
//         </button>
//       </div>
//     </>
//   );
// };

// export default CorrectAnswer;
/* eslint-disable react/prop-types */
import { useContext } from "react";
import { QuizStartContext } from "../App";
import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

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

  const { width, height } = useWindowSize();
  const { callQuiz } = useContext(QuizStartContext);

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
      {/* Render confetti if score is 3 or higher, otherwise show sad emoji animation */}
      {score >= 3 && (
        <Confetti width={width} height={height} numberOfPieces={750} />
      )}

      <div className="correct-answer">
        <h1>Correct Answers</h1>
        {quizData.map((quiz) => {
          const selectedAnswer = selectedAnswers[quiz.question];
          const answers = shuffledAnswers[quiz.question] || [];

          return (
            <div key={quiz.question} className="quiz-review">
              <h2>{quiz.question}</h2>
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
          {score < 3
            ? "nah, you are just a regular monkey 🐒!"
            : "Koko 🦍 has been found!"}
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
