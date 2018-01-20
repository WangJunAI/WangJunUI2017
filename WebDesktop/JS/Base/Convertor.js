/// <reference path="param_checker.js" />


var Convertor = {};
///时间的格式化
Convertor.DateFormat = function (date, format) {
    
    if (PARAM_CHECKER.IsNotEmptyString(format)) {
        date = new Date(date);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate() + 1;
        var hour = date.getHours() + 1;
        var minutes = date.getMinutes() + 1;
        var str = format.replace("yyyy", year).replace("MM", month).replace("dd", day).replace("hh", hour).replace("mm", minutes);
        return str;
    }
    return date.toLocaleString();
}


Convertor.ToBase64String = function (input) {
    var str = CryptoJS.enc.Utf8.parse(input);
    var base64 = CryptoJS.enc.Base64.stringify(str);
    return base64;
}