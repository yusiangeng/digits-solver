import { useState } from "react";
import "./App.css";
import { solve } from "./solver";

function App() {
  const [target, setTarget] = useState("");
  const [numbers, setNumbers] = useState("");
  const [result, setResult] = useState("");

  function handleClick() {
    if (target.trim() === "" || numbers.trim() === "") {
      alert("Please fill in target and numbers!");
      return;
    }

    const solveTarget = parseFloat(target);
    if (!isValidNumber(solveTarget)) {
      alert("Target must be a non-negative integer!");
      return;
    }

    const solveNumbers = numbers
      .split(" ")
      .filter((numString) => numString.length > 0)
      .map((numString) => parseFloat(numString));
    if (solveNumbers.length > 6) {
      alert("Can only have at most 6 numbers!");
      return;
    }
    if (solveNumbers.some((num) => !isValidNumber(num))) {
      alert("Numbers must be non-negative integers!");
      return;
    }

    const solution = solve(solveTarget, solveNumbers);
    if (solution.length === 0) {
      setResult("No solution found :(");
    } else {
      setResult("Solution:\n" + solution.join("\n"));
    }
  }

  return (
    <div>
      <h1>Digits Solver</h1>
      <div style={{ margin: 8 }}>
        <label>Target </label>
        <input value={target} onChange={(e) => setTarget(e.target.value)} />
      </div>
      <div style={{ margin: 8 }}>
        <label>Numbers separated by space </label>
        <input type="text" value={numbers} onChange={(e) => setNumbers(e.target.value)} />
      </div>
      <button style={{ margin: 8 }} onClick={handleClick}>
        Solve
      </button>
      <pre>{result}</pre>
    </div>
  );
}

export default App;

function isValidNumber(num: number) {
  return !isNaN(num) && Number.isInteger(num) && num >= 0;
}
