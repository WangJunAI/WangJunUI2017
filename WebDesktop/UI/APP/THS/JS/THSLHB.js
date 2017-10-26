var THSLHB = {
    Get: function (context,callback) {
        $.ajax({
            url: "http://localhost:8990",
            data: context,
            type: "POST",
            success: function (data, textStatus) {
                callback(data);
            }
        });
    }
}

THSLHB.GetHotestYYB = function () {
    var callback = function (data) {
        var $item = $($("[templateID='THSLHB001']").html()).clone();
        for (var key in data.RES) {
            $item.find("[data-property='YYB']").text(key);
            $("#yyblist").append($item.html());//
        }
        
    }
    var context = {
        CMD: "同花顺",
        Method: "GetHotestYYB",
        Args: JSON.stringify({ "ContentType": "个股龙虎榜明细", "Date": { $eq: "2017-10-23" } })
    };

    THSLHB.Get(context, callback);
}

$(document).ready(function () {
    THSLHB.GetHotestYYB();
});