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
    var pageIndex = 0;    
    if (true === PARAM_CHECKER.IsObject(option) && true === PARAM_CHECKER.IsNotEmptyString(option.TplListItem)) {

    }

    if (true === PARAM_CHECKER.IsObject(option) && true === PARAM_CHECKER.IsFunction(option.SummaryListPagerCallback)) {
        Doc.SummaryListPagerClick = option.SummaryListPagerCallback;
    }

    if (true === PARAM_CHECKER.IsObject(option) && true === PARAM_CHECKER.IsInt(option.PageIndex)) {
        pageIndex = option.PageIndex;
    }

    var listHtml = "";
    for (var k = 0; k < data.length; k++) {
        var item = data[k];
        listHtml += tplListItem.replace("[Title]", item.Title)
            .replace("[Param]", item.ID).replace("[Summary]", item.Summary).replace("[CreatorName]", item.CreatorName).replace("[ParentName]", item.ParentName);
        if (true === PARAM_CHECKER.IsNotEmptyString(item.CreateTime)) {
            listHtml = listHtml.replace("[CreateTime]", Convertor.DateFormat(eval("new "+item.CreateTime.replace(/\//g, "")), "yyyy/MM/dd hh:mm"));
        }
    }

    if (0 < data.length && 0 === pageIndex) {
        var html = tplHtml.replace("[列表]", listHtml).replace("[ListTitle]", "") + "<a href='javascript:;' class='summaryListPager' data-Index=1 onclick='Doc.SummaryListPagerClick()'>加载更多...</a>";
        Doc.LoadHtmlTo(target, html);
    }
    else if (0 < data.length && 0 < pageIndex) {
        $("#summaryList").append(listHtml);
    }
    else if (0 === data.length) {
        $(".summaryListPager").text("没有更多了...").removeAttr("onclick");
    }


    $("#summaryList .listItem3").on("click", function () {
        option.EventTarget = this;
        Doc.SummaryListItemClick(option);
    });

    

    ///设置滚动条
    if (true === PARAM_CHECKER.IsFunction($(target).mCustomScrollbar)) {
        //$(target).mCustomScrollbar({ theme: "dark" });
        //$(".mCSB_container").css("margin-right","11px");
    }

    $("#summaryList .listItem3").first().click();
}

Doc.SummaryListItemClick = function (option) {
    ///加载详细
    var id = "";

    if (true === PARAM_CHECKER.IsValid(option) && true === PARAM_CHECKER.IsValid(option.EventTarget)) {
        id = $(option.EventTarget).attr("data-param");
    }
    else {
        id = $(event.target).attr("data-param");
        if (false === PARAM_CHECKER.IsNotEmptyString(id)) {
            id = $(event.target).parents("[data-param]").attr("data-param");
        }
    }
     
    var url = "detail.html?id=[id]";
    if (true === PARAM_CHECKER.IsValid(option) && true === PARAM_CHECKER.IsNotEmptyString(option.Url)) {
        url = option.Url;
    }

    Doc.ShowContent(url.replace("[id]", id));
}

Doc.SummaryListPagerClick = function () {
    
}