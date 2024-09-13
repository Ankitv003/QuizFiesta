/* eslint-disable react/prop-types */
// const CorrectAnswer = () => {
//   return (
//     <div className="correct-answer">
//       <h1>hello from correct answer</h1>
//     </div>
//   );
// };

// export default CorrectAnswer;

const CorrectAnswer = ({ selectedAnswers, quizData }) => {
  // Helper to determine if the selected answer is correct
  const isCorrect = (question, answer) => {
    const quiz = quizData.find((q) => q.question === question);
    return quiz && quiz.correct_answer === answer;
  };

  return (
    <div className="correct-answer">
      <h1>Correct Answers</h1>
      {quizData.map((quiz) => {
        const selectedAnswer = selectedAnswers[quiz.question];
        const isAnswerCorrect = isCorrect(quiz.question, selectedAnswer);

        return (
          <div key={quiz.question} className="quiz-review">
            <h2>{quiz.question}</h2>
            <p>
              Your answer:{" "}
              <span className={isAnswerCorrect ? "correct" : "wrong"}>
                {selectedAnswer}
              </span>
            </p>
            {!isAnswerCorrect && (
              <p>
                Correct answer:{" "}
                <span className="correct">{quiz.correct_answer}</span>
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CorrectAnswer;
