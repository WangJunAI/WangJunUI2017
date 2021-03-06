﻿///保存一个目录
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

    item.OwnerID = SESSION.Current().CompanyID;

    var param = [Convertor.ToBase64String(JSON.stringify(item), true), { 0: "base64" }];

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.SubmitEnd(submitId);

        if (false === PARAM_CHECKER.IsTopWindow()) { 
            top.window.Doc.LoadData_Category(["{}", "{}", "{}", 0, 1000], function (res1) {
                top.window.Doc.LoadTreeTo("#leftList", res1, [], {
                    Click: function (event, treeId, treeNode) {
                        var name = treeNode.Name;
                        $('#category').hide();
                        $("[data-propertyName='ParentID']").attr("data-propertyValue", treeNode.ID);
                        $("[data-propertyName='ParentName']").attr("data-propertyValue", name);
                    },
                    header: "小提示：修改目录双击即可"
                });
            });
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

    var form = { Name: "测试员工", Rows: [] };
    
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
            else if ("CheckBox" === propertyType) {
                item[propertyName] = ("true" === propertyValue) || ("是" === propertyValue);
            }
            else if ("CheckBox" === propertyType) {
                item[propertyName] = ("true" === propertyValue) || ("是" === propertyValue);
            }
            else {
                item[propertyName.trim()] = propertyValue;
            }

            form.Rows.push({ KeyName: propertyName, Value: propertyValue });
        }
    });



    var param = [Convertor.ToBase64String(JSON.stringify(item), true), { 0: "base64" }];

  
    var callback = function (res) {
        LOGGER.Log(res);
        Doc.SubmitEnd(submitId);

///


        var option2 = {
            url: "http://localhost:9990/API.ashx?_SID=Test&c=WangJun.App.YunWebAPI&m=SaveJson",
            method: "POST",
            data: JSON.stringify(["YunForm", JSON.stringify(form)]),
            success: function (res3) {
                console.log(res3);
            },
            error: function (res4) {
                console.log(res4);
            },
        };
        $.ajax(option2);

        ///





        if (false === PARAM_CHECKER.IsTopWindow()) {
            top.window.Doc.LeftMenuClick("LeftMenu.在职人员");
        }

        Doc.CloseWindow();


    }
    NET.PostData(App.Doc.Server.Url4, callback, param);
}

///移除一个文档
Doc.RemoveDetail = function (id, callback) {
    var id = (true === PARAM_CHECKER.IsNotEmptyString(id)) ? id : $("#ID").val();

    var context = [id];

    NET.PostData(App.Doc.Server.Url9, callback, context);
}
