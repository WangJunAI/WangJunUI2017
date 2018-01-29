Doc.LoadSummaryList = function (pageIndex, pageSize, query) {

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.ShowSummaryList(res);
    }

    var context = [query, JSON.stringify({ "Content": 0, "PlainText": 0 }), "{CreateTime:-1}", pageIndex, pageSize];
    NET.LoadData(Doc.Server.Url1, callback, context, NET.POST);

}


Doc.ShowSummaryList = function (source) {
    var tplHtml = $("#tplSummaryList").html();
    var tplListItem = $("#tplSummaryListItem").html();
    
    var listHtml = "";
    for (var k = 0; k < source.length; k++) {
        listHtml += tplListItem.replace("Test","");
    }

    var html = tplHtml.replace("[列表]", listHtml);
    Doc.LoadHtmlTo("#leftList", html);
}

Doc.SummaryListItemClick = function () {
    ///加载详细
}