---
layout: post
title: '알파벳 재배열'
date: 2017-10-26 +0900
categories: Pastime
tag: ['Pastime', '알파벳 재배열']
---

#### 문제

문자열이 주어질 때, 알파벳의 빈도수가 적은것들이 앞으로 오도록 배열하기
(빈도수가 같을경우 알바펫 순서에 따라 배열)

#### 풀이

```javascript
function alphabet(abc){

  const text = abc.toUpperCase().toString().replace(/(\s*)/gi,'');
  const textArr = {};
  const tempText = [];
  let sortText = '';

  for(let i = 0; i < text.length; i++) {
    let textSlice = text.substring(i, i + 1);

    if(textArr[textSlice]) {
      textArr[textSlice] += 1;
    }
    else {
      textArr[textSlice] = 1;
    } 
  }

  for(alpha in textArr){
    tempText.push(textArr[alpha] + ',' + alpha);
  }

  // sort
  for(let i = 0; i < tempText.length; i++){
    for(let j = i + 1; j < tempText.length; j++) {
      if(tempText[i].split(',')[0] > tempText[j].split(',')[0]) {
				let temp = tempText[j];
				tempText[j] = tempText[i];
				tempText[i] = temp;
			}
      else if(tempText[i].split(',')[0] === tempText[j].split(',')[0]) {
        if(tempText[i].split(',')[1] > tempText[j].split(',')[1]) {
          let temp = tempText[j];
          tempText[j] = tempText[i];
          tempText[i] = temp;
        }
      }
    }
  }
  
  for(let i = 0; i < tempText.length; i++) {
    let count = tempText[i].split(',')[0];
    let alphabetText = tempText[i].split(',')[1];

    for(let j = 0; j < count; j++){
      sortText += alphabetText;
    }
  }

  return sortText;
}
```
```javascript
// 실행을 위한 테스트코드
console.log(alphabet('viaeblogwebsite'));
```
