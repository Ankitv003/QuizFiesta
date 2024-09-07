import { useState } from "react";

/* eslint-disable react/prop-types */
const Home = (props) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = () => {
    setIsButtonDisabled(true);
    props.callQuiz();

    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 6000);
  };

  return (
    <div className="home-container">
      <h1>Quiz Fiesta!</h1>
      <p> Some description</p>
      <button
        className="start-quiz"
        onClick={handleClick}
        disabled={isButtonDisabled}
      >
        {isButtonDisabled ? "Loading..." : "Start Quiz"}
      </button>
    </div>
  );
};

export default Home;
