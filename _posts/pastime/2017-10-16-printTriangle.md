---
layout: post
title: '삼각형 출력'
date: 2017-10-16 +0900
categories: Pastime
tag: ['Pastime', '삼각형출력']
---

#### 문제

printTriangle 메소드는 양의 정수 num을 매개변수로 입력받습니다. 다음을 참고해 *(별)로 높이가 num인 삼각형을 문자열로 리턴하는 printTriangle 메소드를 완성하세요. printTriangle이 return하는 String은 개행문자('\n')로 끝나야 합니다.

#### 풀이

```javascript
function printTriangle(num) {
  let result = ''
  
  for (let i = 1; i <= num; i++) {
  	result += addTriangle(i);
  } 
  
  return result
}
function addTriangle(num) {
  return num ? '*' + addTriangle(num - 1) : '\n';
}
```
```javascript
// 실행을 위한 테스트코드
console.log( printTriangle(3) );
```

#### 출처
- <https://programmers.co.kr/>