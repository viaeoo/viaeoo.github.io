---
layout: post
title: 'Content Sectioning Elements'
date: 2017-02-21 +0900
categories: HTML
tag: ['HTML', 'HTML5', 'Sectioning']
---

#### 들어가기

- 콘텐츠 섹션을 사용하면 문서를 논리적으로 구성할 수 있다.
- 섹션 요소를 사용하여 머리글 및 바닥 글 탐색과 내용 섹션을 식별하는 제목 요소를 포함하여 페이지 컨텐츠에 대한 광범위한 개요(아웃라인)를 만들 수 있다.
	
#### Content Sectioning Elements 

##### section

section 요소는 문서의 일반적인 섹션, 즉 일반적으로 제목이있는 내용의 주제별 그룹을 나타낸다. 이러한 섹션요소는 헤딩요소(h1 ~ h6)를 하위요소로 둔다. 또한, 일반적인 컨테이너(div) 역할이 아니며, 만일 컨테이너 자체로서 독립적인 분리가 가능하다면 아래에 나올 article 요소로 사용하는 것이 적절하다.

```html
<section>
    <-- heading -->
    <h1>Heading</h1>
    <p>Contents</p>
</section>
```

##### header

header 요소는 소개 또는 탐색 보조 그룹을 나타냅니다. 일부 표제 요소뿐만 아니라 로고, 검색 양식 등의 다른 요소를 포함 할 수 있다. 이 요소는 섹션 내용이 아니므로 개요에 새 섹션을 추가하지 않으며, 섹션의 제목 (h1-h6 요소)을 포함하도록되어 있지만 필수는 아니다.

```html
<header>
    <h1>Main Title</h1>
    <img src="logo.png" alt="logo">
</header>
```

##### nav

nav 요소는 네비게이션으로 다른 페이지 또는 페이지 내의 부분 (탐색 링크가 포함 된 섹션)에 연결되는 페이지의 섹션을 나타낸다. 모든 링크요소에 nav가 있어야하지는 않으며, 대표적으로 하단에서는 footer를 사용하는 것이 더 적절하다.

```html
<nav>
    <ul>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
    </ul>
</nav>
```

##### article

article 요소는 문서, 페이지, 응용 프로그램 또는 사이트에서 독립적으로 배포하거나 재사용 할 수있는 독립된 구성을 나타낸다. 일반적으로 하위요소로 헤딩요소를 포함해야 하며, article 요소가 중첩되는 경우 내부요소가 외부요소와 관련된 부분을 나타낸다. 게시글의 작성자는 address 요소를, 날짜 및 시간은 time 요소의 datatime 속성을 사용하여 나타낼 수 있다.  
(예 : 포럼 게시물, 잡지 또는 신문 기사 또는 블로그 항목)

```html
<article>
    <header>
        <h1>Title</h1>
    </header>
    <section>
        <p>Contents</p>
    </section>
    <footer>
        <address>address</address>
    </footer>
</article>
```

##### aside

aside 요소는 문서의 주요 내용에 접선 방향으로 연결된 내용이있는 문서의 섹션을 나타낸다. 주로 사이드로 표시되는 부분이며, 본문과 연관이 적은 컨텐츠에 사용한다.

```html
<article>
    <header>
        <h1>Title</h1>
    </header>
    <section>
        <p>Contents</p>
    </section>
    <aside>
        <p>Side Contents</p>
    </aside>
    <footer>
        <address>address</address>
    </footer>
</article>
```

##### footer

footer 요소는 가장 가까운 섹션 콘텐츠 또는 섹션 루트 요소에 대한 바닥 글을 나타낸다. 바닥 글에는 일반적으로 섹션 작성자, 저작권 데이터 또는 관련 문서에 대한 링크가 들어 있다. 이 요소에 포함될 수있는 address 요소에 작성자에 대한 정보를 포함할 수 있다.

```html
<footer>
    <address>address</address>
    <p>copyright</p>
</footer>
```

##### address

address 요소는 가장 가까운 article 또는 body 조상에 대한 연락처 정보를 제공한다. 후자의 경우에는 전체 문서에 적용된다. 연락처 이외의 임의의 정보에는 p 요소가 적절한 표기이며, 해당 요소는 연락처 정보 외에 더 많은 정보를 포함할 수 없다.

```html
<footer>
    <address>address</address>
</footer>
```

#### 참고 자료

- <http://www.w3.org/TR/html5/>
- <https://developer.mozilla.org/en-US/docs/Web/HTML/Element>
