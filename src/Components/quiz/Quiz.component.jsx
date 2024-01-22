import { useEffect, useState } from "react";

const Quiz = () => {
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const quizApi = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
      try {
        const response = await fetch(quizApi);
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {apiData.results.map((result) => {
        let options = result.incorrect_answers;
        options.push(result.correct_answer)
        const randomNumbers = Math.trunc(Math.random() * options.length)
        options[randomNumbers]
        return (
          <div key={result.response_code}>
            <p>{result.question}</p>
            <input type="radio" id="optOne"/>
<label htmlFor="optOne">{result.}</label>
          </div>
        );
      })}
    </>
  );
};

export default Quiz;
