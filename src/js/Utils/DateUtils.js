var Utils = Utils || {};
Utils.DateUtils = (function() {
	'use strict';

	return {
		/**
		 * Formats a ISO date string into a human readable date.
		 * Uses toLocaleDateString if available, otherwise falls back to toString for older browsers.
		 * @return {string} - A human readable date.
		 */
		formatHumanReadableDate: function(dateString) {
			var date = new Date(dateString);

			if (!Date.prototype.toLocaleDateString) {
				return date.toString();
			}

			return date.toLocaleDateString('en-US', {
				day: 'numeric',
				month: 'long',
				weekday: 'long',
				year: 'numeric'
			});
		}
	};
}());