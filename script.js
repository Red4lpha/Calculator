const numKeys = document.querySelectorAll('.btn');
const display = document.querySelector('.display')
let displayText = '';
numKeys.forEach((numKey) => {
    numKey.addEventListener('click', click);
  });
function click(e){
    console.log(e.target.innerText);
    //console.log(e.target.name);
    
    //number pressed
    if(e.target.className === 'btn num'){
       displayText += e.target.innerText;
       display.textContent =  displayText;    
    }
    //clear pressed
    else if(e.target.name === 'clear'){
        displayText = '';
        display.textContent =  displayText; 
    }
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
