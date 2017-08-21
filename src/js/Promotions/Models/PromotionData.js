'use strict';

var Backbone = require('backbone');
var Promotion = require('./Promotion');

module.exports = Backbone.Model.extend({
	/**
	 * The URL to fetch data from.
	 */
	url: './js/webdevtest-data.js',
	
	/**
	 * Parses a response from the server into attributes for this object.
	 * @param {object} - The response obtained from the server.
	 */
	parse: function(response) {
		response['promotion_objects'] = new Backbone.Collection(response['promotion_objects'] || [], {
			model: Promotion
		});		
		return response;
	},
	
	/**
	 * Reads a child promotion by name.
	 * @param {string} - The promotion name to look for.
	 * @return {Promotion} - A Promotion object if one exists with the specified name.
	 */
	readPromotionByName: function(promotionName) {
		return this.get('promotion_objects').find(function(datum) {
			return datum.get('promotion_name').toLowerCase() === promotionName.toLowerCase();
		});
	}
});