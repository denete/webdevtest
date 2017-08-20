var Utils = Utils || {};
Utils.QueryStringUtils = (function() {
	'use strict';
	
	return {
		/**
		 * Parses all query string parameters from the current URL.
		 * @returns {object} - A javascript object containing the parsed query string parameters.
		 */
		readQueryParameters: function() {
			var queryString = window.location.search.substr(1);
			var queryStringTokens = queryString.split('&');
			var queryParameters = {};
			for (var i = 0; i < queryStringTokens.length; i++) {
				var queryParameterTokens = queryStringTokens[i].split('=');
				var queryParameterName = queryParameterTokens[0];
				var queryParameterValue = queryParameterTokens[1];
				queryParameters[queryParameterName] = queryParameters[queryParameterName] || [];
				queryParameters[queryParameterName].push(decodeURIComponent(queryParameterValue));
			}
			return queryParameters;
		}
	};
}());