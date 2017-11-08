---
---
'use strict';

// Popup class define
class Popup {

	constructor(element, options) {
		this._element = element;
		this._options = Object.assign({
			// default modal options
			modal: true,
			// default popup show & hide delay options
			delay: 300
		}, options);
	}

	modalCreate() {
		//modal elements create
		const modal = document.createElement('div');
		//modal elements add class name
		modal.className = 'modal js-modal';
		//body append child modal
		document.body.appendChild(modal);
	}

	modalOpen() {
		//modal 창이 생성되지 않았을경우 생성
		if(!document.querySelector('.js-modal')) this.modalCreate();
		//modal open
		document.querySelector('.js-modal').setAttribute('data-show','true');
		//팝업 닫기 자동 이벤트 binding
		document.querySelector('.js-modal').addEventListener('click', () => {
			this.modalClose();
			this.popupClose();
		}, false);
	}
	modalClose() {
		document.querySelector('.js-modal').setAttribute('data-show','false');	
	}

	popupOpen() {
		//popup open
		this._element.style.transitionDuration = (this._options.delay / 1000) + 's';
		this._element.setAttribute('data-show','true');
	}
	popupClose() {
		//popup close
		this._element.setAttribute('data-show','false');
	}

	open() {
		if(this._options.modal) {
			this.modalOpen();
			this.popupOpen();
		}else {
			this.popupOpen();
		}
	}
	close() {
		this.modalClose();
		this.popupClose();
	}	
}

window.onload = () => {

  // navigation define
	const navElement = document.querySelector('.js-site-controls'); // navigation box
	const navOpenBtn = document.querySelector('.js-btn-controls-open'); // navigation open button
	const navCloseBtn = document.querySelector('.js-btn-controls-close'); // navigation close button
	// navigation open and close event bind
	const nav = new Popup(navElement);
	navOpenBtn.addEventListener('click', () => { nav.open(); }, false);
	navCloseBtn.addEventListener('click', () => { nav.close(); }, false);

	// category dropDown
	const categoryToggleBtn = document.querySelector('.js-btn-category-toggle');
	const categoryList = document.querySelector('.js-category-list');
	categoryToggleBtn.addEventListener('click', () => {
		if( categoryList.style.display === 'none' || categoryList.style.display === '') {
			categoryList.style.display = 'block';
		} else {
			categoryList.style.display = 'none';
		}
	}, false);
};