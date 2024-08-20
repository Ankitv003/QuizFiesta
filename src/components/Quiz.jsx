// import { useEffect } from "react";

// const Quiz = () => {
//   useEffect(() => {
//     fetch("https://opentdb.com/api.php?amount=5&type=multiple")
//       .then((resp) => resp.json())
//       .then((data) => console.log(data));
//   });
// };

// export default Quiz;

import { useEffect.useSt } from "react";

const Quiz = () => {

  const[quizData,setQuizData]=([])
  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&type=multiple&token=28f0e1e962a4f649b0fad76bb8b4f257720605cceea956ce67cbbe31aed9b1ee"
    )
      .then((resp) => resp.json())
      .then((data) => { 
        return(
          
        console.log(data)
        
      ) 
      })
  }, []);
  return (
    <div>
      <h1>quiz </h1>
    </div>
  );
};

export default Quiz;
