import Spinner from "../study20180819";

describe("Spinner Test", () => {

    const mockfunction = jest.fn();
    const getEl = (classname) => {
        return document.querySelector(classname);
    }

    beforeEach(() => {
        const spinnerWrapper = document.createElement("div");
        spinnerWrapper.id = "spinner";
        document.body.appendChild(spinnerWrapper);
    });

    afterEach(()=>{
        document.body.innerHTML="";
    });

    describe("셋팅값 없는 경우의 초기화 테스트", () =>{
        it("기본셋팅에 base가 없다면 증가 버튼 클릭시 0 + step 값을 리턴한다. ", () => {
            //given
            const config = { id: "spinner", step: 2 }
            const spinner = new Spinner(config);

            //when
            spinner.increase();

            //then
            expect(getEl(".input-result-area").value).toBe("2");
        });

        it("기본셋팅에 step이 없다면 증가 버튼 클릭시 base + 1 인 값을 리턴한다", () => {
            //given
            const config = { id: "spinner", base: 0 }
            const spinner = new Spinner(config);

            //when
            spinner.increase();

            //then
            expect(getEl(".input-result-area").value).toBe("1");
        });

        it("기본셋팅에 step이 없다면 감소 버튼 클릭시 base - 1 인 값을 리턴한다", () => {
            //given
            const config = { id: "spinner", base: 0 }
            const spinner = new Spinner(config);

            //when
            spinner.decrease();

            //then
            expect(getEl(".input-result-area").value).toBe("-1");
        });

    });

    describe("기능 테스트 ", () => {
        beforeEach(() => {
            const mockfunction = jest.fn();
        });

        afterEach(() => {
            mockfunction.mockClear();
        });

        it("증가 버튼을 클릭하면 increase 함수가 실행되어야한다.", () => {
            //given
            const config = { id: "spinner" }
            const spinner = new Spinner(config);
            const buttonIncrease = getEl(".button-number-increase");

            //when
            buttonIncrease.click(); 

            //then
            expect(getEl(".input-result-area").value).toEqual("1");
        });

        it("값을 입력하지 않은 상태에서 증가버튼을 누르면 base + step 값을 반환한다", () => {
            //given
            const config = { id: "spinner", step: 5, base: 0}
            const spinner = new Spinner(config);

            //when
            spinner.increase();

            //then
            expect(getEl(".input-result-area").value).toBe("5");
        });

        it("값을 입력하지 않은 상태에서 증가버튼을 누르면 base - step 값을 반환한다", () => {
            //given
            const config = { id: "spinner", step: 5, base: 0}
            const spinner = new Spinner(config);

            //when
            spinner.decrease();

            //then
            expect(getEl(".input-result-area").value).toBe("-5");
        });

        it("최대값이 설정되어있으면 그 초과값으로 증가할 수 없다.", () => {
            //given
            const config = { id: "spinner", base: 8, max: 10, step: 5}
            const spinner = new Spinner(config);
            jest.mock('../study20180819', () => {
                return jest.fn().mockImplementation(() => {
                    return {updateInputValue: mockfunction};
                });
            });

            //when
            spinner.increase();

            //then
            expect(mockfunction).not.toHaveBeenCalled();
        });

        it("최소값이 설정되어있으면 그 미만으로 감소할 수 없다", () => {
            //given
            const config = { id: "spinner", base: -10, min: -10, step: 5}
            const spinner = new Spinner(config);

            jest.mock('../study20180819', () => {
                return jest.fn().mockImplementation(() => {
                    return {updateInputValue: mockfunction};
                });
            });

            //when
            spinner.decrease();

            //then 
            expect(mockfunction).not.toHaveBeenCalled();
        });

        it("최소값이 설정되어있으면 그보다 낮은 숫자를 입력하고 증가 동작했을 때 최소값으로 바꿔준다.", () => {
            //given
            const config = {id: "spinner", base: -100, min: -10, step: 5}
            const spinner = new Spinner(config);

            //when
            spinner.increase();

            //then
            expect(getEl(".input-result-area").value).toEqual("-10");
        })

        it("증가 동작시 Input 값 + step이 최대 범위를 벗어나는 경우, 최대값으로 바꿔준다 ",() => {
            //given
            const config = {id: "spinner", base: 99, step: 5, max: 100, min: -100}
            const spinner = new Spinner(config);

            //when
            spinner.increase();

            //then
            expect(getEl(".input-result-area").value).toEqual("100");
        });

        it("감소 동작시 Input 값 - step이 최소 범위를 벗어나는 경우, 최소값으로 바꿔준다 ",() => {
            //given
            const config = {id: "spinner", base: -99, step: 5, max: 100, min: -100}
            const spinner = new Spinner(config);

            //when
            spinner.decrease();

            //then
            expect(getEl(".input-result-area").value).toEqual("-100");
        });

        it("최소값보다 작은 수를 입력한 경우 증가 버튼 동작시 최소값으로 변경",() => {
            //given
            const config = {id: "spinner", base:0, step: 5, max: 100, min: -100}
            const spinner = new Spinner(config);

            //when
            spinner.updateInputValue(-1000);
            spinner.increase();

            //then
            expect(getEl(".input-result-area").value).toEqual("-100");
        });

        it("최소값보다 작은 수를 입력한 경우 감소 버튼 동작시 반응 없음 ",() => {
            //given
            const config = {id: "spinner", base:0, step: 5, max: 100, min: -100}
            const spinner = new Spinner(config);

            //when
            spinner.updateInputValue(-1000);
            spinner.decrease();

            //then
            expect(getEl(".input-result-area").value).toEqual("-1000");
        });

        it("최대값보다 큰 수를 입력한 경우 감소 버튼 동작시 최대값으로 변경",() => {
            //given
            const config = {id: "spinner", base:0, step: 5, max: 100, min: -100}
            const spinner = new Spinner(config);

            //when
            spinner.updateInputValue(1000);
            spinner.decrease();

            //then
            expect(getEl(".input-result-area").value).toEqual("100");
        });

        it("최대값보다 큰 수를 입력한 경우 증가 버튼 동작시 반응 없음",() => {
            //given
            const config = {id: "spinner", base:0, step: 5, max: 100, min: -100}
            const spinner = new Spinner(config);

            //when
            spinner.updateInputValue(1000);
            spinner.increase();

            //then
            expect(getEl(".input-result-area").value).toEqual("1000");
        });

        it("Input 값이 step에 맞지 않을 경우, 버튼 동작에 따른 유효한 숫자를 반환한다.",() => {
            //given
            const config = {id: "spinner", base:0, step: 3}
            const spinner = new Spinner(config);

            //when
            spinner.updateInputValue(8);
            spinner.increase();

            //then
            expect(getEl(".input-result-area").value).toEqual("9");
        });

        it("Destroy 실행 후 클릭에 반응하지 않아야한다",() => {
            //given
            const config = {id: "spinner"}
            const spinner = new Spinner(config);;
            const buttonIncrease = getEl(".button-number-increase");

            //when
            spinner.destroy();
            buttonIncrease.click(); 

            //then
            expect(getEl(".input-result-area").value).toEqual("");
        });
    });
});