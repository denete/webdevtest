var Utils = Utils || {};
Utils.DateUtils = (function() {
	'use strict';

	return {
		formatHumanReadableDate: function(dateString) {
			var date = new Date(dateString);

			if (!Date.prototype.toLocaleDateString) {
				return date.ToString();
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