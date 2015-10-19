import Velocity from 'velocity-animate'
import Rx from 'rx'

import responsiveHeader from './responsiveHeader'
import scrollArrows from './scrollArrows'
import showArrowPopup from './showArrowPopup'
import siteIntroAnimation from './siteIntroAnimation'

import '../scss/style.scss'

window.onload = app

function app() {

	// for setting arrow functionality
	var arrow$ = Rx.Observable.from(document.querySelectorAll('.arrow'))

	// for setting header functionality
	var header = document.querySelector('header')

	// for intro animation
	var main = document.querySelector('#main')

	// set scroll animations on arrows
	scrollArrows(arrow$)

	// initialize header calculations
	responsiveHeader(header, header.children[0])

	// everything set, show the site
	siteIntroAnimation(header, main)

	showArrowPopup(arrow$)
}
