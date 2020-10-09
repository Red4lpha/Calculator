const numKeys = document.querySelectorAll('.btn');
const displayBot = document.querySelector('#displayBot');
const displayTop = document.querySelector('#displayTop');
const btnEnter = document.querySelector('#btnEqual');
const btnDivide = document.querySelector('#btnDivide');
const btnMultiply = document.querySelector('#btnMultiply');
const btnDelete = document.querySelector('#btnDelete');
const btnArray = Array.from(document.querySelectorAll('button'));
let displayText = '';
let operandOne = '';
let operandTwo = ''; 
let operator = '';
let lastPress = '';

document.addEventListener('keydown', (e) => {
    console.log("keydown: " + e.key);
    
    
    switch(e.key){
        case 'Enter':
            console.log("Enter key clicked")
            document.querySelector('#btnEqual').click();
            return;
            break;
        case '/':
            console.log("divide key clicked")
            document.querySelector('#btnDivide').click();
            return;
            break;
        case '*':
            console.log("mul key clicked")
            document.querySelector('#btnMultiply').click();
            return;
            break;  
        case 'Backspace':
            console.log("backspace key clicked")
            document.querySelector('#btnDelete').click();
            return;
            break;
        default:
            
    }
    let btnKey = btnArray.find(el => el.textContent === e.key);
    if (btnKey != undefined){
        btnKey.click();
        console.log(btnKey);
    }
});



numKeys.forEach((numKey) => {
    numKey.addEventListener('click', click);
  });
function click(e){
    console.log("click listener: " + e.target.innerText);
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
        if(displayText.length >= 13){
            e.target.blur();
            return;}
        
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
            e.target.blur();
            return;
             
        }
        else if(e.target.name === 'decimal'){
            displayText = displayText.toString();
            //if a decimal is already present
            if(displayText.indexOf('.') != -1){
                displayConsoleInfo();
                e.target.blur();
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
                e.target.blur();
                return;
            }
            else if(displayText < 0) {
                //let temp = displayText.replace('-','');
                let temp = Math.abs(displayText);
                displayText = temp;
                displayBot.textContent =  displayText;
                displayConsoleInfo(); 
                e.target.blur();
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
            if(displayTop.textContent === ''){displayTop.textContent =  operandOne + getSymbol(operator) + displayText}
            else{
                let tempDisplayTop = displayTop.textContent + getSymbol(operator) + displayText;
                
                //check to see if top display is too long
                if(tempDisplayTop.length > 40){
                    tempDisplayTop = tempDisplayTop.toString();
                    displayTop.textContent = splitTop(tempDisplayTop);   
                }
                else{displayTop.textContent = tempDisplayTop;}
            }
            
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
            e.target.blur();
            return; 
        }
        else{
            displayText = displayText.toString();
            displayText = displayText.slice(0, -1);
            displayBot.textContent =  displayText;
            displayConsoleInfo();
        } 
    }
    else if(e.target.name === 'equal'){
        if (displayText === ''){
            e.target.blur();
            return;
        }
        else if(operandOne === ''){
            e.target.blur();
            return;
        }
        else{
            equal();
            lastPress = e.target.name;
            displayTop.textContent = displayText;
            displayConsoleInfo();  
        }
    }
    e.target.blur();
}

//-----------------------
//Helper functions
//-----------------------
function displayConsoleInfo(e){
    console.log("OperandOne = " + operandOne);    
    console.log("OperandTwo = " + operandTwo);
    console.log("Operator = " + operator);
    console.log("DisplayText = " + displayText);
    console.log("lastPress = " + lastPress); 
    console.log("--------------");
}
//Converts the operator text into the corresponding symbol
function getSymbol(name){
    if(name === 'plus'){return '+';}
    else if(name === 'minus'){return '-';}
    else if(name === 'multiply'){return '*';}
    else if(name === 'divide'){return '/';}
    else {return ' ';}
}
function splitTop(display){
    let temp = display.length - 40;
    return display.slice(temp+1);
}


//-----------------------
//Special functions
//-----------------------
function clear(){
    console.log('clear function called');
    displayText = operandOne = operandTwo = operator =  '';
    displayBot.textContent =  displayText;
    displayTop.textContent =  ''; 
}

function equal(e){
    operandTwo = displayText;
    displayText = operate(operator, operandOne, operandTwo);
    displayBot.textContent =  displayText; 
    operandOne = operandTwo = operator =  '';
    if(displayText === 'ERROR'){displayText = '';}
}

//-----------------------
//Math functions
//-----------------------
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
        operandOne = operandTwo = operator =  '';
        displayTop.textContent =  '';
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
