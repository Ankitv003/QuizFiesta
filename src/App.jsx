import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { useState } from "react";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [error, setError] = useState(null);
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
      })
      .catch((error) => {
        console.log("Error fetching Data:", error);
        setError(error.message);
      });
  };
  return (
    <>
      <Home callQuiz={callQuiz} />
      {error ? (
        <div>Error: {error}</div> // Display error message
      ) : (
        <Quiz quizData={quizData} />
      )}
    </>
  );
}

export default App;
