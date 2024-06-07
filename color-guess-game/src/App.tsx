import { useEffect, useState } from "react";
import "./App.css";


enum Result {
  Correct,
  Wrong
}

function App() {
  const [color, setColor] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<Result | undefined>(undefined);

  const randomColor = () => {
    const rands = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];

    const colorR = new Array(6)
      .fill("")
      .map(() => rands[Math.floor(Math.random() * rands.length)]) // Returns a random integer from 0 to 16(The length of the rands)
      .join("");

    return `#${colorR}`;
  };

  const pickColor = () => {
    const randomColorValue = randomColor();
    setColor(randomColorValue);
    setAnswers( //buttons to display. 
      [randomColorValue, randomColor(), randomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  //The useEffect runs everytime the component is mounted or updated
  useEffect(() => {
    pickColor();
  }, []);

  const checkAnswer = (answer: string) => {
    if (answer === color) {
      setResult(Result.Correct);
      pickColor();
    } else {
      setResult(Result.Wrong);
    }
  };

  return (
    <div className="app">
      <div className="guess-me" style={{ backgroundColor: color }}></div>

      {/* Random Buttons */}
      <div className="btns">
        {answers.map((answer) => (
          <button onClick={() => checkAnswer(answer)} key={answer}>
            {answer}
          </button>
        ))}
      </div>

      {result === Result.Wrong && <p className="wrong">Wrong</p>}
      {result === Result.Correct  && <p className="correct">Correct</p>}
    </div>
  );
}

export default App;
