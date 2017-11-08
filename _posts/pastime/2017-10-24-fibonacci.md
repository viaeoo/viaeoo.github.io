---
layout: post
title: '피보나치'
date: 2017-10-24 +0900
categories: Pastime
tag: ['Pastime', '피보나치']
---

#### 문제

피보나치 수는 F(0) = 0, F(1) = 1일 때, 2 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 점화식입니다. 2 이상의 n이 입력되었을 때, fibonacci 함수를 제작하여 n번째 피보나치 수를 반환해 주세요. 예를 들어 n = 3이라면 2를 반환해주면 됩니다.

#### 풀이

```javascript
function fibonacci(num) {
	const answer = num > 1 ? fibonacciRepeat(num) : num;
	
	function fibonacciRepeat(num) {
		let prevFibonacci = 1;
		let previousFibonacci = 0;
		let temp;
		
		for (let n = 2; n <= num; n++) {
			temp = prevFibonacci + previousFibonacci;
			previousFibonacci = prevFibonacci;
			prevFibonacci = temp;
    }
    
		return temp;
  }
  
	return answer;
}
```
```javascript
// 실행을 위한 테스트코드
console.log(fibonacci(3));
```

#### 출처
- <https://programmers.co.kr/>