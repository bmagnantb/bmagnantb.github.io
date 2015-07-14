import Velocity from 'velocity-animate'
import Rx from 'rx'

import isMobileMediaQueries from './isMobileMediaQueries'

export default function siteIntroAnimation(header, main) {

	// listen for all resizes
	var resize$ = Rx.Observable.fromEvent(window, 'resize')
		.throttleFirst(16)
		.map(evt => isMobileMediaQueries())

	// kick off the animation
	var start$ = Rx.Observable.just(isMobileMediaQueries())
		.do(() => header.classList.remove('invisible'))

	// mobile start
	var mobileStart$ = start$.filter(isMobile => isMobile)

	// desktop start
	var desktopStart$ = start$.filter(isMobile => !isMobile)
		.map(getHeaderTranslate)
		.delay(500)
		.do(translateX => {
			Velocity.hook(header, 'translateX', '-8.309em')
			Velocity(header, {translateX}, 1000)
		})

	// mobile and desktop animation ends the same
	// merge them and finish
	var introEnd$ = Rx.Observable.merge(mobileStart$, desktopStart$)
		.do(() => main.classList.remove('invisible'))
		.doOnCompleted(setResizeListeners)
		.subscribe()

	function setResizeListeners() {
		resize$
			.filter(isMobile => !isMobile)
			.map(getHeaderTranslate)
			.do(setHeader)
			.subscribe(next => console.log('desktopResize next'))

		resize$
			.filter(isMobile => isMobile)
			.do(() => header.style.transform = '')
			.subscribe(next => console.log('mobileResize next'))
	}

	function getHeaderTranslate() {
		return -.5 * header.scrollWidth
	}

	function setHeader(translateX) {
		translateX = -.5 * header.scrollWidth
		header.style.transform = `translateX(${translateX}px)`
	}
}
