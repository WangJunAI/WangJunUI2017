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
    if ("LeftMenu.新建笔记" === id) {
        var url = App.Doc.Server.Url3 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("LeftMenu.新建目录" === id) {
        var url = App.Doc.Server.Url6 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("LeftMenu.个人笔记" == id) {
        Doc.ShowView1();

        Doc.LoadTopButton(topButtonId);
        var listQuery = "{}";
        var callback1 = function (res1) {
            Doc.LoadTreeTo("#leftPart1", res1, [], {});
            Doc.ShowContent("redirect.html");

            var callback2 = function (res2) {
                Doc.LoadSummaryListTo("#leftPart2", res2);
            }
            Doc.LoadData_Doc(context = [listQuery, JSON.stringify({ "Content": 0 }), "{CreateTime:-1}", 0, App.Doc.Data.Pager.Size], function (res2) { Doc.LoadSummaryListTo("#leftPart2", res2); });
        }

        var param = ["{}", "{}", "{}", 0, 1000]
        Doc.LoadData_Category(param, callback1);
        $("#tableQuery").val(listQuery);
    }
    else if ("LeftMenu.企业笔记" == id) {
        Doc.ShowView1();

        Doc.LoadTopButton(topButtonId);
        var listQuery = "{}"
        var callback1 = function (res1) {
            Doc.LoadTreeTo("#leftPart1", res1, [], {});
            Doc.ShowContent("redirect.html");
             
            Doc.LoadData_Doc(context = [listQuery, JSON.stringify({ "Content": 0 }), "{CreateTime:-1}", 0, App.Doc.Data.Pager.Size],   function (res2) { Doc.LoadSummaryListTo("#leftPart2", res2);  });
        }

        var param = [JSON.stringify({ OwnerID: SESSION.Current().CompanyID }), "{}", "{}", 0, 1000]
        Doc.LoadData_Category(param, callback1);
        $("#tableQuery").val(listQuery);

    }
    else if ("LeftMenu.文档分析" === id) {
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent("Chart1.html");
        Doc.ShowView3();
        Doc.LoadSummaryList(0, 10, [{ Title: "目录下文档比例" }, { Title: "目录活跃度" }, { Title: "文章热度" }, { Title: "发文计数" }, { Title: "最活跃用户" }]);
    }
   else if ("LeftMenu.回收站" == id) {
        ///加载TopButton
        ///刷新列表
        Doc.ShowView2();
        Doc.LoadTopButton(topButtonId);
        $("#topButton").removeAttr("data-status");
        $("#topButton").removeAttr("data-categoryId");

        Doc.LoadTable(0, App.Doc.Data.Pager.Size, "{}", App.Doc.Data.RecycleBin.Info);
    }
    else if ("LeftMenu.待发布" == id) {
        ///加载TopButton
        ///刷新列表
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        ///加载树状目录
        Doc.LoadData_Category(["{}", "{}", "{}", 0, 1000], function (res1) { Doc.LoadTreeTo("#leftList", res1, [], {}); });
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, "{'Status':'待发布'}", App.Doc.Data.DocTable.Info);
        $("#topButton").attr("data-status", "待发布");
    }
    else if ("LeftMenu.草稿箱" == id) {
        ///加载TopButton
        ///刷新列表
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        ///加载树状目录
        Doc.LoadData_Category(["{}", "{}", "{}", 0, 1000], function (res1) { Doc.LoadTreeTo("#leftList", res1, [], {}); });
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, "{'Status':'草稿'}", App.Doc.Data.DocTable.Info);
        $("#topButton").attr("data-status", "草稿");

    }
    else if ("LeftMenu.全部文档" == id) {
        ///加载TopButton
        ///刷新列表
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        ///加载树状目录
        Doc.LoadData_Category(["{}", "{}", "{}", 0, 1000], function (res1) { Doc.LoadTreeTo("#leftList", res1, [], {}); });
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, "{}", App.Doc.Data.DocTable.Info);
        $("#topButton").removeAttr("data-status");

    }
    else if ("LeftMenu.存储管理" == id) {
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent("Chart1.html");
    }
    else if ("LeftMenu.应用信息" == id) {
        Doc.ShowView2();
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent("AppInfo.html");
    }
    else if ("LeftMenu.文档分析" === id) {
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent("Chart1.html");
        Doc.ShowView3();
        Doc.LoadSummaryList(0, 10, [{ Title: "目录下文档比例" }, { Title: "目录活跃度" }, { Title: "文章热度" }, { Title: "发文计数" }, { Title: "最活跃用户" }]);
    }
    else if ("LeftMenu.评论分析" === id) {
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent("Chart1.html");
    }
    else if ("LeftMenu.用户参与" === id) {
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent("Chart1.html");
    }
    else if ("LeftMenu.外网关联" === id) {
        Doc.ShowView3();
        Doc.LoadTopButton(topButtonId);
        Doc.LoadSummaryList(0, 10, [{ Title: "今日热词" }, { Title: "订阅热词" }, { Title: "行业要闻" }, { Title: "局势分析" }]);

        Doc.ShowContent("Chart1.html");
    }
    else if ("LeftMenu.云笔记测试" === id) {
        Doc.ShowView1(); 

        Doc.LoadTopButton(topButtonId);

        var callback1 = function (res1) {
            Doc.LoadTreeTo("#leftPart1", res1, [], {});
            Doc.ShowContent("redirect.html");
            
            var callback2 = function (res2) {
                Doc.LoadSummaryListTo("#leftPart2", res2);
            }
            Doc.LoadData_Doc(context = ["{}", JSON.stringify({ "Content": 0, "PlainText": 0 }), "{CreateTime:-1}", 0, App.Doc.Data.Pager.Size], callback2);
        }

        var param = ["{}", "{}", "{}", 0, 1000]
        Doc.LoadData_Category(param, callback1);
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