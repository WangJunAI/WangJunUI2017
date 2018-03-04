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

Doc.LeftMenuClick = function (id) {
    id = (true === PARAM_CHECKER.IsNotEmptyString(id)) ? id : $(event.target).attr("data-id");
    var topButtonId = Doc.FindLeftMenuData(id)[0].TopButtonGroupID;
    Doc.LeftMenuSetSelecled(id);
    Doc.CloseWindow();
    if ("LeftMenu.上传文件" == id) {
        var url = App.Doc.Server.Url3 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("LeftMenu.新建文件夹" == id)
    {
        var url = App.Doc.Server.Url6 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);

    }
   else if ("LeftMenu.个人云盘" == id) {
        var query = '{}';
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        Doc.LoadData_Category(["{}", "{}", "{}", 0, 1000], function (res1) { Doc.LoadTreeTo("#leftList", res1, [], {}); });
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);

        $("#tableQuery").val(query);

    }
    else if ("LeftMenu.企业云盘" == id) {
        var query = "{}";
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        Doc.LoadData_Category([JSON.stringify({ OwnerID: SESSION.Current().CompanyID }), "{}", "{}", 0, 1000], function (res1) { Doc.LoadTreeTo("#leftList", res1, [], {}); });
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);

        $("#tableQuery").val(query);
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

Doc.LeftMenuSetSelecled = function (id) {
    $("#leftMenu .menuItem").removeAttr("style");
    if (true === PARAM_CHECKER.IsNotEmptyString(id)) {
        $("[data-id='" + id+"']").css("background-color", "#00c1de");
    }
    else {
        $(event.target).css("background-color", "#00c1de");
    }
}