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

///保存一个文档
Doc.SaveDetail = function () {
    var submitId = Doc.SubmitStart();
    
     var item = {};
     var editor = UE.getEditor('editor');
    var $ctrls = $("[data-FormName='Default']").each(function () {
        var propertyName = $(this).attr("data-propertyName");
        var propertyValue = $(this).attr("data-propertyValue");
        if (PARAM_CHECKER.IsNotEmptyString(propertyName)) {
            item[propertyName.trim()] = propertyValue;
        }
    });
    item.Content = editor.getContent();
    item.ThumbnailSrc = $(item.Content).find("img").attr("src");
    item.PlainText = editor.getContentTxt();

    var param = [Convertor.ToBase64String(JSON.stringify(item), true), { 0: "base64" }];

  
    var callback = function (res) {
        LOGGER.Log(res);
        Doc.SubmitEnd(submitId);
 
    }
    NET.PostData(App.Doc.Server.Url4, callback, param);
}

