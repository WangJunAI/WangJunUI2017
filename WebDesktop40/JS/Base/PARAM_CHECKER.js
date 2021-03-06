﻿///参数检查器
var PARAM_CHECKER = {
    ///是否是字符串类型
    IsString: function (input) {
        return PARAM_CHECKER.IsValid(input) && "string" == typeof (input);
    },

    ///是否是空字符串
    IsEmptyString: function (input) {
        return PARAM_CHECKER.IsString(input) && "" == input;
    },

    ///是否不是空字符串
    IsNotEmptyString: function (input) {
        return PARAM_CHECKER.IsString(input) && 0 < input.trim().length;
    },


    ///是否有意义
    IsValid: function (input) {
        return null != input && undefined != input;
    },

    ///若是对象
    IsObject: function (input) {
        return PARAM_CHECKER.IsValid(input) && "object" == typeof (input);
    },

    IsEmptyObject: function (input) {
        return (true === PARAM_CHECKER.IsObject(input)) && (JSON.stringify(input) === JSON.stringify({}));
    },

    IsNotEmptyObject: function (input) {
        return (true === PARAM_CHECKER.IsObject(input)) && (JSON.stringify(input) != JSON.stringify({}));
    },


    ///若是数值
    IsArray: function (input) {
        return PARAM_CHECKER.IsValid(input) && "object" == typeof (input) && input.constructor == Array;
    },

    ///判断是否是函数
    IsFunction: function (input) {
        return PARAM_CHECKER.IsValid(input) && "function" == typeof (input);
    },

    ///判断是否是日期
    IsDate: function (input) {
        return PARAM_CHECKER.IsValid(input) && "Invalid Date" != new Date(input.toString()).toString();
    },

    ///是否是JS路径
    IsJSUrl: function (input) {
        var reg = new RegExp(/.js/i);
        var res = reg.test(input);
        return res;
    },
    ///是否是整数
    IsInt: function (input) {
        return !isNaN(parseInt(input));
    },

    ///是否是浮点数
    IsFloat: function (input) {
        return !isNaN(parseFloat(input));
    },

    ///是否是一个数字
    IsNumber: function (input) {
        return !isNaN(Number(input));
    },

    ///是否包含指定的字符
    Contains: function (keyword, input) {
        var reg = new RegExp(keyword, "ig");
        var res = reg.test(input);
        return res;
    },

    ///是否是指定类型的对象
    IsInstanceOf: function (obj, cls) {
        return (obj instanceof cls);
    },

    IsUrl: function (input) {
        var res = (true === PARAM_CHECKER.IsNotEmptyString(input) && ("http://" === input.substring(0, 7) || "http://" === input.substring(0, 8)))
        return res;
    },

    IsHtml: function (input) {
        var source = input.trim();
        if (true === PARAM_CHECKER.IsNotEmptyString(source)) {
            var char1 = source[0];
            var char2 = source[source.length - 1];
            return ("<" === char1) && (">" === char2);
        }
        return false;
    },


    IsEmptyObjectId: function (input) {
        return "000000000000000000000000" === input;
    },

    IsNotEmptyObjectId: function (input) {
        return PARAM_CHECKER.IsNotEmptyString(input) && (24 === input.length) && "000000000000000000000000" != input;
    },

    IsTopWindow: function () {
        return window === top.window;
    },

    IsVideoFile: function (input) {
        return PARAM_CHECKER.IsNotEmptyString(input) && 4<input.length && ".mp4" === input.slice(-4).toLowerCase();
    }

}

