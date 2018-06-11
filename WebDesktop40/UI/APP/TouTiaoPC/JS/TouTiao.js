 

var TouTiao = {};

TouTiao.LoadCategory = function () {
    var context = [JSON.stringify({ "OwnerID": SESSION.Current().CompanyID, "ParentID": { $ne:"000000000000000000000000"} }), "{}", "{}", 0, 1000];

    var callback = function (res) {
        LOGGER.Log(res);
        res.push({ Name: "搜索" });

        
        TouTiao.ShowCategory(res);
    }
    NET.PostData(App.TouTiao.Server.Url2, callback, context);
}

TouTiao.ShowCategory = function (res) {
    var html = "";
    for (var k = 0; k < res.length; k++) {
        var item = res[k];
        html += "<li><a href=\"javascript:;\" data-param=\"[CategoryID]\" onclick='TouTiao.CategoryButtonClick()'><span data-param=\"[CategoryID]\">[Name]</span></a></li>".replace("[Name]", item.Name).replace(/\[CategoryID\]/g, item.ID);
    }
    $("#category").html(html);
    TouTiao.LoadList(null, 0, null, true);
}

TouTiao.LoadMore = function () {
    var index = $(event.target).attr("data-Index");
    var append = true;
    var categoryId = $(event.target).attr("data-categoryId");
    TouTiao.LoadList(categoryId, index, true);

}

TouTiao.CategoryButtonClick = function () {
    var categoryId = $(event.target).attr("data-param");
    $("#category").find(".selected").removeClass("selected");
    $("#category").find("[data-param='" + categoryId + "']").addClass("selected");
    TouTiao.LoadList(categoryId, 0, false);
}

///加载列表
TouTiao.LoadList = function (categoryId, pageIndex, append) { 
    
    var query = "{}";
    var pageSize = App.TouTiao.Pager.Size;
    if (true === PARAM_CHECKER.IsNotEmptyString(categoryId)) {
        query = "{'ParentID':'[ParentID]'}".replace('[ParentID]', categoryId);
    }

    if (false === PARAM_CHECKER.IsInt(pageIndex)) {
        pageIndex = 0;
    }
    else {
        pageIndex = parseInt(pageIndex);
    }

    var context = [query, JSON.stringify({ "Content": 0, "PlainText": 0 }), "{CreateTime:-1}", pageIndex, pageSize];
    var callback = function (res) {
        LOGGER.Log(res);
        TouTiao.ShowMessage();
        TouTiao.ShowList(res, pageIndex, categoryId, append);
    }

    NET.PostData(App.TouTiao.Server.Url1, callback, context);
}

TouTiao.ShowList = function (data, pageIndex, categoryId, append) {
    if (PARAM_CHECKER.IsArray(data)) {
        var html = $("#tplListItem").html();
        if (true != append) {
            $("#list1").empty();
        }
        var array = [];
        for (var k = 0; k < data.length; k++) {
            var itemData = data[k];
            itemData.CreateTime = Convertor.DateFormat(eval("new "+itemData.CreateTime.replace(/\//g, "")), "yyyy-MM-dd hh:mm");
            var itemHtml = html.replace("[Title]", itemData.Title).replace("[ImageUrl]", itemData.ImageUrl).replace("[CreatorName]", itemData.CreatorName)
                .replace("[CommentCount]", itemData.CommentCount).replace("[ReadCount]", itemData.ReadCount).replace("[CreateTime]", itemData.CreateTime).replace("[id]", itemData.ID);

            array.push(itemHtml);
            $("#list1").append(itemHtml);
        }

        $("#loadMore").attr("data-Index", (pageIndex + 1));
        $("#loadMore").attr("data-CategoryID", categoryId);
        if (data.length < App.TouTiao.Pager.Size) {
            $("#loadMore").removeAttr("onclick").removeAttr("href").text("没有更多...");
        }
    }
    else {
        LOGGER.log("数据格式不对，应该提供数组。");
    }
}

///加载列表
TouTiao.LoadHotNewsList = function (categoryId, pageIndex, append) {

    var query = JSON.stringify({ "HotCount": { $gt: 0 }, "CompanyID": SESSION.Current().CompanyID });
    var pageSize = App.TouTiao.Pager.Size;
    if (true === PARAM_CHECKER.IsNotEmptyString(categoryId)) {
        query = "{'ParentID':'[ParentID]'}".replace('[ParentID]', categoryId);
    }

    if (false === PARAM_CHECKER.IsInt(pageIndex)) {
        pageIndex = 0;
    }
    else {
        pageIndex = parseInt(pageIndex);
    }

    var context = [query, JSON.stringify({ "Content": 0, "PlainText": 0 }), "{CreateTime:-1}", pageIndex, pageSize];
    var callback = function (res) {
        LOGGER.Log(res);
        if (true === PARAM_CHECKER.IsArray(res)) {
            var tplHtml = "<div class='row'><span>[Index]</span><a target='_blank' href='[Href]'>[Title]</a></div>";
            var html = "";
            for (var k = 0; k < res.length; k++) {
                html += tplHtml.replace("[Index]", k + 1).replace("[Href]", "TouTiaoArticle.html?id=" + res[k].ID).replace("[Title]", res[k].Title);
            }
            $(html).insertAfter($("#block2 .title"));
        }
    }

    NET.PostData(App.TouTiao.Server.Url1, callback, context);
}

///加载评论列表
TouTiao.LoadCommentList = function (param) {
    var targetId = NET.GetQueryParam("id");
    var data = [JSON.stringify({"RootID":targetId}),"{}","{'CreateTime':-1}", 0, 10];
    NET.LoadData(App.TouTiao.Server.Url5, function (res) {
        LOGGER.Log(res);
        TouTiao.ShowCommentList(res);
    }, data, "POST");    
}


TouTiao.ShowCommentList = function (data) {
    if (PARAM_CHECKER.IsArray(data)) {
        $("#commentList").empty();
        var html = $("#tplCommentItem").html();
        var array = [];
        for (var k = 0; k < data.length; k++) {
            var itemData = data[k];
            itemData.CreateTime = Convertor.DateFormat(eval(itemData.CreateTime.replace(/\//g, "")), "yyyy-MM-dd hh:mm");
            var itemHtml = html.replace("[CreatorName]", itemData.CreatorName).replace("[CreatorID]", itemData.CreatorID)
                .replace("[LikeCount]", itemData.LikeCount).replace("[CreateTime]", itemData.CreateTime).replace("[id]", itemData.ID)
                .replace("[Content]", itemData.Content);

            array.push(itemHtml);
            $("#commentList").append(itemHtml);
        }
    }
    else {
        LOGGER.log("数据格式不对，应该提供数组。");
    }
}

TouTiao.AddComment = function () {
    TouTiao.ShowMessage();
    var item = {};
    var targetId = NET.GetQueryParam("id");
    item.Content = $("#comment").val().trim();
    item.RootID = targetId;
    var context = [Convertor.ToBase64String(JSON.stringify(item), true), { 0: "base64" }];
    var callback = function (res) {
        LOGGER.Log(res);

        //TouTiao.LoadCommentList();
        $("#comment").val("");
        
        
    }

    NET.PostData(App.TouTiao.Server.Url4, callback, context);
}

TouTiao.AddLikeCount = function () {
    var $btn = $(event.target);
    var text = $btn.text();
    if ("点赞" === text) {
        $btn.text("已点赞");
    }
    else {
        $btn.text("点赞");
    }
    $btn.attr("click", "_click");
    $btn.removeAttr("href");

    var item = {};
    var targetId = NET.GetQueryParam("id");
    var context = [targetId];
    var callback = function (res) {
        $btn.attr("_click", "click");
        $btn.Attr("href","javascript:;");
    }

    NET.PostData(App.TouTiao.Server.Url6, callback, context);
}

TouTiao.AddFavoriteCount = function () {
    var $btn = $(event.target);
    var text = $btn.text();
    if ("收藏" === text) {
        $btn.text("已收藏");
    }
    else {
        $btn.text("收藏");
    }
    $btn.attr("click", "_click");
    $btn.removeAttr("href");

    var item = {};
    var targetId = NET.GetQueryParam("id");
    var context = [targetId];
    var callback = function (res) {
        $btn.attr("_click", "click");
        $btn.Attr("href", "javascript:;");
    }

    NET.PostData(App.TouTiao.Server.Url7, callback, context);
}

TouTiao.AddAppend = function () {
    var item = {};
    item.Content = $("#comment").val().trim();
    var targetId = NET.GetQueryParam("id");
    var context = ["追加", targetId, "E1000", "测试员", "Append"];
    var callback = function (res) {
        LOGGER.Log(res);
        //TouTiao.ShowList(res);
        //TouTiao.LoadCommentList();
    }

    NET.PostData(App.TouTiao.Server.Url4, callback, context);
}


TouTiao.LoadArticle = function (param,callback) {
    var id = NET.GetQueryParam("id");
    var context = [id];

    var callback = function (res) {
        LOGGER.Log(res);
        TouTiao.ShowArticle(res);
        ClientBehavior.LoadBehaviorByArticleID();
        //ClientBehavior.Read();
    }
    NET.LoadData(App.TouTiao.Server.Url3, callback, context, NET.POST);
}



///展示文章
TouTiao.ShowArticle = function (data) {
    if (PARAM_CHECKER.IsObject(data)) {
        data.CreateTime = Convertor.DateFormat(eval(data.CreateTime.replace(/\//g, "")), "yyyy-MM-dd hh:mm");
        if (true === PARAM_CHECKER.IsHtml(data.Content)) {

        }
        else {
            var html = data.Content.substring(data.Content.indexOf("&lt;"), data.Content.lastIndexOf("&gt;") + 4);
            var $div = $("<div></div>").html(html);
            data.Content = $div.text();
        }
        $("[data-PropertyName='ParentName']").text(data.ParentName);
        $("[data-PropertyName='LikeCount']").text("点赞"+data.LikeCount);
        $("[data-PropertyName='CommentCount']").text("评论"+data.CommentCount);
        $("[data-PropertyName='FavoriteCount']").text("收藏"+data.FavoriteCount);

        $("#title").text(data.Title);
        $("#CreatorName").text(data.CreatorName);
        $("#CreateTime").text(data.CreateTime);



        //data.Content = data.Content.replace(/js\/ueditor\/net\/upload\/image/g,"http://localhost:14324/js/ueditor/net/upload/image/")

        $("#Content").html(data.Content);

        ///底色清除,优化显示
        $("#Content").find("p").css("width", "");
        $("#Content").find("p").css("background-color", "#FFF");
    }
    else {
        LOGGER.log("数据格式不对，应该提供字典。");
    }
}



TouTiao.Initial = function (type) {
    $(document).ready(function () {
        if ("list" === type) {
            TouTiao.LoadCategory();///先加载目录再加载文档
            TouTiao.LoadHotNewsList();
        }
        else if ("article" === type) {
            var id = NET.GetQueryParam("id");
            TouTiao.LoadArticle(id);
            TouTiao.LoadCommentList();
            TouTiao.LoadHotNewsList();

        }
    });
}

TouTiao.ShowMessage = function () {
    $("#message").show({
        effect: "blind", duration: 1000, complete: function () {
            $("#message").hide({ effect: "blind", duration: 1000 });
        }
    });
}

