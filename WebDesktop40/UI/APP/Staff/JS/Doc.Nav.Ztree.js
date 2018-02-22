 
Doc.GetTreeCount = function () {
    var res = $(".ztree").length;
    return res;
}

Doc.ShowTree = function (target, setting, zNodes) {
    $.fn.zTree.init($("#"+target), setting, zNodes);
    $.fn.zTree.getZTreeObj(target).expandAll(true);
}
 
Doc.LoadTreeTo = function (target, data,excludeIdArray,option) {
    $("#selectedTreeNode").val("");
    var ztreeID = "ztree"+(Doc.GetTreeCount()+1);
    Doc.LoadHtmlTo(target, "<ul id='" + ztreeID + "' class='ztree'></ul>");
    var pageName = $("#pageName").val();
    var zTreeOnClick = function (event, treeId, treeNode) {
        var name = treeNode.Name;
        
        $('#category').hide();
        $("#parentNode").text(name);
        $("[data-propertyName='ParentID']").attr("data-propertyValue", treeNode.id);
        $("[data-propertyName='ParentName']").attr("data-propertyValue", name);
        $("#selectedTreeNode").val(treeNode.id);
        if ("Main" === pageName) {
            var query = JSON.parse($("#tableQuery").val());
            query.ParentID = $("#selectedTreeNode").val();
            query = JSON.stringify(query);
            Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);
        }

    }

    var zTreeOnDblClick = function (event, treeId, treeNode) {
        Doc.ShowWindow("Category.html?id=" + treeNode.id);
    }
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
            onDblClick: zTreeOnDblClick
        }
    };
    Doc.ShowTree(ztreeID, setting, data);
 

}