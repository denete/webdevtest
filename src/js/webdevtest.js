$(document).ready(function () {
    const site = getSite();

    $.getJSON('js/webdevtest-data.js', function(data) {
        if (site > 0)
            lodaPromotionView(data["promotion_objects"][site - 1]);
        else
            loadPromotionListView(data["promotion_objects"]);
    });
});

function getSite() {
    const url = location.href;
    let index = url.indexOf("?");
    if (index == -1)
        return -1;

    const pairs = url.substring(index + 1);
    index = pairs.indexOf("promo=promo");
    if (index == -1)
        return -1;

    let data = pairs.substr(index + 11);
    index = data.indexOf("&");
    if (index != -1)
        data = data.substr(0, index);

    return parseInt(data.replace(/^0+/, ''));
}

function lodaPromotionView(data) {
    $("#promotion-view-layout").removeClass("d-none");

    $("#promotion-name").text(data["promotion_name"]);
    $(".promotion-image").attr("src", data["promo_image_url"]);
    $("#summary").text(data["summary"]);
    $("#entry-info").text(data["entry_info"]);

    const scheduleTable = $("#small-drawing-schedule");
    const scheduleTableRow = scheduleTable.find(".entry-row").first().clone();
    scheduleTable.empty();

    $("#schedule tbody").empty();
    $.each(data["drawings"], function (i, x) {
        let date = $.format.toBrowserTimeZone(x["drawing_date"], "ddd, MMMM dd, yyyy");
        let deadline = $.format.toBrowserTimeZone(x["entry_deadline"], "ddd, MMMM dd, yyyy");
        $("#schedule tbody").append("<tr><td>" + x["prize"] + "</td><td>" + deadline + "</td><td>" + date + "</td></tr>");

        let newRow = scheduleTableRow.clone();
        newRow.find(".schedule-prize").text(x["prize"]);
        newRow.find(".schedule-deadline").text(deadline);
        newRow.find(".schedule-drawing-date").text(date);
        scheduleTable.append(newRow);
    });

    const ticketTable = $("#small-ticket-table");
    const ticketTableRow = ticketTable.find(".entry-row").first().clone();
    ticketTable.empty();

    $("#ticket tbody").empty();
    $("#entries-count").text(data["entries"].length);
    $.each(data["entries"], function (i, x) {
        let date = $.format.toBrowserTimeZone(x["date"], "ddd, MMMM dd, yyyy");
        $("#ticket tbody").append("<tr><td>" + x["entry_number"] + "</td><td>" + date + "</td></tr>");

        let newRow = ticketTableRow.clone();
        newRow.find(".entry-number").text(x["entry_number"]);
        newRow.find(".entry-date").text(date);
        ticketTable.append(newRow);
    });
}

function loadPromotionListView(data) {
    $("#promotion-list-view").removeClass("d-none");
    $("body").removeClass("promotion-background");

    const bannerRow = $("#promotion-list-view").find(".banner").first().clone();
    $("#promotion-list-view").empty();

    const indexOrder = [1, 2, 0];
    for (let i = 0; i < 3; i++){
        let promotion = data[indexOrder[i]];

        let earliestDrawing = null;
        $.each(promotion["drawings"], function (i, x) {
           let date = new Date(x["drawing_date"]);
           if (earliestDrawing == null || earliestDrawing < date) {
               earliestDrawing = date;
           }
        });

        let newRow = bannerRow.clone();
        newRow.find("img").attr("src", promotion["promo_image_url"]);
        newRow.find(".promotion-link > a").text(promotion["promotion_name"]);
        newRow.find(".promotion-link > a").attr("href", "index.html?promo=promo0" + (indexOrder[i] + 1).toString())
        newRow.find(".promotion-summary").text(promotion["summary"]);

        if (earliestDrawing != null)
            newRow.find(".promotion-next-drawing-date").text($.format.toBrowserTimeZone(earliestDrawing.toISOString(), "ddd, MMMM dd, yyyy"));

        $("#promotion-list-view").append(newRow);
    }
}
