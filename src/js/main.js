$( document ).ready(function() {
	
	//$.getJSON('http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js', function(data){
	  //  console.log("This is the Data" + data["server_time"])
	//});
	
	$.getJSON( "http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js", function(data) {
	  var items = [];
	  $.each( data.promotion_objects[0], function( key, val ) {
	    items.push( "<li id=" + key + ">" + val + "</li>" );
	  });

	  $( "<ul/>", {
	    "class": "promo-list",
	    html: items.join( "" )
	  }).appendTo( "div.content" );
	});
	
	
	$.getJSON( "http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js", function(data) {
	  var items = [];
	  $.each( data.promotion_objects[1], function( key, val ) {
	    items.push( "<li id=" + key + ">" + val + "</li>" );
	  });

	  $( "<ul/>", {
	    "class": "promo-list1",
	    html: items.join( "" )
	  }).appendTo( "div.content" );
	}); 
	
	
	$.getJSON( "http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js", function(data) {
	  var items = [];
	  $.each( data.promotion_objects[2], function( key, val ) {
	    items.push( "<li id=" + key + ">" + val + "</li>" );
	  });

	  $( "<ul/>", {
	    "class": "promo-list2",
	    html: items.join( "" )
	  }).appendTo( "div.content" );
	}); 
	
	
});