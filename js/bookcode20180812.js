function testLetAndVar() {
    var a = 12; // 전역접근 가능

    function test1() {
        console.log(a);

        var b = 13; // 함수 안에서 접근 가능

        if (true) {
            var c = 14; // 함수 안에서 접근 가능
            let d = 15  // if문 내에서만 접근 가능
            console.log(b);
        }
        console.log(c);
        //console.log(d);
    }
    test1();

    function test2() {
        // var 는 변수가 덮어씌워질 수 있다. 
        var a = 0;
        var a = 1;

        // let 이라면 덮어씌워지지 않고 Type error 발생
        let b = 0;
        //let b = 1;
    }
    test2();

    function test3() {
        var a = 1;
        let b = 2;

        function test3_1() {
            var a = 3; // 전혀 다른변수
            let b = 4; // 전혀 다른변수

            if (true) {
                var a = 5; // 덮어쓴다
                let b = 6; // 전혀 다른 변수

                console.log(a);
                console.log(b);
            }
            console.log(a);
            console.log(b);
        }

        test3_1();

        console.log(a);
        console.log(b);
    }
    test3();
}

function testConst() {
    function test1() {
        var const_pi = 3.141;
        var r = 2;
        console.log(const_pi * r * r); //실행결과 12.564

        const pi = 3.141;
        console.log(pi * r * r); //실행결과 12.564

        //pi = 12; 읽기전용 오류 발생
    }
    test1();

    function test2() {
        const a = {
            name: "민호",
        };

        console.log(a.name);

        a.name = "수지";

        console.log(a.name);

        //a = {} //읽기전용 오류 발생
    }
    test2();
}

function testParameterDefaultValue() {

    function test1(x, y, z) {
        //ES5에서 기존에 구현해온 방식
        x = x === undefined ? 1 : x;
        y = y === undefined ? 2 : y;
        z = z === undefined ? 3 : z;

        console.log(x, y, z); //실행결과 "6 7 3";
    }
    test1(6, 7);

    function test2(x = 1, y = 2, z = 3) {
        //ES6부터는 좀 더 편하다
        console.log(x, y, z);
    }
    test2(8, 9);
    test2(undefined, 10, 11); //undefined를 넘기면 누락한것으로 판단

    function test3(x = 12, y = 13, z = 10 + 4) {
        //기본 값 자리에 표현식을 넣을 수 있다
        console.log(x, y, z);
    }
    test3();
}

function testSpreadOperator() {

    function test1() {
        function sum(a, b) {
            return a + b;
        }

        var data = [1, 4];
        //ES5 까지는 인자값으로 배열을 넘기려면 apply를 사용해야한다
        console.log(sum.apply(null, data)); // 실행결과 "5"

        //ES6 에서는 펼침연산자로 좀 더 편하게 할 수 있다.
        console.log(sum(...data)); // 실행결과 "5"
    }
    test1();

    //배열 합치기
    function test2() {
        let array1 = [2, 3, 4];
        let array2 = [1, ...array1, 5, 6, 7];

        console.log(array2); //실행결과 [1, 2, 3, 4, 5, 6, 7]
    }
    test2();

    //배열 끝에 배열 붙이기
    function test3() {
        //ES5
        var array1 = [4];
        var array2 = [1, 2, 3];
        Array.prototype.push.apply(array2, array1);
        console.log(array2);

        //ES6
        let array3 = [4];
        let array4 = [1, 2, 3];
        array4.push(...array3);
        console.log(array4);
    }
    test3();

    //여러 배열 펼침
    function test4() {
        let array1 = [1];
        let array2 = [2];
        let array3 = [...array1, ...array2, ...[3, 4]];
        let array4 = [5];

        function test(a, b, c, d, e) {
            return a + b + c + d + e;
        }

        let result = test(...array3, ...array4); //펼쳐짐
        console.log(result);
    }
    test4();
}

//나머지 파라미터 (이름 붙은 인자보다 함수 파라미터를 더 많이 포함한 배열)
function testRestParameter() {
    //ES5까지는 arguments객체를 거쳐 인자를 사용했다.
    function test1(a, b) {
        var args = Array.prototype.slice.call(arguments, test1.length);
        console.log(args); //[3, 4, 5]
    }
    test1(1, 2, 3, 4, 5);

    function test2(a, b, ...args) {
        console.log(args); //[3, 4, 5]
    }
    test2(1, 2, 3, 4, 5);
}

function testDestructuringAssign() {
    /*************
    *
    * 배열 해체할당
    * 
    **************/

    function test1() {
        var testArray = [1, 2, 3];
        //ES5
        var a = testArray[0];
        var b = testArray[1];
        var c = testArray[2];

        //ES6
        let d, e, f;
        let [h, i, j] = [4, , 6]; // i 는 undefined 가 됨
        [d, e, f] = testArray;

        console.log(d, e, f, h, i, j);
    }
    test1();

    // 배열 해체 할당 + 나머지연산자
    function test2() {
        let [a, , , ...b] = [1, 2, 3, 4, 5, 6]; //건너뛸수도있다

        console.log(a); // 1
        console.log(Array.isArray(b)); //true
        console.log(b); // [4,5,6]

        let [c, d, [e, f]] = [1, 2, [3, 4]];
        console.log(c, d, e, f);
    }
    test2();

    //파라미터 기본값에서 배열해체
    function test3([a, b, c] = [1, 2, 3]) {
        console.log(a, b, c)
    }
    test3(undefined);


    /*************
    *
    * 객체 해체할당
    * 
    **************/
    function test4() {
        //ES5
        var obj = { name: "민호", age: 23 };
        var name = obj.name;
        var age = obj.age;

        //ES6
        let obj2 = { name2: "민호", age2: 23 };
        let name2, age2;
        let a, b;

        ({ name2, age2 } = obj2); //기본적으로 변수명과 프로퍼티 명은 같아야함
        ({ name2: a, age2: b } = obj2); //변수명과 프로터피 명을 바꾸고싶다면 이렇게...
        let { name2: c, age2: d } = obj2; //아예 한줄 표현도 가능

        console.log(c, d);
    }
    test4();

    //중첩 객체 해체
    function test5() {
        let { name, otherInfo: { age } } = { name: "수지", otherInfo: { age: 23 } };
        console.log(name, age);
    }
    test5();
}

function testArrowFunction() {
    //화살표 함수 (익명함수)

    function test1() {
        // ES6 익명함수로 표현
        // let circleArea = (pi, r) => {
        //     let area = pi * r * r;
        //     return area;
        // }

        // ES6 한줄로 표현
        let circleArea = (pi, r) => pi * r * r;

        // ES5 익명함수로 표현
        // var circleArea = function(pi, r){
        //     let area = pi * r * r;
        //     return area;
        // };

        // 일반 함수로 표현
        // function circleArea(pi, r){
        //     let area = pi * r * r;
        //     return area;
        // }

        let result = circleArea(3.14, 3);
        console.log(result);
    }
    test1();

    function test2() {
        var object = {
            f1: function () {
                console.log(this);
                var f2 = function () { console.log(this); }
                f2();
            },
            f2: () => {
                console.log(this);
                var f2 = () => { console.log(this); }
                f2();
            }
        }
        object.f1(); //object, window 
        object.f2(); //wibdow, window
    }
    test2();
}

function testNumber() {
    //진수표현
    function test1() {
        //2진수 : 숫자 앞에 0b 를 붙인다
        let a = 0b00001111;
        let b = 15;
        console.log(a===b);

        //8진수 : ES5까지는 숫자 앞에 0을 붙였으나, 종종 헷갈리는 현상이 있어 ES6에서는 0o 를 붙이는것으로 변경
        let c_ = 017; // ES5
        let c = 0o17; // ES6
        let d = 15
        console.log(c === d && c_===d );
    }
    //test1();

    //isInteger 
    function test2(){
        let e = 17.0;
        let f = 1.2;
        console.log(Number.isInteger(e));
        console.log(Number.isInteger(f));
    }
    //test2();

    //isNaN
    function test3(){
        let a = "NaN";
        let b = NaN;
        let c = "안녕하세요";
        let d = 12;

        console.log(Number.isNaN(a));
        console.log(Number.isNaN(b));
        console.log(Number.isNaN(c));
        console.log(Number.isNaN(d));
    }
    test3();
    
}

document.onreadystatechange = function () {
    if (document.readyState == "interactive") {

        /****************
         * 
         * ES6 기본 문법
         * 
         ***************/
        //let, var의 차이
        //testLetAndVar();

        //const 
        //testConst();

        //파라미터의 기본 값
        //testParameterDefaultValue();

        //펼침 연산자
        //testSpreadOperator();

        //나머지 파라미터
        //testRestParameter();

        //해체할당
        //testDestructuringAssign();

        //화살표함수
        //testArrowFunction();

        /****************
         * 
         * ES6 라이브러리
         * 
         ***************/
        //Number 객체의 새 프로퍼티, 메소드
        testNumber();

    }
}