var Promotions = Promotions || {};
Promotions.Clients = Promotions.Clients || {};
Promotions.Clients.PromotionClient = (function() {
	"use strict";
	
	var PromotionClient = function(promotionEndpoint) {
		this._promotionEndpoint = promotionEndpoint;
	};
	
	PromotionClient.prototype.readAllPromotions = function(callback) {
		$.getJSON(this._promotionEndpoint, function(json) {
			callback(json['promotion_objects']);
		});
	};
	
	PromotionClient.prototype.readPromotionByName = function(promotionName, callback) {
		this.readAllPromotions(function(promotions) {
			for (var i = 0; i < promotions.length; i++) {
				var promotion = promotions[i];
				if (promotion['promotion_name'] === promotionName) {
					callback(promotion);
				}
			}
		});
	};
	
	return PromotionClient;
}($));