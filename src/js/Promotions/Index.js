$(function() {
	'use strict';
	
	var PROMO_CLIENT_ENDPOINT = './js/webdevtest-data.js';
	var PROMO_QUERY_PARAMETER = 'promo';
	
	var queryParameters = Utils.QueryStringUtils.readQueryParameters();
	var promoQueryParameters = queryParameters[PROMO_QUERY_PARAMETER];
	
	var promotionClient = new Promotions.Clients.PromotionClient(PROMO_CLIENT_ENDPOINT);
	
	var $body = $('body');

	if (promoQueryParameters) {
		promotionClient.readPromotionByName(promoQueryParameters[0], function(promotion) {
			var promotionDetailView = new Promotions.Views.PromotionDetailView(promotion);
			$body.append(promotionDetailView.render());
		});
	}
	else {
		promotionClient.readAllPromotions(function(promotions) {
			var promotionsView = new Promotions.Views.PromotionsView(promotions);
			$body.append(promotionsView.render());
		});
	}
});