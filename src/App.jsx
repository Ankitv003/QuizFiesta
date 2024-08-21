import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { useState } from "react";

function App() {
  const [quizData, setQuizData] = useState([]);

  const callQuiz = () => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        return setQuizData(data.results);
      });
  };
  return (
    <>
      <Home callQuiz={callQuiz} />
      <Quiz quizData={quizData} />
    </>
  );
}

export default App;
