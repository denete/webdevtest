/* get URL Parms  pretty much the same with PHP $_GET; */ 
$.getURL = function(URL){
	var $href = window.location.href;
    var r = new RegExp('[\?&]' + URL + '=([^&#]*)').exec($href);
    if (r==null){
       return null;
    }
    else{
       return r[1] || 0;
    }
}

var format = {
	thisDate: function(data){
		
		var dt = new Date(data);
		var dt_month = (dt.getMonth()+1);
		var dt_date = (dt.getDate());
		var dt_day = (dt.getDay());
		var dt_year = (dt.getFullYear());
		var dt_hours = (dt.getHours());
		var dt_mins = (dt.getMinutes());

		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var formatedDate = days[dt_day]+', '+ months[dt_month] + ' ' +dt_date + ', ' + dt_year;
 
		return formatedDate;
	},
	thisNumber: function (number){
		
		var parts = number.toString().split(".");
		parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return parts.join(".");

	}
}

function getViewPort(){
	
	var w = $(window).width();	
	
		return w;
	  
	  
	
}

function generatePage(page,w){
	console.log(page,w);
	/* get the PseudoJSON file */
	$.getJSON( "src/js/webdevtest-data.js", function( data ) 	{
		
		
		for (var i =1; i <3; ++i){
			var $promo = data['promotion_objects'][i];
		
			var mostRecent;
		
			for (var x =0; x<$promo.drawings.length; ++x){
					mostRecent = format.thisDate($promo.drawings[x].drawing_date);
					
			}
			/** meaning there is no URL parameter (i.e index.html)*/	
			if (page == null){ 
			
				$(".page").append("<div class='promo-banner'> <img src='src/"+$promo.promo_image_url+"'></img></div>");
				$(".page").append("<div class='promo-links'><a href='index.html?promo=promo0"+i+"'>"+$promo.promotion_name+"</a></div>");
				$(".page").append("<div class='promo-summary'>"+$promo.summary+"</div>");
				$(".page").append("<div class='promo-nextdrawing'> Next Drawing: "+mostRecent+"</div>");	
				if (i == 2){
					/** the indexing of the image in JSON array is not the same with the layout (i.e fortune.jpg is at index[0]) */
					var $uneven = data['promotion_objects'][0];
					var mostRecent;
					for (var x =0; x<$uneven.drawings.length; ++x){
							mostRecent = format.thisDate($uneven.drawings[x].drawing_date);
							
					}
					$(".page").append("<div class='promo-banner'> <img src='src/"+$uneven.promo_image_url+"'></img></div>");
					$(".page").append("<div class='promo-links'><a href='index.html?promo=promo03'>"+$uneven.promotion_name+"</div>");
					$(".page").append("<div class='promo-summary'>"+$uneven.summary+"</div>");
					$(".page").append("<div class='promo-nextdrawing'>Next Drawing: "+mostRecent+"</div>");
				}
			}
		
		}
		
		var $promo = data['promotion_objects'];
		var $drawing_prize;
		var $entry_deadline;
		var $drawing_date;
		var $entry_date;
		var $entry_number;
		
		 if (page == "promo01"){
			
				$("body").addClass("leGradient");
				/* if viewport is less than <= 480  append this => "The Next Entry..."*/
				
	
				$entry_date = format.thisDate($promo[1].drawings[0].entry_deadline);
				$(".page ").append("<div class='promo-entries-locked'> The Next Entry Deadline is "+$entry_date+"!<div>");
				
				
				$(".page ").append("<div class='promo-banner'> <img src='src/"+$promo[1].promo_image_url+"'></img></div>");
				/* show promotion name  if viewport is =>480*/
				
				$(".page").append("<div class='promo-links'>"+$promo[1].promotion_name+"</div>");
				
				$(".page").append("<div class='promo-summary'>"+$promo[1].summary+"</div>");
				$(".promo-banner").addClass('wide');
				$(".promo-banner img").addClass('wide');
				/** Drawing Schedule and Entries **/
				/* Drawing Sched */
				$(".page").append("<div class='drawing-sched-header'>Drawing Schedule</div>");
				/* if viewport is less than <= 480  remove the div wrap*/
			
				$(".page").append("<div id='wrap'>&nbsp;</div><table class='drawing-info'></table>");
				
				$(".drawing-info").append("<thead><th> PRIZE</th><th>ENTRY DEADLINE</th><th>DRAWING DATE</th></thead>");
				
				for (var x =0; x<$promo[1].drawings.length; ++x){
						$drawing_entry = format.thisDate($promo[1].drawings[x].entry_deadline);
						$drawing_date = format.thisDate($promo[1].drawings[x].drawing_date);
						$drawing_prize = $promo[1].drawings[x].prize;
						/** Remove any text associated with the string**/
						$drawing_prize = $drawing_prize.replace(/\D/g,''); 
						/** Format this to number**/
						$drawing_prize = format.thisNumber($drawing_prize);
						$(".drawing-info").append("<tbody><tr><td> $"+$drawing_prize+"</td><td>"+$drawing_entry+"</td><td>"+$drawing_date+"</td></tr></tbody>");
						
				}
			
		
				$(".page").append("<div class='promo-entryintro'>"+$promo[1].entry_info+"</div>");
					
				
				/* end of Drawing Sched */
				/******************************************************************/
				/* Entries */
				$(".page").append("<div class='drawing-sched-header'>Your Total Tickets Entered: "+$promo[1].entries.length+"</div>");
				
				$(".page").append("<div class='entries-locked-notice'>All entries are locked in at the time they are submitted  and cannot be deleted.</div>");
				
				$(".page").append("<table class='entry-info'></table></div>");
				$(".entry-info").append("<thead><th>ENTRY NUMBER</th><th>DATE</th></thead>");
			
				for (var x =0; x<$promo[1].entries.length; ++x){
						$entry_date = format.thisDate($promo[1].entries[x].date);
						$entry_number = $promo[1].entries[x].entry_number;
						$(".entry-info").append("<tbody><tr><td> "+$entry_number+"</td><td>"+$entry_date+"</td></tr></tbody>");
						
				}
				/*** END Drawing Schedule  and Entries***/
				
		}else if (page == "promo02"){
				$("body").addClass("leGradient");
				$("body").css("height","1100px");
				/* if viewport is less than <= 480  append this => "The Next Entry..."*/
		
				$entry_date = format.thisDate($promo[2].drawings[0].entry_deadline);
				$(".page ").append("<div class='promo-entries-locked'> The Next Entry Deadline is "+$entry_date+"!<div>");
				
				
				$(".page ").append("<div class='promo-banner'> <img src='src/"+$promo[2].promo_image_url+"'></img></div>");
				/* show promotion name  if viewport is =>480*/
				
				$(".page").append("<div class='promo-links'>"+$promo[2].promotion_name+"</div>");
				
				$(".page").append("<div class='promo-summary'>"+$promo[2].summary+"</div>");
				$(".promo-banner").addClass('wide');
				$(".promo-banner img").addClass('wide');
				/** Drawing Schedule and Entries **/
				/* Drawing Sched */
				$(".page").append("<div class='drawing-sched-header'>Drawing Schedule</div>");
				/* if viewport is less than <= 480  remove the div wrap*/
			
				$(".page").append("<div id='wrap-2'>&nbsp;</div><table class='drawing-info'></table>");
				
			
				$(".drawing-info").append("<thead><th> PRIZE</th><th>ENTRY DEADLINE</th><th>DRAWING DATE</th></thead>");
				
				for (var x =0; x<$promo[2].drawings.length; ++x){
						$drawing_entry = format.thisDate($promo[2].drawings[x].entry_deadline);
						$drawing_date = format.thisDate($promo[2].drawings[x].drawing_date);
						$drawing_prize = $promo[2].drawings[x].prize;
						/** Remove any text associated with the string**/
						$drawing_prize = $drawing_prize.replace(/\D/g,''); 
						/** Format this to number**/
						$drawing_prize = format.thisNumber($drawing_prize);
						$(".drawing-info").append("<tbody><tr><td> $"+$drawing_prize+"</td><td>"+$drawing_entry+"</td><td>"+$drawing_date+"</td></tr></tbody>");
						
				}
			
				$(".page").append("<div class='promo-entryintro'>"+$promo[2].entry_info+"</div>");
					
				
				/* end of Drawing Sched */
				/******************************************************************/
				/* Entries */
				$(".page").append("<div class='drawing-sched-header'>Your Total Tickets Entered: "+$promo[2].entries.length+"</div>");
			
				$(".page").append("<div class='entries-locked-notice'>All entries are locked in at the time they are submitted  and cannot be deleted.</div>");

				$(".page").append("<table class='entry-info'></table></div>");
				$(".entry-info").append("<thead><th>ENTRY NUMBER</th><th>DATE</th></thead>");
			
				for (var x =0; x<$promo[2].entries.length; ++x){
						$entry_date = format.thisDate($promo[2].entries[x].date);
						$entry_number = $promo[2].entries[x].entry_number;
						$(".entry-info").append("<tbody><tr><td> "+$entry_number+"</td><td>"+$entry_date+"</td></tr></tbody>");
						
				}
				/*** END Drawing Schedule  and Entries***/
		}else if (page =="promo03"){
					$("body").addClass("leGradient");
				/* if viewport is less than <= 480  append this => "The Next Entry..."*/
			
				$entry_date = format.thisDate($promo[2].drawings[0].entry_deadline);
				$(".page ").append("<div class='promo-entries-locked'> The Next Entry Deadline is "+$entry_date+"!<div>");
				$(".page ").append("<div class='promo-banner'> <img src='src/"+$promo[0].promo_image_url+"'></img></div>");
				/* show promotion name  if viewport is =>480*/
				i
					$(".page").append("<div class='promo-links'>"+$promo[0].promotion_name+"</div>");
				
				$(".page").append("<div class='promo-summary'>"+$promo[0].summary+"</div>");
				$(".promo-banner").addClass('wide');
				$(".promo-banner img").addClass('wide');
				/** Drawing Schedule and Entries **/
				/* Drawing Sched */
				$(".page").append("<div class='drawing-sched-header'>Drawing Schedule</div>");
				/* if viewport is less than <= 480  remove the div wrap*/
			
				
				$(".page").append("<div id='wrap'>&nbsp;</div><table class='drawing-info'></table>");
				
			
				$(".drawing-info").append("<thead><th> PRIZE</th><th>ENTRY DEADLINE</th><th>DRAWING DATE</th></thead>");
				
				for (var x =0; x<$promo[0].drawings.length; ++x){
						$drawing_entry = format.thisDate($promo[0].drawings[x].entry_deadline);
						$drawing_date = format.thisDate($promo[0].drawings[x].drawing_date);
						$drawing_prize = $promo[0].drawings[x].prize;
						/** Remove any text associated with the string**/
						$drawing_prize = $drawing_prize.replace(/\D/g,''); 
						/** Format this to number**/
						$drawing_prize = format.thisNumber($drawing_prize);
						$(".drawing-info").append("<tbody><tr><td> $"+$drawing_prize+"</td><td>"+$drawing_entry+"</td><td>"+$drawing_date+"</td></tr></tbody>");
						
				}
			
			
				$(".page").append("<div class='promo-entryintro'>"+$promo[0].entry_info+"</div>");
				
				/* end of Drawing Sched */
				/******************************************************************/
				/* Entries */
				$(".page").append("<div class='drawing-sched-header'>Your Total Tickets Entered: "+$promo[0].entries.length+"</div>");
				
				$(".page").append("<div class='entries-locked-notice'>All entries are locked in at the time they are submitted  and cannot be deleted.</div>");
				
				$(".page").append("<table class='entry-info'></table></div>");
				$(".entry-info").append("<thead><th>ENTRY NUMBER</th><th>DATE</th></thead>");
			
				for (var x =0; x<$promo[0].entries.length; ++x){
						$entry_date = format.thisDate($promo[0].entries[x].date);
						$entry_number = $promo[0].entries[x].entry_number;
						$(".entry-info").append("<tbody><tr><td> "+$entry_number+"</td><td>"+$entry_date+"</td></tr></tbody>");
						
				}
				/*** END Drawing Schedule  and Entries***/
		}
		
		
	
	});
}
$(document).ready(function(){
	var urlParams = $.getURL('promo'); //get the URL params ==> '?promo=XYZ'
	var w= getViewPort();
   generatePage(urlParams,w); 
	
	
});

