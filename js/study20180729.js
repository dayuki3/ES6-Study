function changeNumber(state) {
    const rangeMAX = 50;
    const rangeMIN = -50;
    const numberInput = document.querySelector(".input-number-area");
    let numberInputValue = Number(numberInput.value);
    let newValue; 

    if (state == "increase" && numberInputValue < 50){
        newValue = numberInputValue + 1;
    } else if(state == "decrease" && numberInputValue > -50) {
        newValue = numberInputValue - 1;
    } else {
        return;
    }
    
    numberInput.value = newValue;
}

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        let buttonIncrease = document.querySelector(".number-button-increase");
        let buttonDecrease = document.querySelector(".number-button-decrease");

        buttonDecrease.addEventListener('click',function(){changeNumber('decrease')});
        buttonIncrease.addEventListener('click',function(){changeNumber('increase')});
    }
}
