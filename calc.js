let operand1 = 0;
let operand2 = 0;
let result = 0;
let operator = "";

const OPERATORS = {
    "+": "Pls",
    "-": "Min",
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
        case "-":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
        default:
            return add(a, b);
    }
}

function clear() {
}

function updateDisplay() {
}

function updateOperatorDisplay() {
}


const container = document.querySelector("#container");
const display = document.querySelector("#display");


container.addEventListener("click", (event) => {
    const button = event.target;
    const classes = Array.from(button.classList);

    if (classes.includes("symbol") && button) {
    } 
    else if(button.id.includes("Eql")) {
    } 
    else if(button.id.includes("C")) {
    } 
    else if(button.id.includes("button")) {
    }
})