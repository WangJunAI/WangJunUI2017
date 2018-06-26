/// <reference path="param_checker.js" />


var Convertor = {};
///时间的格式化
Convertor.DateFormat = function (date, format) {
    
    if (PARAM_CHECKER.IsNotEmptyString(format)) {
        date = new Date(date);
        var year = date.getFullYear();
        var month = (10 <= date.getMonth() + 1) ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1); 
        var day = (10 <= date.getDate() + 1)?(date.getDate() + 1): "0" +( date.getDate() + 1);
        var hour = (10 <= date.getHours() + 1) ? (date.getHours() + 1) : "0" + (date.getHours() + 1);  
        var minutes = (10 <= date.getMinutes() + 1) ? (date.getMinutes() + 1) : "0" + (date.getMinutes() + 1);  
        var str = format.replace("yyyy", year).replace("MM", month).replace("dd", day).replace("hh", hour).replace("mm", minutes);
        return str;
    }
    return date.toLocaleString();
}


Convertor.ToBase64String = function (input,safeMode) {
    var str = CryptoJS.enc.Utf8.parse(input);
    var base64 = CryptoJS.enc.Base64.stringify(str);
    if (true === safeMode) {
        base64 = base64.replace(/\+/g, "加号").replace(/\//g, "斜杠").replace(/=/g, "等于").replace(/ /g, "空格");
    }
    return base64;
}

Convertor.ArrayToDict = function (sourceArray,keyName) {
    var dict = {};
    if (true === PARAM_CHECKER.IsArray(sourceArray)) {
        for (var k = 0; k < sourceArray.length; k++) {
            var sourceItem = sourceArray[k];
            dict[sourceItem[keyName]] = sourceItem;
        }
    }
    return dict;
}