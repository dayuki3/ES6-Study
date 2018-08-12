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

class changeNumber2 {
    constructor (config) {
        this.config = config;
        this.render(config.id);
    }

    render(id){
        const wrapper = document.getElementById(id);
        wrapper.innerHTML = `
            <input type="text" onChange= { this.blabal } value="${this.config.defaultValue}" class="input-number-area">
            <button type="button" class="number-button number-button-increase">증가</button>
            <button type="button" class="number-button number-button-decrease">감소</button>
        `;
    }
}




document.onreadystatechange = function () {
    if (document.readyState == "interactive") {
        let buttonIncrease = document.querySelector(".number-button-increase");
        let buttonDecrease = document.querySelector(".number-button-decrease");

        buttonDecrease.addEventListener('click',function(){changeNumber('decrease')});
        buttonIncrease.addEventListener('click',function(){changeNumber('increase')});

        /* 20180806 */
        const test = new changeNumber2(1,2,3);
        test.text("a", "b");
        var spiner = new changeNumber2({id: "spiner"});
    }
}

