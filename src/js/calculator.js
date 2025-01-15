const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
let currentInput = "";
function updateDisplay(value) {
  display.value = value;
}
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");
    if (value === "+" || value === "-" || value === "*" || value === "/") {
      if (currentInput && !isOperator(currentInput.slice(-1))) {
        currentInput += value; // Append operator
        updateDisplay(currentInput);
      }
    } else {
      currentInput += value;
      updateDisplay(currentInput);
    }
  });
});
function isOperator(char) {
  return char === "+" || char === "-" || char === "*" || char === "/";
}
function evaluateExpression(expression) {
  const tokens = expression.match(/(\d+\.?\d*|\+|\-|\*|\/)/g); 
  const values = [];
  const operators = [];
  const precedence = (op) => {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    return 0;
  };
  const applyOperator = () => {
    const right = values.pop();
    const left = values.pop();
    const operator = operators.pop();
    switch (operator) {
      case "+":
        values.push(left + right);
        break;
      case "-":
        values.push(left - right);
        break;
      case "*":
        values.push(left * right);
        break;
      case "/":
        values.push(left / right);
        break;
    }
  };
  for (const token of tokens) {
    if (!isNaN(token)) {
      values.push(parseFloat(token));
    } else {
      while (operators.length && precedence(operators[operators.length - 1]) >= precedence(token)) {
        applyOperator();
      }
      operators.push(token);
    }
  }
  while (operators.length) {
    applyOperator();
  }
  return values[0];
}
equalsButton.addEventListener("click", () => {
  if (currentInput) {
    const result = evaluateExpression(currentInput);
    updateDisplay(result); 
    currentInput = result.toString();
  }
});
clearButton.addEventListener("click", () => {
  currentInput = "";
  updateDisplay("");
});
