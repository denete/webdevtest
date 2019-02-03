/**
 * Class of the webdevtest application.
 * 
 * 
 * The app shows some promotion from a data feed in a 
 * list on the main page, and when the user picks one 
 * item from the list, it shows the detailed 
 * informations about the selected promotion.
 * 
 * To work, it needs a div with 'containerDiv' id in 
 * the DOM.
 */
class SGTestApp {

    /**
     * After app data initialization, calls the initView 
     * method to show the appropriate content.
     */
    constructor() {
        this.dataFeedUrl = 'js/webdevtest-data.js';
        this.data = null;
        this.containerDiv = null;
        this.promoViewContainer = null;

        // get feed data
        $.ajax({
            dataType: "json",
            url: this.dataFeedUrl,
            data: '',
            success: (data, status, xhr) => {
                this.data = data;
            }
          }).fail((jqXHR, textStatus, errorThrown) => {
            this.logger('Datafeed load error.', 'error');
            }).always(() => { this.initViews(); });
    }

    /**
     * Detects the URL parameters then calls the 
     * corresponding content generator method.
     */
    initViews() {
        let pIndex;
        let promo;

        promo = this.getParameter('promo');    // get 'promo' param
        this.containerDiv = $('#containerDiv').empty(); // set up container

        // if there is no promo param, the app will show the ListView
        if (!promo) {
            this.generateListView();
        } else {
            // if exists, show that promo
            pIndex = promo.replace("promo0", "");
            this.generatePromoView(pIndex - 1);
        }
        this.logger('Enjoy!', 'info');
    }

    /**
     * The method which will generate the list of the 
     * available promotions from the data feed.
     */
    generateListView() {
        const promoObjects = this.data.promotion_objects;
        let promoListRow,
            d;

        // for every element in the feed, we need to create 
        // the proper structure of the list
        promoObjects.forEach((element, index) => {
            d = this.getNextDate(this.data.server_time, element.drawings, 'drawing').format('dddd, MMMM DD, YYYY');
            // d = moment(element.drawings[0].drawing_date).format('dddd, MMMM DD, YYYY');

            promoListRow = $(`
                <div class="row promo-list-row">
                    <div class="col">
                        <img src="` + element.promo_image_url + `" class="promo-img">
                        <a href="index.html?promo=promo0` + (index + 1) + `" class="list-link">
                            ` + element.promotion_name + `
                        </a>
                        <div class="list-summary">
                            ` + element.summary + `
                        </div>
                        <div class="list-summary">
                        Next drawing date: ` + d + `
                        </div>
                    </div>
                </div>
            `);
            this.containerDiv.append($(promoListRow));
        });
    }

    /**
     * The method which generates the promotion details page.
     * 
     * @param {string} pIndex The promotion's index.
     */
    generatePromoView(pIndex) {
        const promoObj = this.data.promotion_objects[pIndex];
        const scheduleTableData = {};
        const ticketsTableData = {};

        let deadlineDate,
            deadlineRow,
            scheduleTable,
            ticketsTable;

        $('body').addClass('promo-bg'); // in the promo view, the background can be different

        // the drawing schedule table
        scheduleTableData.headers = [
            { name: 'Prize', prop: 'prize', type: 'string' },
            { name: 'Entry Deadline', prop: 'entry_deadline', type: 'longDate' },
            { name: 'Drawing Date', prop: 'drawing_date', type: 'longDate' }
        ];
        scheduleTableData.data = promoObj.drawings;
        scheduleTable = this.createResponsiveTable(scheduleTableData);

        // the entered tickets table
        ticketsTableData.headers = [
            { name: 'Entry Number', prop: 'entry_number', type: 'string' },
            { name: 'Date', prop: 'date', type: 'longDate' }
        ];
        ticketsTableData.data = promoObj.entries;
        ticketsTable = this.createResponsiveTable(ticketsTableData);

        deadlineDate = this.getNextDate(this.data.server_time, promoObj.drawings, 'deadline');
        deadlineRow = $(`
            <div class="row details-row details-next-deadline">
                <div class="col">
                    The Next Entry Deadline is ` + moment(deadlineDate).format('dddd, MMMM DD, YYYY') + `!
                </div>
            </div>
            <div class="row">
                <div class="col details-img-col">
                    <img src="` + promoObj.promo_image_url + `" class="promo-img">
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="details-name">
                        ` + promoObj.promotion_name + `
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="details-summary">
                    ` + promoObj.summary + `
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="table-title">
                        Drawing Schedule
                    </div>
                </div>
            </div>
            ` + scheduleTable[0].outerHTML + `
            <div class="row">
                <div class="col">
                    <div class="details-summary">
                    ` + promoObj.entry_info + `
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="table-title">
                        Your Total Tickets Entered: ` + promoObj.entries.length + `
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div class="locked-info">
                        All entries are locked in at the time they are submitted and cannot be deleted.
                    </div>
                </div>
            </div>`
            + ticketsTable[0].outerHTML
        );
        this.containerDiv.append($(deadlineRow));
    }

    /**
     * Returns a responsive table object based on the given object.
     * 
     * @param {Object} tableData Contains the headers and data arrays.
     */
    createResponsiveTable(tableData) {
        let retObj,
            table,
            tbodyTr,
            th = '',
            tbodyStr = '';

        // the header cols
        tableData.headers.forEach((item) => {
            th += $('<th>' + item.name + '</th>')[0].outerHTML;
        });

        tableData.data.forEach((rowData) => {
            tbodyTr = $('<tr></tr>');

            tableData.headers.forEach((headerItem) => {
                let value = rowData[headerItem.prop];
                let td;

                if (headerItem.type === 'longDate') {
                    value = moment(value).format('dddd, MMMM DD, YYYY');
                }

                td = $('<td>' + value + '</td>');
                tbodyTr.append(td);
            });
            tbodyStr += tbodyTr[0].outerHTML;
        });


        retObj = $(`<div class="stack-table-container"></div>`);
        table = $(`
                <table id="ticketsEnteredTable" class="table large-only">
                <thead>
                    <tr>
                        ` + th + `
                    </tr>
                </thead> 
                <tbody>
                    ` + tbodyStr + `
                </tbody>
            </table>
        `);

        retObj.append(table);
        table.cardtable({myClass: 'stack-table-container'});

        return retObj;
    }

    /**
     * Returns the next deadline or drawing from an array 
     * of drawings based on a given date.
     * 
     * @param {string} now The date to compare to.
     * @param {Object[]} drawings The array of the drawings.
     * @param {string} prop In which property should it search ('deadline' or 'drawing').
     */
    getNextDate(now, drawings, prop) {
        const momentNow = moment(now);
        let retVal;

        drawings.forEach((item) => {
            const dateStr = prop === 'deadline' ? item.entry_deadline : item.drawing_date;
            const currMoment = moment(dateStr);
            const diff = moment.duration(currMoment.diff(momentNow))._milliseconds;

            // The retVal can get value only if there is no retVal yet and the actual duration positive or
            // the retVal is not undefined but the actual duration is shorter than that.
            if ((retVal === undefined && diff > 0) ||
                (retVal !== undefined && diff < moment.duration(retVal.diff(momentNow))._milliseconds)) {
                retVal = currMoment;
            }
        });

        return retVal;
    }

    /**
     * Returns an URL param value.
     * 
     * @param {string} reqName The requested parameter's name.
     * @returns {(string | undefined)} The parameter's value if any.
     */
    getParameter(reqName) {
        let paramStr = window.location.search.substring(1),
            paramArr = paramStr.split('&'),
            currName;

        for (let i = 0, j = paramArr.length; i < j; i++) {
            currName = paramArr[i].split('=');

            if (currName[0] === reqName) {
                return currName[1] === undefined ? true : decodeURIComponent(currName[1]);
            }
        }
    }

    /**
     * Simple custom console logger. With predefined, colored styles.
     * 
     * @param {string} msg The message to log.
     * @param {string} type The type of the log ('info', 'warning' or 'error')
     */
    logger(msg, type) {
        let styleStr = '';

        if (type === 'info') {
            styleStr = 'color: #6495ed; text-shadow: 0 0 1px #dddddd;';
        } else if (type === 'warning') {
            styleStr = 'color: #ffa500; text-shadow: 0 0 1px #dddddd;';
        } else if (type === 'error') {
            styleStr = 'color: #dc143c; text-shadow: 0 0 1px #dddddd;';
        }

        console.log('%c'+ msg, styleStr);
    }
}

// as soon as the page is ready, the app starts
$(document).ready(function () {
    const app = new SGTestApp();
});
