---
layout: post
title: 'Data Binding'
date: 2017-11-10 +0900
categories: D3.js
tag: ['D3', 'D3.js', 'Data Binding']
---

#### 들어가기

- D3.js에서 데이터 조인은 datum, data가 있다.
- 데이터 바인딩은 자신의 키 값과 같은 키 값을 가지는 문서요소에 할당되는 것이다.

#### D3(Data Drivened Document)

D3에서 데이터바인딩은 셀렉션(d3_selection)의 최하단의 요소들의 __data__속성에 할당된다. 즉, 어떤 문서요소가 __data__ 속성을 가지고 있지 않으면, 그 문서요소에는 D3에 의해 바인딩 된 데이터가 정의되어 있지 않은 것이라 할 수 있다. 

D3에서 데이터는 아래와 같은 방법으로 문서요소에 바인딩 될 수 있다.

- selection.datum를 통해 개별 최하단 문서요소에 직접 할당.
- selection.data를 통해 최하단 문서요소를 원소로 하는 _groups 배열에 조인.
- append, insert, or select 메서드를 통해 원래의 셀렉션으로부터 상속.

##### datum

데이터 바인딩 중 하나인 datum은 문서요소 하나에 데이터를 바인딩 하는 것이다. 이는 직접적으로 데이터 속성에 값을 넣는 것과 동일하다.

```javascript
document.body.__data__ = 42 // (1)
d3.select("body").datum(42); // (2)
```

위에서 (1)번과 (2)번은 정확히 같다. 위의 (1) 코드를 D3를 이용하면 (2)코드가 되는 것이다. 여기서 D3에 바인딩 된 형태를 살펴보면,  

```
selection -- _groups -- body -- 42
```

다음과 같은 형식으로 데이터가 바인딩 되어 있다. 만일 여기에 append('h1')을 추가한다면 바인딩 된 형태는 아래와 같다.

```
// 원래의 셀렉션으로부터 상속
selection -- _groups -- body -- h1 -- 42
```

##### data

data는 데이터를 문서요소 단위로 정의하지 않고 _groups 배열 단위로 정의한다. 데이터는 _groups 배열에 상응하는 배열로 표현되거나, 그런 배열을 반환하는 함수로 표현된다. 중략하면, data는 데이터 배열을 _groups 배열에 어떤 규칙을 가지고 접목하는 것으로 자신의 키 값과 같은 키 값을 가진 문서요소에 할당된다. 키를 할당하는 가장 쉬운 방법은 인덱스를 이용하는 것이다. 첫 번째 데이터와 첫 번째 문서요소의 인덱스 값은 모두 "0"이고, 두 번째 데이터와 두 번째 문서요소의 키 값은 "1", 세 번째는 "2" ... 와 같은 식이다. 숫자 배열을 인덱스를 기준으로 매칭되는 단락 문서요소의 배열에 조인하는 것이 바로 이 방식이다.

```javascript
var numbers = [4, 5, 18, 23, 42];
d3.selectAll("div").data(numbers); // numbers 데이터를 div에 할당
```

하지만, 만일 둘의 순서가 다를 경우 인덱스만으로는 부족하다. 이럴 때는 키 함수를 data 의 두 번째 인자로 넘겨줘야 한다. 키 함수는 주어진 데이터나 문서요소의 키를 반환한다. 예를 들어, 데이터가 name이라는 속성을 가진 객체의 배열이면, 키 함수는 배열의 각 원소 객체의 name 을 반환한다.

```javascript
var letters = [
  {name: "A", frequency: .08167},
  {name: "B", frequency: .01492},
  {name: "C", frequency: .02780},
  {name: "D", frequency: .04253},
  {name: "E", frequency: .12702}
];

function name(d) {
  return d.name;
}

d3.selectAll("div").data(letters, name); // 데이터와 키 함수를 통한 데이터 할당
```

여기서 데이터는 _groups 배열 단위로 독립적으로 조인된다. 즉, 키는 전체 selection 내에서 유일할 필요가 없으며, _groups 배열 내에서만 유일성이 보장 되면 된다. 

#### 참고자료

- <https://github.com/d3/d3/wiki/Tutorials>
- <http://hanmomhanda.github.io/Docs/d3/How-Selections-Work.html>
- <http://blog.nacyot.com/articles/2015-02-02-d3-selection/>