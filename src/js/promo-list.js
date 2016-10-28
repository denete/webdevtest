
document.addEventListener("promoDataReceived", function() { 
	if (!hasClass(document.getElementById('home'), 'hidden')) {
		var html = '';
		
		var promoObjects = promoData.promotion_objects;
		for (var i = 0; i < promoObjects.length; i++) {
			var promo = promoObjects[i];
			
			html += '<div class="promo-list__item">';
			html += '<img src="'+ promo.promo_image_url +'" alt="'+ promo.promotion_name +'" />';
			html += '<div class="promo-link"><a href="'+ location.href +'?promo=promo'+ getPromoNumber(i) +'">'+ promo.promotion_name +'</a></div>';
			html += '<p class="promo-summary">'+ promo.summary +'</p>';
			
			var nextDrawingDate = getNextPromoDate(promo.drawings, 'drawing');
			if (nextDrawingDate) {
				html += '<p class="promo-drawing-date">Next Drawing Date: '+ nextDrawingDate +'</p>';
			} else {
				html += '<p class="promo-drawing-date">There are no more drawing dates.</p>';
			}
			
			html += '</div>';
		}
		
		document.getElementById('promo-list').innerHTML = html;
	}
});
