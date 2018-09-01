
class Spinner {
    constructor(config) {
        this.id = config.id;
        this.defaultValue = (config.defaultValue) ? config.defaultValue : '';
        this.step = (config.step) ? config.step : 1;
        this.base = (config.base) ? config.base : 0;

        if (config.min) {
            this.min = config.min;
        }
        if (config.max) {
            this.max = config.max;
        }

        this.render();

        this.buttonIncrease = document.querySelector(".button-number-increase");
        this.buttonDecrease = document.querySelector(".button-number-decrease");
        this.resultArea = document.querySelector(".input-result-area");

        this.addEvent();
    }

    addEvent() {
        this.buttonIncrease.addEventListener('click', this.increase.bind(this));
        this.buttonDecrease.addEventListener('click', this.decrease.bind(this));
    }

    getBaseNumber(resultArea) {
        const resultAreaValue = Number(resultArea.value);
        const currentValue = (Number.isNaN(resultAreaValue)) ? this.base : resultAreaValue;

        return currentValue;
    }

    isValidIncreasedValue(value) {
        //max값이 있으면 max이상 넘어갈 수 없다. max가 없으면 infinite 
        if (!this.max) return true;

        if (value <= this.max) { 
            return true;
        }
    }

    isValidDecreasedValue(value) {
        //min값이 있으면 min이하로 내려갈 수 없다. min이 없으면 infinite 
        if (!this.min) return true;

        if (value >= this.min) {
            return true;
        }
    }

    increase() {
        let currentValue = this.getBaseNumber(this.resultArea);
        let result = currentValue + this.step;

        if (!this.isValidIncreasedValue(result)) {
            return;
        }

        this.resultArea.value = result;
    }

    decrease() {
        let currentValue = this.getBaseNumber(this.resultArea);
        let result = currentValue - this.step;

        if (!this.isValidDecreasedValue(result)) {
            return false;
        }

        this.resultArea.value = result;
    }

    render() {
        const wrapper = document.getElementById(this.id);

        wrapper.innerHTML = `
            <input type="text" placeholder="${this.defaultValue}" class="input-result-area">
            <button type="button" class="button-number button-number-increase">증가</button>
            <button type="button" class="button-number button-number-decrease">감소</button>
        `;
    }
}

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {

        const config = {
            id: "spinner",
            defaultValue: "숫자를 증감시킵니다.",
            step: 5,
            base: 0,
            min: -20,
            max: 20
        }

        const spinner = new Spinner(config);
    }
}

