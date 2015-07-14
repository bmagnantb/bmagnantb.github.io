export default function showArrowPopup(arrows) {
	var arrow = getArrow(arrows)
	var initialHTML = addPopup(arrow)
	blinkArrow(arrow.firstElementChild)
	setTimeout(() => {
		Velocity(arrow.lastElementChild, {opacity: 0}, {duration: 300, easing: 'ease'})
		stopBlinkArrow(arrow.firstElementChild)
	}, 6000)
}

function getArrow(arrows) {
	return Array.prototype.slice.call(arrows)
		.filter(isArrowVisible)
		.reduce(getBestArrow)
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
	var initialOpacity = window.getComputedStyle(arrow).opacity
	Velocity(arrow, {opacity: 1}, {duration: 600, easing: 'ease', loop: true})
}

function addPopup(arrow) {
	var popup = arrow.lastElementChild
	popup.style.left = window.innerWidth
	Velocity(popup, {opacity: [1, 0], left: [.56 * arrow.parentNode.clientWidth, window.innerWidth]}, {duration: 400, easing: 'ease'})
}

function stopBlinkArrow(arrow) {
	Velocity(arrow, 'stop')
}
