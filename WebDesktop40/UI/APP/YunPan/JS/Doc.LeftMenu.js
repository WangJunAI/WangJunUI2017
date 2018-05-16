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
        var query = [{ _RedirectID: null, OwnerID: SESSION.Current().UserID, 'StatusCode': { $ne: -1 }  }, {}, { CreateTime: -1 }];
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        Doc.LoadData_Category([JSON.stringify({ OwnerID: SESSION.Current().OwnerID }), "{}", "{}", 0, 1000], function (res1) { Doc.LoadTreeTo("#leftList", res1, [], { header: "小提示：修改目录双击即可" }); });
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);

        Doc.SetQuery(query);

    }

    else if ("LeftMenu.与我共享" == id) {
        var query = [{ _RedirectID: { $ne: null }, OwnerID: SESSION.Current().UserID, 'StatusCode': { $ne: -1 }  }, {}, { CreateTime: -1 }];
        Doc.ShowView2();
        Doc.LoadTopButton(topButtonId);
        //Doc.LoadData_Category(["{}", "{}", "{}", 0, 1000], function (res1) { Doc.LoadTreeTo("#leftList", res1, [], {}); });
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);

        Doc.SetQuery(query);

    }
    else if ("LeftMenu.企业云盘" == id) {
        var query = [{ _RedirectID: null, OwnerID: SESSION.Current().CompanyID, 'StatusCode': { $ne: -1 } }, {}, { CreateTime: -1 }];;
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        Doc.LoadData_Category([JSON.stringify({ OwnerID: SESSION.Current().CompanyID }), "{}", "{}", 0, 1000], function (res1) { Doc.LoadTreeTo("#leftList", res1, [], { header: "小提示：修改目录双击即可" }); });
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);

        Doc.SetQuery(query);
    }
    else if ("LeftMenu.员工云盘" == id) {
        var query = [{ _RedirectID: null, CompanyID: SESSION.Current().CompanyID, 'StatusCode': { $ne: -1 } }, {}, { CreateTime: -1 }];;
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        Doc.LoadData_All([], function (res1) {
            Doc.LoadTreeTo("#leftList", res1, [], {
                Source: "AllStaff", header: "小提示：所有人员", Click: function (event, treeId, treeNode) {
                    query = [{ _RedirectID: null, OwnerID: treeNode.ID, 'StatusCode': { $ne: -1 } }, {}, { CreateTime: -1 }];
                    Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);
                }
            });
        });
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);

        Doc.SetQuery(query);
    }
    else if ("LeftMenu.云盘分析" === id) {
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent("Chart.html");
        Doc.ShowView3();
        Doc.LoadSummaryListTo("#leftList", [{ Title: "空间使用" }, { Title: "文件分类" }, { Title: "分享数量" }], { Url:"chart1.html?id=[id]"}); 
    }
    else if ("LeftMenu.回收站" == id) {
        Doc.ShowView2();
        Doc.LoadTopButton(topButtonId);
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, "{}", App.Doc.Data.RecycleBin.Info);
    }
    else if ("LeftMenu.存储管理" == id) {
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent("Chart1.html");
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