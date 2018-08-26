
class Spinner{
    constructor (config) {
        this.id = config.id;
        this.defaultValue = config.defaultValue;
        this.step = config.step;
        this.base = config.base;
        this.min = config.min;
        this.max = config.max;
    }

    addEvent(){
        //수정 필요 id받아오잖아!
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
        if(value > this.max || value < this.min){
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
            return ;
        }
        
        resultArea.value = result;
    }

    decrease() {
        let resultArea = document.querySelector(".input-result-area"); //dom에 접근하는 비용이 크니까 한번만 가져와서 재사용하도록하자
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
            defaultValue: "숫자를 증감시킵니다.",    //없으면 undefined
            step: 5,                            //없으면 NaN
            base: 0,
            min: -20,                           //없으면 NaN
            max: 20                             //없으면 NaN
        }
        
        const spinner = new Spinner(config);

        //constructor 내에 포함 가능함. 실행 시점을 조작하고싶다면 이렇게 하는 경우도 있음.
        spinner.render();
        spinner.addEvent();
    }
}

