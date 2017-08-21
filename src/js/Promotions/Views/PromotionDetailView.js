'use strict';

var Backbone = require('backbone');
var DateUtils = require('../../Utils/DateUtils');
var PromotionDetailTemplate = require('./Templates/PromotionDetailView.mustache');

/**
 * Prepares a view model for rendering a Drawing.
 * @param {Drawing} - A Drawing to prepare a view model for.
 * @return {object} - A javascript object representing a Drawing view model.
 */
function prepareDrawingViewModel(drawing) {
	var viewModel = drawing.toJSON();
	
	viewModel['formatted_drawing_date'] = DateUtils.formatHumanReadableDate(viewModel['drawing_date']);
	viewModel['formatted_entry_deadline'] = DateUtils.formatHumanReadableDate(viewModel['entry_deadline']);
	
	return viewModel;
}

/**
 * Prepares a view model for rendering an Entry.
 * @param {Entry} - An Entry to prepare a view model for.
 * @return {object} - A javascript object representing an Entry view model.
 */
function prepareEntryViewModel(entry) {
	var viewModel = entry.toJSON();
	
	viewModel['formatted_date'] = DateUtils.formatHumanReadableDate(viewModel.date);
	
	return viewModel;
}

/**
 * Prepares a view model for rendering details for a Promotion.
 * @param {Promotion} - A Promotion to prepare a view model for.
 * @return {object} - A javascript object representing a Promotion view model.
 */
function preparePromotionDetailViewModel(promotion) {
	var viewModel = promotion.toJSON();
	
	viewModel.drawings = promotion.get('drawings').map(function(drawing) {
		return prepareDrawingViewModel(drawing);
	});
	
	viewModel.entries = promotion.get('entries').map(function(entry) {
		return prepareEntryViewModel(entry);
	});
	
	viewModel['formatted_next_entry_deadline'] = DateUtils.formatHumanReadableDate(promotion.getNextEntryDeadline());
	
	return viewModel;
}

module.exports = Backbone.View.extend({
	/**
	 * The tag type to use for the base element of this view.
	 */
	tagName: 'div',
	
	/**
	 * The class name to apply to the base element of this view.
	 */
	className: 'promotions promotion-detail-view',
	
	/**
	 * Renders this view.
	 * @return {$} - A jQuery selector referencing this rendered view.
	 */
	render: function() {
		this.$el.html(PromotionDetailTemplate.render(preparePromotionDetailViewModel(this.model)));
		
		return this.$el;
	}
});