var Promotions = Promotions || {};
Promotions.Clients = Promotions.Clients || {};
Promotions.Clients.PromotionClient = (function() {
	'use strict';

	/**
	 * Constructor.
	 * @param {string} - The endpoint used to read Promotion data.
	 */
	var PromotionClient = function(promotionEndpoint) {
		this._promotionEndpoint = promotionEndpoint;
	};

	/**
	 * Reads all Promotions.
	 * @param {function} - Callback to call when the read is complete.
	 */
	PromotionClient.prototype.readAllPromotions = function(callback) {
		$.getJSON(this._promotionEndpoint, function(json) {
			callback(json['promotion_objects']);
		});
	};

	/**
	 * Reads a single Promotion.
	 * @param {function} - Callback to call when the read is complete.
	 */
	PromotionClient.prototype.readPromotionByName = function(promotionName, callback) {
		this.readAllPromotions(function(promotions) {
			for (var i = 0; i < promotions.length; i++) {
				var promotion = promotions[i];
				if (promotion['promotion_name'] === promotionName) {
					callback(promotion);
					return;
				}
			}
			callback(undefined);
		});
	};
	
	return PromotionClient;
}($));