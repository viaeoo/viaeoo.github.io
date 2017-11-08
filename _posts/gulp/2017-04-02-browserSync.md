---
layout: post
title: 'BrowserSync'
date: 2017-04-02 +0900
categories: Gulp.js
tag: ['Gulp', 'Gulp.js', 'BrowserSync']
---

#### 들어가기

- BrowserSync는 여러 브라우저에서 웹페이지의 테스트를 도와주는 도구이다.
- BrowserSync는 node.js 기반으로 전역으로 설치하여 사용할 수 있다.
	
#### 1. Gulp-Plugin

Gulp.js에서 BrowserSync를 사용하기 위해 다음과 같은 플러그인이 필요하다.

```javascript
//browser-sync를 사용하기 위한 플러그인
npm install --save-dev browser-sync
```

NPM을 통해 설치한 플러그인은 변수를 통해 참조한다.

```javascript
//플러그인 변수로 지정
var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var broswerSync = require('browser-sync').create();
```

#### 2. Directory

해당 디렉토리 정의는 다음과 같다.

```javascript
broswerSync
	- dist
	- src
```

#### 3. BrowserSync Task

Gulp.js를 통해 BrowserSync의 작업 정의는 다음과 같다.

```javascript
//플러그인 변수로 지정
var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');
var broswerSync = require('browser-sync').create();

//경로 지정
var dir = {
	src : 'src',
	dist : 'dist'
};

var src = {
	html : dir.src + '/*.html'
};

var dist = {
	html : dir.dist + '/'
};

//html minify task define
gulp.task('minifyHtml',function(){
	return gulp.src(src.html)
			.pipe(minifyHtml())
			.pipe(gulp.dest(dist.html))
			.pipe(broswerSync.reload({
				stream : true
			}));
});

//server task define
gulp.task('server', function (){ 
	
	broswerSync.init({ 
		port : 3333, 
		server: { 
			baseDir: dist.html
		}
	});

}); 

//watch task define
gulp.task('watch',function(){
	gulp.watch(src.html,['minifyHtml']);
	broswerSync.reload();
});

//default task define
gulp.task('default',['minifyHtml','server','watch']);
```

#### 참고 자료

- <https://github.com/YangIU/Gulp-Example-Source/blob/master/Basic/gulpfile.js>
- <https://github.com/gulpjs/gulp>