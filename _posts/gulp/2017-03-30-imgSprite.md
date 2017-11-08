---
layout: post
title: 'ImgSprite'
date: 2017-03-30 +0900
categories: Gulp.js
tag: ['Gulp', 'Gulp.js', 'img-sprite']
---

#### 들어가기

- 이미지 스프라이트는 단일 이미지에 들어있는 이미지 모음이다.
- 이미지 스프라이트를 사용하면 서버 요청 수를 줄이고 대역폭을 절약 할 수 있다.
	
#### 1. Gulp-Plugin

Gulp.js에서 ImgSprite를 사용하기 위해 다음과 같은 플러그인이 필요하다.

```javascript
//Img-Sprite를 하기 위한 플러그인
npm install --save-dev gulp.spritesmith

//두 가지의 작업을 동시에 실행하기 위한 플러그인
npm install --save-dev merge-stream
```

NPM을 통해 설치한 플러그인은 변수를 통해 참조한다.

```javascript
//플러그인 변수로 지정
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
```

#### 2. Directory

해당 디렉토리 정의는 다음과 같다.

```javascript
ImgSprite
  - dist
    - img
  - src
    - img
```

#### 3. ImgSprite Task

Gulp.js를 통해 ImgSprite의 작업 정의는 다음과 같다.

```javascript
//플러그인 변수로 지정
var gulp = require("gulp");
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');
     
//경로 지정
var dir = {
	src : 'src',
	dist : 'dist'
};

var src = {
	img : dir.src + '/img/*.png'
};

var dist = {
	img : dir.dist + '/img/'
};

//sprite task define
gulp.task('sprite',function(){
	var spriteData = 
	gulp.src(src.img).pipe(spritesmith({
    	imgName: 'sprite.png',
    	cssName: 'sprite.css',
    	padding: 5,
	}));

	var imgStream = spriteData.img
	.pipe(gulp.dest(dist.img));

	var cssStream = spriteData.css
	.pipe(gulp.dest(dir.src + '/css'));

	return merge(imgStream, cssStream);
});

//watch task define
gulp.task('watch',function(){
	gulp.watch(src.img,['sprite']);
});

//default task define
gulp.task('default',['sprite','watch']);
```

#### 참고 자료

- <https://github.com/YangIU/Gulp-Example-Source/blob/master/Basic/gulpfile.js>
- <https://github.com/gulpjs/gulp>