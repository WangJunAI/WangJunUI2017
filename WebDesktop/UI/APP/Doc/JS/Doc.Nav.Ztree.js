Doc.LoadTree = function (target) {

    Doc.LoadHtmlTo("#leftList", "<ul id='treeDemo' class='ztree'></ul>");

    target = "#treeDemo";
    var zTreeOnClick = function (event, treeId, treeNode) {
        var name = treeNode.Name;
        $('#category').hide();
        $("#parentNode").text(name);
        $("#parentNode").attr("data-param", treeNode.id);
        Doc.LoadTable(0, 20, '{"CategoryID":"' + treeNode.id + '"}');
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
                idKey: "id",
                pIdKey: "ParentID",
                rootPId: null
            }
        },
        callback: {
            onClick: zTreeOnClick,
            onDblClick: zTreeOnDblClick
        }
    };

    var context = ["{}", "{}", 0, 1000];

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.ShowTree(target, setting, res);
    }
    NET.PostData(App.Doc.Server.Url8, callback, context);



}

Doc.ShowTree = function (target, setting, zNodes) {
    $.fn.zTree.init($(target), setting, zNodes);
    $.fn.zTree.getZTreeObj($(target).attr("id")).expandAll(true);
}