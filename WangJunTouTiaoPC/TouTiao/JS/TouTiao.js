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
        html += "<li><a href=\"javascript:;\" data-param=\"[CategoryID]\" onclick='TouTiao.LoadList()'><span data-param=\"[CategoryID]\">[Name]</span></a></li>".replace("[Name]", item.Name).replace(/\[CategoryID\]/g, item.id);
    }

    $("#category").html(html);
}


///加载列表
TouTiao.LoadList = function (param) { 
    var query = "{}";

    if (true === PARAM_CHECKER.IsNotEmptyString(param)) {
        query = "{'CategoryID':'[CategoryID]'}".replace('[CategoryID]', param);
    }

    else if (event != null && true === PARAM_CHECKER.IsNotEmptyString($(event.target).attr("data-param"))) {
        var categoeyID = $(event.target).attr("data-param");
        query = "{'CategoryID':'[CategoryID]'}".replace('[CategoryID]', categoeyID);
    }

    var context = [query, JSON.stringify({ "Content": 0, "PlainText": 0 }), "{CreateTime:-1}", 0, 20];
    var callback = function (res) {
        LOGGER.Log(res);
        TouTiao.ShowList(res);
    }

    NET.PostData(App.TouTiao.Server.Url1, callback, context);
}

///加载评论列表
TouTiao.LoadCommentList = function (param) {
    var data = [JSON.stringify({"RootID":param}),"{}","{}", 0, 50];
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
        //TouTiao.ShowList(res);
        //TouTiao.LoadCommentList();
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


TouTiao.ShowList = function (data) {
    if (PARAM_CHECKER.IsArray(data)) {
        var html = $("#tplListItem").html();
        $("#list1").empty();
        var array = [];
        for (var k = 0; k < data.length; k++) {
            var itemData = data[k];
            itemData.CreateTime = Convertor.DateFormat(eval(itemData.CreateTime.replace(/\//g, "")),"yyyy-MM-dd hh:mm");
            var itemHtml = html.replace("[Title]", itemData.Title).replace("[ImageUrl]", "http:"+itemData.ImageUrl).replace("[CreatorName]", itemData.CreatorName)
                .replace("[CommentCount]", itemData.CommentCount).replace("[CreateTime]", itemData.CreateTime).replace("[id]", itemData.id);
            
            array.push(itemHtml);
            $("#list1").append(itemHtml);
        }
    }
    else {
        LOGGER.log("数据格式不对，应该提供数组。");
    }
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


        data.Content = data.Content.replace(/js\/ueditor\/net\/upload\/image/g,"http://localhost:14324/js/ueditor/net/upload/image/")

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
            TouTiao.LoadList();
        }
        else if ("article" === type) {
            var id = NET.GetQueryParam("id");
            TouTiao.LoadArticle(id);
            TouTiao.LoadCommentList();
        }
    });
}

