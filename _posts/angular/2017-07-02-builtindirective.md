---
layout: post
title: 'Built-in directive'
date: 2017-07-02 +0900
categories: Angular
tag: ['Angular', 'typescript', 'Built-in directive']
---

#### 들어가기

- 속성 지시문은 ngClass, ngStyle, ngModel이 있다.
- 구조 지시문은 ngIf, ngFor, ngSwitch가 있다.

#### Angular Built-in Directive

디렉티브(Directive 지시자)는 "DOM의 모든 것(모양이나 동작 등)을 관리하기 위한 지시(명령)"이다. HTML 요소 또는 어트리뷰트의 형태로 사용하여 디렉티브가 사용된 요소에게 무언가를 하라는 지시(directive)를 전달한다. 디렉티브는 애플리케이션 전역에서 사용할 수 있는 공통 관심사를 컴포넌트에서 분리하여 구현한 것으로 컴포넌트의 복잡도를 낮추고 가독성을 향상시킨다.

```typescript
import { Directive, ElementRef, Renderer } from '@angular/core';
@Directive({ selector: '[textBlue]' })
export class TextBlueDirective {
  constructor(el: ElementRef, renderer: Renderer) {
    renderer.setElementStyle(el.nativeElement, 'color', 'blue');
  }
}
```
```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  template: `
    <div textBlue>textBlue directive</div>
  `
})
export class AppComponent {}
```

##### Attribute Directive

속성 지시문은 다른 HTML 요소, 속성, 속성 및 구성 요소의 동작을 수신하고 수정합니다. 일반적으로 요소에 HTML 속성 인 것처럼 적용되므로 이름이 적용된다. 속성 지시문은 아래와 같다.

- ngClass
- ngStyle
- ngModel

###### ngClass

ngClass는 CSS 클래스를 동적으로 추가하거나 제거하여 요소가 나타나는 방식을 제어한다. ngClass 는 우변의 표현식을 평가한 후 HTML class 어트리뷰트를 변경한다. HTML class 어트리뷰트에 의해 이미 클래스가 지정되어 있을 때 ngClass 디렉티브는 HTML class 어트리뷰트를 병합(merge)하여 새로운 HTML class 어트리뷰트를 작성한다.

```html
<!-- toggle the "special" class on/off with a property -->
<div [class.special]="isSpecial">The class binding is special</div>
```

동시에 여러 CSS 클래스 를 추가하거나 제거하려면 NgClass지시문을 사용하는 것이 좋습니다. 세 가지 다른 구성 요소 속성의 상태를 기반으로 세 클래스를 추가하거나 제거하는 객체를 사용하여 setCurrentClasses구성 요소 속성을 설정하는 경우 아래와 같이 나타낼 수 있다.

```typescript
currentClasses: {};
setCurrentClasses() {
  // CSS classes: added/removed per current state of component properties
  this.currentClasses =  {
    'saveable': this.canSave,
    'modified': !this.isUnchanged,
    'special':  this.isSpecial
  };
}
```
```html
<div [ngClass]="currentClasses">This div is initially saveable, unchanged, and special</div>
```

###### ngStyle

ngStyle은 구성 요소의 상태에 따라 인라인 스타일을 동적으로 설정할 수 있다.

```html
<div [style.font-size]="isSpecial ? 'x-large' : 'smaller'" >
  This div is x-large or smaller.
</div>
```

많은 인라인 스타일을 동시에 설정하려면 NgStyle지시문을 사용하는 것이 좋다. 세 가지 다른 구성 요소 속성의 상태를 기반으로 세 가지 스타일을 정의하는 객체를 사용하여 setCurrentStyles구성 요소 속성을 설정하는 구성 요소 메소드는 다음과 같다.

```typescript
currentStyles: {};
setCurrentStyles() {
  // CSS styles: set per current state of component properties
  this.currentStyles = {
    'font-style':  this.canSave      ? 'italic' : 'normal',
    'font-weight': !this.isUnchanged ? 'bold'   : 'normal',
    'font-size':   this.isSpecial    ? '24px'   : '12px'
  };
}
```
```html
<div [ngStyle]="currentStyles">
  This div is initially italic, normal weight, and extra large (24px).
</div>
```

###### NgModel

ngModel은 양반향 데이터 바인딩을 지원할때 사용한다.

```html
<input [(ngModel)]="currentHero.name">
```

데이터 양반향 바인딩 예제는 다음과 같다.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <--- JavaScript import from Angular

/* Other imports */

@NgModule({
  imports: [
    BrowserModule,
    FormsModule  // <--- import into the NgModule
  ],
  /* Other module metadata */
})
export class AppModule { }
```
```html
<input
  [ngModel]="currentHero.name"
  (ngModelChange)="currentHero.name=$event">
```

##### Structural Directive

구조 지시문은 HTML 레이아웃을 담당합니다. 일반적으로 구성 요소를 추가, 제거 및 조작 하여 DOM 구조를 형성하거나 변형한다. 구조 지시문은 아래와 같다.

- ngIf
- ngFor
- ngSwitch

###### ngIf

NgIf는 해당 요소에 지시문을 적용하여 DOM에서 요소를 추가하거나 제거 할 수 있다.

```html
<!-- isActive가 true일 경우 hero-detail 컴포넌트 추가 -->
<hero-detail *ngIf="isActive"></hero-detail>
```

이는 style 속성을 이용하여 요소를 숨기는 것과는 다르다. 요소를 숨기면 해당 요소와 그 자손은 모두 DOM에 남아 있으며, 이는 요소가 메모리에 남아 있게 되어 Angular는 변경 사항을 계속 확인한다. 하지만, ngIf는 요소를 삭제함으로서 리소스를 확보한다.

###### ngFor

NgFor는 반복 항목을 제시 할 수 있는 방법이다. 

```html
<div *ngFor="let hero of heroes">{{hero.name}}</div>
```

위에서 let hero of heroes는 heroes배열 에서 각 영웅을 가져 와서 로컬 hero 변수에 저장하고 반복문이 돌때, hero의 name 속성값을 뿌려줍니다. 

```html
<div *ngFor="let hero of heroes; let i=index"></div>
```

ngFor의 index속성은 NgFor각 반복에서 항목의 0부터 시작하는 인덱스를 반환한다. index템플릿 입력 변수를 템플릿에서 캡처하여 템플릿에서 사용할 수 있다.

###### ngSwitch

NgSwitch는 JavaScript switch문과 같다. 스위치 조건에 따라 여러 요소 중에서 하나의 요소를 표시 할 수 있다. 

```html
<div [ngSwitch]="currentHero.emotion">
  <happy-hero    *ngSwitchCase="'happy'"    [hero]="currentHero"></happy-hero>
  <sad-hero      *ngSwitchCase="'sad'"      [hero]="currentHero"></sad-hero>
  <confused-hero *ngSwitchCase="'confused'" [hero]="currentHero"></confused-hero>
  <unknown-hero  *ngSwitchDefault           [hero]="currentHero"></unknown-hero>
</div>
```
- NgSwitchCase 바인딩 된 값이 스위치 값과 같을 때 해당 요소를 DOM에 추가한다.
- NgSwitchDefault선택된 요소가 없을 때 DOM에 요소를 추가한다.

##### 템플릿 참조 변수

템플릿 참조 변수는 종종 주형 내에 DOM 요소에 대한 참조이다. 태그 내에서 해시 기호(#)를 변수명 앞에 추가하여 템플릿 참조 변수를 선언하고 템플릿 내 자바스크립트 코드에서는 해시 기호없이 참조한다. 템플릿 참조 변수는 템플릿 내에서만 유효하며 컴포넌트 클래스에 어떠한 부수 효과(Side effect)도 주지 않는다. 하지만 템플릿 참조 변수의 값을 이벤트 바인딩을 통해 컴포넌트 클래스로 전달할 수는 있다.

```html
<input #phone placeholder="phone number">

<!-- lots of other elements -->

<!-- phone refers to the input element; pass its `value` to an event handler -->
<button (click)="callPhone(phone.value)">Call</button>
```

* 참조 변수의 범위는 전체 템플릿 이며, 동일한 템플릿에서 동일한 변수 이름을 두 번 이상 정의할 경우 런타임 에러를 발생시킬 수 있다.

이밖에 (#) 대신 ref-접두사 대체 방법을 사용할 수 있다. 

```html
<input ref-fax placeholder="fax number">
<button (click)="callFax(fax.value)">Fax</button>
```

#### 참고 자료

- <https://angular.io/guide/template-syntax>
- <http://poiemaweb.com/angular-component-template-syntax>
