---
layout: post
title: 'Architecture'
date: 2017-06-17 +0900
categories: Angular
tag: ['Angular', 'typescript', 'Architecture']
---

#### 들어가기

- Angular는 SPA 프레임워크로 웹 개발을 넘어, 네이티브 모바일과 데스크탑 애플리케이션까지 확장가능하다.
- Angular Architecture는 크게 Modules, Components, Templates, Metadata, Data binding, Directives, Services, Dependency injection 이 있다.
	
#### Angular Architecture

Angular는 SPA(Single Page Application) 프레임워크로, 웹 애플리케이션에 필요한 기본적인 기능의 구현체를 정형화된 구조로 제공한다. 웹뿐만 아니라 모바일 웹, 네이티브 모바일과 데스크탑 애플리케이션까지 프론트엔드 개발에 필요한 대부분의 기능을 갖추고 있다. 정적 타입을 제공하는 TypeScript를 주력 언어로 채택하여 대규모 애플리케이션 개발에 보다 적합한 환경을 제공한다. 또한, [Angular CLI](https://cli.angular.io/)를 통해 간편한 개발 환경 구축을 지원한다. 

Angular의 Architecture는 Angular를 이해하는데 필요하며, Architecture를 큰 그림으로 보면 다음과 같다.

![Angular Architecture]({{ site.url }}/downloads/angular/architecture.png)

##### Modules

Angular 앱에는 적어도 하나의 NgModule 이라는 자체 모듈시스템이 있으며, 일반적으로 루트 모듈 인 AppModule이 있다. 루트 모듈은 작은 응용 프로그램에서 유일한 모듈 일 수 있지만 대부분의 응용 프로그램에서는 더 많은 모듈들이 있다. Modules은 components, directives, service 등을 담고 있으며, application과 관련된 기능을 모아 구성하는 하나의 단위 역할이다.

**declarations**  
이 모듈에 속한 view class. Angular에는 세 가지 뷰 클래스가 있으며, 이는 components, directives 및 pipes 이다.

**exports**  
다른 모듈의 구성 요소 템플릿에서 볼 수 있고 사용할 수 있어야하는 요소이다.

**imports**  
이 모듈에서 선언 된 컴포넌트 템플릿이 내보낸 클래스가 필요한 다른 요소이다.

**providers**  
앱의 모든 부분에서 접근 할 수 있으며, 주로 service가 위치한다.

**bootstrap**  
root 컴포넌트가 호출될 때, 불리게 될 메인 application component 이다. 

##### Components

Components는 일반적으로 어플리케이션의 presentation logic을 정의하고 제어한다. class는 properties와 methods는 api를 통해 view와 상호 작용한다. Angular는 사용자가 application을 이동할때 Components를 생성, 업데이트, 파괴하며, ngOnInit()와 같은 선택적 라이프 사이클 hook을 통해 컴포넌트의 라이프 사이클의 모든 순간에 액션을 줄 수 있다.

##### Templates

Templates은 Components의 view를 구성한다. 이는 Angular에서 구성 요소를 렌더링하는 방법을 알려주는 HTML 형식이다. 일반적인 HTML 요소와 *ngFor 와 같은 Angular 템플릿 구문을 사용 하며, custom element를 구성하여 사용할 수 있다. 

##### Metadata

Metadata는 Angular에게 class를 처리하는 방법을 알려준다. 예를 들어, 밑에 예제 코드는 Components 에서 흔히 볼 수 있는 코드로서 @Component 데코레이터는 component의 Metadata가 되며, view를 구성할 수 있도록 알려준다.

```typescript
@Component({
  selector:    'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {
/* . . . */
}
```

**selector**  
selector는 css 선택자로서 html에 포함될 지시자로서의 역할을 수행한다. 예를 들어 앱의 HTML에 \<hero-list></hero-list>가 포함 된 경우 Angular는 해당 태그 사이에 HeroListComponent의 인스턴스를 삽입한다.

**templateUrl**  
templateUrl은 html 경로를 의미한다.

**styleUrls**  
styleUrls은 css(scss) 경로를 의미한다.

##### Data binding

Angular는 Data binding을 지원한다. Data binding의 흐름은 아래 그림과 같으며, () 는 method, [] 는 property, [()] 는 양반향 데이터 바인딩을 의미한다.

![Angular Architecture]({{ site.url }}/downloads/angular/databinding.png)

```html
<hero-detail [hero]="selectedHero"></hero-detail>
<li (click)="selectHero(hero)"></li>
```

##### Directives

Angular는 동적이며, Angular가 렌더링될 때 Directive에 따라 DOM을 변환한다. Directive는 @Directive 데코레이터가 있는 클래스 이며, @Component 데코레이터는 실제 템플릿 지향 가능으로 확장된 @Directive 데코레이터 이다. 또한, Angular에는 레이아웃 구조 (예 : ngSwitch)를 변경하거나 DOM 요소 및 구성 요소의 상태(예 : ngStyle 및 ngClass)를 수정하는 몇 가지 Directive가 추가로 있다. 물론, 자신의 Directive 또한 작성할 수 있다.

```html
<li *ngFor="let hero of heroes"></li>
<hero-detail *ngIf="selectedHero"></hero-detail>
```

##### Services

Service는 애플리케이션에 필요한 모든 value, function 또는 기능을 포괄하는 광범위한 카테고리 이며, 거의 모든 것이 Service가 될 수 있다. Angular는 응용 프로그램 논리를 Service로 위임하고 Dependency injection을 통해 구성 요소가 해당 Service를 사용할 수 있게 함으로써 복잡함을 덜어내고자 한다.

##### Dependency injection

Angular는 새로운 Components에 필요한 Service를 제공하기 위해 종속성 주입을 사용한다. 일반적으로 service의 동일한 인스턴스가 모든 곳에서 사용 가능하도록 root module의 providers에 service를 추가하여 사용한다.

#### 참고 자료

- <https://angular.io/guide/architecture>
- <http://poiemaweb.com/angular-architecture>
- <https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841>
