---
layout: post
title: 'Variables'
date: 2017-05-22 +0900
categories: Sass
tag: ['Sass', 'SCSS', 'Variables']
---

#### 들어가기

- Sass에서 변수는 전역변수와 지역변수가 있다.
- Sass와 SCSS는 기능상 동등하며, CSS 친화적인 문법으로 SCSS를 주로 사용한다.
	
#### Variables

Sass에서는 기존 CSS에서 제공하지 않은 변수의 기능을 제공한다. 변수는 기본적으로 " $변수명 : 변수의값" 으로 정의하며,  Sass에서는 변수의 기능을 통해 재사용 값의 중복으로 발생될 유지보수를 최소화 하며, 다양한 값을 변수에 설정하여 스타일 가이드라인을 잡을 수 있다. 또한 변수의 범위(Scope)가 존재하며, Sass에서는 변수 선언에 따른 전역 변수 가림이 존재한다. 전역 변수 가림은 전역 스코프에 이미 존재하는 변수를 내부 스코프(선택자, 함수, 믹스인…)에서 선언할 때, 지역 변수가 전역 변수를 가린다고 말한다. 기본적으로, 지역 변수가 지역 스코프 내에서는 우선시된다.

( * Sass-guideline에 나와있는 변수를 사용할 조건 )
- 값이 적어도 두 번 반복된다;
- 값이 적어도 한 번은 수정될 가능성이 크다;
- 값의 실현은 모두 변수와 관련되어 있다(즉, 우연에 의한 것이 아니라)

```scss
// 루트 수준에 전역 변수를 초기화합니다.
$variable: 'initial value';

// 전역 변수를 덮어쓰게 하는 믹스인을 만듭니다.
@mixin global-variable-overriding {
  $variable: 'mixin value' !global;
}

.local-scope:before {
  // 전역 변수를 가리는 지역 변수를 만듭니다.
  $variable: 'local value';

  // 믹스인 인클루드: 전역 변수를 덮어씁니다.
  @include global-variable-overriding;

  // 변수의 값을 출력합니다.
  // 전역 변수를 가리기 때문에, **지역** 변수의 값이 출력됩니다.
  content: $variable;
}

// 변수 가림이 없는 다른 선택자에서 변수를 출력합니다.
// 예상대로, **전역** 변수의 값이 출력됩니다.
.other-local-scope:before {
  content: $variable;
}
```

만약 라이브러리나 프레임워크를 혹은 배포될 Sass의 Component를 만들경우 변수에 "!default" 플래그를 붙일 수 있다. 플래그를 붙임으로서 외부 소스를 사용하는 개발자가 변수를 재 정의하지 않게 할 수있다.

```scss
// 자신이 정의한 변수
$baseline: 2em;

// `$baseline`를 선언한 라이브러리
@import 'your-library'; //$baseline: 1em;

// 변수에 지정된 baseline
// $baseline == 2em;
```

위에서 잠깐 나왔던 "!global" 플래그는 해당 지역 변수를 전역변수로 만들어 주는 플래그이다. 

```scss
// Yep
$baseline: 2em;

// Nope
$baseline: 2em !global;
```

#### 여러개의 변수 & map

여러 개의 다른 변수들을 한데 모아 하나의 변수를 사용할 수 있으며, 이는 map을 통해 반복해서 순회할 수 있다.

- map-get ($ map, $ key) : 주어진 키와 연관된 맵의 값을 리턴
- map-merge ($ map1, $ map2) : 두 개의 맵을 새로운 맵으로 병합
- map-remove ($ map, $ keys ...) : 키가 제거 된 새 맵을 리턴
- map-keys ($ map) :지도의 모든 키 목록을 반환
- map-values ​​($ map) :지도의 모든 값 목록을 반환
- map-has-key ($ map, $ key) :지도에 주어진 키와 연관된 값이 있는지 여부를 반환
- keywords ($ args) : 변수 인수를 취하는 함수에 전달 된 키워드를 반환

```scss
// Map
$primary-colors: (
  "red":   (rbga(255, 0, 0, .5), rbg(255, 0, 0)),
  "green": (rbga(255, 0, 0, .5), rbg(0, 255, 0)),
  "blue":  (rbga(255, 0, 0, .5), rbg(0, 0, 255))
);

// Use the map
@mixin colors-w-fallbacks($color) {
  @if not map-has-key($primary-colors, $color) {
    @warn "No color found for #{$color} in $primary-colors map.";
  }

  @each $color-name, $color-code in $primary-colors {
    @if $color-name == $color {
      // The rgba value
      background: "#{nth($color-code, 2)}";
      // And the rgb as a fallback
      background: "#{nth($color-code, 1)}";
    }
  }
}
```

위에서 나온 '#{}'는 변수에 담긴 문자열 그대로를 출력한다. 예를 들어 믹스인에 셀렉터 이름을 넣을 경우 셀럭터 이름이 그대로 출력된다.

#### DataType

Sass는 8개의 데이터타입을 지원한다.

- numbers: **숫자** (예 : 1.2, 13, 10 픽셀)
- stings: 따옴표가 있거나, 없는 텍스트 **문자열** (예 : 'foo', 'bar', baz)
- colors: **색상** (예 : 파란색, # 04a3f9, rgba (255, 0, 0, 0.5))
- booleans: **불리언** (예 : 참, 거짓)
- nulls: **nulls** (예 : null)
- commas: 공백이나 쉼표로 구분 된 **값 목록** (예 : 1.5em 1em 0 2em, Helvetica, Arial, sans-serif)
- maps:  **map** (예 : (key1 : value1, key2 : value2))
- function references: **함수참조**

#### 참고 자료

- <http://sass-lang.com/documentation/Sass/Script/Functions.html>
- <http://sass-lang.com/documentation/file.SASS_REFERENCE.html>
- <https://sass-guidelin.es/ko>
- <https://velopert.com/1712>