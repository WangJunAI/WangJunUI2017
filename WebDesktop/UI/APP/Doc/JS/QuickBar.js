var QuickBar = {};

QuickBar.LoadData = function (data, target, type) {
    var callback = function (res) {
        LOGGER.Log(res);
        QuickBar.ShowBlock1(res);
        QuickBar.ShowBlock2(res);
        QuickBar.ShowBlock3(res);
    }

    var context = ["{\"CategoryID\":{\"$in\":[\"5a68dfb726b0183ca8dd0456\",\"5a68dfca26b0183ca8dd0457\",\"5a68dfd926b0183ca8dd0458\"]}}", JSON.stringify({ "Content": 0 }), "{CreateTime:-1}", 0, 6];
    NET.LoadData(App.QuickBar.Server.Url1, callback, context, NET.POST);
}

QuickBar.ShowBlock1 = function (data, type) {
    if (PARAM_CHECKER.IsArray(data)) {
        var tplHtml1 = $("#QuickBarBlock1").html().replace("[上级分类]","科技");
        var listHtml = "";
        for (var k = 0; k < data.length; k++) {
            var item = data[k];
            listHtml += "<li><a href='[href1]' target='_blank'>[[Category]]</a><a href='[href2]' target='_blank'>[Title]</a></li>"
                .replace("[Category]", item.CategoryName).replace("[Title]", (15 <= item.Title.length) ? item.Title.substring(0, 15) : item.Title);
        }
        tplHtml1 = tplHtml1.replace("[列表]", listHtml);
        $("#right").append(tplHtml1);
    }
}


QuickBar.ShowBlock2 = function (data, type) {
    if (PARAM_CHECKER.IsArray(data)) {
        var blockHtml = $("#QuickBarBlock2").html().replace("[上级分类]", "科技");
        var itemHtml = $("#QuickBarBlock2Item").html();
        var listHtml = "";
        for (var k = 0; k < data.length; k++) {
            var item = data[k];
            listHtml += itemHtml.replace("[CategoryName]", item.CategoryName).replace("[Title]",  item.Title);
        }
        blockHtml = blockHtml.replace("[列表]", listHtml);
        $("#right").append(blockHtml);
    }
}

QuickBar.ShowBlock3 = function (data, type) {
    if (PARAM_CHECKER.IsArray(data)) {
        var tplHtml1 = $("#QuickBarBlock3").html();//.replace("[上级分类]", "科技");
        var listHtml = "";
        for (var k = 0; k < data.length; k++) {
            var item = data[k];
            listHtml += "<li><a href=\"[href1]\">[[CategoryName]]</a><a href=\"[href2]\">[Title]</a></li>"
                .replace("[CategoryName]", item.CategoryName).replace("[Title]", (15 <= item.Title.length) ? item.Title.substring(0, 15) : item.Title);
        }
        tplHtml1 = tplHtml1.replace("[列表]", listHtml);
        $("#right").append(tplHtml1);
    }
}




QuickBar.Initial = function () {
    $(document).ready(function () {
        QuickBar.LoadData();

    });
}