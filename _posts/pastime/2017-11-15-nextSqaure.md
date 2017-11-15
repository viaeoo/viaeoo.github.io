---
layout: post
title: '정수 제곱근 판별하기'
date: 2017-11-15 +0900
categories: Pastime
tag: ['Pastime', '정수 제곱근 판별하기']
---

#### 문제

nextSqaure함수는 정수 n을 매개변수로 입력받습니다.  
n이 임의의 정수 x의 제곱이라면 x+1의 제곱을 리턴하고, n이 임의의 정수 x의 제곱이 아니라면 'no'을 리턴하는 함수를 완성하세요.  
예를들어 n이 121이라면 이는 정수 11의 제곱이므로 (11+1)의 제곱인 144를 리턴하고, 3이라면 'no'을 리턴하면 됩니다.

#### 풀이

```javascript
function nextSqaure(n){
  let result = 0;
  
  for(let i = 2; i < n; i++) {
  	if(Math.pow(i, 2) < n) {
    	continue;
    }
    else if(Math.pow(i, 2) === n) {
      result = Math.pow(i + 1, 2);
      break;
    }
    else {
      result = 'no';
    	break;
    }
  }

  return result;
}
```
```javascript
// 실행을 위한 테스트코드
console.log("결과 : " + nextSqaure(1600));
```

#### 출처
- <https://programmers.co.kr/>