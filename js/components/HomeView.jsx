;(function(exports) {

var React = require('react')

class HomeView extends React.Component {
		constructor() {
				super()

		}

		render() {
				return (
						<div>
								<h3>HomeView</h3>
						</div>
				)
		}
}

exports.HomeView = HomeView

})(typeof module === 'object' ? module.exports : window)