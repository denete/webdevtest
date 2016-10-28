
document.addEventListener("promoDataReceived", function(event) { 
	if (!hasClass(document.getElementById('promo-full'), 'hidden')) {
		//get the actual index of the promo in the data structure dynamically
		var promoNumStr = currentPage.substring(currentPage.lastIndexOf('o') + 1);
		var promoIndex = parseInt(promoNumStr) - 1; 
		
		var promo = promoData.promotion_objects[promoIndex];
		console.log(promo);

		if (screen.width <= 480) {
			createSmallView(promo);
		} else {
			createLargeView(promo);
		}
	}
});

function createSmallView(promo)
{
	//create html for small view
	var smallHTML = '';
	
	//get next deadline
	var nextEntryDeadline = getNextPromoDate(promo.drawings, 'entry');
	if (nextEntryDeadline) {
		smallHTML += '<h1>The Next Entry Deadline is <br />'+ nextEntryDeadline +'!</h1>';
	} 
	
	smallHTML += '<img src="'+ promo.promo_image_url +'" alt="'+ promo.promotion_name +'" />';
	smallHTML += '<p class="promo-summary body-text">'+ promo.summary +'</p>';
	
	smallHTML += '<h2>Drawing Schedule</h2>';
	smallHTML += '<table id="drawing-table__small">';
		
	for (var i = 0; i < promo.drawings.length; i++) {
		var drawing = promo.drawings[i];
		
		smallHTML += '<tr class="inset">';
			smallHTML += '<td>PRIZE</td><td>'+ drawing.prize.replace(' Cash Prize', '') +'</td>';
		smallHTML += '</tr>';
		smallHTML += '<tr>';
			smallHTML += '<td>ENTRY DEADLINE</td><td>'+ beautifyDate(new Date(drawing.entry_deadline)) +'</td>';
		smallHTML += '</tr>';
		smallHTML += '<tr>';
			smallHTML += '<td>DRAWING DATE</td><td>'+ beautifyDate(new Date(drawing.drawing_date)) +'</td>';
		smallHTML += '</tr>';
	}
	
	smallHTML += '</table>';
	
	smallHTML += '<p class="body-text">'+ promo.entry_info +'</p>';
	
	smallHTML += '<h2>Your Total Tickets Entered: '+ promo.entries.length +'</h2>';
	smallHTML += '<p class="entries-locked">All entries are locked in at the time they are submitted and cannot be deleted.</p>';
	
	smallHTML += '<table id="entry-table__small">';
		
	for (var i = 0; i < promo.entries.length; i++) {
		var entry = promo.entries[i];
		
		smallHTML += '<tr class="inset">';
			smallHTML += '<td>ENTRY NUMBER</td><td>'+ entry.entry_number +'</td>';
		smallHTML += '</tr>';
		smallHTML += '<tr>';
			smallHTML += '<td>DATE</td><td>'+ beautifyDate(new Date(entry.date)) +'</td>';
		smallHTML += '</tr>';
	}
	
	smallHTML += '</table>';
	
	document.getElementById('promo-full__small').innerHTML = smallHTML;
}

function createLargeView(currentPromo)
{
	var largeHTML = 'ffjsdabfji';
	
	document.getElementById('promo-full__large').innerHTML = largeHTML;
}
