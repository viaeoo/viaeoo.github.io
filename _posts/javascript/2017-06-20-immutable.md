---
layout: post
title: 'Immutable'
date: 2017-06-20 +0900
categories: Javascript
tag: ['javascript', 'ECMAScript2015', 'ES6', 'Immutable']
---

#### 들어가기

- 객체를 불변의 값으로 만들어 잠재적 문제점을 미연에 방지할 수 있다.
- assign, freeze, spread operator, immutable.js 등을 통해 불변객체를 만들 수 있다.
	
#### Javascript Immutable

Immutability(변경불가성)는 객체가 생성된 이후 그 상태를 변경할 수 없는 디자인 패턴을 의미한다. Javascript에서 객체는 참조(reference) 형태로 전달하고 전달 받는다. 객체가 참조를 통해 공유되어 있다면 그 상태가 언제든지 변경될 수 있기 때문에 문제가 될 가능성도 커지게 된다.

이러한 의도하지 않은 결과를 방지하고자, 객체를 불변객체로 만들어 프로퍼티의 변경을 방지하며 객체의 변경이 필요한 경우에는 참조가 아닌, 방어적 복사(defensive copy)를 통해 새로운 객체를 생성한 후 변경한다. 

Javascript의 기본 자료형(primitive data type)은 변경 불가능한 값(immutable value)이다.  
( 이와 같은 기본자료형을 primitive values 라 한다. )

- Boolean
- null
- undefined
- Number
- String
- Symbol

이를 제외한 모든 값은 객체(Object)이며, 이는 변경 가능한 값이다. 예로, 아래와 같은 코드에서, 문자열은 변경불가능한 값이기 때문에 otherStr 변수에는 새로운 문자열이 할당된다.

```javascript 
const statement = "I am an immutable value";
const otherStr = statement.slice(8, 17);
```

기본 자료형을 제외한 Object Type인 배열을 보면, 변경 가능한 값이기에 해당 배열을 직접 변경한다. 즉, 아래에 예시에서 arr2는 push 메소드에 의해 length값인 1이 할당되며, arr 배열에는 'value'가 들어간다.

```javascript
const arr = [];
const arr2 = arr.push('value');
```

기본 자료형에 대한 불변은 객체 속성일때도 마찬가지이다.

```javascript
const user  = {
  name: 'you',
  age: 99
}

const myName = user.name; // you 할당

user.name = 'me'; // user.name이 sting이기에, 변수 myName의 값은 여전히 you이다.
console.log(myName) // you 
```

만약 객체자체를 할당한다면, 객체는 변할수 있는 값이기에 같은 메모리 영역을 바라보게 된다.

```javascript
const ob1 = {
  name: 'you',
  age: 99
}

const ob2 = ob1; // ob2에 ob1 할당

// ob2의 속성 변경
ob2.name = 'me';
ob2.age = 0;

console.log(ob1.name, ob1.age) // me, 0
```

위에서 속성 name과 age를 가지고 있는 ob1를 ob2에 할당하였다. 할당 후, ob2의 name과 age 속성을 변경하였을시, ob1의 속성또한 변경되게 되는데, 이는 객체가 변경가능하여 이러한 결과가 생기게 된다. 만일 이것이 의도하지 않은 것이라면, 이는 치명적인 문제를 유발할 수 있다.

이러한 문제점을 방지하고자, 변경 가능한 값인 객체에 대한 방어적 복사와 객체 변경 방지를 할 수 있다.

###### [assign](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

객체의 방어적 복사는 assign을 이용하여 행할 수 있다. 이 메소드는 열거할 수 있는 하나 이상의 소스 객체로 부터 타켓 객체로 프로퍼티들을 복사하는데 사용되며, 소스 객체를 대상으로 게터를 호출하며, 타겟 객체로 부터 세터를 호출한다. 만약, 프로퍼티가 쓰기불가능(non-writable) 등과 같이 만약 에러가 발생할 수 있는 상황에서는,  TypeError 가 발생하고 타겟 객체에는 변화가 없을 것이다.

```javascript
// syntax
Object.assign(target, ...sources)

const ob1 = {
  name: 'you',
  age: 99
}

const ob2 = Object.assign({}, ob1); // ob2에 ob1 복사

// ob2의 속성 변경
ob2.name = 'me';
ob2.age = 0;

console.log(ob1.name, ob1.age) // you, 99
console.log(ob2.name, ob2.age) // me, 0
```

위에서 ob2의 속성을 변경하여도 ob1의 속성은 변경되지 않는다. 하지만 ob1은 변경이 가능하다.

###### [freeze](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

freeze는 말 그대로 객체를 얼려 버린다. 여기서 얼려 버린다는 것은 객체에 새로운 속성(property)를 추가할 수 없고, 객체에 원래 존재하던 속성을 제거할 수 없으며, 객체의 속성, 열거가능성(enumerability), 설정가능성(configurability), 값 쓰기 가능성(writability)을 변경할 수 없게 만든다는 것을 의미한다. 즉, 불변의 객체를 만드는 것이다.

```javascript
const ob1 = {
  name: 'you',
  age: 99
}

const ob2 = Object.assign({}, ob1, {name: 'me', age: 0}); // ob2에 ob1 복사

console.log(ob1.name, ob1.age) // you, 99
console.log(ob2.name, ob2.age) // me, 0

Object.freeze(ob1); // 해당 객체를 얼린다.

//
// 만일 'use strict' 모드인경우 TypeError 발생
// 
ob1.name = 'hey'; // 무시 

console.log(ob1.name) // you
```

하지만, 얼려진 객체의 속성값이 객체인 경우에는(즉, 값이 참조형일 경우에는), 그 객체를 명시적으로 얼리지 않으면 그 객체는 변경될 수 있다.

```javascript
const ob1 = {
  inner: {
    name: 'you'
  }
};

Object.freeze(ob1) // 객체를 얼린다.

ob1.inner.name = 'me'; // 객체 안의 내부객체의 속성값 변경
console.log(ob1.inner.name) // me
```

만일 내부 객체까지 변경 불가능한 상태로 한다면, 아래의 함수를 이용하여 할 수 있다.

```javascript
function deepFreeze(obj) {
  const props = Object.getOwnPropertyNames(obj);

  props.forEach((name) => {
    const prop = obj[name];
    if(typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });
  return Object.freeze(obj);
}

const ob1 = {
  inner: {
    name: 'you'
  }
};

deepFreeze(ob1);
```

###### [spread operator](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_operator)

spread operator를 이용하면, 위의 코드보다 조금 더 간결한 코드로 작성할 수 있다. 

```javascript
const ob1 = {
  name: 'you',
  age: 99
}

// 객체 복사
const ob2 = { 
  ...ob1,
  name : 'me'
}

console.log(ob1, ob2);
```

spread operator는 객체만이 아닌, 배열과 함수에서도 사용할 수 있으며, rest parameter로도 이용할 수 있다.

```javascript
let one = [1, 2]; 
let two = [3, 4]; 
let spread = [0 , ...one, 5, ...two ]; 
console.log(spread); // [ 0, 1, 2, 5, 3, 4 ]

let str = 'hello'; 
let spread = [...str]; 
console.log(spread); // [ 'h', 'e', 'l', 'l', 'o' ]

function test( a, b,...rest){ 
  console.log(a,b,rest); 
} 
test(...[1,2,3,4,5]); // 1 2 [ 3, 4, 5 
```

###### [immutable.js](https://github.com/facebook/immutable-js)

만일, 이러한 방법이 아닌 라이브러리를 이용하여 불변의 객체를 만들고자 한다면, [immutable.js](https://github.com/facebook/immutable-js)를 이용하여 할 수 있다. 

#### 참고 자료

- <https://developer.mozilla.org/ko/docs/A_re-introduction_to_JavaScript>
- <https://www.sitepoint.com/immutability-javascript/>
- <http://poiemaweb.com/js-immutability>
- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign>
- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze>
- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_operator>
- <https://github.com/facebook/immutable-js>
