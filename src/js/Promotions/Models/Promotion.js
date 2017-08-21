'use strict';

var Backbone = require('backbone');
var DateUtils = require('../../Utils/DateUtils');
var Drawing = require('./Drawing');
var Entry = require('./Entry');

module.exports = Backbone.Model.extend({
	/**
	 * Initializes the model, wrapping child arrays into Backbone Collections.
	 */
	initialize: function() {
		this.set('drawings', new Backbone.Collection(this.get('drawings') || [], {
			model: Drawing
		}));
		
		this.set('entries', new Backbone.Collection(this.get('entries') || [], {
			model: Entry
		}));
	},

	/**
	 * Gets the next drawing date for this Promotion.
	 * @return {string} - The next drawing date.
	 */
	getNextDrawingDate: function() {
		return this.get('drawings').first().get('drawing_date');
	},
	
	/**
	 * Gets the next entry deadline for this Promotion.
	 * @return {string} - The next entry deadline.
	 */
	getNextEntryDeadline: function() {
		return this.get('drawings').first().get('entry_deadline');
	}
});