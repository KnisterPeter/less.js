
// ecma-5.js
//
// -- kriskowal Kris Kowal Copyright (C) 2009-2010 MIT License
// -- tlrobinson Tom Robinson
// dantman Daniel Friesen

//
// Namespace
//
Ecma5 = {};

//
// Array
//
Ecma5.isArray = function(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]" ||
           (obj instanceof Array);
};
Ecma5.forEach =  function(array, block, thisObject) {
    var len = array.length >>> 0;
    for (var i = 0; i < len; i++) {
        if (i in array) {
            block.call(thisObject, array[i], i, array);
        }
    }
};
Ecma5.map = function(array, fun /*, thisp*/) {
    var len = array.length >>> 0;
    var res = new Array(len);
    var thisp = arguments[2];

    for (var i = 0; i < len; i++) {
        if (i in array) {
            res[i] = fun.call(thisp, array[i], i, array);
        }
    }
    return res;
};
Ecma5.filter = function(array, block /*, thisp */) {
    var values = [];
    var thisp = arguments[2];
    for (var i = 0; i < array.length; i++) {
        if (block.call(thisp, array[i])) {
            values.push(array[i]);
        }
    }
    return values;
};
Ecma5.reduce = function(array, fun /*, initial*/) {
    var len = array.length >>> 0;
    var i = 0;

    // no value to return if no initial value and an empty array
    if (len === 0 && arguments.length === 2) throw new TypeError();

    if (arguments.length >= 3) {
        var rv = arguments[2];
    } else {
        do {
            if (i in array) {
                rv = array[i++];
                break;
            }
            // if array contains no values, no initial value to return
            if (++i >= len) throw new TypeError();
        } while (true);
    }
    for (; i < len; i++) {
        if (i in array) {
            rv = fun.call(null, rv, array[i], i, array);
        }
    }
    return rv;
};
Ecma5.indexOf = function(array, value /*, fromIndex */ ) {
    var length = array.length;
    var i = arguments[2] || 0;

    if (!length)     return -1;
    if (i >= length) return -1;
    if (i < 0)       i += length;

    for (; i < length; i++) {
        if (!Object.prototype.hasOwnProperty.call(array, i)) { continue }
        if (value === array[i]) return i;
    }
    return -1;
};

//
// Object
//
Ecma5.keys = function (object) {
    var keys = [];
    for (var name in object) {
        if (Object.prototype.hasOwnProperty.call(object, name)) {
            keys.push(name);
        }
    }
    return keys;
};

//
// String
//
Ecma5.trim = function (string) {
    return string.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

