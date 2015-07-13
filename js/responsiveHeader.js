import Rx from 'rx'

// sets initial position and registers callbacks for changing
export default function responsiveHeader(header, headerDiv) {
	var lastScrollTop = document.body.scrollTop
	headerDiv.style.marginTop = '0px'

	var scroll$ = Rx.Observable.fromEvent(document, 'scroll')
		.throttleFirst(16)
	var resize$ = Rx.Observable.fromEvent(window, 'resize')
		.throttleFirst(16)
		.startWith(true)

	// only changes that don't require a class change
	var change$ = scroll$.merge(resize$.filter(resize => !needsClassChange()))

	// class changes only
	var classChange$ = resize$
		.filter(needsClassChange)
		.map(resize => header.classList.toggle('responsive-header'))

	// reset header on changes that don't require a class change
	change$
		.filter(change => header.classList.contains('responsive-header'))
		.subscribe(setHeader)

	// if class added, responsivize header
	classChange$.filter(added => added)
		.subscribe(setHeader)

	// if class removed, de-responsivize header
	classChange$.filter(added => !added)
		.subscribe(() => headerDiv.style.marginTop = '0px')

	function needsClassChange(scroll) {
		return !header.classList.contains('responsive-header') && headerDiv.scrollHeight > window.innerHeight
			? true
			: header.classList.contains('responsive-header') && headerDiv.scrollHeight <= window.innerHeight
				? true
				: false
	}

	function setHeader() {
		headerDiv.style.marginTop = calcHeader(headerDiv, lastScrollTop)
		lastScrollTop = document.body.scrollTop
	}
}

function calcHeader(headerDiv, lastScrollTop) {
	// change in position since last scroll event
	var scrollTopChange = document.body.scrollTop - lastScrollTop

	// margin applied to header
	var headerDivMargin = headerDiv.style.marginTop.substr(0, headerDiv.style.marginTop.length - 2)

	// if scrolled down and headerDivMargin is less than non-visible portion of headerDiv
	if (scrollTopChange > 0 && (headerDivMargin < (headerDiv.scrollHeight - window.innerHeight))) {
		return Math.abs(headerDivMargin - scrollTopChange) <= (headerDiv.scrollHeight - window.innerHeight)
			? (headerDivMargin - scrollTopChange + 'px')
			: (-(headerDiv.scrollHeight - window.innerHeight) + 'px')
	}

	// if scrolled up and headerDivMargin greater than zero
	else if (scrollTopChange < 0 && (headerDivMargin < 0)) {
		return (headerDivMargin - scrollTopChange) <= 0
			? headerDivMargin - scrollTopChange + 'px'
			: 0 + 'px'
	}

	// at top or bottom of header, don't change margin
	else return headerDivMargin + 'px'
}

