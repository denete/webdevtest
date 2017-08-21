var Promotions = Promotions || {};
Promotions.Views = Promotions.Views || {};
Promotions.Views.PromotionsView = (function() {
	'use strict';

	/**
	 * Constructor.
	 * @param {array} - An array of Promotions to render.
	 */
	var PromotionsView = function(promotions) {
		this._promotions = promotions;
		this._template = $('#promotions-template').html();
		this._promotionTemplate = $('#promotion-template').html();
	};
	
	/**
	 * Renders a single Promotion.
	 * @param {object} - The Promotion to render.
	 * @returns {$} - A jQuery selector containing the rendered view.
	 */
	function renderPromotion(promotion) {
		var $promotion = $(this._promotionTemplate);

		$promotion
			.find('.banner img')
			.attr('src', promotion['promo_image_url']);
			
		$promotion
			.find('.promotion-name')
			.text(promotion['promotion_name'])
			.attr('href', '?promo=' + encodeURIComponent(promotion['promotion_name']));
			
		$promotion
			.find('.summary')
			.text(promotion['summary']);
			
		$promotion
			.find('.next-drawing-date')
			.text(Utils.DateUtils.formatHumanReadableDate(promotion['drawings'][0]['drawing_date']));
		
		return $promotion;
	}

	/**
	 * Renders this PromotionView.
	 * @returns {$) - A jQuery selector containing the rendered view.
	 */
	PromotionsView.prototype.render = function() {
		var $promotions = $(this._template);
		
		var $container = $promotions.find('.container');
		for (var i = 0; i < this._promotions.length; i++) {
			$container.append(renderPromotion.apply(this, [this._promotions[i]]));
		}
		
		return $promotions;
	};
	
	return PromotionsView;
}($));