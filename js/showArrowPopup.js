import Rx from 'rx'

import isMobileMediaQueries from './isMobileMediaQueries'

export default function showArrowPopup(arrow$) {
	var start$ = Rx.Observable.just(isMobileMediaQueries())

	// if mobile, set listener for resize to desktop, show arrow on change
	start$.filter(isMobile => isMobile)
		.do(desktopListener)
		.subscribe()

	// if desktop, show the popup
	start$.filter(isMobile => !isMobile)
		.do(render)
		.subscribe()

	function render() {
		arrow$
			.filter(isArrowVisible)
			.reduce(getBestArrow)
			.delay(1500)
			.do(blinkArrow)
			.do(addPopup)
			.delay(6000)
			.do(removePopup)
			.subscribe(stopBlinkArrow)
	}

	function desktopListener() {
		var dispose = Rx.Observable.fromEvent(window, 'resize').debounce(500)
			.map(resize => isMobileMediaQueries())
			.filter(isMobile => !isMobile)
			.do(render)
			.do(dispose)
			.subscribe()
	}
}

// get arrows that are fully in view
function isArrowVisible(arrow) {
	var arrowRect = arrow.getBoundingClientRect()
	return arrowRect.bottom >= arrowRect.height && arrowRect.bottom <= window.innerHeight
}

// get down arrow if available
function getBestArrow(prev, curr) {
	return prev.classList.contains('pagedown') ? prev : curr
}

function blinkArrow(arrow) {
	Velocity(arrow.firstElementChild, {opacity: 1}, {duration: 600, easing: 'ease', loop: true})
}

function addPopup(arrow) {
	var popup = arrow.lastElementChild
	popup.style.left = window.innerWidth
	Velocity(popup, {opacity: [1, 0], left: [.56 * arrow.parentNode.clientWidth, window.innerWidth]}, {duration: 400, easing: 'ease'})
}

function removePopup(arrow) {
	Velocity(arrow.lastElementChild, {opacity: 0}, {duration: 300, easing: 'ease'})
}

function stopBlinkArrow(arrow) {
	Velocity(arrow.firstElementChild, 'stop')
}
