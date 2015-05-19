"use strict"

var Velocity = require('velocity-animate')

window.onload = app

function app() {

	document.body.style.opacity = 1;


	// set scroll animations on arrows
	setScroll(document.querySelector('#about .pagedown span'), document.querySelector('#skills'))
	setScroll(document.querySelector('#skills .pageup span'), document.querySelector('#about'))
	setScroll(document.querySelector('#skills .pagedown span'), document.querySelector('#projects'))
	setScroll(document.querySelector('#projects .pageup span'), document.querySelector('#skills'))


	scrollTop = document.body.scrollTop
	document.querySelector('header > div').style.marginTop = '0px'
	calcHeader()

	document.addEventListener('scroll', calcHeaderThrottled)
	window.addEventListener('resize', calcHeaderThrottled)

}


function setScroll(scrollFrom, scrollTo) {

	scrollFrom.addEventListener('click', function() {
		Velocity(scrollTo, 'scroll', {duration: 600, easing: 'ease'})
	})
}


var running = false

function calcHeaderThrottled(e) {

	if (running === false) {
		running = true
		requestAnimationFrame(function() {
			calcHeader(e)
			running = false
		})

	}
}



var scrollTop = 0
var header = document.querySelector('header')
var headerDiv = document.querySelector('header > div')
var headerClasses = header.classList
var scroll = document.body.scrollTop - scrollTop
var headerDivMargin

function calcHeader(e) {

	if (!headerClasses.contains('responsive-header') && (headerDiv.scrollHeight >= window.innerHeight)) {
		headerClasses.add('responsive-header')
	}

	else if (headerDiv.scrollHeight <= window.innerHeight) {
		headerClasses.remove('responsive-header')
		headerDiv.style.marginTop = '0px'
	}

	if (headerClasses.contains('responsive-header')) {

		scroll = document.body.scrollTop - scrollTop
		headerDivMargin = headerDiv.style.marginTop.substring(0, headerDiv.style.marginTop.length - 2)

		if (scroll > 0 && (headerDivMargin < (headerDiv.scrollHeight - window.innerHeight))) {
			headerDiv.style.marginTop = Math.abs(headerDivMargin - scroll) <= (headerDiv.scrollHeight - window.innerHeight)
				? (headerDivMargin - scroll + 'px')
				: (-(headerDiv.scrollHeight - window.innerHeight) + 'px')
		}

		else if (scroll < 0 && (headerDivMargin < 0)) {
			headerDiv.style.marginTop = (headerDivMargin - scroll) <= 0
				? headerDivMargin - scroll + 'px'
				: 0 + 'px'
		}
	}

	scrollTop = document.body.scrollTop
}