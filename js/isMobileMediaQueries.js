var mobileCheckDiv = document.querySelector('#mobile-check')

export default function isMobileMediaQueries() {
	return +window.getComputedStyle(mobileCheckDiv).opacity
}