$( document ).ready(function() {
	
	//$.getJSON('http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js', function(data){
	  //  console.log("This is the Data" + data["server_time"])
	//});
	
	$.getJSON( "http://dev.samluedke.com/webdevtest-master/src/js/webdevtest-data.js", function(data) {
	  var items = [];
	  $.each( data, function( key, val ) {
	    items.push( "<li id='" + key + "'>" + val + "</li>" );
	  });

	  $( "<ul/>", {
	    "class": "my-new-list",
	    html: items.join( "" )
	  }).appendTo( "div.content" );
	});
	

});