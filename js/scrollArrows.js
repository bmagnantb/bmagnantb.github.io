export default function scrollArrows(arrows) {
	const UP_KEY = 38
	const DOWN_KEY = 40
	var animationAction = 'scroll'
	var animationSettings = {duration: 600, easing: 'ease'}

	arrows.forEach(function(val) {
		var clickTarget = val.children[0]
		var scrollTo = getScrollTo(val)

		clickTarget.addEventListener('click', Velocity.bind(null, scrollTo, animationAction, animationSettings))

		if (val.classList.contains('pageup')) {
			window.addEventListener('keyup', function(evt) {
				if (evt.keyCode === UP_KEY && scrollTo.getBoundingClientRect().top < 0) {
					Velocity(scrollTo, animationAction, animationSettings)
				}
			})
		}
		if (val.classList.contains('pagedown')) {
			window.addEventListener('keyup', function(evt) {
				if (evt.keyCode === DOWN_KEY && scrollTo.getBoundingClientRect().top >= 0 && scrollTo.getBoundingClientRect().top <= window.innerHeight) {
					Velocity(scrollTo, animationAction, animationSettings)
				}
			})
		}
	})
}

function getScrollTo(arrow) {
	var mainDiv = arrow.parentNode.parentNode
	var directParentId = arrow.parentNode.id

	var directParentIndex = Array.prototype.map.call(mainDiv.children, function(val) {
		return val.id
	}).indexOf(directParentId)

	if (arrow.classList.contains('pageup')) {
		return mainDiv.children[directParentIndex - 1]
	}

	if (arrow.classList.contains('pagedown')) {
		return mainDiv.children[directParentIndex + 1]
	}
}
