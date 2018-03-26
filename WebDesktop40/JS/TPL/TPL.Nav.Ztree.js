 
Doc.GetTreeCount = function () {
    var res = $(".ztree").length;
    return res;
}

Doc.ShowTree = function (target, setting, zNodes) {
    $.fn.zTree.init($("#"+target), setting, zNodes);
    $.fn.zTree.getZTreeObj(target).expandAll(true);
}

Doc.GetCheckedTreeNodes = function (target) {
    if (true === PARAM_CHECKER.IsNotEmptyString(target)) {
        var ztree = $.fn.zTree.getZTreeObj(target);
        var selectedNodes = ztree.getCheckedNodes();
        var IDArray = [];
        for (var k = 0; k < selectedNodes.length; k++) {
            var treeNode = selectedNodes[k];
            if (undefined === treeNode.children) {
                IDArray.push(treeNode.ID);
            }
        }
        return IDArray;
    }
    return [];
}

Doc.CancelCheckAllNodes = function (target) {
    if (true === PARAM_CHECKER.IsNotEmptyString(target)) {
        var ztree = $.fn.zTree.getZTreeObj(target);
        ztree.checkAllNodes(false);
    }
}


Doc.LoadTreeTo = function (target, data,excludeIdArray,option) {
    var ztreeID = "ztree"+(Doc.GetTreeCount()+1);
    Doc.LoadHtmlTo(target, "<div class='panelheader'>"+option.header+"</div><ul id='" + ztreeID + "' class='ztree'></ul>");
    var pageName = $("#pageName").val();
    var zTreeOnClick = function (event, treeId, treeNode) {
        var name = treeNode.Name;

        if (true === PARAM_CHECKER.IsObject(option)&& "TopButton" === option.Source) {
            option.Click(event, treeId, treeNode);///根据业务自定义事件，来自于顶部按钮
        }
        else if (true === PARAM_CHECKER.IsObject(option) && "AllStaff" === option.Source) {
            option.Click(event, treeId, treeNode);///根据业务自定义事件，来自于侧面栏
        }
        else if ("Main" === pageName) {
            var query = Doc.GetQuery();
            if (true === PARAM_CHECKER.IsArray(query)) {
                query[0].ParentID = treeNode.ID;
            }
            else if (true === PARAM_CHECKER.IsObject(query)) {
                query.ParentID = treeNode.ID;
            }
            Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);//还需要/Summary样式
        }
        else if ("Detail" == pageName) {
            option.Click(event, treeId, treeNode);///根据业务自定义事件
        }

    }

    var zTreeOnDblClick = function (event, treeId, treeNode) {
        Doc.ShowWindow("Category.html?id=" + treeNode.ID);
    }

    var zTreeOnCheck = function (event, treeId, treeNode) {
        option.Check(event, treeId, treeNode);
     };

    var setting = {
        data: {
            key: {
                name: "Name"
            },
            simpleData: {
                enable: true,
                idKey: "ID",
                pIdKey: "ParentID",
                rootPId: "RootID"
            }
        },
        callback: {
            onClick: zTreeOnClick,
            onDblClick: zTreeOnDblClick,
            onCheck: zTreeOnCheck
        }
    };


    if (PARAM_CHECKER.IsObject(option)) {
        if ("checkbox" === option.ShowMode) {
            setting.check={
                enable: true,
                    chkStyle: "checkbox",
                        chkboxType: { "Y": "ps", "N": "ps" }
            }
        }
    }

    Doc.ShowTree(ztreeID, setting, data);
 

}