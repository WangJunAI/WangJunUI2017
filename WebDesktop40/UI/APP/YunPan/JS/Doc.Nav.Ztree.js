 
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
 
Doc.LoadTreeTo = function (target, data,excludeIdArray,option) {
    var ztreeID = "ztree"+(Doc.GetTreeCount()+1);
    Doc.LoadHtmlTo(target, "<div class='header'><a href='javascript:;' >清空</a><a href='javascript:;' >取消</a><a href='javascript: ;' onclick='$(this).parent().parent().hide()' >确定</a></div><ul id='" + ztreeID + "' class='ztree'></ul>");
    var pageName = $("#pageName").val();
    var zTreeOnClick = function (event, treeId, treeNode) {
        var name = treeNode.Name;
        
        
        if ("Main" === pageName) {
            var query = JSON.parse($("#tableQuery").val());
            query.ParentID = treeNode.ID;
            query = JSON.stringify(query);
            Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);
        }
        else if ("Detail" == pageName) {
            option.Click(event, treeId, treeNode);
        }

    }

    var zTreeOnDblClick = function (event, treeId, treeNode) {
        Doc.ShowWindow("Category.html?id=" + treeNode.id);
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