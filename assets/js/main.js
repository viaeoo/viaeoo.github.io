'use strict';

window.onload = () => {
	// add class
	function addClass(element, className) {
		element.className += " " + className;
	}

	// remove class
	function removeClass(element, className) {
		var check = new RegExp("(\\s|^)" + className + "(\\s|$)");
		element.className = element.className.replace(check, " ").trim();
	}

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

	// project tab event
	(function() {
		// tab define
		var tabBtns = document.querySelectorAll('.js-tab-btn .btn'); // tab button
		var tabContents = document.querySelectorAll('.js-tab-content'); // tab content

		// tab event bind
		if (tabBtns) {
			tabBtns.forEach(function(tabBtn, index) {
				tabBtn.addEventListener('click', function(e) {
					// default event
					e.preventDefault();
					if (!this.className.match(/\bactive\b/)) {
						var category = e.target.attributes['data-tab'].value;
						// tab class
						addClass(this, 'active');
						removeClass(tabBtns[index ? 0 : 1], 'active');
						// tab content show & hide event
						tabContents[index ? 0 : 1].style.display = 'none';
						tabContents[index].style.display = 'block';
					} else {
						// todo
					}
				}, false);
			});
		} else {
			// todo
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