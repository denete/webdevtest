/**
 * Implementation of the PHP date() function
 * @copyright http://phpjs.org/functions/date (módosított ES2015+)
 * @param {String} format
 * @param {Number} timestamp
 * @returns {String}
 */
const dateFormat = function(format, timestamp){
    var f;
    let jsdate;
    // Keep this here (works, but for code commented-out below for file size reasons)
    // var tal= [];
    const txt_words = [
        'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    // trailing backslash -> (dropped)
    // a backslash followed by any character (including backslash) -> the character
    // empty string -> empty string
    const formatChr = /\\?(.?)/gi;
    const formatChrCb = function(t, s){
        return f[t] ? f[t]() : s;
    };
    const _pad = function(n, c){
        n = String(n);
        while (n.length < c){
            n = `0${n}`;
        }
        return n;
    };
    f = {
        // Day
        d : function(){
            // Day of month w/leading 0; 01..31
            return _pad(f.j(), 2);
        },
        D : function(){
            // Shorthand day name; Mon...Sun
            return f.l().slice(0, 3);
        },
        j : function(){
            // Day of month; 1..31
            return jsdate.getDate();
        },
        l : function(){
            // Full day name; Monday...Sunday
            return `${txt_words[f.w()]}day`;
        },
        N : function(){
            // ISO-8601 day of week; 1[Mon]..7[Sun]
            return f.w() || 7;
        },
        S : function(){
            // Ordinal suffix for day of month; st, nd, rd, th
            const j = f.j();
            let i = j % 10;
            if (i <= 3 && Number.parseInt((j % 100) / 10, 10) === 1){
                i = 0;
            }
            return ['st', 'nd', 'rd'][i - 1] || 'th';
        },
        w : function(){
            // Day of week; 0[Sun]..6[Sat]
            return jsdate.getDay();
        },
        z : function(){
            // Day of year; 0..365
            const a = new Date(f.Y(), f.n() - 1, f.j());
            const b = new Date(f.Y(), 0, 1);
            return Math.round((a - b) / 864e5);
        },

        // Week
        W : function(){
            // ISO-8601 week number
            const a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3);
            const b = new Date(a.getFullYear(), 0, 4);
            return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
        },

        // Month
        /**
         * @returns {String}
         */
        F : function(){
            // Full month name; January...December
            return txt_words[6 + f.n()];
        },
        m : function(){
            // Month w/leading 0; 01...12
            return _pad(f.n(), 2);
        },
        /**
         * @returns {String}
         */
        M : function(){
            // Shorthand month name; Jan...Dec
            return f.F()
                .slice(0, 3);
        },
        n : function(){
            // Month; 1...12
            return jsdate.getMonth() + 1;
        },
        t : function(){
            // Days in month; 28...31
            return (new Date(f.Y(), f.n(), 0))
                .getDate();
        },

        // Year
        /**
         * @returns {Number}
         */
        L : function(){
            // Is leap year?; 0 or 1
            const j = f.Y();
            return (j % 4 === 0 && j % 100 !== 0 || j % 400 === 0) ? 1 : 0;
        },
        o : function(){
            // ISO-8601 year
            const n = f.n();
            const W = f.W();
            const Y = f.Y();
            let y;
            if (n === 12 && W < 9){
                y = 1;
            }
            else if (n === 1 && W > 9){
                y = -1;
            }
            else {
                y = 0;
            }
            return String(Y + y);
        },
        /**
         * @returns {String}
         */
        Y : function(){
            // Full year; e.g. 1980...2010
            return String(jsdate.getFullYear());
        },
        y : function(){
            // Last two digits of year; 00...99
            return f.Y()
                .toString()
                .slice(-2);
        },

        // Time
        a : function(){
            // am or pm
            return jsdate.getHours() > 11 ? 'pm' : 'am';
        },
        /**
         * @returns {String}
         */
        A : function(){
            // AM or PM
            return f.a().toUpperCase();
        },
        B : function(){
            // Swatch Internet time; 000..999
            const H = jsdate.getUTCHours() * 36e2;
            // Hours
            const i = jsdate.getUTCMinutes() * 60;
            // Minutes
            // Seconds
            const s = jsdate.getUTCSeconds();
            return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
        },
        g : function(){
            // 12-Hours; 1..12
            return f.G() % 12 || 12;
        },
        /**
         * @returns {String}
         */
        G : function(){
            // 24-Hours; 0..23
            return String(jsdate.getHours());
        },
        h : function(){
            // 12-Hours w/leading 0; 01..12
            return _pad(f.g(), 2);
        },
        H : function(){
            // 24-Hours w/leading 0; 00..23
            return _pad(f.G(), 2);
        },
        i : function(){
            // Minutes w/leading 0; 00..59
            return _pad(jsdate.getMinutes(), 2);
        },
        s : function(){
            // Seconds w/leading 0; 00..59
            return _pad(jsdate.getSeconds(), 2);
        },
        u : function(){
            // Microseconds; 000000-999000
            return _pad(jsdate.getMilliseconds() * 1000, 6);
        },

        // Timezone
        e : function(){
            // Timezone identifier; e.g. Atlantic/Azores, ...
            // The following works, but requires inclusion of the very large
            // timezone_abbreviations_list() function.
            /*                            return This.date_default_timezone_get();
             */
            throw new Error('Not supported (see source code of date() for timezone on how to add support)');
        },
        /**
         * @returns {String}
         */
        I : function(){
            // DST observed?; 0 or 1
            // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
            // If they are not equal, then DST is observed.
            const a = new Date(f.Y(), 0);
            // Jan 1
            const c = Date.UTC(f.Y(), 0);
            // Jan 1 UTC
            const b = new Date(f.Y(), 6);
            // Jul 1
            // Jul 1 UTC
            const d = Date.UTC(f.Y(), 6);
            return String(((a - c) !== (b - d)) ? 1 : 0);
        },
        /**
         * @returns {String}
         */
        O : function(){
            // Difference to GMT in hour format; e.g. +0200
            const tzo = jsdate.getTimezoneOffset();
            const a = Math.abs(tzo);
            return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
        },
        /**
         * @returns {String}
         */
        P : function(){
            // Difference to GMT w/colon; e.g. +02:00
            const O = f.O();
            return (`${O.substr(0, 3)}:${O.substr(3, 2)}`);
        },
        /**
         * @returns {String}
         */
        T : function(){
            // Timezone abbreviation; e.g. EST, MDT, ...
            // The following works, but requires inclusion of the very
            // large timezone_abbreviations_list() function.
            /*                            var abbr, i, os, _default;
             if (!tal.length) {
             tal = This.timezone_abbreviations_list();
             }
             if (This.php_js && This.php_js.default_timezone) {
             _default = This.php_js.default_timezone;
             for (abbr in tal) {
             for (i = 0; i < tal[abbr].length; i++) {
             if (tal[abbr][i].timezone_id === _default) {
             return abbr.toUpperCase();
             }
             }
             }
             }
             for (abbr in tal) {
             for (i = 0; i < tal[abbr].length; i++) {
             os = -jsdate.getTimezoneOffset() * 60;
             if (tal[abbr][i].offset === os) {
             return abbr.toUpperCase();
             }
             }
             }
             */
            return 'UTC';
        },
        /**
         * @returns {String}
         */
        Z : function(){
            // Timezone offset in seconds (-43200...50400)
            return String(-jsdate.getTimezoneOffset() * 60);
        },

        // Full Date/Time
        c : function(){
            // ISO-8601 date.
            return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb);
        },
        r : function(){
            // RFC 2822
            return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
        },
        /**
         * @returns {String}
         */
        U : function(){
            // Seconds since UNIX epoch
            return String(jsdate / 1000);
        }
    };
    const _date = function(form, stamp){
        if (typeof stamp === 'undefined'){
            jsdate = new Date(); // Not provided
        }
        else if (stamp instanceof Date){
            jsdate = new Date(stamp); // JS Date()
        }
        else {
            jsdate = new Date(stamp * 1000); // UNIX timestamp (auto-convert to int)
        }
        return form.replace(formatChr, formatChrCb);
    };
    return _date(format, timestamp);
};

/*
// for unit testing
module.exports = {
    dateFormat
};
*/

export default dateFormat;
