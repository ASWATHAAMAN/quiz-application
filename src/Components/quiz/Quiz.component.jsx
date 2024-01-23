import { useEffect, useState } from "react";

const Quiz = () => {
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const quizApi = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
      try {
        const response = await fetch(quizApi);
        const data = await response.json();

        if (Array.isArray(data.results) && data.results.length > 0) {
          setApiData(data.results);
        } else {
          console.error("Empty or invalid data.results:", data.results);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {apiData?.map((result,index) => {
        let options = result.incorrect_answers;
        options.push(result.correct_answer);
        const randomNumbers = Math.trunc(Math.random() * options.length);
        options[randomNumbers];
        return (
          <div key={index}>
            <p>{result.question}</p>
            <input type="radio" id="optOne" />
          </div>
        );
      })}
    </>
  );
};

export default Quiz;
