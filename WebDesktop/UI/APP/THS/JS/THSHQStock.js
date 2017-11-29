var THSHQStock = {
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


THSHQStock.CMD = {
    "A002": { $and: [{ "ContentType": { $eq: "首页概览" } }, { "StockCode": { $eq:"" } }] }
}

THSHQStock.CACHE = {};

///获取高质量股票
THSHQStock.GetHighQualityStockList = function () {
    var callback = function (data) {
        var $item = $($("[templateID='THSHQStock001']").html()).clone();
        $("#stockList").empty();
        for (var k= 0; k< data.RES.length; k++) {
            var dataItem = data.RES[k];
            $item.find("[data-property='StockCode']").text(dataItem.StockCode);
            $item.find("[data-property='StockName']").text(dataItem.StockName);
            $item.find("[data-command='A002']").attr("data-param", dataItem.StockCode);
            $("#stockList").append($item.html());
        }

        EventProc.BindClick("[data-command='A002']", THSHQStock.GetHighQualityStockDetail);
    }

    var context = {
        CMD: "同花顺",
        Method: "GetHighQualityStock",
        Args: JSON.stringify({ $and: [{ "ContentType": { $eq: "首页概览" } }, { "Company.Value.8": { $gt: 50 } }, { "Company.Value.8": { $gt: 50 } }, { "Company.Value.10": { $gt: 1 } }, { "Company.Value.11": { $gt: 1 } }, { "Company.Value.12": { $gt: 1 } }] })
    };

    THSHQStock.Get(context, callback);
}

///获取高质量股票
THSHQStock.GetHighQualityStockDetail = function () {
    var cmd = $(this).attr("data-command");
    var stockcode = $(this).attr("data-param");
    cmd = THSHQStock.CMD[cmd];
    cmd.$and[1].StockCode.$eq = stockcode;

    var callback = function (data) {
        var res = data.RES[0];
        $("#每股净资产").text(res.Company.Value[5]);
        $("#每股收益").text(res.Company.Value[6]);
        $("#净利润增长率").text(res.Company.Value[8]);
        $("#每股现金流").text(res.Company.Value[10]);
        $("#每股公积金").text(res.Company.Value[11]);
        $("#每股未分配利润").text(res.Company.Value[12]);
        $("#健康度").text("非常健康");

        $("#涉及概念").text(res.Company.Value[1]);
    }

    var context = {
        CMD: "同花顺",
        Method: "GetHighQualityStock",
        Args: JSON.stringify(cmd)
    };

    THSHQStock.Get(context, callback);
}

var EventProc = {
    BindClick: function (selector,method) {
        $(selector).unbind("click");
        $(selector).bind("click", method);
    }
}
 


$(document).ready(function () {
    //THSHQStock.GetHighQualityStockList();
    var context = {
        CMD: "同花顺",
        Method: "GetDataFromHtml",
        Args: ""
    };

    THSHQStock.Get(JSON.stringify(context), function (res) { console.log(res) });
});