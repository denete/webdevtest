/**
 * Unit tests
 */

/* global describe it */

const assert = require('assert');
const {dateFormat} = require('../dateformat.js');

/* eslint-disable max-len */

describe('dateFormat module', function(){

    describe('dateFormat', function(){
        it('prog format', () => { assert.equal(dateFormat('Y-m-d H:i:s', Date.parse('2018-09-02T12:34:56') / 1000), '2018-09-02 12:34:56'); });
        it('eng format', () => { assert.equal(dateFormat('l, F j, Y', Date.parse('2018-09-02') / 1000), 'Sunday, September 2, 2018'); });
    });

});
