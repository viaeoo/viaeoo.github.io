---
layout: post
title: 'Variables'
date: 2017-06-13 +0900
categories: Javascript
tag: ['javascript', 'ECMAScript2015', 'ES6', 'variables']
---

#### 들어가기

- 자바스크립트 변수를 선언시 let, const 키워드를 사용하여 block level scope 변수를 선언할 수 있다.
- let은 재할당이 가능하며, const는 재할당이 불가능하다. 
	
#### Javascript Variables

Javascript에서 새로운 변수는 let, const, var 키워드로 선언된다. 변수는 대소문자를 구별하며, 반드시 영문자(특수문자 제외), underscore ( _ ), 또는 달러 기호($)로 시작하여야 한다. 이어지는 문자에는 숫자(0~9)도 사용할 수 있다.

##### function level scope vs block level scope

Javascript는 동적 타입(dynamic typed) 언어 혹은 느슨한 타입(loosely typed) 언어이기에, 변수 선언시 타입을 지정하지 않아도 변수 선언이 가능하다. 제공하는 변수 키워드 중 var는 function level scope를 가지며, let과 const는 block level scope를 가진다.

```javascript
// function level scope
var foo = 1

// block level scope
let bar = 1;
```

function level scope와 block level scope의 변수는 몇가지의 차이점을 가지고 있다. 먼저 function level scope는 전역 변수로 사용 시 global object의 프로퍼티가 된다. 즉, Browser에서는 window의 객체, node.js 에서는 global의 객체를 의미한다.

```javascript
var foo = 123; // 전역 변수
console.log(window.foo) // 123
```

또한 function level scope인 var를 통한 변수 선언은 재선언이 가능하지만, block level scope인 let, const를 통한 변수 선언은 재선언이 가능하지 않다.

```javascript
var foo = 123;
var foo = 1; // ok

let foo = 123;
let foo = 1; // SyntaxError: Identifier 'foo' has already been declared
```

##### function level scope (var)

var 키워드를 이용하여 변수를 선언하게 되면, 변수는 function level scope를 가진다. myVarVariable 변수는 for문 밖에서도 사용이 가능하다. 하지만, for문이 시작되기 전 myVarVariable을 호출하면 실제 기대값과는 달리 undefined 가 출력된다. 이는 변수가 [호이스팅](https://developer.mozilla.org/ko/docs/Glossary/Hoisting) 되면서 일어나는 현상이다. 여기서, 호이스팅(hoisting, 끌어올림)은 선언(변수 혹은 함수)을 scope(전역 범위 또는 현재 함수 범위)의 상단으로 이동시키는 javascript의 특이점이다.

```javascript
// function level scope
// function level scope에서는 함수 단위의 스코프이기 때문에 myVarVariable 변수를 for문 밖에서 사용시 에러가 없다.

// console.log 기대값 : ReferenceError: myVarVariable is not defined
// 실제 출력값 : undefined
console.log(myVarVariable)

// for 문 안에서 myVarVariable 선언
for (var myVarVariable = 0; myVarVariable < 5; myVarVariable++) { 
  // myVarVariable는 함수 전체에서 사용 할 수 있다. 
} 

// myVarVariable 출력 : 5
console.log(myVarVariable)
```

변수가 어떻게 생성되며 호이스팅은 어떻게 이루어지는지 좀더 자세히 살펴보면 다음과 같다.

Javascript에서 변수는 3단계에 걸쳐 생성된다. 
**선언 단계(Declaration phase)**
- 변수 객체(Variable Object)에 변수를 등록한다. 이 변수 객체는 스코프가 참조하는 대상이 된다.
**초기화 단계(Initialization phase)**
변수 객체(Variable Object)에 등록된 변수를 메모리에 할당한다. 이 단계에서 변수는 undefined로 초기화된다.
**할당 단계(Assignment phase)**
undefined로 초기화된 변수에 실제값을 할당한다.

var 키워드로 선언된 변수는 선언 단계와 초기화 단계가 한번에 이루어진다. 즉, 스코프에 변수가 등록되고 변수는 메모리에 공간을 확보한 후 undefined로 초기화된다.
따라서 변수 선언문 이전에 변수에 접근하여도 Variable Object에 변수가 존재하기 때문에 에러가 발생하지 않는다. 다만 undefined를 반환하며, 이를 호이스팅이라 한다.

##### block level scope (let, const)

그러나, let 키워드로 선언된 변수는 선언 단계와 초기화 단계가 분리되어 진행된다. 즉, 스코프에 변수가 등록(선언단계)되지만(호이스팅) 초기화 단계는 변수 선언문에 도달했을 때 이루어진다. 위와 동일한 예제 코드를 block level scope인 let으로 변경하여 진행하면, for문 밖에서는 변수에 접근할 수 없으며, 아래 코드와 같이 ReferenceError를 출력하게 된다.

```javascript
// function level scope
// function level scope에서는 함수 단위의 스코프이기 때문에 myVarVariable 변수를 for문 밖에서 사용시 에러가 없다.

// console.log : ReferenceError: myVarVariable is not defined
console.log(myVarVariable)

// for 문 안에서 myVarVariable 선언
for (let myVarVariable = 0; myVarVariable < 5; myVarVariable++) { 
  // myVarVariable는 for문 에서만 사용 할 수 있다. 
} 

// console.log : ReferenceError: myVarVariable is not defined
console.log(myVarVariable)
```

이렇게, 최상단으로 호이스팅은 되지만 Reference를 출력하는 것을 일시적 사각 지대 (Temporal dead zone)라 한다. let 키워드로 생성된 변수는 다음과 같은 단계를 거친다.

**선언 단계(Declaration phase)**
- 변수 객체(Variable Object)에 변수를 등록한다. 이 변수 객체는 스코프가 참조하는 대상이 된다.
**일시적 사각지대(TDZ)**
- 선언은 되었지만, 초기화는 되지 않은 상태: referenceError
**초기화 단계(Initialization phase)**
변수 객체(Variable Object)에 등록된 변수를 메모리에 할당한다. 이 단계에서 변수는 undefined로 초기화된다.
**할당 단계(Assignment phase)**
undefined로 초기화된 변수에 실제값을 할당한다.

##### let vs const

let과 유사한 const는 let과는 다른 몇가지 차이점을 가진다. 보통 const는 상수(변하지 않는 값)를 위해 사용하지만, 반드시 상수만을 위해 사용하지는 않는다. let과의 차이점으로 먼저, let은 초기화 이후 다른 값으로 재할당이 가능하나, const는 초기화 이후 재할당이 금지된다.

```javascript
let foo = 123;
foo = 456; // ok

const FOO = 123;
FOO = 456; // TypeError: Assignment to constant variable.
```

하지만, const 변수의 값이 객체인 경우, 객체에 대한 참조 변경은 금지하지만, 객체의 프로퍼티는 변경할 수 있다.

```javascript
const user = {
  name: 'viae',
  age: 999
}

user = {}; // TypeError: Assignment to constant variable.

user.name = 'vv'; // ok

console.log(user.name) // vv
```

#### 참고 자료

- <https://developer.mozilla.org/ko/docs/A_re-introduction_to_JavaScript>
- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures>
- <http://poiemaweb.com/js-data-type-variable>
- <http://poiemaweb.com/es6-block-scope>