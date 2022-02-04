import React, { useState } from "react";
import Calculator from "../Calculator/calculator";
import "./logics.css";

const Logics = () => {
  const [currentDisplay, setCurrentDisplay] = useState("");
  const [outputDisplay, setOutputDisplay] = useState("");
  const [prevOutput, setPrevOutput] = useState(0);
  const [isComputed, setIsComputed] = useState(false);

  const addOperand = (value) => {
    if (isComputed) {
      setCurrentDisplay(value);
      setOutputDisplay(value);
      setIsComputed(false);
      return;
    }
    // Check to see if zero needs to be added or not at the beginning.
    if (
      (currentDisplay === "" && value === "0") ||
      (currentDisplay === "0" && value === "0")
    ) {
      setCurrentDisplay("0");
      setOutputDisplay(outputDisplay + "0");
      return;
    }

    // If the current number is zero and not a decimal replace with whole number.

    if (currentDisplay === "0" && value !== "0") {
      setCurrentDisplay(value);
      setOutputDisplay(value);
    }

    // Default add onto current number.
    setCurrentDisplay(currentDisplay + value);
    setOutputDisplay(outputDisplay + value);
  };

  const addOperator = (e) => {
    const listener = e.target.textContent;
    let currentOperand = outputDisplay;
    if (isComputed) {
      currentOperand = prevOutput.toString();
      setIsComputed(false);
    }
    // Checks if the last digit on the formula is a negative.
    if (currentOperand.slice(currentOperand.length - 1) === "-") {
      // If negative and the operator is a negative removes the negative.
      if (listener === "-") {
        setOutputDisplay(currentOperand.slice(0, currentOperand.length - 1));
        setCurrentDisplay("");
        return;
      }
      // Checks if there is an operator before the negative.
      // Will remove the negative and change the operator to new operator.
      switch (
        currentOperand.slice(
          currentOperand.length - 2,
          currentOperand.length - 1
        )
      ) {
        case "+":
        case "/":
        case "*":
          setOutputDisplay(
            currentOperand.slice(0, currentOperand.length - 2) + listener
          );
          return;
        default:
          break;
      }
    }

    // If the operator is a negative do:
    // Empty formula insert a negative.
    if (listener === "-") {
      if (currentDisplay === "" && currentOperand === "") {
        setOutputDisplay("-");
        setCurrentDisplay("-");
        return;
      }
      // Is there a operator already at the end of the formula insert a negative to formula.
      switch (currentOperand.slice(currentOperand.length - 1)) {
        case "+":
          setOutputDisplay(currentOperand + listener);
          setCurrentDisplay("-");
          return;
        case "/":
          setOutputDisplay(currentOperand + listener);
          setCurrentDisplay("-");
          return;
        case "*":
          setOutputDisplay(currentOperand + listener);
          setCurrentDisplay("-");
          return;
        default:
          break;
      }
    }
    // If operator not a negative and the current formula is empty or just a negative returns.
    if (currentOperand === "" || currentOperand === "-") return;
    // Current number is empty, checks if there is an operator already there and will replace.
    if (currentDisplay === "") {
      switch (currentOperand.slice(currentOperand.length - 1)) {
        case "-":
        case "+":
        case "/":
        case "*":
          setOutputDisplay(
            currentOperand.slice(0, currentOperand.length - 1) + listener
          );
          return;
        default:
          break;
      }
    }
    // If there is a negative no need to add another operator after it.
    if (currentOperand.slice(currentOperand.length - 1) === "-") return;
    // Default updates formula and resets input to empty string.
    setOutputDisplay(currentOperand + listener);
    setCurrentDisplay("");
  };

  const compute = () => {
    setIsComputed(true);
    let computedFormula;
    // Trys the formula with eval and will error out if output is empty or eval fails.
    try {
      switch (outputDisplay) {
        case "":
          computedFormula = "ERROR";
          break;
        default:
          // eslint-disable-next-line
          computedFormula = eval(outputDisplay);
      }
    } catch {
      computedFormula = "ERROR";
    }
    // If computedFormula errors outputs error message and returns.
    if (computedFormula === "ERROR") {
      setCurrentDisplay(computedFormula);
      setOutputDisplay(computedFormula);
      setPrevOutput(0);
      return;
    }
    // Default updates display and sets prevOutput to the computedFormula.
    setCurrentDisplay(computedFormula.toString());
    setOutputDisplay(`${outputDisplay}=${computedFormula}`);
    setPrevOutput(computedFormula);
  };

  const clear = () => {
    setOutputDisplay("");
    setCurrentDisplay("");
    setPrevOutput(0);
  };

  const addDot = (e) => {
    const listener = e.target.textContent;
    if (isComputed) {
      addOperand("0.");
      return;
    }
    if (currentDisplay.includes(".")) return;
    if (currentDisplay === "") {
      addOperand("0.");
      return;
    }
    addOperand(listener);
  };

  const addButtonClick = (input) => {
    const listener = input.target.textContent;
    addOperand(listener);
  };

  return (
    <div className="calculator-container">
      <div className="displays-container">
        <div className="output-display"><p>{outputDisplay}</p></div>
        <div className="input-display" id="display"> <p>
          {(currentDisplay === "") & (outputDisplay === "")
            ? "0"
            : currentDisplay}
            </p>
        </div>
      </div>
      <Calculator
        addButtonClick={addButtonClick}
        addDot={addDot}
        clear={clear}
        compute={compute}
        addOperator={addOperator}
      />
    </div>
  );
};

export default Logics;
