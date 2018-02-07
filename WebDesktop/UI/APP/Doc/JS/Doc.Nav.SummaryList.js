Doc.LoadSummaryList = function (pageIndex, pageSize, query,type) {

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.ShowSummaryList(res, type);
    }

    if (PARAM_CHECKER.IsNotEmptyString(query)) {
        var context = [query, JSON.stringify({ "Content": 0, "PlainText": 0 }), "{CreateTime:-1}", pageIndex, pageSize];
        NET.LoadData(App.Doc.Server.Url1, callback, context, NET.POST);
    }
    else if(PARAM_CHECKER.IsArray(query)) {
        callback(query);
    }
}


Doc.ShowSummaryList = function (source, type) {
    var tplHtml = $("#tplSummaryList").html();
    var tplListItem = $("#tplSummaryListItem2").html();
    
    var listHtml = "";
    for (var k = 0; k < source.length; k++) {
        var item = source[k];
        listHtml += tplListItem.replace("[Title]", item.Title);
    }

    var html = tplHtml.replace("[列表]", listHtml);
    Doc.LoadHtmlTo("#leftList", html);
}

Doc.SummaryListItemClick = function () {
    ///加载详细
}