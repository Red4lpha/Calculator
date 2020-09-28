const numKeys = document.querySelectorAll('.btn');
const displayBot = document.querySelector('#displayBot')
let displayText = '';
let operandOne = 0;
let operandTwo = 0; 
let operator = '';
numKeys.forEach((numKey) => {
    numKey.addEventListener('click', click);
  });
function click(e){
    console.log(e.target.innerText);
    //console.log(e.target.name);
    
    //number pressed
    if(e.target.className === 'btn num'){
       displayText += e.target.innerText;
       displayBot.textContent =  displayText;    
    }
    //clear pressed
    else if(e.target.name === 'clear'){
        clear();
    }
    else if(e.target.className === 'btn operator'){
        if(operandOne === 0){
            operandOne = displayText;
            console.log(e.target.name);
            operator = e.target.name;
            displayText = '';
        }
    }
    else if(e.target.className === 'btn equal'){
        if(operandOne === 0){
            return;
        }
        operandTwo = displayText;
        displayText = operate(operator, operandOne, operandTwo);
        displayBot.textContent =  displayText; 
    }
}  
//Special functions
    function clear(){
        displayText = '';
        displayBot.textContent =  displayText; 
    }





//Math functions
function add(num1, num2){
    return num1 + num2;
}
function subtract(num1, num2){
    return num1 - num2;
}
function multiply(num1, num2){
    return num1 * num2;
}
function divide(num1, num2){
    return num1 / num2;
}

//--------
function operate(operator, num1, num2){
    if(operator === 'plus'){return add(num1, num2);}
    else if(operator === 'minus'){return subtract(num1, num2);}
    else if(operator === 'multiply'){return multiply(num1, num2);}
    else if(operator === 'divide'){return divide(num1, num2);}
}
