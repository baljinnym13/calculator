const resultInput = document.querySelector(".result");

let currentInput = "";
let firstValue = null;
let operation = "";

function updateDisplay() {
  resultInput.value = currentInput;
}

function clearCalculator() {
  currentInput = "";
  firstValue = null;
  operation = "";
  updateDisplay();
}

function handleNumber(num) {
  currentInput += num;
  updateDisplay();
}

function handleOperation(op) {
  if (currentInput === "") return;

  if (firstValue === null) {
    firstValue = parseFloat(currentInput);
  } else {
    firstValue = calculate(firstValue, parseFloat(currentInput), operation);
  }

  operation = op;
  currentInput = "";
  updateDisplay();
}

function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return b;
  }
}

function handleEquals() {
  if (firstValue !== null && currentInput !== "") {
    currentInput = calculate(
      firstValue,
      parseFloat(currentInput),
      operation
    ).toString();
    firstValue = null;
    operation = "";
    updateDisplay();
  }
}

// Event listeners for buttons
document.querySelectorAll(".btn-info").forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;

    if (!isNaN(buttonText) || buttonText === ".") {
      handleNumber(buttonText);
    } else if (buttonText === "C") {
      clearCalculator();
    } else if (buttonText === "=") {
      handleEquals();
    } else {
      handleOperation(buttonText);
    }
  });
});
