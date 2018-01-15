

var NET = {}

NET.LoadData = function (url, callback, context,method) {
    if (true === PARAM_CHECKER.IsObject(context)) {
        context = JSON.stringify(context);
    }

    method = "GET";

    $.ajax({
        url: url,
        data: context,
        type: method,
        success: function (data, textStatus) {
            callback(data);
        }
    });
}


