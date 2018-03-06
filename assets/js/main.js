---
---
'use strict';

window.onload = () => {
	// navigation event
	(function() {
		// navigation define
		const navElement = document.querySelector('.js-site-nav'); // navigation box
		const navOpenBtn = document.querySelector('.js-btn-nav-open'); // navigation open button
		const navCloseBtn = document.querySelector('.js-btn-nav-close'); // navigation close button
		
		// navigation open and close event bind
		navOpenBtn.addEventListener('click', () => { 
			navElement.style.display = 'block';
		}, false);
		navCloseBtn.addEventListener('click', () => {
			navElement.style.display = 'none';
		}, false);
	}());
	
	// search event
	(function() {
		// search define
		const searchElement = document.querySelector('.js-site-search'); // search box
		const searchBtn = document.querySelector('.js-btn-search'); //  search toggle button

		// search toggle event bind
		searchBtn.addEventListener('click', () => {
			if (searchElement.style.display === 'block') {
				searchElement.style.display = 'none';
			} else {
				searchElement.style.display = 'block';
			}
		}, false);
	}());

	// category event
	(function() {
		// category define
		const categoryElement = document.querySelector('.js-category-list'); // category box
		const categoryBtn = document.querySelector('.js-btn-category'); // category toggle button

		// category event bind
		if (categoryElement) {
			categoryBtn.addEventListener('click', () => {
				if (categoryElement.style.display === 'block') {
					categoryElement.style.display = 'none';
				} else {
					categoryElement.style.display = 'block';
				}
			}, false);
		} else {
			// Todo
		}
	}());

	// resize event
	(function() {
		// highlight define
		const highlightElements = document.querySelectorAll('.highlighter-rouge'); // highlight elements
		const contentsElements = document.querySelector('.site-contents');

		// resize fun
		function higlightResize() {
			highlightElements.forEach((highlight, index) => {
				highlight.style.width = 'calc(' + contentsElements.clientWidth + 'px' + ' - 5rem)';
			});
		}
		
		// resize event bind
		if (highlightElements) {
			// init resize
			higlightResize();

			window.addEventListener('resize', () => {
				higlightResize();
			}, false);
		} else {
			window.removeEventListener('reisze', () => {
				higlightResize();
			}, false);
		}
	}());
};