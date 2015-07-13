export default function showArrowPopup(arrows) {
	var arrow = getArrow(arrows)
	var initialHTML = addPopup(arrow)
	blinkArrow(arrow.firstElementChild)
	setTimeout(() => {
		removePopup(arrow, initialHTML)
		stopBlinkArrow(arrow.firstElementChild)
	}, 6000)
}

function getArrow(arrows) {
	return arrows
		.filter(isArrowVisible)
		.reduce(getBestArrow)
}

// get arrows that are fully in view
function isArrowVisible(arrow) {
	var arrowRect = arrow.getBoundingClientRect()
	return arrowRect.bottom >= arrowRect.height && arrowRect.bottom <= window.innerHeight
}

function getBestArrow(prev, curr) {
	// get down arrow if available
	return prev.classList.contains('pagedown') ? prev : curr
}

function blinkArrow(arrow) {
	var initialOpacity = window.getComputedStyle(arrow).opacity
	Velocity(arrow, {opacity: 1}, {duration: 600, easing: 'ease', loop: true})
}

function addPopup(arrow) {
	var initialHTML = arrow.innerHTML
	arrow.innerHTML += '<div class="arrow-helper"><h6>Keyboard it<h6></div>'
	var popup = arrow.lastElementChild
	popup.style.left = window.innerWidth
	Velocity(popup, {opacity: [1, 0], left: [.56 * arrow.parentNode.clientWidth, window.innerWidth]}, {duration: 400, easing: 'ease'})
	return initialHTML
}

function removePopup(arrow, HTML) {
	Velocity(arrow.lastElementChild, {opacity: 0}, {duration: 300, easing: 'ease'})
}

function stopBlinkArrow(arrow) {
	Velocity(arrow, 'stop')
}




// animateArrowLoop()

// var initialArrowHtml = arrow.innerHTML
// arrow.innerHTML += '<div class="arrow-helper"><h6>Press keyboard arrows or click me<h6></div>'

// arrow.innerHTML = initialArrowHTML
// completeArrowLoop()

