document.addEventListener("DOMContentLoaded", function() {
    const inputScreen = document.getElementById("input-screen");
    const displayField = document.getElementById("display");
    const buttons = document.querySelectorAll("button");
    let expression = "";
    let shouldClearInput = false;

    function clearInputScreen() {
        expression = "";
        inputScreen.value = "";
        displayField.value = "";
        shouldClearInput = false; 
    }

    function deleteLastCharacter() {
        expression = expression.slice(0, -1);
        inputScreen.value = expression;
    }

    function evaluateExpression() {
        try {
            const result = eval(expression).toString();
            displayField.value = expression;
            inputScreen.value = result;
            shouldClearInput = true;
            expression = result; // Keep result for further calculations
        } catch (error) {
            inputScreen.value = "Error";
            expression = ""; // Clear the expression if there's an error
        }
    }

    function addOperator(operator) {
        if (shouldClearInput) {
            clearInputScreen();
        }
        expression += operator;
        inputScreen.value = expression;
        shouldClearInput = false; // Ensure input is not cleared after operator
    }

    function appendToExpression(value) {
        if (shouldClearInput) {
            clearInputScreen();
        }
        expression += value;
        inputScreen.value = expression;
        shouldClearInput = false;
    }

    // Function for handling square root, toggle sign, reciprocal, percentage
    function handleOperation(operation) {
        if (expression === "") return;
        let result;
        const currentValue = parseFloat(expression); // Convert expression to number

        switch(operation) {
            case "toggle":
                result = currentValue * -1;
                break;
            case "square-root":
                result = Math.sqrt(currentValue);
                expression = `\u221A(${currentValue})`;
                break;
            case "reciprocal":
                result = 1 / currentValue;
                expression = `1/${currentValue}`;
                break;
            case "percentage":
                result = currentValue / 100;
                expression = `${currentValue}%`;
                break;
        }

        displayField.value = expression;
        expression = result.toString();
        inputScreen.value = expression;
        shouldClearInput = true;
    }

    // Add Event Listener to each Button
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            if (button.classList.contains("clear")) {
                clearInputScreen();
            } else if (button.classList.contains("delete")) {
                deleteLastCharacter();
            } else if (button.classList.contains("equal")) {
                evaluateExpression();
            } else if (button.classList.contains("divide")) {
                addOperator("/");
            } else if (button.classList.contains("multiply")) {
                addOperator("*");
            } else if (button.classList.contains("plus")) {
                addOperator("+");
            } else if (button.classList.contains("minus")) {
                addOperator("-");
            } else if (button.classList.contains("mod")) {
                addOperator("%");
            } else if (button.classList.contains("exponent")) {
                addOperator("**");
            } else if (button.classList.contains("toggle")) { // Updated
                handleOperation("toggle");
            } else if (button.classList.contains("sqrt")) {
                handleOperation("square-root");
            } else if (button.classList.contains("reciprocal-icon")) {
                handleOperation("reciprocal");
            } else if (button.classList.contains("percent")) {
                handleOperation("percentage");
            } else {
                appendToExpression(button.innerText);
            }
        });
    });
});
