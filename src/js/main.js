$( document ).ready(function() {   
 
	
	    
	$.getJSON( "http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js", function(data) { 
	  	var items = [];
		  $.each( data.promotion_objects, function( key, val ) {
		    items.push( "<img src=" + val.promo_image_url + ">" );
			items.push( "<div id='promotion_name'>" + val.promotion_name + "</div>" );
			items.push( "<div id='summary'>" + val.summary + "</div>" );
			items.push( "<div id='entry_info'>" + val.entry_info + "</div>" );	
				$.each(val.drawings, function(key2,val2) {
						// items.push("<div class='group-drawings'><div id='prize'>"+val2.prize+"</div>");
						// items.push("<div id='entry_deadline'>"+val2.entry_deadline+"</div>"); 
						items.push("<div id='drawing_date'>"+val2.drawing_date+"</div></div>");					
			    });
				
				// $.each(val.entries, function(key3,val3) {
				// 			            items.push("<div class='group-entries'><div id='entry_number'>"+val3.entry_number+"</div>");
				// 						items.push("<div id='date'>"+val3.date+"</div></div>");
				// 			     });  
			
		  });

		  $( "<div/>", {
		    "class": "promo-list",
		    html: items.join( "" )
		  }).appendTo( "div.content" );   
		
		
	});
	 
	// Drawing schedule
	$.getJSON( "http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js", function(data) { 
	  	var items = [];
		  $.each( data.promotion_objects, function( key, val ) {

				$.each(val.drawings, function(key2,val2) {
			            items.push("<div class='group-drawings'><div id='prize'>"+val2.prize+"</div>");
						items.push("<div id='entry_deadline'>"+val2.entry_deadline+"</div>");
						items.push("<div id='drawing_date'>"+val2.drawing_date+"</div></div>");					
			    });
			
		  });

		  $( "<div/>", {
		    "class": "sched-list",
		    html: items.join( "" )
		  }).appendTo( "div.sched" );   
		
		
	});
	
	// Entries 
	$.getJSON( "http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js", function(data) { 
	  	var items = [];
		  $.each( data.promotion_objects, function( key, val ) {
				
				$.each(val.entries, function(key3,val3) {
			           items.push("<div class='group-entries'><div id='entry_number'>"+val3.entry_number+"</div>");
					   items.push("<div id='date'>"+val3.date+"</div></div>");
			     }); 
			
		  });

		  $( "<div/>", {
		    "class": "entries-list",
		    html: items.join( "" )
		  }).appendTo( "div.entries" );   
		
		
	});
	
});