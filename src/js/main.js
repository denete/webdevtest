/*
* On this file, we will deciper which page to show
*/
var promoData;
var currentPage;

document.addEventListener("DOMContentLoaded", function(event) { 
	var pages = document.getElementsByClassName('page');
	currentPage = getUrlParameter();
	var isPromoFull = currentPage.indexOf('promo') > -1;
	
	if (isPromoFull) {
		document.getElementById('home').className += ' hidden';
	} else {
		document.getElementById('promo-full').className += ' hidden';
	}
	
	loadPromoData();
});

function getUrlParameter()
{
	var parameterIndex = location.href.indexOf('=') + 1;
	var page = parameterIndex == -1 ? 'home' : location.href.substring(parameterIndex);
	return page;
}

function loadPromoData() 
{
	//use ajax request to get promo data
	
	var xobj = new XMLHttpRequest();
	xobj.open('GET', '/js/webdevtest-data.js', true);
	xobj.onreadystatechange = function() {
		if (xobj.readyState == 4 && xobj.status == "200") {
			promoData = JSON.parse(xobj.responseText);
			console.log(promoData);
			
			//trigger custom event so every page can load data once ready
			var event = new Event('promoDataReceived');
			document.dispatchEvent(event);
		}
	};
	xobj.send(null);
}

function getPromoNumber(index)
{
	var number = index + 1;
	number = number > 9 ? number : '0' + number;
	return parseInt(number);
}

function getNextPromoDate(promoDrawings, dateType)
{
	var nextDate = false;
	
	for (var i = 0; i < promoDrawings.length; i++) {
		var promoDate = dateType == 'drawing' ? new Date(promoDrawings[i].drawing_date) : new Date(promoDrawings[i].entry_deadline);
		var currentDate = new Date();
		
		if (currentDate < promoDate) {
			nextDate = promoDate;
		}
	}
	
	if (nextDate) {
		//make the date pretty
		return beautifyDate(nextDate);
	} 
	
	return nextDate;
}

function beautifyDate(date)
{
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	var nextDatePretty = days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
	
	return nextDatePretty;
}

function hasClass(element, classNeeded) 
{
	if ((' ' + element.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + classNeeded + ' ') > -1) {
		return true;
	}
	return false;
}