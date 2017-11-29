

var NET = {}

NET.GETJSON = function (url,callback,context) {
    $.ajax({
        url: url,
        data: context,
        type: "GET",
        success: function (data, textStatus) {
            callback(data);
        }
    });
}

NET.POSTJSON = function (url, data) {
    $.ajax({
        url: url,
        data: context,
        type: "POST",
        success: function (data, textStatus) {
            callback(data);
        }
    });
}

