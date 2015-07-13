import Velocity from 'velocity-animate'

import isMobileMediaQueries from './isMobileMediaQueries'

export default function siteIntroAnimation(header, main) {

	if (isMobileMediaQueries()) {
		return mobileAnimation(header, main)
	}

	header.classList.remove('invisible')

	var headerTranslateX = -.5 * header.scrollWidth

	setTimeout(() => {
		Velocity.hook(header, 'translateX', '-8.309em')
		Velocity(header, {translateX : headerTranslateX}, 1000)
		addDesktopResizeListener()
		main.classList.remove('invisible')
	}, 500)



	function throttleSetHeader() {
		requestAnimationFrame(function setHeader() {
			if (isMobileMediaQueries()) {
				return addMobileResizeListener()
			}
			headerTranslateX = -.5 * header.scrollWidth
			header.style.transform = `translateX(${headerTranslateX}px)`
		})
	}

	function mobileAnimation() {
		header.classList.remove('invisible')
		main.classList.remove('invisible')
		addMobileResizeListener()
	}

	function isDesktop() {
		if (!isMobileMediaQueries()) {
			throttleSetHeader()
			addDesktopResizeListener()
		}
	}

	function addDesktopResizeListener() {
		window.removeEventListener('resize', isDesktop)
		window.addEventListener('resize', throttleSetHeader)
	}

	function addMobileResizeListener() {
		header.style.transform = ''
		window.removeEventListener('resize', throttleSetHeader)
		window.addEventListener('resize', isDesktop)
	}
}
