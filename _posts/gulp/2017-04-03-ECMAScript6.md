---
layout: post
title: 'ECMAScript6'
date: 2017-04-03 +0900
categories: Gulp.js
tag: ['Gulp', 'Gulp.js', 'ECMAScript6', 'ES6']
---

#### 들어가기

- ECMAScript6( === ECMAScript2015)는 자바스크립트 표준 명세이다.
- Gulp.js에서 ES6(ECMAScript6)를 사용하기 위해서 Babel을 통해 ES(5,3,...)로 변환해야한다.
	
#### 1. Gulp-Plugin

Gulp.js에서 ES6를 사용하기 위해 다음과 같은 플러그인이 필요하다.

```javascript
//Babel를 사용하기 위한 플러그인
npm install --save-dev babel
npm install --save-dev babel-core
npm install --save-dev babel-preset-es2015
```

NPM을 통해 설치한 플러그인은 변수를 통해 참조한다.

```javascript
//import gulp from 'gulp' === var gulp = require('gulp');
import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import minifyCSS from 'gulp-minify-css';
import concat from 'gulp-concat';
```

Babel 프리셋을 설정하기 위해 .babelrc 파일을 다음과 같이 만들어야 한다.

```javascript
{
  "presets": ["es2015"]
}
```

이때, gulpfile.js는 gulpfile.babel.js로 파일명을 변경해야 한다.

#### 2. Directory

해당 디렉토리 정의는 다음과 같다.

```javascript
ES6
  - dist
    - js
  - src
    - js
```

#### 3. ECMAScript6 Task

Gulp.js를 통해 ECMAScript6의 작업 정의는 다음과 같다.

```javascript
//strict 모드 설정
'use strict';

//각 플러그인 설정
//import ~~ === require('gulp-uglify');
import gulp from 'gulp';
import gutil from 'gulp-util';
import uglify from 'gulp-uglify';

//경로 지정
//const == 읽기 전용 값인 상수
const dir = {
	src : 'src',
	dist : 'dist'
};

const src = {
	js : dir.src + '/js/*.js'
};

const dist = {
	js : dir.dist + '/js'
};

//task 설정
gulp.task('minifyJs',() => {
	return gulp.src(src.js)
			.pipe(uglify())
			.pipe(gulp.dest(dist.js));
});

gulp.task('default', () => {
    return gutil.log('Gulp is running');
});
```

#### 참고 자료

- <https://github.com/YangIU/Gulp-Example-Source/blob/master/Basic/gulpfile.js>
- <https://github.com/gulpjs/gulp>