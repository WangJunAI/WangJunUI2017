Doc.LoadTopButton = function (groupID) {
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


Doc.TopButtonClick = function () {
    var id = $(event.target).attr("data-id");
    if ("TopButton.新建个人文档" === id) {
        var url = App.Doc.Server.Url3 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("TopButton.新建个人目录" === id) {
        var url = App.Doc.Server.Url6 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("TopButton.新建企业文档" === id) {
        var url = App.Doc.Server.Url31 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("TopButton.新建企业目录" === id) {
        var url = App.Doc.Server.Url61 + "?t=" + (new Date().getTime());
        Doc.ShowWindow(url);
    }
    else if ("TopButton.个人文档移动至" === id) {
        $('[data-id="' + id + '"]').find('[data-id=\'category\']').toggle();
        if (false === PARAM_CHECKER.IsNotEmptyString($('[data-id="' + id + '"]').find("[data-id='category']").first().attr("id"))) {
            $('[data-id="' + id + '"]').find("[data-id='category']").first().attr("id", "category" + Math.random().toString().replace(".", ""));
        }
        var droplistId = "#" + $('[data-id="' + id + '"]').find("[data-id='category']").first().attr("id");

        var query = App.Doc.QueryDict["默认个人知识库目录查询条件"];
        Doc.LoadData_Category(query, function (res1) {
            Doc.LoadTreeTo(droplistId, res1, [], {
                Source: "TopButton",
                Click: function (event, treeId, treeNode) {
                    var parentName = treeNode.Name;
                    var parentID = treeNode.ID;
                    ///获取选中行，将文档移动过去
                    Doc.MoveEntities(parentID, parentName);
                },
                header: "将选中的文件移动至.."
            });
        });
    }
    else if ("TopButton.企业知识库移动至" === id) {
        $('[data-id="' + id + '"]').find('[data-id=\'category\']').toggle();
        if (false === PARAM_CHECKER.IsNotEmptyString($('[data-id="' + id + '"]').find("[data-id='category']").first().attr("id"))) {
            $('[data-id="' + id + '"]').find("[data-id='category']").first().attr("id", "category" + Math.random().toString().replace(".", ""));
        }
        var droplistId = "#" + $('[data-id="' + id + '"]').find("[data-id='category']").first().attr("id");

        var query = App.Doc.QueryDict["默认企业知识库目录查询条件"];
        Doc.LoadData_Category(query, function (res1) {
            Doc.LoadTreeTo(droplistId, res1, [], {
                Source: "TopButton",
                Click: function (event, treeId, treeNode) {
                    var parentName = treeNode.Name;
                    var parentID = treeNode.ID;
                    ///获取选中行，将文档移动过去
                    Doc.MoveEntities(parentID, parentName);
                },
                header: "将选中的文件移动至.."
            });
        });
    }
    else if ("TopButton.共享给" === id) {
        $('[data-id="' + id + '"]').find('[data-id=\'category\']').show();
        if (false === PARAM_CHECKER.IsNotEmptyString($('[data-id="' + id + '"]').find("[data-id='category']").first().attr("id"))) {
            $('[data-id="' + id + '"]').find("[data-id='category']").first().attr("id", "category" + Math.random().toString().replace(".", ""));
            var droplistId = "#" + $('[data-id="' + id + '"]').find("[data-id='category']").first().attr("id");
            var query = App.Doc.QueryDict["默认公司通讯录"];

            Doc.LoadData_All([], function (res1) {
                Doc.LoadTreeTo(droplistId, res1, [], {
                    Source: "TopButton",
                    ShowMode: "checkbox",
                    Check: function (event, treeId, treeNode) {

                    },
                    header: "<div class='txtright'><a href='javascript:;' class='margin_r05em'>清空</a><a href='javascript:;'  class='margin_r05em' onclick='Doc.ShareTo()'>确定</a><a href='javascript:;'  class='margin_r05em'>取消</a></div>",
                    Click: function () {

                    }
                });
            });

        }
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
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, "{'Status':'已发布','Title':{ '$regex': '" + keywords+"', '$options': 'g' }}");
    }
}