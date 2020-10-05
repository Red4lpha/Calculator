const numKeys = document.querySelectorAll('.btn');
const displayBot = document.querySelector('#displayBot');
const displayTop = document.querySelector('#displayTop');
let displayText = '';
let operandOne = '';
let operandTwo = ''; 
let operator = '';
let lastPress = '';
numKeys.forEach((numKey) => {
    numKey.addEventListener('click', click);
  });
function click(e){
    console.log(e.target.innerText);
    //console.log(e.target.name);
    //number pressed     
    if(e.target.className === 'btn num'){
        if (displayText === '0'){
            displayText = ''; 
        }
        if(lastPress === 'equal'){
            displayText = '';
            lastPress = '';
        }
        //if the current number length is too large
        if(displayText.length >= 13){return;}
        
        displayText += e.target.innerText;
        displayBot.textContent =  displayText;
        displayConsoleInfo();    
    }
    //clear pressed
    else if(e.target.name === 'clear'){
        clear();
        displayConsoleInfo();  
    }
    else if(e.target.className === 'btn operator'){
        //if this is the first command and no numbers are present
        if(displayText === ''){
            displayConsoleInfo(); 
            return;
             
        }
        else if(e.target.name === 'decimal'){
            displayText = displayText.toString();
            //if a decimal is already present
            if(displayText.indexOf('.') != -1){
                displayConsoleInfo();
                return;
            }
            else {
                displayConsoleInfo();
                displayText += e.target.innerText;
                displayBot.textContent =  displayText;
            }
        }    

        else if(e.target.name === 'sign'){
            if(displayText > 0){
                //let temp = '-';
                displayText = '-' + displayText;
                displayBot.textContent =  displayText;
                displayConsoleInfo(); 
                return;
            }
            else if(displayText < 0) {
                //let temp = displayText.replace('-','');
                let temp = Math.abs(displayText);
                displayText = temp;
                displayBot.textContent =  displayText;
                displayConsoleInfo(); 
                return;
            }
        }
        
        //if this is a first operator called after a series of numbers have been displayed
        else if(operandOne === ''){
            console.log("btnOp - operandOne == Null called");
            operandOne = displayText;
            operator = e.target.name;
            displayText = '';
            displayConsoleInfo();  
        }
        //if this is not the first operator called
        else if(operandOne != ''){
            console.log("btnOp - operandOne == # called");
            if(displayTop.textContent === ''){displayTop.textContent +=  operandOne + getSymbol(operator) + displayText}
            else{displayTop.textContent += getSymbol(operator) + displayText;}
            
            equal();
            lastPress = 'equal';
            operator = e.target.name;
            operandOne = displayText;
            displayConsoleInfo();  
        }
    }
    else if(e.target.name === 'delete'){
        if(displayText === ''){
            displayConsoleInfo(); 
            return; 
        }
        else{
            displayText = displayText.toString();
            displayText = displayText.slice(0, -1);
            displayBot.textContent =  displayText;
            displayConsoleInfo();
        } 
    }
    else if(e.target.className === 'btn equal'){
        if (displayText === ''){return;}
        else if(operandOne === ''){return;}
        else{
            equal();
            lastPress = e.target.name;
            displayTop.textContent = displayText;
            displayConsoleInfo();  
        }
    }
}
function displayConsoleInfo(e){
    console.log("OperandOne = " + operandOne);    
    console.log("OperandTwo = " + operandTwo);
    console.log("Operator = " + operator);
    console.log("DisplayText = " + displayText);
    console.log("lastPress = " + lastPress); 
}

function equal(e){
    operandTwo = displayText;
    displayText = operate(operator, operandOne, operandTwo);
    displayBot.textContent =  displayText; 
    operandOne = operandTwo = operator =  '';
    if(displayText === 'ERROR'){displayText = '';}
}




//Special functions
function clear(){
    displayText = operandOne = operandTwo = operator =  '';
    displayBot.textContent =  displayText;
    displayTop.textContent =  ''; 
}
//Converts the operator text into the corresponding symbol
function getSymbol(name){
    if(name === 'plus'){return '+';}
    else if(name === 'minus'){return '-';}
    else if(name === 'multiply'){return '*';}
    else if(name === 'divide'){return '/';}
    else {return ' ';}
}




//Math functions
function add(num1, num2){
    return parseFloat(num1) + parseFloat(num2);
}
function subtract(num1, num2){
    return num1 - num2;
}
function multiply(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    if(num2 === '0'){
        return 'ERROR';
    }
    else {return num1 / num2;}
}

//--------
function operate(operator, num1, num2){
    if(operator === 'plus'){return add(num1, num2);}
    else if(operator === 'minus'){return subtract(num1, num2);}
    else if(operator === 'multiply'){return multiply(num1, num2);}
    else if(operator === 'divide'){return divide(num1, num2);}
    else{
        console.log("invalid operator: " + operator);
        return '';
    }
}
