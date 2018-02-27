

var NET = {}

NET.LoadData = function (url, callback, context,method) {
    if (true === PARAM_CHECKER.IsObject(context)) {
        context = JSON.stringify(context);
    }
    url = url.replace("?", "?_=" + new Date().getTime() + "&");
    method = (PARAM_CHECKER.IsNotEmptyString(method) && "GET" != method.toUpperCase()) ? "POST" : "GET";

    $.ajax({
        url: url,
        data: context,
        type: method,
        success: function (data, textStatus) {
            LOGGER.Log(data);
            callback(data);
        }
    });
}
 

NET.PostData = function (url, callback, context) {
    NET.LoadData(url, callback, context, NET.POST);
}
 

NET.POST = "POST";

NET.GET = "GET";

NET.GetQueryParam = function (name,url) {
    if (!PARAM_CHECKER.IsNotEmptyString(url)) {
        url = window.location.href.toLowerCase();
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
    if (PARAM_CHECKER.IsNotEmptyString(name)) {
        return param[name.toLowerCase()];
    }
    return param;
}


