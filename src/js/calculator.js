
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
let currentInput = "";
let operator = "";
let firstOperand = null;
function updateDisplay(value) {
  display.value = value;
}
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "+" || value === "-" || value === "*" || value === "/") {
      
      if (currentInput) {
        if (firstOperand === null) {
          firstOperand = parseFloat(currentInput);
        } else {
          firstOperand = calculate(
            firstOperand,
            parseFloat(currentInput),
            operator
          );
        }
        operator = value;
        currentInput = "";
        updateDisplay(firstOperand);
      }
    } else {
      
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});
function calculate(first, second, operator) {
  switch (operator) {
    case "+":
      return first + second;
    case "-":
      return first - second;
    case "*":
      return first * second;
    case "/":
      return first / second;
    default:
      return second;
  }
}
equalsButton.addEventListener("click", () => {
  if (firstOperand !== null && currentInput) {
    const result = calculate(firstOperand, parseFloat(currentInput), operator);
    updateDisplay(result);
    
    firstOperand = result;
    currentInput = "";
    operator = "";
  }
});
clearButton.addEventListener("click", () => {
  currentInput = "";
  operator = "";
  firstOperand = null;
  updateDisplay("");
});