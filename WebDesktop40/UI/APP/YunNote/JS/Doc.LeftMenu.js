 

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
        Doc.ShowContent(YunConfig.RedirectPage);
        var listQuery = JSON.stringify({ _RedirectID: null, OwnerID: SESSION.Current().UserID, 'StatusCode': { $ne: -1 } });//        var query = [, {}, { CreateTime: -1 }];
         var index=0
        var callback2 = function (index,query) {
            //listQuery = Doc.GetQuery();
            Doc.LoadData_Doc([query, JSON.stringify({ "Content": 0 }), "{CreateTime:-1}", index, App.Doc.Data.Pager.Size], function (res2) {
                Doc.LoadSummaryListTo("#leftPart2", res2, {
                    SummaryListPagerCallback: function () {
                        var pagerIndex = parseInt($(event.target).attr("data-Index"));
                        $(event.target).attr("data-Index", pagerIndex + 1);
                        callback2(pagerIndex, query);
                    }
                    ,PageIndex:index
                });
                 
            });
        }
        callback2(0,listQuery);
        

        var param = [JSON.stringify({ OwnerID: SESSION.Current().UserID}), "{}", "{}", 0, 1000]
        Doc.LoadData_Category(param, function (res1) {
            Doc.LoadTreeTo("#leftPart1", res1, [], {
                header: "小提示：修改目录双击即可",
                Click: function (event, treeId, treeNode) {
                    var name = treeNode.Name;
                    var parentID = treeNode.ID;
                    listQuery = JSON.stringify({ _RedirectID: null, ParentID:parentID,OwnerID: SESSION.Current().UserID, 'StatusCode': { $ne: -1 } }); 

                    callback2(0, listQuery);
                } }); });
        Doc.SetQuery(listQuery);
    }
    else if ("LeftMenu.与我共享" == id) {
        Doc.ShowView3();

        Doc.LoadTopButton(topButtonId);
        var listQuery = JSON.stringify({ '_RedirectID': { '$ne': null }, OwnerID: SESSION.Current().UserID, 'StatusCode': { $ne: -1 } });


        var index = 0
        var callback2 = function (index) {
            NET.PostData(App.Doc.Server.Url81,  function (res2) {
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
    else if ("LeftMenu.所有笔记" === id) {
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
    else if ("LeftMenu.笔记分析" === id) {
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent(App.Doc.Server.Url50);
        Doc.ShowView3();
        Doc.LoadSummaryList(0, 10, [{ Title: "发布统计" } , { Title: "目录统计" }]);
    }
    else if ("LeftMenu.共享分析" === id) {
        Doc.LoadTopButton(topButtonId);
        Doc.ShowContent(App.Doc.Server.Url51);
        Doc.ShowView3();
        Doc.LoadSummaryList(0, 10, [{ Title: "共享分析" }]);
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