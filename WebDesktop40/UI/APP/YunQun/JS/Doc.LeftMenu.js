﻿/// <reference path="appinfo.doc.js" />
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
    if ("LeftMenu.新建群组" === id) {
        var url = App.Doc.Server.Url3 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("LeftMenu.新建目录" === id) {
        var url = App.Doc.Server.Url6 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("LeftMenu.创建的群组" == id) {
        Doc.LoadTopButton(topButtonId);

        var listQuery = JSON.stringify({ _RedirectID: null, OwnerID: SESSION.Current().UserID, 'StatusCode': { $ne: -1 } });
        Doc.ShowView3();
 
        var index = 0
        var callback2 = function (index) {
            NET.PostData(App.Doc.Server.Url1, function (res2) {
                Doc.LoadSummaryListTo("#leftList", res2, {
                    SummaryListPagerCallback: function () {
                        var pagerIndex = parseInt($(event.target).attr("data-Index"));
                        $(event.target).attr("data-Index", pagerIndex + 1);
                        callback2(pagerIndex);
                    }
                    , PageIndex: index
                });
            }, [listQuery, JSON.stringify({ "Content": 0 }), "{CreateTime:-1}", index, App.Doc.Data.Pager.Size]);
        }
        callback2(0);

        Doc.SetQuery(listQuery); 
    }
    else if ("LeftMenu.参与的群组" == id) {
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent(YunConfig.RedirectPage);

        var listQuery = JSON.stringify({ _RedirectID: { $ne: null }, OwnerID: SESSION.Current().UserID, 'StatusCode': { $ne: -1 } });

        Doc.ShowView3(); 

        var index = 0
        var callback2 = function (index) {
            NET.PostData(App.Doc.Server.Url81, function (res2) {
                Doc.LoadSummaryListTo("#leftList", res2, {
                    SummaryListPagerCallback: function () {
                        var pagerIndex = parseInt($(event.target).attr("data-Index"));
                        $(event.target).attr("data-Index", pagerIndex + 1);
                        callback2(pagerIndex);
                    }
                    , PageIndex: index
                });
            }, [listQuery, JSON.stringify({ "Content": 0 }), "{CreateTime:-1}", index, App.Doc.Data.Pager.Size]);
        }
        callback2(0);


        Doc.SetQuery(listQuery); 
    }
    else if ("LeftMenu.活跃群组" == id) {
        Doc.LoadTopButton(topButtonId);

        var listQuery = JSON.stringify({ _RedirectID: null, CompanyID: SESSION.Current().CompanyID, 'StatusCode': { $ne: -1 } });
        Doc.ShowView3();
        Doc.LoadData_Doc(context = [listQuery, JSON.stringify({ "Content": 0 }), "{CreateTime:-1}", 0, App.Doc.Data.Pager.Size], function (res2) { Doc.LoadSummaryListTo("#leftList", res2); });
        Doc.SetQuery(listQuery);
    }
    else if ("LeftMenu.睡眠群组" == id) {
        Doc.LoadTopButton(topButtonId);

        var listQuery = JSON.stringify({ _RedirectID: null, CompanyID: SESSION.Current().CompanyID, 'StatusCode': { $ne: -1 } });
        Doc.ShowView3();
        Doc.LoadData_Doc(context = [listQuery, JSON.stringify({ "Content": 0 }), "{CreateTime:-1}", 0, App.Doc.Data.Pager.Size], function (res2) { Doc.LoadSummaryListTo("#leftList", res2); });
        Doc.SetQuery(listQuery);
    }
    else if ("LeftMenu.群组分析" === id) {
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent(App.Doc.Server.Url50);
        Doc.ShowView3();
        Doc.LoadSummaryList(0, 10, [{ Title: "发布统计" }, { Title: "分词统计" }, { Title: "目录统计" }]);
    } 
    else if ("LeftMenu.用户分析" === id) {
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent(App.Doc.Server.Url51);
        Doc.ShowView3();
        Doc.LoadSummaryList(0, 10, [{ Title: "最爱分享" }, { Title: "分享给的最多用户" }]);
    }
    else if ("LeftMenu.回收站" == id) {
        Doc.ShowView2();
        Doc.LoadTopButton(topButtonId);
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, "{}", App.Doc.Data.RecycleBin.Info);
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