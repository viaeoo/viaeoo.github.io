---
layout: post
title: '약수의 합'
date: 2017-11-06 +0900
categories: Pastime
tag: ['Pastime', '약수의 합']
---

#### 문제

어떤 수를 입력받아 그 수의 약수를 모두 더한 수 sumDivisor 함수를 완성해 보세요. 예를 들어 12가 입력된다면 12의 약수는 [1, 2, 3, 4, 6, 12]가 되고, 총 합은 28이 되므로 28을 반환해 주면 됩니다.

#### 풀이

```javascript
function sumDivisor(num) {
  let answer = num;
  
  for( let i = 1; i <= num / 2; i++) {
  	answer += num % i === 0 ? i : 0;
  };
  
	return answer;
}
```
```javascript
// 실행을 위한 테스트코드
console.log(sumDivisor(12));
```

#### 출처
- <https://programmers.co.kr/>