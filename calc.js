const container = document.querySelector("#container");
const operandsDisplay = document.querySelector("#operands");
const operationDisplay = document.querySelector("#operation");
const dotButton = document.querySelector("#buttonDot");

let operand1 = "";
let operand2 = "";
let operator = null;

const OPERATORS = {
    "+": "Pls",
    "−": "Min",
    "×": "Mult",
    "÷": "Div",
}


function add(a, b) {
    return a + b;
}


function subtract(a, b) {
    return a - b;
}


function multiply(a, b) {
    return a * b;
}


function divide(a, b) {
    return a / b;
}

function operate(op, a, b) {
    switch(op) {
        case "+":
            return add(a, b);
        case "−":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
        default:
            return add(a, b);
    }
}

function clearData() {
    operand1 = "";
    operand2 = "";
    operator = null;
    dotButton.disabled = false;
}

function clearDisplays() {
    operandsDisplay.textContent = "";
    operationDisplay.textContent = "";
}

function writeDigit(value) {
    let noSpaceAvailable = operandsDisplay.textContent.length >= 9;

    if(value === ".") {
        dotButton.disabled = true;
    }

    if(noSpaceAvailable) {
        return;
    }

    if(!operator) {
        operand1 = operand1 + value;
        operandsDisplay.textContent = operand1;
    } else {
        operand2 = operand2 + value;
        operandsDisplay.textContent = operand2;
    }
}

function removeDigit() {
    if(operandsDisplay.textContent.length > 0) {
        let digits = Array.from(operandsDisplay.textContent);
        digits.pop();

        if(!operator) {
            operand1 = digits.join("");
            operandsDisplay.textContent = operand1;
        } else {
            operand2 = digits.join("");
            operandsDisplay.textContent = operand2;
        }

        if(!(operand1.includes(".") || (operand2 && operand2.includes(".")))) {
            dotButton.disabled = false;
        }
    }
}

function calculateResult() {
    let result = operate(operator, Number(operand1), Number(operand2));
    let digitsAndDecimals = String(result).split(".");
    let digits = digitsAndDecimals[0];
    let decimals = digitsAndDecimals[1];
    if(digits.length > 9) {
        return "Too Large!";
    } else if (digits.length === 9) {
        return Number(digits);
    } else if(decimals) {
        let decimalsNumber = Number(`0.${decimals}`);
        //Round to 9 digits including the dot.
        let lengthOfDecimals = 8 - digits.length;
        decimalsNumber = Math.round(decimalsNumber * (10 ** lengthOfDecimals)) / (10 ** lengthOfDecimals);
        return Number(digits) + decimalsNumber;
    } else {
        return Number(digits);
    }
}

function updateOperator(value) {
    if(!operand1) {
        return;
    }

    if(operator && operand2) {
        operand1 = calculateResult();
        operand2 = "";
    }

    operator = value;
    operationDisplay.textContent = `${operand1} ${value}`;
    operandsDisplay.textContent = "";
    dotButton.disabled = false;
}

function submitResult() {
    if(operator && operand1 && operand2) {
        operationDisplay.textContent = `${operand1} ${operator} ${operand2}`;
        operandsDisplay.textContent = calculateResult();
        clearData();
    }
}


container.addEventListener("click", (event) => {
    const button = event.target;

    if(!button) {
        return;
    }

    const classes = Array.from(button.classList);

    if (classes.includes("symbol")) {
        updateOperator(button.textContent);
    } 
    else if(button.id.includes("Eql")) {
        submitResult();
    } 
    else if(button.id.includes("C")) {
        clearData();
        clearDisplays();
    }
    else if(button.id.includes("Del")) {
        removeDigit();
    }
    else if(button.id.includes("button")) {
        writeDigit(button.textContent);
    }
})