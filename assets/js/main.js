'use strict';

window.onload = () => {
	// navigation event
	(function() {
		// navigation define
		var navElement = document.querySelector('.js-site-nav'); // navigation box
		var navOpenBtn = document.querySelector('.js-btn-nav-open'); // navigation open button
		var navCloseBtn = document.querySelector('.js-btn-nav-close'); // navigation close button
		
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
		var searchElement = document.querySelector('.js-site-search'); // search box
		var searchElementBackground = document.querySelector('.js-site-search .background'); // search background
		var searchBtn = document.querySelector('.js-btn-search'); //  search toggle button

		// search toggle event bind
		searchBtn.addEventListener('click', function() {
			if(searchElement.style.display === 'block') {
				searchElement.style.display = 'none';
			} else {
				searchElement.style.display = 'block';
			}
		}, false);

		// search hide event bind
		searchElementBackground.addEventListener('click', function() {
			searchElement.style.display = 'none';
		}, false);
	}());

	// category event
	(function() {
		// category define
		var categoryElement = document.querySelector('.js-category-list'); // category box
		var categoryElementBackground = document.querySelector('.js-category-background'); // category background
		var categoryBtn = document.querySelector('.js-btn-category'); // category toggle button

		// category event bind
		if (categoryElement) {
			// category toggle event bind
			categoryBtn.addEventListener('click', function() {
				if (categoryElement.style.display === 'block') {
					categoryElement.style.display = 'none';
					categoryElementBackground.style.display = 'none';
				} else {
					categoryElement.style.display = 'block';
					categoryElementBackground.style.display = 'block';
				}
			}, false);
			// category hide event bind
			categoryElementBackground.addEventListener('click', function() {
				categoryElement.style.display = 'none';
				categoryElementBackground.style.display = 'none';
			});
		} else {
			// Todo
		}
	}());

	// resize event
	(function() {
		// highlight define
		var highlightElements = document.querySelectorAll('.highlighter-rouge'); // highlight elements
		var contentsElements = document.querySelector('.site-contents');

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