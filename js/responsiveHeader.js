// sets initial position and registers callbacks for changing
export default function responsiveHeader(header, headerDiv) {
	var lastScrollTop = document.body.scrollTop
	var running = false

	setHeader(header, headerDiv, lastScrollTop)

	document.addEventListener('scroll', throttleSetHeader)
	window.addEventListener('resize', throttleSetHeader)

	function throttleSetHeader() {
		if (running === false) {
			running = true
			requestAnimationFrame(function() {
				lastScrollTop = setHeader(header, headerDiv, lastScrollTop)
				running = false
			})
		}
	}
}

function setHeader(header, headerDiv, lastScrollTop) {
	setHeaderClass(header, headerDiv)
	if (header.classList.contains('responsive-header')) {
		headerDiv.style.marginTop = calcHeader(headerDiv, lastScrollTop)
	}
	return document.body.scrollTop
}

function setHeaderClass(header, headerDiv) {
	if (!header.classList.contains('responsive-header') && (headerDiv.scrollHeight > window.innerHeight)) {
		header.classList.add('responsive-header')
	}
	else if (header.classList.contains('responsive-header') && headerDiv.scrollHeight <= window.innerHeight) {
		header.classList.remove('responsive-header')
		headerDiv.style.marginTop = '0px'
	}

}

function calcHeader(headerDiv, lastScrollTop) {
	var scrollTopChange = document.body.scrollTop - lastScrollTop
	var headerDivMargin = headerDiv.style.marginTop.substring(0, headerDiv.style.marginTop.length - 2)

	// if scrolled down and headerDivMargin is less than non-visible
	if (scrollTopChange > 0 && (headerDivMargin < (headerDiv.scrollHeight - window.innerHeight))) {
		return Math.abs(headerDivMargin - scrollTopChange) <= (headerDiv.scrollHeight - window.innerHeight)
			? (headerDivMargin - scrollTopChange + 'px')
			: (-(headerDiv.scrollHeight - window.innerHeight) + 'px')
	}

	else if (scrollTopChange < 0 && (headerDivMargin < 0)) {
		return (headerDivMargin - scrollTopChange) <= 0
			? headerDivMargin - scrollTopChange + 'px'
			: 0 + 'px'
	}

	else return headerDiv.style.marginTop
}