var jsonData;
var _html        = "";
$(document).ready(function() {
    //Getting Get parameter from url
    var _get = window.location.search.substr(1);
    //Load JSON data from file
        $.getJSON( "js/webdevtest-data.js" )
            .done(function( script, textStatus ) {
                jsonData        = script['promotion_objects'];
                var tempObject  = jsonData[0];
                jsonData.shift();
                jsonData.splice(3, 1, tempObject);
                //jsonData.add(tempObject);
                //initialization
                var _serverDate = new Date(script['server_time']);
                //Decide wich content should load in
                if(_get.length > 0) {
                    var passIndex   = null;
                    var scheduleTable   = "";
                    var ticketTable     = "";
                    var promo           = findGetParameter("promo");
                    //Because all arrays are starting with 0 index I need to minus 1 from the link string end
                    var index           = parseInt(promo.substr(promo.length - 1)) -1;
                    var pickedElement   = jsonData[index];
                    //get the width of the window to decide wich table to put in the DOM
                    var windowWidth     = $(window).width();
                    //Checking the width
                    if(windowWidth > 480) {
                        scheduleTable += '<table class="scheduleTable">' +
                            '<tr>' +
                            '<th>PRIZE</th>' +
                            '<th>ENTRY DEADLINE</th>' +
                            '<th>DRAWING DATE</th>' +
                            '</tr>';
                        //Building up the Drawing table
                        for(var i = 0; i < pickedElement['drawings'].length; i++) {
                            var inItem  = pickedElement['drawings'][i];
                            var prize   = inItem['prize'].split(" ")[0];
                            if(passIndex == null) {
                                var testdate = new Date(inItem['entry_deadline']);
                                //Compare the twoo ISO timestamp
                                if(testdate > _serverDate) {
                                    //if the date bigger then the server date pass the index
                                    passIndex = i;
                                } else {
                                    //if the date smaller then the server date return to loop
                                    continue;
                                }
                            }
                            scheduleTable +='<tr>' +
                                '<td>' + prize +'</td>' +
                                '<td>' + dateFormatter(inItem['entry_deadline']) + '</td>' +
                                '<td>' + dateFormatter(inItem['drawing_date']) + '</td>' +
                                '</tr>';
                        }
                        scheduleTable += '</table>';
                        //Building up the ticket table
                        ticketTable += '<table class="scheduleTable">' +
                            '<tr>' +
                            '<th>ENTRY NUMBER</th>' +
                            '<th>DATE</th>' +
                            '</tr>';
                        for(var i = 0; i < pickedElement['entries'].length; i++) {
                            var inItem = pickedElement['entries'][i];
                            ticketTable +='<tr>' +
                                    '<td>' + inItem['entry_number'] +'</td>' +
                                    '<td>' + dateFormatter(inItem['date']) + '</td>' +
                                '</tr>';
                        }
                        ticketTable += '</table>';
                    } else {
                        var passIndex   = null;
                        scheduleTable += '<table class="scheduleTable">';
                        //Building up the drawing table
                        for(var i = 0; i < pickedElement['drawings'].length; i++) {
                            var inItem  = pickedElement['drawings'][i];
                            var prize   = inItem['prize'].split(" ")[0];
                            //Checking that is the inde modified or not
                            if(passIndex == null) {
                                var testdate = new Date(inItem['entry_deadline']);
                                //Compare the twoo ISO timestamp
                                if(testdate > _serverDate) {
                                    //if the date bigger then the server date pass the index
                                    passIndex = i;
                                } else {
                                    //if the date smaller then the server date return to loop
                                    continue;
                                }
                            }
                            scheduleTable +='<tr>' +
                                                '<td class="title">prize</td><td>' + prize +'</td>' +
                                            '</tr><tr>' +
                                                '<td class="title">entry deadline</td><td>' + dateFormatter(inItem['entry_deadline']) + '</td>' +
                                            '</tr><tr class="separator">' +
                                                '<td class="title">drawing date</td><td>' + dateFormatter(inItem['drawing_date']) + '</td>' +
                                            '</tr>';
                        }
                        scheduleTable += '</table>';
                        // Building the ticket table
                        ticketTable += '<table class="scheduleTable">';
                        for(var i = 0; i < pickedElement['entries'].length; i++) {
                            var inItem = pickedElement['entries'][i];
                            ticketTable +='<tr>' +
                                            '<td class="title">ENTRY NUMBER</td><td>' + inItem['entry_number'] +'</td>' +
                                        '</tr><tr class="separator">' +
                                            '<td class="title">DATE</td><td>' + dateFormatter(inItem['date']) + '</td>' +
                                        '</tr>';
                        }
                        ticketTable += '</table>';
                    }
                    _html = '<div class="item-container">' +
                                '<div class="wrapper">';
                                    // Add head text the next valid drawing date index
                             if(passIndex == null) {
                                 _html += '<div class="lowresName">No More Drawing! Please Return Back Later!</div>';
                             } else {
                                 _html += '<div class="lowresName">The Next Entry Deadline is <br>' + dateFormatter(pickedElement['drawings'][passIndex]['entry_deadline']) + '!</div>';
                             }

                    _html +=        '<img src="' + pickedElement['promo_image_url'] + '" alt="' + pickedElement['promotion_name'] + '">' +
                                    '<div class="highResName">' + pickedElement['promotion_name'] + '</div>' +
                                    '<div class="summary bodyText">' + pickedElement['summary'] + '</div>' +
                                    '<div class="schedule lead2">Drawing Schedule</div>' +
                                    scheduleTable +
                                    '<div class="entry_info bodyText">' + pickedElement['entry_info'] + '</div>' +
                                    '<div class="schedule lead2">Your Total Tickets Entered: ' + pickedElement['entries'].length + '</div>' +
                                    '<div class="ticketInfo bodyText">All entries are locked in atr the time they are sibmitted and cannot be deleted.</div>' +
                                    ticketTable +
                                '</div>' +
                            '</div>';
                    $("body").append(_html);
                } else {
                    //main page
                    _html += '<div class="main-container">';
                    for(var i = 0; i < jsonData.length; i++) {
                        var drawings    = jsonData[i]['drawings'];
                        //Default value for Next Drawing
                        var nextDraw    = "Has No More Drawing! Please Return Back Later!";
                        for(var x = 0; x < drawings.length; x++ ) {
                            var testdate = new Date(drawings[x]['entry_deadline']);
                            //Compare the twoo ISO timestamp
                            if(testdate > _serverDate) {
                                //if the date bigger then the server date pass the index
                                nextDraw    = dateFormatter(drawings[x]['drawing_date']);
                                break;
                            }
                        }

                        //String build to build the inner Html together with dynamic datas
                        _html += '<div class="row">' +
                            '<a href="index.html?promo=promo0' + (i + 1) + '"><img src="' + jsonData[i]['promo_image_url'] + '" alt="' + jsonData[i]['promotion_name'] + '"></a><br>' +
                            '<div class="details">' +
                            '<a href="index.html?promo=promo0' + (i + 1) + '">' + jsonData[i]['promotion_name'] + '</a>' +
                            '<div class="sumtext">' + jsonData[i]['summary'] +'</div>' +
                            '<div class="drawdate">Next Drawing Date: ' + nextDraw +'</div>' +
                            '<div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }
                    _html += '</div>';
                    //Put the innerHtml code to the DOM
                    $("body").append(_html);
                }
            })
            .fail(function( jqxhr, settings, exception ) {
                console.log( "Triggered ajaxError handler." );
            });

});

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function dateFormatter(date) {
    var d = new Date(date);
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return d.toLocaleDateString('en-EN', options);
}
