/* eslint-disable react/prop-types */
const CorrectAnswer = ({ selectedAnswers, quizData, shuffledAnswers }) => {
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
        const answers = shuffledAnswers[quiz.question] || [];

        return (
          <div key={quiz.question} className="quiz-review">
            <h2>{quiz.question}</h2>
            <div className="quiz-buttons">
              {answers.map((answer) => {
                const isAnswerCorrect = isCorrect(quiz.question, answer);
                const isSelected = selectedAnswer === answer;

                // Highlight the correct answer with "correct" class
                // Highlight the selected wrong answer with "wrong" class
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
    </div>
  );
};

export default CorrectAnswer;
