Doc.LoadSummaryList = function (pageIndex, pageSize, query, type) {

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.ShowSummaryList(res, type);
    }

    if (PARAM_CHECKER.IsNotEmptyString(query)) {
        var context = [query, JSON.stringify({ "Content": 0, "PlainText": 0 }), "{CreateTime:-1}", pageIndex, pageSize];
        NET.LoadData(App.Doc.Server.Url1, callback, context, NET.POST);
    }
    else if (PARAM_CHECKER.IsArray(query)) {
        callback(query);
    }
}


Doc.ShowSummaryList = function (source, type) {
    var tplHtml = $("#tplSummaryList").html();
    var tplListItem = $("#tplSummaryListItem1").html();

    var listHtml = "";
    for (var k = 0; k < source.length; k++) {
        var item = source[k];
        listHtml += tplListItem.replace("[Title]", item.Title);
    }

    var html = tplHtml.replace("[列表]", listHtml);
    Doc.LoadHtmlTo("#leftList", html);
}

Doc.LoadSummaryListTo = function (target, data, option) {
    var tplHtml = $("#tplSummaryList").html();
    var tplListItem = $("#tplSummaryListItem1").html();

    var listHtml = "";
    for (var k = 0; k < data.length; k++) {
        var item = data[k];
        listHtml += tplListItem.replace("[Title]", item.Title).replace("[Method]", "Doc.SummaryListItemClick()")
            .replace("[Param]", item.ID).replace("[Summary]", item.PlainText);
    }

    var html = tplHtml.replace("[列表]", listHtml);
    Doc.LoadHtmlTo(target, html);

}

Doc.SummaryListItemClick = function () {
    ///加载详细
    var id = $(event.target).attr("data-param");
    Doc.ShowContent("detail.html?id=[id]".replace("[id]", id));
}