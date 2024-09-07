document.addEventListener("DOMContentLoaded", function() {
    // Get input and display fields
    const inputScreen = document.getElementById("input-screen");
    const displayField = document.getElementById("display");
    const buttons = document.querySelectorAll("button"); // Get all buttons
    let expression = ""; // To store the ongoing input expression
    let shouldClearInput = false; // Flag to track if input should be cleared on the next operation

    // Function to clear both input and display screens
    function clearInputScreen() {
        expression = ""; // Clear expression
        inputScreen.value = ""; // Clear input screen
        displayField.value = ""; // Clear display screen
        shouldClearInput = false; // Reset clear flag
    }

    // Function to delete the last character in the expression
    function deleteLastCharacter() {
        expression = expression.slice(0, -1); // Remove last character
        inputScreen.value = expression; // Update input screen
    }

    // Function to evaluate the current expression
    function evaluateExpression() {
        try {
            const result = eval(expression).toString(); // Evaluate the expression and convert to string
            displayField.value = expression; // Show the full expression in the display
            inputScreen.value = result; // Show the result in the input field
            shouldClearInput = true; // Set flag to clear input on the next operation
            expression = result; // Store result for further calculations
        } catch (error) {
            inputScreen.value = "Error"; // Show error if evaluation fails
            expression = ""; // Reset the expression
        }
    }

    // Function to add an operator (+, -, *, /, etc.) to the expression
    function addOperator(operator) {
        if (shouldClearInput) {
            clearInputScreen(); // Clear if needed
        }
        expression += operator; // Add operator to the expression
        inputScreen.value = expression; // Update input screen
        shouldClearInput = false; // Reset clear flag
    }

    // Function to append numbers or characters to the expression
    function appendToExpression(value) {
        if (shouldClearInput) {
            clearInputScreen(); // Clear input if flagged
        }
        expression += value; // Append the value
        inputScreen.value = expression; // Update input screen
        shouldClearInput = false; // Reset clear flag
    }

    // Function to handle special operations like square root, toggle sign, reciprocal, percentage
    function handleOperation(operation) {
        if (expression === "") return; // Don't proceed if expression is empty
        let result;
        const currentValue = parseFloat(expression); // Convert current expression to a number

        // Perform the operation based on the type
        switch(operation) {
            case "toggle": // Toggle sign
                result = currentValue * -1;
                break;
            case "square-root": // Calculate square root
                result = Math.sqrt(currentValue);
                expression = `\u221A(${currentValue})`; // Show the square root symbol in the display
                break;
            case "reciprocal": // Calculate reciprocal (1/x)
                result = 1 / currentValue;
                expression = `1/${currentValue}`; // Display 1/x format
                break;
            case "percentage": // Calculate percentage
                result = currentValue / 100;
                expression = `${currentValue}%`; // Display percentage format
                break;
        }

        // Update display and input screens with the result
        displayField.value = expression;
        expression = result.toString(); // Store result as the new expression
        inputScreen.value = expression;
        shouldClearInput = true; // Set flag to clear input on the next operation
    }

    // Add Event Listener to each Button
    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            if (button.classList.contains("clear")) {
                clearInputScreen(); // Handle clear button
            } else if (button.classList.contains("delete")) {
                deleteLastCharacter(); // Handle delete button
            } else if (button.classList.contains("equal")) {
                evaluateExpression(); // Handle equal button
            } else if (button.classList.contains("divide")) {
                addOperator("/"); // Handle division
            } else if (button.classList.contains("multiply")) {
                addOperator("*"); // Handle multiplication
            } else if (button.classList.contains("plus")) {
                addOperator("+"); // Handle addition
            } else if (button.classList.contains("minus")) {
                addOperator("-"); // Handle subtraction
            } else if (button.classList.contains("mod")) {
                addOperator("%"); // Handle modulus
            } else if (button.classList.contains("exponent")) {
                addOperator("**"); // Handle exponentiation
            } else if (button.classList.contains("toggle")) { 
                handleOperation("toggle"); // Handle toggle sign
            } else if (button.classList.contains("sqrt")) {
                handleOperation("square-root"); // Handle square root
            } else if (button.classList.contains("reciprocal-icon")) {
                handleOperation("reciprocal"); // Handle reciprocal
            } else if (button.classList.contains("percent")) {
                handleOperation("percentage"); // Handle percentage
            } else {
                appendToExpression(button.innerText); // Append numbers and other inputs
            }
        });
    });
});

