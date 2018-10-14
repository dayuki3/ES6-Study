
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
        this.checkKeyInput();
    }

    addEvent() {
        this.buttonIncrease.addEventListener('click', this.increase.bind(this));
        this.buttonDecrease.addEventListener('click', this.decrease.bind(this));
    }

    checkKeyInput() {
        let self = this;
        document.onkeyup = function (e) {
            self.arrowKeyEvent(e);
            self.remainNumeric();
        }
    }
    arrowKeyEvent(e) {
        let self = this;
        switch (e.keyCode) {
            case 38://up
                self.increase();
                break;
            case 40://down
                self.decrease();
                break;
        }
    }

    remainNumeric() { 
        let result = this.resultArea.value.replace(/[^-0-9]/g, '');
        this.updateInputValue(result);
    }

    getBaseNumber(resultArea) {
        const resultAreaValue = Number(resultArea.value);
        const currentValue = (Number.isNaN(resultAreaValue)) ? this.base : resultAreaValue;

        return currentValue;
    }

    updateInputValue(result) {
        this.resultArea.value = result;
    }
    increase() {
        let currentValue = this.getBaseNumber(this.resultArea);
        let result = currentValue + this.step;

        result = this.returnStepedResult(result);

        if (this.max) {
            //currentValue가 max보다 크면 동작하지않는다
            if (currentValue >= this.max) {
                return false;
            }

            //currentValue + step이 max를 넘어가면 max값을 반영한다.
            if (currentValue < this.max && result > this.max) {
                result = this.max;
            }

            //최소값보다 작은 value일 때 증가 버튼을 누르면 최소값을 반환한다.
            if (currentValue < this.min && this.min) {
                result = this.min;
            }

        }

        this.updateInputValue(result);
    }

    decrease() {
        let currentValue = this.getBaseNumber(this.resultArea);
        let result = currentValue - this.step;

        result = this.returnStepedResult(result);

        if (this.min) {
            //currentValue가 min보다 작으면 동작하지않는다
            if (currentValue <= this.min) {
                return false;
            }

            //currentValue - step이 min보다 작아지면 min값을 반영한다.
            if (currentValue > this.min && result < this.min) {
                result = this.min;
            }

            //최대값보다 큰 value일 때 감소 버튼을 누르면 최대값을 반환한다.
            if (currentValue > this.max && this.max) {
                result = this.max;
            }
        }

        this.updateInputValue(result);
    }

    returnStepedResult(result) {
        let restOfResult = result % this.step;

        //result를 step으로 나눴을 때 나누어 떨어지지 않으면 나머지만큼 뺀 값을 반환한다. 
        if (restOfResult !== 0) {
            result = result - restOfResult;
        }

        return result
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
            min: -100,
            max: 100
        }

        const spinner = new Spinner(config);
    }
}

