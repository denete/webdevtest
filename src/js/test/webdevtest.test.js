/**
 * Unit tests
 */

/* global describe it */

const assert = require('assert');
const {getNextDate, dateConvert} = require('../webdevtest.js');

/* eslint-disable max-len */

const drawings = [
    {
        entry_deadline : '2016-06-07T23:59:59',
        drawing_date : '2016-06-13T12:00:00'
    }, {
        entry_deadline : '2016-06-20T23:59:59',
        drawing_date : '2016-06-10T12:00:00'
    }, {
        entry_deadline : '2016-05-20T23:59:59',
        drawing_date : '2016-06-26T12:00:00'
    }
];

describe('WebDevTest module', function(){

    describe('dateConvert', function(){
        it('prog format', () => { assert.equal(dateConvert('Y-m-d H:i:s', '2018-09-02T12:34:56'), '2018-09-02 12:34:56'); });
        it('eng format', () => { assert.equal(dateConvert('l, F j, Y', '2018-09-02'), 'Sunday, September 2, 2018'); });
    });

    describe('getNextDate', function(){
        it('deadline', () => { assert.equal(getNextDate(drawings, 'entry_deadline'), '2016-05-20T23:59:59'); });
        it('drawing', () => { assert.equal(getNextDate(drawings, 'drawing_date'), '2016-06-10T12:00:00'); });
    });

});
