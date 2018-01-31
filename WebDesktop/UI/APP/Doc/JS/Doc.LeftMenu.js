/// <reference path="appinfo.doc.js" />
/// <reference path="doc.topbutton.js" />
/// <reference path="doc.table.js" />

///加载左侧菜单
Doc.LoadMenu = function (menuArray) {
    var menuArray = App.Doc.LeftMenu;
    Doc.ShowMenu(menuArray);
}

///展示左侧菜单
Doc.ShowMenu = function (data) {
    if (PARAM_CHECKER.IsArray(data)) {
        var groupHtml = $("#leftMenuItem1").html();
        var itemHtml = $("#leftMenuItem2").html();
        $("#leftMenu").empty();
        for (var k = 0; k < data.length; k++) {
            var itemData = data[k];
            var html = "";
            if (null === itemData.ParentID) {
                html = groupHtml.replace("[Name]", itemData.Name).replace("[Method]", itemData.Method).replace("[Param]", itemData.Param).replace("[ID]", itemData.ID);
            }
            else {
                html = itemHtml.replace("[Name]", itemData.Name).replace("[Method]", itemData.Method).replace("[Param]", itemData.Param).replace("[ID]", itemData.ID).replace("[ParentID]", itemData.ParentID);
            }
            $("#leftMenu").append(html);
        }
    }
}

Doc.LeftMenuClick = function () {
    var id = $(event.target).attr("data-id");
    var topButtonId = Doc.FindLeftMenuData(id)[0].TopButtonGroupID;
    Doc.LeftMenuSetSelecled();
    Doc.CloseWindow();
    if ("LeftMenu.回收站" == id) {
        ///加载TopButton
        ///刷新列表
        Doc.LoadTopButton(topButtonId);
        Doc.CloseLeftList();
        Doc.LoadTable2(0, 20, "{}", App.Doc.Server.Url14, App.Doc.Data.RecycleBin.Load.Column);
    }
    if ("LeftMenu.已发布" == id) {
        ///加载TopButton
        ///刷新列表
        Doc.LoadTopButton(topButtonId);
        ///加载树状目录 
        Doc.LoadTree();
        Doc.LoadTable(0, 20, "{'Status':'已发布'}");
    }
    else if ("LeftMenu.待发布" == id) {
        ///加载TopButton
        ///刷新列表
        Doc.LoadTopButton(topButtonId);
        ///加载树状目录
        Doc.LoadTree();
        Doc.LoadTable(0, 20, "{'Status':'待发布'}");
    }
    else if ("LeftMenu.草稿箱" == id) {
        ///加载TopButton
        ///刷新列表
        Doc.LoadTopButton(topButtonId);
        ///加载树状目录
        Doc.LoadTree();
        Doc.LoadTable(0, 20, "{'Status':'草稿'}");
    }
    else if ("LeftMenu.全部文档" == id) {
        ///加载TopButton
        ///刷新列表
        Doc.LoadTopButton(topButtonId);
        ///加载树状目录
        Doc.LoadTree();
        Doc.LoadTable(0, 20, "{}");
    }
    else if ("LeftMenu.存储管理" == id) {
        Doc.ShowContent("Chart1.html");
    }
    else if ("LeftMenu.应用信息" == id) {
        Doc.ShowContent("AppInfo.html");
    }
    else if ("LeftMenu.新建目录" === id) {
        var url = App.Doc.Server.Url6 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("LeftMenu.新建文章" === id) {
        var url = App.Doc.Server.Url3 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }


}

Doc.FindLeftMenuData = function (id) {
    var length = App.Doc.LeftMenu.length;
    var sourceArray = App.Doc.LeftMenu;
    var targetArray = [];
    for (var k = 0; k < length; k++) {
        var targetItem = sourceArray[k];
        if (PARAM_CHECKER.IsNotEmptyString(id) && id === targetItem.ID) {
            targetArray.push(targetItem);
        }
    }
    return targetArray;
}

Doc.LeftMenuGroupToggle = function () {
    var groupId = $(event.target).attr("data-id");
    $("#leftMenu").find("[data-ParentID='" + groupId + "']").toggle();
}

Doc.LeftMenuSetSelecled = function () {
    $("#leftMenu .menuItem").removeAttr("style");
    $(event.target).css("background-color","#00c1de");
}