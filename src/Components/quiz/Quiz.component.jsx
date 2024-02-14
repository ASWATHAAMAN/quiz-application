import { useEffect, useState } from "react";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const quizApi = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
      try {
        const response = await fetch(quizApi);
        const data = await response.json();
        if (Array.isArray(data.results) && data.results.length > 0) {
          const quests = data.results.map((loadedQuestion) => {
            const formattedQuestion = {
              question: loadedQuestion.question,
            };
            formattedQuestion.answerChoices = [
              ...loadedQuestion.incorrect_answers,
            ];
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1 - 1;
            formattedQuestion.answerChoices.splice(
              formattedQuestion.answer,
              0,
              loadedQuestion.correct_answer
            );
            return formattedQuestion;
          });
          setQuestions(quests);
        } else {
          console.error("Empty or invalid data results:", data.results);
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleOptionChange = (option, questindex, index) => {
    console.log("hit");
    console.log("ind", index);
    console.log("qind", questindex);
    console.log(questions[questindex].answer);
    console.log(document.getElementById(questindex + ":" + index));
    if (index === questions[questindex].answer) {
      console.log("hitin");
      document.getElementById(option).className = "bg-green-300";
      document.getElementById(questindex + ":" + index).className =
        "accent-green-500";
      document.getElementById(questindex + "result" + index).innerHTML =
        document.getElementById(questindex + "result" + index).innerHTML +
        "      Correct Answer!";
    } else {
      document.getElementById(option).className = "bg-red-300 ";
      document.getElementById(questindex + ":" + index).className =
        "accent-red-300 ";
      document.getElementById(questindex + "result" + index).innerHTML =
        document.getElementById(questindex + "result" + index).innerHTML +
        "      Wrong Answer!";
      document.getElementById(
        questions[questindex].answerChoices[questions[questindex].answer]
      ).className = "bg-green-300";
      document.getElementById(
        questindex + ":" + questions[questindex].answer
      ).className = "accent-green-300 ";
      document.getElementById(
        questindex + "result" + questions[questindex].answer
      ).innerHTML =
        document.getElementById(
          questindex + "result" + questions[questindex].answer
        ).innerHTML + "      Correct Answer!";
    }
  };

  return (
    <>
      <div className="grid gap-[2.75rem] bg-orange-200 border-t-[3px]">
        {questions?.map((quest, questindex) => {
          return (
            <>
              <div className="border-t-[2px] border-red-950 p-[1rem]">
                <p className="text-[22px] font-bold">{quest.question}</p>
                <ul>
                  {quest.answerChoices.map((option, index) => {
                    return (
                      <>
                        <li id={option} className="">
                          <input
                            type="radio"
                            id={questindex + ":" + index}
                            name="options"
                            value={option}
                            onChange={() =>
                              handleOptionChange(option, questindex, index)
                            }
                          />
                          <label
                            id={questindex + "result" + index}
                            htmlFor={option} className="text-[18px] font-[400] px-[0.5rem]"
                          >
                            {option}
                          </label>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Quiz;
