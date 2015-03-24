$( document ).ready(function() {   

	
	//$.getJSON('http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js', function(data){
	  //  console.log("This is the Data" + data["server_time"])
	//});
	
	// $.getJSON( "http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js", function(data) {
	// 	  var items = [];
	// 	  $.each( data.promotion_objects[0], function( key, val ) {
	// 	    items.push( "<li id=" + key + ">" + val + "</li>" );
	// 	  });
	// 
	// 	  $( "<ul/>", {
	// 	    "class": "promo-list",
	// 	    html: items.join( "" )
	// 	  }).appendTo( "div.content" );
	// 	});
	// 	
	// 	
	// 	$.getJSON( "http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js", function(data) {
	// 	  var items = [];
	// 	  $.each( data.promotion_objects[1], function( key, val ) {
	// 	    items.push( "<li id=" + key + ">" + val + "</li>" );
	// 	  });
	// 
	// 	  $( "<ul/>", {
	// 	    "class": "promo-list1",
	// 	    html: items.join( "" )
	// 	  }).appendTo( "div.content" );
	// 	}); 
	
	
	$.getJSON( "http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js", function(data) {
	  var items = [];
	  $.each( data.promotion_objects, function( key, val ) {
	    items.push( "<img src=" + val.promo_image_url + ">" );
		items.push( "<div id='promotion_name'>" + val.promotion_name + "</div>" );
		items.push( "<div id='summary'>" + val.summary + "</div>" );
		items.push( "<div id='entry_info'>" + val.entry_info + "</div>" );		
			$.each(val.drawings, function(key2,val2) {
		            items.push("<div class='group-drawings'><div id='prize'>"+val2.prize+"</div>");
					items.push("<div id='entry_deadline'>"+val2.entry_deadline+"</div>");
					items.push("<div id='drawing_date'>"+val2.drawing_date+"</div></div>");					
		     });
		
			$.each(val.entries, function(key3,val3) {
		            items.push("<div class='group-entries'><div id='entry_number'>"+val3.entry_number+"</div>");
					items.push("<div id='date'>"+val3.date+"</div></div>");
		     });
			
	  });

	  $( "<div/>", {
	    "class": "promo-list",
	    html: items.join( "" )
	  }).appendTo( "div.content" );
	}); 
	
	// var json = [{"GROUP_ID":"143",
	// 	  "GROUP_TYPE":"2011 Season",
	// 	  "EVENTS":[
	// 	    {"EVENT_ID":"374","SHORT_DESC":"Wake Forest"},
	// 	    {"EVENT_ID":"376","SHORT_DESC":"Yale"},
	// 	    {"EVENT_ID":"377","SHORT_DESC":"Michigan State"}]
	// 	 },
	// 	 {"GROUP_ID":"142",
	// 	  "GROUP_TYPE":"2010 Season",
	// 	  "EVENTS":[
	// 	    {"EVENT_ID":"370","SHORT_DESC":"Duke"},
	// 	    {"EVENT_ID":"371","SHORT_DESC":"Northwestern"},
	// 	    {"EVENT_ID":"372","SHORT_DESC":"Brown"}]
	// 	}];
    
    // $.getJSON( "http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js", function(data) {  
    // 		var items = [];
    // 		$.each(data.promotion_objects, function(key,val) {
    // 		            console.log('<a href="'+val.promotion_name+'">');
    // 		    $.each(val.drawings, function(key2,val2) {
    // 		            items.push("<li>"+val2.prize+"</li>");
    // 		     });
    // 		});     
    // 		$( "<ul/>", {
    // 		    "class": "prize-list",
    // 		    html: items.join( "" )
    // 		  }).appendTo( "div.content" );
    // 	 });
	
});