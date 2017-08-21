'use strict';

var Backbone = require('backbone');
var DateUtils = require('../../Utils/DateUtils');
var PromotionsTemplate = require('./Templates/PromotionsView.mustache');

/**
 * Prepares view models for rendering Promotions.
 * @param {Backbone.Collection} - A collection of Promotions to prepare view models for.
 * @return {array} - A javascript array containing the Promotion view models.
 */
function preparePromotionViewModels(promotions) {
	return promotions.map(function(promotion) {
		return preparePromotionViewModel(promotion);
	});
}

/**
 * Prepares a view model for rendering a Promotion.
 * @param {Promotion} - A Promotion to prepare a view model for.
 * @return {object} - A javascript object representing a Promotion view model.
 */
function preparePromotionViewModel(promotion) {
	var viewModel = promotion.toJSON();
	
	viewModel['formatted_next_drawing_date'] = DateUtils.formatHumanReadableDate(promotion.getNextDrawingDate());
	viewModel['promotion_url'] = '?promo=' + encodeURIComponent(viewModel['promotion_name']);

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
	className: 'promotions promotions-view',

	/**
	 * Renders this view.
	 * @return {$} - A jQuery selector referencing this rendered view.
	 */
	render: function() {
		this.$el.html(PromotionsTemplate.render({
			promotions: preparePromotionViewModels(this.collection)
		}));

		return this.$el;
	}
});