///保存一个目录
Doc.SaveCategory = function () {
    var checkRes = Doc.CheckInput();
    if (false === checkRes) { return; }///检测不合格不提交


    var submitId = Doc.SubmitStart();
    var item = {};

    var $ctrls = $("[data-FormName='Default']").each(function () {
        var propertyName = $(this).attr("data-propertyName");
        var propertyValue = $(this).attr("data-propertyValue");
        var propertyType = $(this).attr("data-propertyType");
        if (PARAM_CHECKER.IsNotEmptyString(propertyName)) {
            if ("CheckBoxArray" === propertyType) {
                var ztreeId = $(this).find(".ztree").first().attr("id");
                item[propertyName] = Doc.GetCheckedTreeNodes(ztreeId);
            }
            else {
                item[propertyName.trim()] = propertyValue;
            }
        }
    });

    ///几种群组设置

    var param = [Convertor.ToBase64String(JSON.stringify(item), true), { 0: "base64" }];

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.SubmitEnd(submitId);

        if (false === PARAM_CHECKER.IsTopWindow()) {
            top.window.Doc.LoadData_Category(["{}", "{}", "{}", 0, 1000], function (res1) { Doc.LoadTreeTo("#treeDemo", res1, [], {}); });

        }
        Doc.CloseWindow();

    }
    NET.PostData(App.Doc.Server.Url7, callback, param);
}

///移除一个目录
Doc.RemoveCategory = function () {
    var id = $("#ID").val();
    var context = [id];

    var callback = function (res) {
        LOGGER.Log(res);
        if (false === PARAM_CHECKER.IsTopWindow()) {
             Doc.ShowDialog(); 
        }
    }
    NET.PostData(App.Doc.Server.Url10, callback, context);
}

Doc.LoadData_Category = function (param, callback) {
    NET.PostData(App.Doc.Server.Url8, callback, param);
}

Doc.LoadData_Doc = function (param, callback) {
    NET.PostData(App.Doc.Server.Url1, callback, param);
}

Doc.LoadData_All = function (param, callback) {
    NET.PostData(App.Doc.Server.Url19, callback, param);
}

///保存一个文档
Doc.SaveDetail = function () {
    var checkRes = Doc.CheckInput();
    if (false === checkRes) { return; }///检测不合格不提交


    var submitId = Doc.SubmitStart();
    
     var item = {};
     var editor = UE.getEditor('editor');
     var $ctrls = $("[data-FormName='Default']").each(function () {
         var propertyName = $(this).attr("data-propertyName");
         var propertyValue = $(this).attr("data-propertyValue");
         var propertyType = $(this).attr("data-propertyType");
         if (PARAM_CHECKER.IsNotEmptyString(propertyName)) {
             if ("CheckBoxArray" === propertyType) {
                 var ztreeId = $(this).find(".ztree").first().attr("id");
                 item[propertyName] = Doc.GetCheckedTreeNodes(ztreeId);
             }
             else {
                 item[propertyName.trim()] = propertyValue;
             }
         }
     });

    item.Content = editor.getContent();
    item.PlainText = editor.getContentTxt();
    item.Milestone = Milestone.GetData();

    var param = [Convertor.ToBase64String(JSON.stringify(item), true), { 0: "base64" }];

  
    var callback = function (res) {
        LOGGER.Log(res);
        Doc.SubmitEnd(submitId);
        Doc.CloseWindow();
    }
    NET.PostData(App.Doc.Server.Url4, callback, param);
}

///移除一个文档
Doc.RemoveDetail = function (id, callback) {
    var id = (true === PARAM_CHECKER.IsNotEmptyString(id)) ? id : $("#ID").val();
    var context = [id];
 
    NET.PostData(App.Doc.Server.Url9, callback, context);
}

///加载评论列表
Doc.LoadCommentList = function (pageIndex) {
    if (false == PARAM_CHECKER.IsInt(pageIndex)) {
        pageIndex = parseInt($(event.target).attr("data-Index"));
        $(event.target).attr("data-Index", pageIndex + 1);
    }
    var targetId = NET.GetQueryParam("id");
    var data = [JSON.stringify({ "RootID": targetId }), "{}", "{'CreateTime':-1}", pageIndex, 10];
    NET.LoadData(App.Doc.Server.Url71, function (res) {
        LOGGER.Log(res);
        Doc.ShowCommentList(res);
    }, data, "POST");
}



Doc.ShowCommentList = function (data) {
    if (PARAM_CHECKER.IsArray(data)) {
        //$("#commentList").empty();
        var html = $("#tplCommentItem").html();
        var array = [];
        for (var k = 0; k < data.length; k++) {
            var itemData = data[k];
            itemData.CreateTime = Convertor.DateFormat(eval("new " + itemData.CreateTime.replace(/\//g, "")), "yyyy-MM-dd hh:mm");
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

Doc.AddComment = function () {
    var item = {};
    var targetId = $("#ID").val();//NET.GetQueryParam("id");
    item.Content = $("#comment").val().trim();
    item.RootID = targetId;
    var context = [Convertor.ToBase64String(JSON.stringify(item), true), { 0: "base64" }];
    var callback = function (res) {
        LOGGER.Log(res);


        Doc.ShowCommentMessage();
        var html = $("#tplCommentItem").html().replace("[CreatorName]", SESSION.Current().UserName).replace("[CreatorID]", SESSION.Current().UserID)
            .replace("[LikeCount]", 0).replace("[CreateTime]", Convertor.DateFormat(new Date().toString(), "yyyy-MM-dd hh:mm")).replace("[id]", "")
            .replace("[Content]", $("#comment").val());

        if (0 < $("#commentList").children().length) {
            $(html).insertBefore($("#commentList").children().first());
        }
        else {
            $("#commentList").append(html);
        }
        $("#comment").val("");
    }

    NET.PostData(App.Doc.Server.Url70, callback, context);
}

Doc.ShowCommentMessage = function () {
    $("#message").hide();
    $("#message").show();
    var tId = setTimeout(function () {
        $("#message").hide();
        clearTimeout(tId);
    }, 500);
}


Doc.LoadPermissionToDetail = function (callback1) {
    var context = [NET.GetQueryParam("id")];

    var callback2 = function (res) {
        LOGGER.Log(res);
        if (res[0].Value === true && res[1].Value === false) {
            ///只读模式
            $(".buttons").remove();
            $(".minibuttons").remove();
            $(".options").remove();

        }
        if (PARAM_CHECKER.IsFunction(callback1)) {
            callback1(res);
        }
    }
    NET.PostData(App.Doc.Server.Url82, callback2, context);
}