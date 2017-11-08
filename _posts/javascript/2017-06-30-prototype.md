---
layout: post
title: 'Prototype'
date: 2017-06-30 +0900
categories: Javascript
tag: ['javascript', 'ECMAScript2015', 'ES6', 'prototype']
---

#### 들어가기

- javascript는 prototype을 기반으로 OOP를 수행할 수 있다.
- prototype은 속성을 저장하는 공간과 함께 상위 객체에 대한 링크를 가진다.
	
#### Javascript Prototype

**Javascript**는 prototype 기반 언어이며, prototype을 기반으로 OOP(Object Oriented Programming)를 수행할 수 있다. prototype은 본래 어떠한 객체가 만들어지기 위해 그 객체의 모태가 되는 원형을 이야기한다. 여기서 원형이라는 것은 객체가 가지는 조상을 말한다.

```javascript
// 객체 리터널로 obj 객체 생성
const obj = {};
// obj 출력
console.log(obj);
```

자바스크립트 객체를 보면, 속성을 저장하는 동적인 "가방"과 (자기만의 속성이라고 부른다) 프로토타입 객체에 대한 링크를 가진다. 객체의 어떤 속성에 접근하려할 때 그 객체 자체 속성 뿐만 아니라 객체의 prototype, 그 prototype의 prototype 등 프로토타입 체인의 종단에 이를 때까지 (null) 그 속성을 탐색한다.(이것을 prototype chain 이라 한다.)

ECMAScript 표준에 따라 Object.[[Prototype]]이라는 표기법을 사용하여 Object의 프로토 타입(prototype link)을 지정한다. ECMAScript 2015부터 [[Prototype]]에 Object.getPrototypeOf()과 Object.setPrototypeOf()을 이용하여 접근하기 때문이다. 이것은 자바스크립트의 표준은 아니나 많은 브라우저에 구현되어 사실상의 표준이 된 속성 \__proto__ 와 동일( [[prototype]] === \__proto__ )하다. 

```javascript
// 속성 a와 b를 가지고 있는 obj
const obj = { 
  a: 1, 
  b: 2
};
// 속성 b와 c를 가지고 있는 obj의 [[prototype]](__proto__)
obj.__proto__ = {
  b: 3,
  c: 4
};
// obj는 'a'라는 속성을 가지고 있기에 1이 출력
console.log(obj.a);
// 마찬가지로 obj에 b라는 속성을 가지고 있으며, 이 값은 2이기에 2를 출력
// obj의 [[prototype]]역시 b속성을 가지고 있지만 이 값은 읽히지 않는다. 이것을 "속성의 가려짐(property shadowing)" 이라고 부른다.
console.log(obj.b); 
// obj에 'c'라는 속성이 찾지 못해 상위 단계인 [[prototype]]에 거슬러 올라간다.[[prototype]] 속성 'c'를 찾아 이 값을 출력
console.log(obj.c); 
// ojb에 'd'라는 속성이 없으며, 상위 단계인 [[prototype]]역시 속성 'd'를 가지고 있지 않다.
// o.[[Prototype]].[[Prototype]]은 null이다. 찾는 것을 그만두자.
// 속성이 발견되지 않았기에 undefined를 출력한다.
console.log(obj.d);
// obj.__proto__ 는 Object.prototype과 같다.
console.log(obj.__proto__ === Object.prototype);
```

자바스크립에서는 객체에 속성으로 함수를 지정하여 메소드를 만들어 사용할 수 있다. 상속된 함수가 실행 될 때, this 라는 변수는 상속된 객체를 가르킨다.

```javascript
// 속성 a와 m 아리는 메소드를 가진 obj
const obj = {
  a: 2, // property
  m: function(){ // method
    return this.a + 1; // 객체에서 this는 해당 객체를 가리킨다.
  }
};
// obj의 m 함수를 호출 -> 3
console.log(obj.m());
// 프로토타입을 obj로 가지는 객체 obj2 (obj로부터 상속)
const obj2 = Object.create(obj);
// obj2에 a라는 속성에 13을 할당
obj2.a = 13;
// obj2의 m 함수를 호출 -> 14
// 해당 함수의 this는 상속된 객체(obj2)를 가리킨다.
console.log(obj2.m());
```

자바스크립트에서 생성자 함수를 통해 객체를 생성할수 있으며, 생성자는 new 연산자를 사용해 함수를 호출하면 된다. 함수로 객체를 생성할 경우 특별한 속성을 갖게 된다. 

```javascript
// Person 객체 (생성자 함수)
function Person(){};
// Person prototype 출력
console.log(Person.prototype);

// Object
// > constructor
// > __proto__ 
```

위에서 Person 객체(생성자 함수)는 [[prototype]] 이외에, constructor 속성을 가진다. 이 속성은 생성자 함수(여기서는 Person)가 생성 될 때 갖게 되며, 자기 자신의 원형객체가 아닌 **자신을 통해 만들어질 객체**들이 사용할 객체(원형의 객체)를 만든다. 즉, constructor는 객체를 생성하는 생성자 함수 객체(Person)를 가리킨다. 

```javascript
// Person.prototype
Person.prototype.constructor === Person // true
// Person 객체를 가지고 특정 사람을 객체로 생성(인스턴스)
const person = new Person();
// person constructor
// prototype chain에 의해 person 속성 중 constructor 탐색
console.log(person.constructor === Person); //true
```

ECMAScript2015에는 몇 가지 키워드가 도입되어 class를 구현하였다. 이는 새롭게 추가된 문법적 요소이나, 기본적으로는 기존과 같이 prototype 기반으로 작동한다. 새로 도입된 키워드는 class, constructor, static, extends, 그리고 super가 있다.

```javascript
// Person이라는 class 생성
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
// Person을 상속받은 Student 생성
class Student extends Person {
  constructor(name, age, major) {
    // name과 age 상속
    super(name, age);
    this.major = major;
  }
  // getter info
  get info() {
    return `이름 : ${this.name}, 나이 : ${this.age}, 전공 : ${this.major}`;
  }
}
```

위의 해당 코드를 기존 코드로 바꾸었을 경우 아래와 같다.

```javascript
// Person 객체 생성
function Person(name, age) {
  this.name = name;
  this.age = age;
}
// Student 객체 생성
function Student(name, age, major) {
  // super(name, age)
  Person.call(this, name, age);
  this.major = major
}
// Student 객체에 Person 객체의 prototype 상속
Student.prototype = Object.create(Person.prototype);
// 상속받은 Student 객체의 생성자를 Student로 변경
Student.prototype.conctructor = Student;
// getter info 정의
Student.prototype.info = function(){
  return "이름 : " + this.name + ", 나이 : " + this.age + ", 전공 : " + this.major;
}
```

ECMAScript2015 class를 통한 상속과 기존 prototype을 통한 상속의 또 다른 예제는 아래와 같다.

```javascript
// ECMAScript2015 class예제
// Cat 객체 정의 후 Lion 객체에 상속
class Cat { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}
class Lion extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' roars.');
  }
}
```
```javascript
function Cat(name) {
  this.name = name;
}

Cat.prototype.speak = function () {
  console.log(this.name + ' makes a noise.');
};

function Lion(name) {
  // `super()` 호출
  Cat.call(this, name);
}

// `Cat` 클래스 상속
Lion.prototype = Object.create(Cat.prototype);
Lion.prototype.constructor = Lion;

// `speak()` 메서드 오버라이드
Lion.prototype.speak = function () {
  Cat.prototype.speak.call(this);
  console.log(this.name + ' roars.');
};
```

#### 참고 자료

- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain>
- <https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes>
- <http://insanehong.kr/post/javascript-prototype/>
- <https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67>
- <http://hacks.mozilla.or.kr/2016/04/es6-in-depth-subclassing/>