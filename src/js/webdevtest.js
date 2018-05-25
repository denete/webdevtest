window.onload = () => {
    getScript('https://code.jquery.com/jquery-1.10.2.js', () => {

        dataHandler = Object.assign({}, dataLoader(dataProviderXML(), dataParserJSON()));

        dataHandler.loadData('js/webdevtest-data.js', (data) => {
            let promoId = parseInt(getURLParameter("promo").slice(5));
            let view = promoId ? new PromotionView(data, promoId) : new ListView(data);
            view.display();
        })
    });
}

function getScript (src, callback) {
    var headElem = document.head || document.getElementsByTagName('head')[0];
    var script = document.createElement("script");
    var once = true;
    script.async = "async";
    script.type = "text/javascript";
    script.charset = "UTF-8";
    script.src = src;
    script.onload = script.onreadystatechange = function () {
        if (once && (!script.readyState || /loaded|complete/.test(script.readyState))) {
            once = false;
            callback();
            script.onload = script.onreadystatechange = null;
        }
    };
    headElem.appendChild(script);
}

function getURLParameter(paramaterName) {
    var pageURL = window.location.search.substring(1);
    var parameters = pageURL.split('&');
    for (var i = 0; i < parameters.length; ++i) {
        var  parameter = parameters[i].split('=');
        if (parameter[0] == paramaterName) {
            return parameter[1];
        }
    }
    return "";
}

function toFormattedNumber(num, length) {
    var formatted = "" + num;
    while (formatted.length < length) {
        formatted = "0" + formatted;
    }
    return formatted;
}


const dataProviderXML = () => ({
    preloadData: (path, callback) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange =() => {
            if (request.readyState == XMLHttpRequest.DONE) {
                if (request.status >= 200 && request.status < 300) {
                    callback(request.responseText);
                } else {
                    console.error(path, "Couldn't load text " + path + ": status " + request.status + ", " + request.responseText);
                }
            }
        }
        request.open("GET", path, true);
        request.send();
    }
})


const dataParserJSON = () => ({
    parse: (text) => {
        var parsed;
        try {
            parsed = JSON.parse(text);
        } catch (e) {
            console.log("Parsing data failed");
        }
        
        return parsed;
    }
})

const dataLoader = (dataProvider, dataParser) => ({
    loadData: (path, callback) => {
        dataProvider.preloadData(path, (text) => {
            var data = dataParser.parse(text);
            if (data) {
                callback(data);
            } else {
                console.error("Could not load data.");
            }
        });
    }
})


class AbstractView {
    constructor(data) {
        this.data = data;
        this.server_time = new Date(data.server_time);
        this.dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    }

    display() {
        console.error("Abstract View is abstract!");
    }

    getValidDrawings(promotion) {
        return promotion.drawings.filter(drawing => {
            let date = new Date(drawing.drawing_date);
            return date && date > this.server_time;
        });
    }

    getNextDrawing(promotion) {
        let validDrawingDates = this.getValidDrawings(promotion);
        if (validDrawingDates && validDrawingDates.length) {
            return validDrawingDates.reduce((min, date) => date < min ? date : min, validDrawingDates[0]);
        }
        return null;
    }

    getNextDrawingDateString(promotion) {
        let nextDrawing = this.getNextDrawing(promotion);
        if (nextDrawing) {
            return this.getFormattedDate(nextDrawing.drawing_date);
        }
        return "";
    }

    getFormattedDate(dateStr) {
        let date = new Date(dateStr);
        return date.toLocaleDateString("en-US", this.dateOptions);        
    }
}

class ListView extends AbstractView {
    constructor(data) {
        super(data);
    }

    display() {
        this.data.promotion_objects.forEach((promotion, index) => {
            let item =  $('<div>');

            let itemImg = $('<img>');
            itemImg.attr('src', promotion.promo_image_url);
            itemImg.appendTo(item);

            let itemLink = $('<div>');
            itemLink.text(promotion.promotion_name);
            itemLink.appendTo(item);
            itemLink.addClass('link');
            itemLink.click(() => window.location.href = window.location.href.split('?')[0]+'?promo=promo'+toFormattedNumber(index+1,2));

            let itemSummary = $('<div>');
            itemSummary.text(promotion.summary);
            itemSummary.appendTo(item);
            itemSummary.addClass('item');
            
            let itemDrawing = $('<div>');

            itemDrawing.text('Next Drawing Date: '+this.getNextDrawingDateString(promotion));
            itemDrawing.appendTo(item);
            itemDrawing.addClass('item');

            item.appendTo('.promotion-list');
        });
        $('.promotion-list').removeClass('hidden');

    }
}

class PromotionView extends AbstractView {
    constructor(data, id) {
        super(data);
        this.promotion = this.data.promotion_objects[id - 1];
    }

    display() {
        if (screen.width <= 480)
            this.displaySmall();
        else
            this.displayWide();
        $('.promotion-view').removeClass('hidden');
    }

    displaySmall() {

    }

    displayWide() {
        this.displayHeaderWide();

        this.displayDrawingsWide();

        this.displayDrawingsEntryInfo();

        this.displayEntriesWide();

        $('body').addClass('gradientbg');
    }

    displayHeaderWide() {
        let itemImg = $('<img>');
        itemImg.attr('src', this.promotion.promo_image_url);
        itemImg.appendTo('.promotion-header');

        let itemName = $('<div>');
        itemName.text(this.promotion.promotion_name);
        itemName.appendTo('.promotion-header');
        itemName.addClass('name');

        let itemSummary = $('<div>');
        itemSummary.text(this.promotion.summary);
        itemSummary.appendTo('.promotion-header');
    }

    displayDrawingsWide() {
        let drawingTable = $('<table>');
        
        let drawingHeader = $('<tr>');
        
        let drawingPrizeHeader = $('<th>');
        drawingPrizeHeader.text('PRIZE');
        drawingPrizeHeader.appendTo(drawingHeader);

        let drawingEntryHeader = $('<th>');
        drawingEntryHeader.text('ENTRY DEADLINE');
        drawingEntryHeader.appendTo(drawingHeader);

        let drawingDateHeader = $('<th>');
        drawingDateHeader.text('DRAWING DATE');
        drawingDateHeader.appendTo(drawingHeader);

        drawingHeader.appendTo(drawingTable);

        this.getValidDrawings(this.promotion).forEach(drawing => {
            let drawingRow = $('<tr>');
            
            let drawingPrize = $('<td>');
            drawingPrize.text(drawing.prize);
            drawingPrize.appendTo(drawingRow);

            let drawingEntry = $('<td>');
            drawingEntry.text(this.getFormattedDate(drawing.entry_deadline));
            drawingEntry.appendTo(drawingRow);

            let drawingDate = $('<td>');
            drawingDate.text(this.getFormattedDate(drawing.drawing_date));
            drawingDate.appendTo(drawingRow);

            drawingRow.appendTo(drawingTable);
        });

        drawingTable.appendTo('.drawing-schedule');
    }

    displayDrawingsEntryInfo() {
        let entryInfo = $('<div>');
        entryInfo.text(this.promotion.entry_info);
        entryInfo.appendTo('.drawing-schedule');
        $('.total-tickets').text("Your Total Tickets Entered: " + this.promotion.entries.length);
    }

    displayEntriesWide() {
        let entriesTable = $('<table>');
        
        let entriesHeader = $('<tr>');
        
        let entryNumberHeader = $('<th>');
        entryNumberHeader.text('ENTRY NUMBER');
        entryNumberHeader.appendTo(entriesHeader);

        let entryDateHeader = $('<th>');
        entryDateHeader.text('DATE');
        entryDateHeader.appendTo(entriesHeader);

        entriesHeader.appendTo(entriesTable);
        entriesTable.appendTo('.tickets');

        this.promotion.entries.forEach(entry => {
            let entryRow = $('<tr>');

            let entryNumber = $('<td>');
            entryNumber.text(entry.entry_number);
            entryNumber.appendTo(entryRow);

            let entryDate = $('<td>');
            entryDate.text(this.getFormattedDate(entry.date));
            entryDate.appendTo(entryRow);

            entryRow.appendTo(entriesTable);
        });
    }
}


