﻿ 
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
    if ("LeftMenu.新建新闻" === id) {
        var url = App.Doc.Server.Url3 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("LeftMenu.新建分类" === id) {
        var url = App.Doc.Server.Url6 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("LeftMenu.企业新闻" == id) {
        var keywords = $("#searchInput").val();

        var query = [{ _RedirectID: null, CompanyID: SESSION.Current().CompanyID, 'StatusCode': { $ne: -1 } }, { Content: 0, PlainText: 0, Summary: 0 }, { CreateTime: -1 }];
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        Doc.LoadData_Category([JSON.stringify({ OwnerID: SESSION.Current().CompanyID }), "{}", "{}", 0, 1000], function (res1) { Doc.LoadTreeTo("#leftList", res1, [], { header:"小提示：修改目录双击即可"}); });
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);

        Doc.SetQuery(query);

    }
    else if ("LeftMenu.新闻分析" === id) {
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent(App.Doc.Server.Url50);
        Doc.ShowView3();
        Doc.LoadSummaryList(0, 10, [{ Title: "发布统计" }, { Title: "分词统计" }, { Title: "目录统计" }]);
    }
    else if ("LeftMenu.热度分析" === id) {
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent(App.Doc.Server.Url51);
        Doc.ShowView3();
        Doc.LoadSummaryList(0, 10, [{ Title: "阅读统计" }, { Title: "评论统计" }, { Title: "点赞统计" }, { Title: "收藏统计" }]);
    }  
    else if ("LeftMenu.用户分析" === id) {
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent(App.Doc.Server.Url52);
        Doc.ShowView3();
        Doc.LoadSummaryList(0, 10, [ { Title: "最活跃用户统计" },{ Title: "阅读最多用户统计" }, { Title: "评论最多用户统计" }, { Title: "点赞最多用户统计" }, { Title: "收藏最多用户统计" }]);
    }  
 
    else if ("LeftMenu.回收站" == id) {
        Doc.ShowView2();
        Doc.LoadTopButton(topButtonId);
        var query = [{ _RedirectID: null, OwnerID: SESSION.Current().CompanyID, 'StatusCode': { $eq: -1 } }, { Content: 0, PlainText:0 }, { CreateTime: -1 }];
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.RecycleBin.Info);
    } 
    else if ("LeftMenu.使用帮助" == id) {
        Doc.ShowView2();
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent("AppInfo.html");
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