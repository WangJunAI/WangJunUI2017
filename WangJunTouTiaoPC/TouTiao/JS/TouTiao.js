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
        html += "<li><a href=\"javascript:;\"><span>[Name]</span></a></li>".replace("[Name]", item.Name);
    }

    $("#category").html(html);
}


///加载列表
TouTiao.LoadList = function (param,callback) { 
    var context = ["{}", JSON.stringify({ "Content": 0, "PlainText": 0 }), "{CreateTime:-1}", 0, 20];
    var callback = function (res) {
        LOGGER.Log(res);
        TouTiao.ShowList(res);
    }

    NET.PostData(App.TouTiao.Server.Url1, callback, context);
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

TouTiao.AddComment = function () {
    var context = ["1","2","3","4"];
    var callback = function (res) {
        LOGGER.Log(res);
        //TouTiao.ShowList(res);
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
        }
    });
}

