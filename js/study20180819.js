
class Spinner{
    constructor (config) {
        this.id = config.id;
        this.defaultValue = config.defaultValue;
        this.step = config.step;
        this.base = config.base;
        this.min = config.min;
        this.max = config.max;
    }

    addEvnet(){
        this.buttonIncrease = document.querySelector(".button-number-increase");
        this.buttonDecrease = document.querySelector(".button-number-decrease");

        this.buttonIncrease.addEventListener('click', this.increase.bind(this));
        this.buttonDecrease.addEventListener('click', this.decrease.bind(this));
    }

    getBaseNumber(resultArea){
        const resultAreaValue = Number(resultArea.value);
        const currentValue = (Number.isNaN(resultAreaValue))?  0 : resultAreaValue ;

        return currentValue;
    }

    isValid(value) {
        //min, max 이내에 있는지 체크해서 true false 반환
        const min = this.min;
        const max = this.max;

        if(value > max || value < min){
            return false;
        }

        return true;
    }

    //클래스 내 멤버함수를 arrow function으로 선언하게되면 
    //해당 함수에서 this 를 사용하기위해서 따로 bind를 하지 않아도 되지만
    //arrow function으로 멤버함수를 선언하려면 기본 es6로는 안되고 babel등의 설치가 필요하다.
    //ES7 (es2017) 에 들어가는건가?
    //increase = () => {
    increase(){
        let resultArea = document.querySelector(".input-result-area");
        let currentValue = this.getBaseNumber(resultArea);
        let result = currentValue + this.step;
    
        if (!this.isValid(result)){
            return false;
        }
        
        resultArea.value = result;
    }

    decrease() {
        let resultArea = document.querySelector(".input-result-area");
        let currentValue = this.getBaseNumber(resultArea);
        let result = currentValue - this.step;
    
        if (!this.isValid(result)){
            return false;
        }

        resultArea.value = result;
    }

    render(){
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
        spinner.render();
        spinner.addEvnet();
    }
}

