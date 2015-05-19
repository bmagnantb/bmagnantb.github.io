"use strict"

import Velocity from 'velocity-animate'

import responsiveHeader from './responsiveHeader'
import responsiveArrows from './responsiveArrows'
import scrollArrows from './scrollArrows'

window.onload = app

function app() {

	// values for arrow calculations
	var arrows = Array.prototype.slice.call(document.querySelectorAll('.arrow'))


	// set height on arrow containers for hover
	responsiveArrows(arrows)

	// set scroll animations on arrows
	scrollArrows(arrows)

	// values for header calculations
	var header = document.querySelector('header')

	// initialize header calculations
	responsiveHeader(header, header.children[0])

	// everything set, show the site
	document.body.style.opacity = 1;
}
