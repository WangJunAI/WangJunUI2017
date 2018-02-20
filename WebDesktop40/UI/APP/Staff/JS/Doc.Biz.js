///加载目录信息
Doc.LoadData_Category = function (param, callback) {
    NET.PostData(App.Doc.Server.Url8, callback, param);
}

Doc.LoadData_Doc = function (param, callback) {
    NET.PostData(App.Doc.Server.Url1, callback, param);
}


///保存一个详细
Doc.SaveDetail = function () {
    var submitId = Doc.SubmitStart();
    
    var item = {};
    item.id = $("#id").val();
    item.Name = $("[data-Name]").attr("data-Name");
    item.Sex = $("[data-Sex]").attr("data-Sex");
    item.StaffID = $("[data-StaffID]").attr("data-StaffID");
    item.Email = $("[data-Email]").attr("data-Email");
    item.QQ = $("[data-QQ]").attr("data-QQ");
    item.Phone = $("[data-Phone]").attr("data-Phone");
    item.DepartmentID = $("[data-DepartmentID]").attr("data-DepartmentID");
    item.Position = $("[data-Position]").attr("data-Position");
    item.RoleID = $("[data-RoleID]").attr("data-RoleID");
    item.AreaID = $("[data-AreaID]").attr("data-AreaID");
    item.EntryTime = $("[data-EntryTime]").attr("data-EntryTime");
    item.DepartureTime = $("[data-DepartureTime]").attr("data-DepartureTime");

    var context = [Convertor.ToBase64String(JSON.stringify(item),true), { 0: "base64" }];

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.SubmitEnd(submitId);
        if (false === PARAM_CHECKER.IsTopWindow()) {

            Doc.CloseWindow();
        }
    }
    NET.PostData(App.Doc.Server.Url4, callback, context);
}

///保存一个组织
Doc.SaveOrg = function () {
    var submitId = Doc.SubmitStart();
    var item = {};
    item.id = $("#id").val();
    item.Name = $("#Name").val().trim();
    item.ParentID = $("#parentNode").attr("data-param");
    var param = [Convertor.ToBase64String(JSON.stringify(item), true), { 0: "base64" }];

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.SubmitEnd(submitId);
       
        if (false === PARAM_CHECKER.IsTopWindow()) {
            top.window.Doc.LoadData_Category(["{}", "{}", "{}", 0, 1000], function (res1) { Doc.LoadTreeTo("#treeDemo", res1, [], {}); });

        }
         Doc.CloseWindow();

    }
    NET.PostData(App.Doc.Server.Url7, callback, param);
}