/// <reference path="jquery-3.1.1.min.js" />
/// <reference path="net.js" />
/// <reference path="debug.js" />
/// <reference path="convertor.js" />

var TouTiao = {};

TouTiao.LoadCategory = function () {
    var context = ["{}", "{}", 0, 1000];

    var callback = function (res) {
        LOGGER.Log(res);
        
        TouTiao.ShowCategory(res);
    }
    NET.PostData(App.TouTiao.Server.Url2, callback, context);
}

TouTiao.ShowCategory = function (res) {
    var html = "";
    for (var k = 0; k < res.length; k++) {
        var item = res[k];
        html += "<li><a href=\"javascript:;\" data-param=\"[CategoryID]\" onclick='TouTiao.CategoryButtonClick()'><span data-param=\"[CategoryID]\">[Name]</span></a></li>".replace("[Name]", item.Name).replace(/\[CategoryID\]/g, item.id);
    }

    $("#category").html(html);
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
        query = "{'CategoryID':'[CategoryID]'}".replace('[CategoryID]', categoryId);
    }

    if (false === PARAM_CHECKER.IsInt(pageIndex)) {
        pageIndex = 0;
    }
    else {
        pageIndex = parseInt(pageIndex);
    }

    var context = [categoryId, JSON.stringify({ "Content": 0, "PlainText": 0 }), "{CreateTime:-1}", pageIndex, pageSize];
    var callback = function (res) {
        LOGGER.Log(res);
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
            itemData.CreateTime = Convertor.DateFormat(eval(itemData.CreateTime.replace(/\//g, "")), "yyyy-MM-dd hh:mm");
            var itemHtml = html.replace("[Title]", itemData.Title).replace("[ImageUrl]", itemData.ImageUrl).replace("[CreatorName]", itemData.CreatorName)
                .replace("[CommentCount]", itemData.CommentCount).replace("[CreateTime]", itemData.CreateTime).replace("[id]", itemData.id);

            array.push(itemHtml);
            $("#list1").append(itemHtml);
        }

        $("#loadMore").attr("data-Index", (pageIndex + 1));
        $("#loadMore").attr("data-CategoryID", categoryId);
    }
    else {
        LOGGER.log("数据格式不对，应该提供数组。");
    }
}

///加载评论列表
TouTiao.LoadCommentList = function (param) {
    var targetId = NET.GetQueryParam("id");
    var data = [JSON.stringify({"RootID":targetId}),"{}","{}", 0, 50];
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
                .replace("[LikeCount]", itemData.LikeCount).replace("[CreateTime]", itemData.CreateTime).replace("[id]", itemData.id)
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
    var item = {};
    item.Content = $("#comment").val().trim();
    var targetId = NET.GetQueryParam("id");
    var context = [item.Content,targetId,"text"];
    var callback = function (res) {
        LOGGER.Log(res);
        //TouTiao.ShowList(res);
        TouTiao.LoadCommentList();
    }

    NET.PostData(App.TouTiao.Server.Url4, callback, context);
}

TouTiao.AddLikeCount= function () {
    var item = {};
    item.Content = $("#comment").val().trim();
    var targetId = NET.GetQueryParam("id");
    var context = ["1", targetId, "LikeCount"];
    var callback = function (res) {
        LOGGER.Log(res); 
    }

    NET.PostData(App.TouTiao.Server.Url4, callback, context);
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
        $("#title").text(data.Title);
        $("#CreatorName").text(data.CreatorName);
        $("#CreateTime").text(data.CreateTime);


        //data.Content = data.Content.replace(/js\/ueditor\/net\/upload\/image/g,"http://localhost:14324/js/ueditor/net/upload/image/")

        $("#Content").html(data.Content);
    }
    else {
        LOGGER.log("数据格式不对，应该提供字典。");
    }
}



TouTiao.Initial = function (type) {
    $(document).ready(function () {
        if ("list" === type) {
            TouTiao.LoadCategory();
            TouTiao.LoadList(null, 0, null, true);
        }
        else if ("article" === type) {
            var id = NET.GetQueryParam("id");
            TouTiao.LoadArticle(id);
            TouTiao.LoadCommentList();
        }
    });
}

