'use strict';

const display = document.getElementById('display');
const numbers = document.querySelectorAll('[id*=key]');
const operators = document.querySelectorAll('[id*=Operator');

let newNumber = true;
let operator;
let previousNumber;

const pendingOperation = () => operator !== undefined;

const calculate = () => {
    if(pendingOperation()){
        const currentNumber =parseFloat(display.textContent);
        newNumber = true;
        if(operator=='+'){
            displayUpdate(previousNumber + currentNumber)
        }else if(operator=='-'){
            displayUpdate(previousNumber - currentNumber)
        }else if(operator=='*'){
            displayUpdate(previousNumber * currentNumber)
        }else if(operator=='/'){
            displayUpdate(previousNumber / currentNumber)
        }
    }
}

const displayUpdate = (text) => {
    if(newNumber){
        display.textContent = text;
        newNumber= false;
    }else{
        display.textContent += text;
    }
}

const insertNumber = (evento) => displayUpdate(evento.target.textContent);
numbers.forEach(numbers=> numbers.addEventListener('click',insertNumber));

const selectOperator = (evento) =>{
    if(!newNumber){
        calculate()
        newNumber= true
        operator = evento.target.textContent;
        previousNumber =parseFloat(display.textContent);
}
}
operators.forEach(operator=> operator.addEventListener('click',selectOperator));
