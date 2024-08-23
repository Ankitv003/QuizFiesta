import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { useState } from "react";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [error, setError] = useState(null);
  const [showquiz, setShowQuiz] = useState(false);

  const callQuiz = () => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`HTTP Error! status: ${resp.status}`);
        }
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        setQuizData(data.results);
        setError(null);
        setShowQuiz(true);
      })
      .catch((error) => {
        console.log("Error fetching Data:", error);
        setError(error.message);
      });
  };
  return (
    <>
      {showquiz ? (
        error ? (
          <div>Error: {error}</div>
        ) : (
          <Quiz quizData={quizData} />
        )
      ) : (
        <Home callQuiz={callQuiz} />
      )}
    </>
  );
}

export default App;
