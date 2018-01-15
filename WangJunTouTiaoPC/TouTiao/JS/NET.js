

var NET = {}

NET.LoadData = function (url, callback, context,method) {
    if (true === PARAM_CHECKER.IsObject(context)) {
        context = JSON.stringify(context);
    }

    method = (PARAM_CHECKER.IsNotEmptyString(method) && "GET" != method.toUpperCase()) ? "POST" : "GET";

    $.ajax({
        url: url,
        data: context,
        type: method,
        success: function (data, textStatus) {
            callback(data);
        }
    });
}

NET.GetQueryParam = function (key,url) {
    if (!PARAM_CHECKER.IsNotEmptyString(url)) {
        url = window.location.href;
    }
    var param = {};
    var index = url.indexOf("?")+1;
    if (0<  index) {
        var paramArray = url.substring(index).split("&");
        for (var k = 0; k < paramArray.length; k++) {
            var key = paramArray[k].split("=")[0];
            var value = paramArray[k].split("=")[1];
            param[key] = value;
        }
    }
    return param;
}


