import Velocity from 'velocity-animate'
import Rx from 'rx'

import isMobileMediaQueries from './isMobileMediaQueries'

export default function siteIntroAnimation(header, main) {

	var resize$ = Rx.Observable.fromEvent(window, 'resize')
		.throttleFirst(16)
		.map(evt => isMobileMediaQueries())
	var desktopResize$ = resize$
		.filter(isMobile => !isMobile)
	var mobileResize$ = resize$
		.filter(isMobile => isMobile)

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

	var introEnd$ = Rx.Observable.merge(mobileStart$, desktopStart$)
		.do(() => main.classList.remove('invisible'))
		.doOnCompleted(setResizeListeners)
		.subscribe()


	function getHeaderTranslate() {
		return -.5 * header.scrollWidth
	}

	function setResizeListeners() {
		desktopResize$
			.map(getHeaderTranslate)
			.do(setHeader)
			.subscribe(next => console.log('desktopResize next'))

		mobileResize$
			.do(() => header.style.transform = '')
			.subscribe(next => console.log('mobileResize next'))
	}

	function setHeader(translateX) {
		translateX = -.5 * header.scrollWidth
		header.style.transform = `translateX(${translateX}px)`
	}
}
