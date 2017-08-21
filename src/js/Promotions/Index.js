'use strict';

var QueryStringUtils = require('../Utils/QueryStringUtils');
var PromotionData = require('./Models/PromotionData');
var PromotionDetailView = require('./Views/PromotionDetailView');
var PromotionsView = require('./Views/PromotionsView');

var PROMO_QUERY_PARAMETER = 'promo';

var promotionData = new PromotionData();

promotionData.fetch({
	success: function() {
		var queryParameters = QueryStringUtils.readQueryParameters();
		var promoQueryParameters = queryParameters[PROMO_QUERY_PARAMETER];
		
		var $body = $('body');
		
		if (promoQueryParameters) {
			var promotionDetailView = new PromotionDetailView({
				model: promotionData.readPromotionByName(promoQueryParameters[0])
			});
			
			$body.append(promotionDetailView.render());
		}
		else {
			var promotionsView = new PromotionsView({
				collection: promotionData.get('promotion_objects')
			});
			
			$body.append(promotionsView.render());
		}
	}
});