export default function responsiveArrows(arrows) {
	var running = false

	setArrows(arrows)

	document.addEventListener('resize', throttleSetArrows)

	function throttleSetArrows() {
		if (running === false) {
			running = true
			requestAnimationFrame(function() {
				setArrows(arrows)
				running = false
			})
		}
	}
}

function setArrows(arrows) {
	arrows.map(getArrowContainer)
		  .forEach(setArrowDiv)
}

function getArrowContainer(arrow) {

	arrow._centeredSibling = Array.prototype.filter.call(arrow.parentNode.children, function(val) {
		return val.classList.contains('centered')
	})[0]

	return arrow
}

function setArrowDiv(arrow) {
	const maxHeight = 200
	var newHeight
	var siblingPosition = window.getComputedStyle(arrow._centeredSibling).top
	siblingPosition = siblingPosition.substr(0, siblingPosition.length - 2)

	if (arrow.classList.contains('pageup')) {
		arrow.style.height = siblingPosition <= maxHeight
			? siblingPosition + 'px'
			: maxHeight + 'px'
	}

	if (arrow.classList.contains('pagedown')) {
		newHeight = (arrow.parentNode.scrollHeight - arrow._centeredSibling.scrollHeight) - siblingPosition + 'px'
		arrow.style.height = newHeight <= maxHeight
			? newHeight + 'px'
			: maxHeight + 'px'

	}
}
