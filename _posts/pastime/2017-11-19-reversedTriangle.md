---
layout: post
title: '역삼각형 출력하기'
date: 2017-11-19 +0900
categories: Pastime
tag: ['Pastime', '역삼각형 출력하기']
---

#### 문제

printReversedTriangle 메소드는 양의 정수 num을 매개변수로 입력받습니다.  
다음을 참고해 *(별)로 높이가 num인 삼각형을 문자열로 리턴하는 printReversedTriangle 메소드를 완성하세요.  
높이(num)가 3일때 다음과 같은 문자열을 리턴하면 됩니다.

#### 풀이

```javascript
function printReversedTriangle(num) {
  let result = ''

  for(let i = num; i > 0; i--) {
    for(let j = i; j > 0; j--) {
    	result += '*';
    }
  	result += '\n';
  }

  return result
}
```
```javascript
// 실행을 위한 테스트코드
console.log("결과 : " +'\n'+ printReversedTriangle(3));
```

#### 출처
- <https://programmers.co.kr/>