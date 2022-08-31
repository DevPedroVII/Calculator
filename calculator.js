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
        const currentNumber =parseFloat(display.textContent.replace(',','.'));
        newNumber = true;
        const result = eval (`${previousNumber}${operator}${currentNumber}`)
        displayUpdate(result)
    }
}

const displayUpdate = (text) => {
    if(newNumber){
        display.textContent = text.toLocaleString('BR');
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
        previousNumber =parseFloat(display.textContent.replace(',','.'));
}
}
operators.forEach(operator=> operator.addEventListener('click',selectOperator));

const activateEqual =() =>{
    calculate();
    operator = undefined;
}

document.getElementById('equality').addEventListener('click', activateEqual);

const clearDisplay = () => display.textContent= ''
document.getElementById('clearDisplay').addEventListener('click', clearDisplay);

const clearCalculus = () =>{
    clearDisplay();
    operator = undefined
    newNumber = true
    previousNumber = undefined
}
document.getElementById('clearCalculus').addEventListener('click', clearCalculus)

const removeLastnumber = () =>display.textContent = display.textContent.slice(0, -1);
document.getElementById('backSpace').addEventListener('click', removeLastnumber);

const invertSignal = () => {
    newNumber = true
    displayUpdate(display.textContent * -1)
}
document.getElementById('reverse').addEventListener('click', invertSignal)

const hasDecimal = () => display.textContent.indexOf(',') !== -1;
const hasValue = () => display.textContent.length > 0;

const insertedDecimal = () => {
    if(!hasDecimal()){
        if(hasValue){
            displayUpdate(',')
        } else{
            displayUpdate ('0,')
        }
    }
}
document.getElementById('decimal').addEventListener('click', insertedDecimal)


const mapaTeclado = {
    0: 'key0',
    1: 'key1',
    2: 'key2',
    3: 'key3',
    4: 'key4',
    5: 'key5',
    6: 'key6',
    7: 'key7',
    8: 'key8',
    9: 'key9',
    '/': 'divisionOperator',
    '*': 'multiplicationOperator',
    '-': 'subtractionOperator',
    '+': 'sumOperator',
    '=': 'equality',
    Enter: 'equality',
    Backspace: 'backspace',
    c: 'clearDisplay',
    Escape: 'clearCalculus',
    ',': 'decimal',
};

const mapearTeclado = (evento) => {
    const tecla = evento.key;
    const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
    if (teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();
};
document.addEventListener('keydown', mapearTeclado);
