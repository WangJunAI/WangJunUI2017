﻿Doc.LoadTopButton = function (groupID) {
    var buttonArray =Doc.FindTopButtons(groupID);

    Doc.ShowTopButton(buttonArray);
}

Doc.ShowTopButton = function (data) {
    if (PARAM_CHECKER.IsArray(data)) {
        var topButtonHtml1 = $("#topButton1").html();
        var topButtonHtml2 = $("#topButton2").html();
        var topButtonSearchHtml = $("#topButtonSearch").html();
        $("#topButton").empty();
        for (var k = 0; k < data.length; k++) {
            var itemData = data[k];
            var html = "";
            if ("dropdownlist" === itemData.Type) {
                html = topButtonHtml2.replace("[Name]", itemData.Name).replace("[Method]", itemData.Method).replace("[Param]", itemData.Param).replace("[ID]", itemData.ID);
            }
            else if ("|" === itemData.Name) {
                html = topButtonHtml1.replace("", "").replace("javascript:;", "").replace("href", "_href").replace("onclick", "_onclick").replace("[Name]", itemData.Name);
            }
            else {
                html = topButtonHtml1.replace("[Name]", itemData.Name).replace("[Method]", itemData.Method).replace("[Param]", itemData.Param)
                    .replace("[Class]", ("Title" === itemData.Type) ? "btn fw700" : "btn").replace("[ID]", itemData.ID);;
            }

            $(html).appendTo("#topButton");
        }
        $(topButtonSearchHtml).appendTo("#topButton");
    }
}

Doc.FindTopButtons = function (groupID) {
    var length = App.Doc.Content.TopButton.length;
    var buttonArray = [];
    for (var k = 0; k < length; k++) {
        var button = App.Doc.Content.TopButton[k];
        if (PARAM_CHECKER.IsNotEmptyString(groupID)&& groupID === button.GroupID) {
            buttonArray.push(button);
        }
    }
    return buttonArray;
}


Doc.TopButtonClick = function (id) {
    id = (true === PARAM_CHECKER.IsNotEmptyString(id)) ? id : $(event.target).attr("data-id");
    if ("TopButton.新建新闻" === id) {
        var url = App.Doc.Server.Url3 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("TopButton.新建分类" === id) {
        var url = App.Doc.Server.Url6 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("TopButton.移动至" === id) {
        $('[data-id="' + id + '"]').find('[data-id=\'category\']').toggle();
        if (false === PARAM_CHECKER.IsNotEmptyString($('[data-id="' + id + '"]').find("[data-id='category']").first().attr("id"))) {
            $('[data-id="' + id + '"]').find("[data-id='category']").first().attr("id", "category" + Math.random().toString().replace(".", ""));
        }
        var droplistId = "#" + $('[data-id="' + id + '"]').find("[data-id='category']").first().attr("id");

        var query = App.Doc.QueryDict["默认新闻目录查询条件"];
        Doc.LoadData_Category(query, function (res1) {
            Doc.LoadTreeTo(droplistId, res1, [], {
                Source: "TopButton",
                Click: function (event, treeId, treeNode) {
                    var parentName = treeNode.Name;
                    var parentID = treeNode.ID;
                    ///获取选中行，将文档移动过去
                    Doc.MoveEntities(parentID, parentName);
                },
                header: "将选中的新闻移动至.."
            });
        });
    }
    else if ("TopButton.删除" === id) {
        Doc.RemoveSelectedDetail();
    } 
    else if ("TopButton.彻底删除" === id) {
        Doc.DeleteSelectedDetail();
    } 
    else if ("TopButton.清空回收站" === id) {
        Doc.EmptyRecycleBin();
    } 
    else if ("TopButton.搜索" === id)
    {
        var keywords = $("#searchInput").val();
        var query = [{ Title:{ '$regex':  keywords , '$options': 'g' },_RedirectID: null, CompanyID: SESSION.Current().CompanyID, 'StatusCode': { $ne: -1 } }, {}, { CreateTime: -1 }];
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);
    }
}