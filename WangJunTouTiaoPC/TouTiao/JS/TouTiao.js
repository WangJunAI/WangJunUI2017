/// <reference path="jquery-3.1.1.min.js" />
/// <reference path="net.js" />
/// <reference path="debug.js" />
/// <reference path="convertor.js" />

var TouTiao = {};

///加载列表
TouTiao.LoadList = function (param,callback) {
    var url = "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Find&p=0";
    var data = ["{}", JSON.stringify({ "Content": 0}), 0, 50];
    NET.LoadData(url, function (res) {
        LOGGER.Log(res);
        TouTiao.ShowList(res);
    }, data, "POST");    
}

///加载评论列表
TouTiao.LoadCommentList = function (param) {
    var url = "http://localhost:9990/API.ashx?c=WangJun.Doc.CommentManager&m=Find&p=0";
    var data = [JSON.stringify({"RootID":param}),"{}","{}", 0, 50];
    NET.LoadData(url, function (res) {
        LOGGER.Log(res);
        TouTiao.ShowCommentList(res);
    }, data, "POST");    
}


TouTiao.ShowCommentList = function (data) {
    if (PARAM_CHECKER.IsArray(data)) {
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

TouTiao.LoadArticle = function (param,callback) {
    var url = "http://localhost:9990/API.ashx?c=WangJun.Doc.DocItem&m=LoadInst&p=0";
    var data = [param.id];
    NET.LoadData(url, function (res) {
        LOGGER.Log(res);
        TouTiao.ShowArticle(res);

        TouTiao.LoadCommentList(res.id);
    }, data, "POST");    
}


TouTiao.ShowList = function (data) {
    if (PARAM_CHECKER.IsArray(data)) {
        var html = $("#tplListItem").html();
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
        var html = data.Content.substring(data.Content.indexOf("&lt;"), data.Content.lastIndexOf("&gt;") + 4);
        var $div = $("<div></div>").html(html);
        $("#title").text(data.Title);
        $("#CreatorName").text(data.CreatorName);
        $("#CreateTime").text(data.CreateTime);
        $("#Content").html($div.text());
    }
    else {
        LOGGER.log("数据格式不对，应该提供字典。");
    }
}



TouTiao.Initial = function (type) {
    $(document).ready(function () {
        if ("list" === type) {
            TouTiao.LoadList();
        }
        else if ("article" === type) {
            var id = NET.GetQueryParam("id");
            TouTiao.LoadArticle(id);
        }
    });
}

