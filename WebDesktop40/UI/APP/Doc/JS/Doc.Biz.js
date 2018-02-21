///保存一个目录
Doc.SaveCategory = function () {
    var submitId = Doc.SubmitStart();
    var item = {};

    var $ctrls = $("[data-FormName='Default']").each(function () {
        var propertyName = $(this).attr("data-propertyName");
        var propertyValue = $(this).attr("data-propertyValue");
        if (PARAM_CHECKER.IsNotEmptyString(propertyName)) {
            item[propertyName.trim()] = propertyValue;
        }
    });

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

Doc.SaveDetail = function () {
    var submitId = Doc.SubmitStart();
    
    var item = {};
    item.id = $("#id").val();
    item.Title = $("#Title").val().trim();
    item.Content = UE.getEditor('editor').getContent();
    item.CategoryID = $("#parentNode").attr("data-Param");
    item.Content = item.Content;
    item.Status = $("[data-single='status'].selected").text();
    item.PublistTime = $("#publishDate").val() + " " + $("#publishHour").val() + ":" + $("#publishMinute").val() + ":00";
    ///获取图片
    item.ThumbnailSrc = $(item.Content).find("img").attr("src");
    ///Html转义
    //$div = $("<div></div>");
    //$div.text(item.Content);
    item.Title = Convertor.ToBase64String(item.Title, true);
    item.Content = Convertor.ToBase64String(item.Content, true);

    item.PlainText = UE.getEditor('editor').getContentTxt();
    item.PlainText = Convertor.ToBase64String(item.PlainText, true);

    var context = [item.Title, item.Content, item.CategoryID, item.PublistTime, item.Status, item.id, item.PlainText, item.ThumbnailSrc, { 0: "base64", 1: "base64", 6: "base64" }];

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.SubmitEnd(submitId);
        if (false === PARAM_CHECKER.IsTopWindow()) {
            top.window.Doc.LoadTable(0, App.Doc.Data.Pager.Size, "{'Status':'已发布'}");
            Doc.CloseWindow();
        }
    }
    NET.PostData(App.Doc.Server.Url4, callback, context);
}

