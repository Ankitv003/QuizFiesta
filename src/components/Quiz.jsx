/* eslint-disable react/prop-types */
import { nanoid } from "nanoid";

const Quiz = (props) => {
  return (
    <div className="quiz-container">
      {props.quizData.map((quiz) => {
        return (
          <div key={nanoid()}>
            <h2>{quiz.question}</h2>
          </div>
        );
      })}
    </div>
  );
};

export default Quiz;
