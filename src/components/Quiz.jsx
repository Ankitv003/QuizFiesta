/* eslint-disable react/prop-types */
import { nanoid } from "nanoid";

const Quiz = (props) => {
  return (
    <>
      {props.quizData.map((quiz) => {
        return (
          <div key={nanoid()}>
            <h2>{quiz.question}</h2>
          </div>
        );
      })}
    </>
  );
};

export default Quiz;
