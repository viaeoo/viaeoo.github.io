---
layout: post
title: '핸드폰번호 가리기'
date: 2017-11-11 +0900
categories: Pastime
tag: ['Pastime', '핸드폰번호 가리기']
---

#### 문제

별이는 헬로월드텔레콤에서 고지서를 보내는 일을 하고 있습니다. 개인정보 보호를 위해 고객들의 전화번호는 맨 뒷자리 4자리를 제외한 나머지를 "*"으로 바꿔야 합니다.
전화번호를 문자열 s로 입력받는 hide_numbers함수를 완성해 별이를 도와주세요.  
(예를들어 s가 "01033334444"면 "*******4444"를 리턴하고, "027778888"인 경우는 "*****8888"을 리턴하면 됩니다.)

#### 풀이

```javascript
function hide_numbers(s){
  const result = new Array(s.length - 3).join('*') + s.substr(s.length - 4, 4);
  
  return result;
}
```
```javascript
// 실행을 위한 테스트코드
console.log("결과 : " + hide_numbers('01033334444'));
```

#### 출처
- <https://programmers.co.kr/>