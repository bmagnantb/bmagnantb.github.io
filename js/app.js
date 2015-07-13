"use strict"

import Velocity from 'velocity-animate'
import Promise from 'bluebird'

import responsiveHeader from './responsiveHeader'
import scrollArrows from './scrollArrows'
import showArrowPopup from './showArrowPopup'

import siteIntroAnimation from './siteIntroAnimation'

window.onload = app

function app() {

	// for setting arrow functionality
	var arrows = Array.prototype.slice.call(document.querySelectorAll('.arrow'))

	// for setting header functionality
	var header = document.querySelector('header')

	// for intro animation
	var main = document.querySelector('#main')

	// set scroll animations on arrows
	scrollArrows(arrows)

	// initialize header calculations
	responsiveHeader(header, header.children[0])

	// everything set, show the site
	siteIntroAnimation(header, main)

	setTimeout(() => {
		showArrowPopup(arrows)
	}, 1300)
}
