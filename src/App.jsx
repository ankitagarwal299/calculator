import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [operand, setOperand] = useState("");
  const [result, setResult] = useState(null);

  const buttons = [
    { label: "C", type: "clear", color: "red" },
    { label: "+-", type: "negate", color: "gray" },
    { label: "%", type: "percent", color: "gray" },
    { label: "/", type: "operand", color: "orange", callback: (num1, num2) => num1 / num2 },
    { label: "7", type: "number", color: "black" },
    { label: "8", type: "number", color: "black" },
    { label: "9", type: "number", color: "black" },
    { label: "X", type: "operand", color: "orange", callback: (num1, num2) => num1 * num2 },
    { label: "4", type: "number", color: "black" },
    { label: "5", type: "number", color: "black" },
    { label: "6", type: "number", color: "black" },
    { label: "-", type: "operand", color: "orange", callback: (num1, num2) => num1 - num2 },
    { label: "1", type: "number", color: "black" },
    { label: "2", type: "number", color: "black" },
    { label: "3", type: "number", color: "black" },
    { label: "+", type: "operand", color: "orange", callback: (num1, num2) => num1 + num2 },
    { label: "0", type: "number", color: "black" },
    { label: ".", type: "number", color: "black" },
    { label: "=", type: "equal", color: "orange" },
  ];

  const handleClick = (button) => {
    switch (button.type) {
      case "clear":
        setNumber1("");
        setNumber2("");
        setOperand("");
        setResult(null);
        break;
      case "negate":
        if (number2 !== "") {
          setNumber2((prev) => (parseFloat(prev) * -1).toString());
        } else if (number1 !== "" && operand === "") {
          setNumber1((prev) => (parseFloat(prev) * -1).toString());
        }
        break;
      case "percent":
        if (number2 !== "") {
          setNumber2((prev) => (parseFloat(prev) / 100).toString());
        } else if (number1 !== "" && operand === "") {
          setNumber1((prev) => (parseFloat(prev) / 100).toString());
        }
        break;
      case "operand":
        setOperand(button.label);
        if (number1 !== "") {
          setNumber2("");
        }
        break;
      case "equal":
        if (operand && number2 !== "") {
          const operation = buttons.find(btn => btn.label === operand)?.callback;
          if (operation) {
            const computation = operation(parseFloat(number1), parseFloat(number2));
            setResult(computation);
            setNumber1(computation.toString());
            setNumber2("");
            setOperand("");
          }
        }
        break;
      case "number":
        if (operand === "") {
          setNumber1((prev) => prev + button.label);
        } else {
          setNumber2((prev) => prev + button.label);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1 className="header">Calculator UI</h1>
      <div className='calculator-container'>
        <input
          type="text"
          value={result !== null ? result : (number2 !== "" ? number2 : number1)}
          readOnly
        />
        <div className="btn-container">
          {buttons.map((button, index) => (
            <Button key={index} button={button} handleClick={handleClick} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Button({ button, handleClick }) {
  return (
    <button
      className='btn'
      onClick={() => handleClick(button)}
      style={{ backgroundColor: button.color }}
    >
      {button.label}
    </button>
  );
}
