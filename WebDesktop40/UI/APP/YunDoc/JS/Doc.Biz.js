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

    var param = [Convertor.ToBase64String(JSON.stringify(item), true), { 0: "base64" }];

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.SubmitEnd(submitId);

        if (false === PARAM_CHECKER.IsTopWindow()) { 
            if (true === SESSION.IsSuperAdmin) {
                top.window.Doc.LeftMenuClick("LeftMenu.企业云盘");
            }
            else {
                top.window.Doc.LeftMenuClick("LeftMenu.个人云盘");
            }
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
    item.ImageUrl = $(item.Content).find("img").attr("src");
    item.PlainText = editor.getContentTxt();

    var param = [Convertor.ToBase64String(JSON.stringify(item), true), { 0: "base64" }];

  
    var callback = function (res) {
        LOGGER.Log(res);
        Doc.SubmitEnd(submitId);
        Doc.CloseWindow();
        var pageName = $("#pageName").val();
        if ("Detail" === pageName) {
            top.window.Doc.LeftMenuClick("LeftMenu.个人文档");
        }
        else if ("Detail.Company" === pageName) {
            top.window.Doc.LeftMenuClick("LeftMenu.企业知识库");
        }

    }
    NET.PostData(App.Doc.Server.Url4, callback, param);
}

 
///移除一个文档
Doc.RemoveDetail = function (id, callback) {
    var id = (true === PARAM_CHECKER.IsNotEmptyString(id)) ? id : $("#ID").val();
    var context = [id];
    NET.PostData(App.Doc.Server.Url9, callback, context);
}

Doc.MoveEntities = function (targetId, targetName) {
    var selectedIdArray = Doc.GetSelectedTableRow();
    for (var k = 0; k < selectedIdArray.length; k++) {
        var id = selectedIdArray[k];
        NET.LoadData(App.Doc.Server.Url5, function (entity) {
            ///获取文档
            var updateItem = {};
            updateItem.ID = entity.ID;
            updateItem.ParentID = targetId;
            updateItem.ParentName = targetName;
            var param = [Convertor.ToBase64String(JSON.stringify(updateItem), true), { 0: "base64" }];
            NET.PostData(App.Doc.Server.Url4, function (res3) {
                Doc.LeftMenuClick("LeftMenu.个人文档");

                Doc.ShowDialog("移动完毕");
            }, param);
        }, [id], NET.POST);
    }
}

Doc.ShareTo = function (treeId) {
    treeId = (true === PARAM_CHECKER.IsNotEmptyString(treeId)) ? treeId : $(event.target).parents("[data-id='category']").find('.ztree').attr('id');

    var selectedIdArray = Doc.GetSelectedTableRow();
    var checkedTreeNodeArray = Doc.GetCheckedTreeNodes(treeId);

    Doc.CancelCheckAllNodes(treeId);
    $(event.target).parents("[data-id='category']").toggle();

    for (var k = 0; k < selectedIdArray.length; k++) {
        var id = selectedIdArray[k];
        NET.LoadData(App.Doc.Server.Url5, function (entity) {
            ///获取文档
            var updateItem = {};
            updateItem.ID = entity.ID;
            updateItem.UserAllowedArray = checkedTreeNodeArray;
            //updateItem.ParentName = targetName;
            var param = [Convertor.ToBase64String(JSON.stringify(updateItem), true), { 0: "base64" }];
            NET.PostData(App.Doc.Server.Url4, function (res3) {
                //Doc.LeftMenuClick("LeftMenu.个人云盘");

                Doc.ShowDialog("分享完毕");
            }, param);
        }, [id], NET.POST);
    }
}

Doc.LoadPermissionToDetail = function () {
    var context = [NET.GetQueryParam("id")];

    var callback = function (res) {
        LOGGER.Log(res);
        if (res[0].Value === true && res[1].Value === false) {
            ///只读模式
            $(".buttons").remove();
            $(".options").remove();
        }
    }
    NET.PostData(App.Doc.Server.Url82, callback, context);
}