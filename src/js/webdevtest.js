/**
 * WebDevTest module
 */

/*
// for unit testing
const {dateFormat} = require('./dateformat.js');
*/

import dateFormat from './dateformat.js';

/**
 * Latest date (to search for the earliest)
 * @type {String}
 */
const MAX_DATE = '9999-12-31';

/**
 * Handle error caught in promise
 * @param {Object} error - Error object
 */
const log = function(error){
    console.error(error);
};

/**
 * Shorted document.getElementById
 * @param {String} id
 * @return {DOM}
 */
const ID = function(id){
    return document.getElementById(id);
};

/**
 * Request an ajax call
 * @param {Object} options
 * @return {Promise|null}
 * @description
 *  options = {
 *      method : String ('GET'|'POST'|'PUT'|'DELETE'|...)
 *      url : String
 *      data : String
 *      callback : Function
 *  }
 */
const ajax = function(options){
    let promise = null;
    const xhr = new XMLHttpRequest();
    const data = options.data || '';
    xhr.open(options.method, options.url);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    if (typeof options.callback === 'function'){
        xhr.onload = function(){
            options.callback(xhr.responseText);
        };
    }
    else {
        promise = new Promise(function(resolve, reject){
            xhr.onload = function(){
                resolve(xhr.responseText);
            };
            xhr.onerror = function(){
                reject({
                    name : 'XHR error',
                    message : `Url: ${options.url}; Data: ${data}`
                });
            };
        });
    }
    xhr.send(data);
    return promise;
};

/**
 * Get the earliest date in the promotion_objects.drawings construct
 * @param {Object} drawings - promotion_objects.drawings
 * @param {String} prop - property name
 * @return {String} earliest date
 */
const getNextDate = function(drawings, prop){
    const nextDate = drawings
        .map(
            drawing => drawing[prop]
        ).reduce(
            (date1, date2) => (date1 < date2 ? date1 : date2),
            MAX_DATE
        );
    return nextDate;
};

/**
 * Convert parseable date to an other format
 * @param {String} format - required format
 * @param {String} date - date string
 * @return {String} formatted date string
 */
const dateConvert = function(format, date){
    return dateFormat(format, Math.round(Date.parse(date) / 1000));
};

/**
 * Generate promotion list site
 * @param {Object} data - data from json file (root)
 */
const fillPromotionList = function(data){

    const templateContent = ID('promotion-list-item').content;
    const select = templateContent.querySelector.bind(templateContent);

    data.promotion_objects.forEach((promotion, index) => {
        const nextDrawingDate = getNextDate(promotion.drawings, 'drawing_date');
        const nextDrawingFormatDate = dateConvert('j F Y', nextDrawingDate);

        const url = `index.html?promo=promo${String(index + 1).padStart(2, '0')}`;

        select('[data-image]').setAttribute('src', promotion.promo_image_url);
        select('[data-image]').setAttribute('alt', promotion.promotion_name);
        select('[data-name]').innerHTML = promotion.promotion_name;
        select('[data-name]').setAttribute('href', url);
        select('[data-summary]').innerHTML = promotion.summary;
        select('[data-drawing-date]').setAttribute('datetime', nextDrawingDate);
        select('[data-drawing-date]').innerHTML = nextDrawingFormatDate;

        ID('promotion-list').appendChild(
            document.importNode(templateContent, true)
        );
    });
};

/**
 * Generate promotion item site
 * @param {Object} data - data from json file (promotion_objects[n])
 */
const fillPromotionItem = function(data){
    const templateContent = ID('promotion').content;
    const select = templateContent.querySelector.bind(templateContent);

    const nextDeadlineDate = getNextDate(data.drawings, 'entry_deadline');
    const nextDeadlineFormatDate = dateConvert('l, F j, Y', nextDeadlineDate);
    const ticketsNum = data.entries.length;

    select('[data-deadline-date]').setAttribute('datetime', nextDeadlineDate);
    select('[data-deadline-date]').innerHTML = nextDeadlineFormatDate;
    select('[data-image]').setAttribute('alt', data.promotion_name);
    select('[data-image]').setAttribute('src', data.promo_image_url);
    select('[data-name]').innerHTML = data.promotion_name;
    select('[data-summary]').innerHTML = data.summary;
    select('[data-entry-info]').innerHTML = data.entry_info;
    select('[data-tickets-num]').innerHTML = ticketsNum;

    ID('promotion-item').appendChild(
        document.importNode(templateContent, true)
    );

    ['wide', 'thin'].forEach(id => {
        data.drawings.forEach(drawing => {
            const templateContentSub = ID(`drawings-${id}`).content;
            const selectSub = templateContentSub.querySelector.bind(templateContentSub);

            const prize = drawing.prize.split(' ')[0];
            const deadlineFormatDate = dateConvert('l, F j, Y', drawing.entry_deadline);
            const drawingFormatDate = dateConvert('l, F j, Y', drawing.drawing_date);

            selectSub('[data-prize]').innerHTML = prize;
            selectSub('[data-deadline-date]').setAttribute('datetime', drawing.entry_deadline);
            selectSub('[data-deadline-date]').innerHTML = deadlineFormatDate;
            selectSub('[data-drawing-date]').setAttribute('datetime', drawing.drawing_date);
            selectSub('[data-drawing-date]').innerHTML = drawingFormatDate;

            document.querySelector(`#promotion-item [data-drawings-${id}]`).appendChild(
                document.importNode(templateContentSub, true)
            );
        });

        data.entries.forEach(entry => {
            const templateContentSub = ID(`entries-${id}`).content;
            const selectSub = templateContentSub.querySelector.bind(templateContentSub);

            const deadlineFormatDate = dateConvert('l, F j, Y', entry.date);

            selectSub('[data-number]').innerHTML = entry.entry_number;
            selectSub('[data-date]').setAttribute('datetime', entry.date);
            selectSub('[data-date]').innerHTML = deadlineFormatDate;

            document.querySelector(`#promotion-item [data-entries-${id}]`).appendChild(
                document.importNode(templateContentSub, true)
            );
        });
    });
};

/**
 * Generate the subpages
 * @param {Object} data - data from json file (root)
 */
const fillWebsite = function(data){
    const query = /\?promo=promo(\d+)/g.exec(window.location.search);
    if (!query){
        fillPromotionList(data);
    }
    else {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = 'css/layout-item.min.css';
        document.querySelector('head').appendChild(css);
        const promotionIndex = Number(query[1]) - 1;
        fillPromotionItem(data.promotion_objects[promotionIndex]);
    }
};

/**
 * Request ajax call to the json file
 */
const init = function(){
    document.addEventListener('DOMContentLoaded', function(){

        ajax({
            method : 'GET',
            url : 'js/webdevtest-data.json'
        }).then(function(resp){
            const parsedResp = JSON.parse(resp);
            fillWebsite(parsedResp);
        }).catch(function(error){
            log(error);
        });

    });
};

/*
// for unit testing
module.exports = {
    getNextDate,
    dateConvert
};
*/

export default init;
