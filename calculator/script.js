const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = "";
let previousInput = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.innerText;

        // Clear
        if (value === "C") {
            currentInput = "";
            previousInput = "";
            operator = "";
            display.value = "0";
            return;
        }

        // Backspace
        if (value === "←") {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput || "0";
            return;
        }

        // Equals
        if (value === "=") {
            if (currentInput && previousInput && operator) {
                currentInput = calculate(previousInput, currentInput, operator);
                display.value = currentInput;
                previousInput = "";
                operator = "";
            }
            return;
        }

        // Operators
        if (["+", "−", "×", "÷"].includes(value)) {
            if (currentInput === "") return;
            operator = value;
            previousInput = currentInput;
            currentInput = "";
            return;
        }

        // Decimal
        if (value === "." && currentInput.includes(".")) return;

        // Numbers
        currentInput += value;
        display.value = currentInput;
    });
});

function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (op) {
        case "+":
            return (a + b).toString();
        case "−":
            return (a - b).toString();
        case "×":
            return (a * b).toString();
        case "÷":
            return b === 0 ? "Error" : (a / b).toString();
        default:
            return "";
    }
}
