;(function(exports) {

var React = require('react')
var { RouteHandler } = require('../react-router')

class AppView extends React.Component {
		constructor() {
				super()

		}

		render() {
				return (
						<div>
								<RouteHandler {...this.props} />
						</div>
				)
		}
}

exports.AppView = AppView


})(typeof module === 'object' ? module.exports : window)