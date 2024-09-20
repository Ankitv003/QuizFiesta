import Home from "./components/Home";
import Quiz from "./components/Quiz";
import { createContext, useState } from "react";

const QuizStartContext = createContext();
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
      <QuizStartContext.Provider value={{ callQuiz }}>
        {showquiz ? (
          error ? (
            <div>Error: {error}</div>
          ) : (
            <Quiz quizData={quizData} callQuiz={callQuiz} />
          )
        ) : (
          <Home callQuiz={callQuiz} />
        )}
      </QuizStartContext.Provider>
    </>
  );
}

export default App;
export { QuizStartContext };
