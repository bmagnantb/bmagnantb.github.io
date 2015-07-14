import Rx from 'rx'

export default function scrollArrows(arrow$) {
	const UP_KEY = 38
	const DOWN_KEY = 40
	const scrollSettings = {duration: 600, easing: 'ease'}

	// observable of observables
	// each observable represents click events on a certain arrow
	var arrowClick$$ = arrow$.map(arrow => arrow.children[0]).map(getClickEvents)

	// all up & down key presses
	var arrowKeyPresse$ = Rx.Observable.fromEvent(window, 'keyup')
		.filter(evt => (evt.keyCode === UP_KEY || evt.keyCode === DOWN_KEY))

	// destinations for each arrow
	var scrollTo$ = arrow$.map(getScrollTo)

	// animate on click
	arrowClick$$
		.zip(scrollTo$, (click$, scrollTo) => {
			click$.subscribe(click => Velocity(scrollTo, 'scroll', scrollSettings))
		})
		.subscribe()

	// animate on up arrow keypress
	arrowKeyPresse$
		.filter(evt => evt.keyCode === UP_KEY)
		.subscribe(evt => {
			scrollTo$
				.distinct()
				.filter(scrollTo => {
					return scrollTo.getBoundingClientRect().top < 0
				})
				.reduce((acc, scrollTo) => {
					return acc.getBoundingClientRect().top > scrollTo.getBoundingClientRect().top
						? acc
						: scrollTo
				})
				.subscribe(scrollTo => {
					Velocity(scrollTo, 'scroll', scrollSettings)
				})
		})

	// animate on down arrow keypresses
	arrowKeyPresse$
		.filter(evt => evt.keyCode === DOWN_KEY)
		.subscribe(evt => {
			scrollTo$
				.distinct()
				.filter(scrollTo => {
					return scrollTo.getBoundingClientRect().top >= 0
				})
				.reduce((acc, scrollTo) => {
					return acc.getBoundingClientRect().top < scrollTo.getBoundingClientRect().top
						? acc
						: scrollTo
				})
				.subscribe(scrollTo => {
					Velocity(scrollTo, 'scroll', scrollSettings)
				})
		})
}

function getClickEvents(clickTarget) {
	return Rx.Observable.fromEvent(clickTarget, 'click')
}

function getScrollTo(arrow) {
	var mainDiv = arrow.parentNode.parentNode
	var directParent = arrow.parentNode

	var directParentIndex = Array.prototype.indexOf.call(mainDiv.children, directParent)

	if (arrow.classList.contains('pageup')) {
		return mainDiv.children[directParentIndex - 1]
	}

	if (arrow.classList.contains('pagedown')) {
		return mainDiv.children[directParentIndex + 1]
	}
}
