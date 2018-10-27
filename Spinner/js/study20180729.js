function changeNumber(state) {
    const rangeMAX = 50;
    const rangeMIN = -50;
    const numberInput = document.querySelector(".input-result-area");
    let numberInputValue = Number(numberInput.value);
    let newValue; 

    if (state == "increase" && numberInputValue < rangeMAX){
        newValue = numberInputValue + 1;
    } else if(state == "decrease" && numberInputValue > rangeMIN) {
        newValue = numberInputValue - 1;
    } else {
        return;
    }
    
    numberInput.value = newValue;
}

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        let buttonIncrease = document.querySelector(".button-number-increase");
        let buttonDecrease = document.querySelector(".button-number-decrease");

        buttonDecrease.addEventListener('click',function(){changeNumber('decrease')});
        buttonIncrease.addEventListener('click',function(){changeNumber('increase')});
    }
}

