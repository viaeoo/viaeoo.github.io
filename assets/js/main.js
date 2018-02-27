---
---
'use strict';

window.onload = () => {
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
};