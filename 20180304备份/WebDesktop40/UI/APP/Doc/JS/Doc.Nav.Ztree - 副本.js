//Doc.LoadTree = function (target,excludeIdArray) {
//    //Doc.ShowLeftList();
//    Doc.LoadHtmlTo("#leftList", "<ul id='treeDemo' class='ztree'></ul>");

//    target = "#treeDemo";
//    var zTreeOnClick = function (event, treeId, treeNode) {
//        var name = treeNode.Name;
//        $('#category').hide();
//        $("#parentNode").text(name);
//        $("#parentNode").attr("data-param", treeNode.id);
//        Doc.LoadTable(0, App.Doc.Data.Pager.Size, '{"CategoryID":"' + treeNode.id + '"}');
//    }

//    var zTreeOnDblClick = function (event, treeId, treeNode) {
//        Doc.ShowWindow("Category.html?id=" + treeNode.id);
//    }
//    var setting = {
//        data: {
//            key: {
//                name: "Name"
//            },
//            simpleData: {
//                enable: true,
//                idKey: "id",
//                pIdKey: "ParentID",
//                rootPId: null
//            }
//        },
//        callback: {
//            onClick: zTreeOnClick,
//            onDblClick: zTreeOnDblClick
//        }
//    };

//    var param = ["{}", "{}", 0, 1000];

//    var callback = function (res) {
//        LOGGER.Log(res);
//        var arr = {};
//        if (true === PARAM_CHECKER.IsArray(excludeIdArray)) {
            
//        }

//        Doc.ShowTree(target, setting, res);
//    }
//    NET.PostData(App.Doc.Server.Url8, callback, param);



//}

Doc.GetTreeCount = function () {
    var res = $(".ztree").length;
    return res;
}

Doc.ShowTree = function (target, setting, zNodes) {
    $.fn.zTree.init($("#"+target), setting, zNodes);
    $.fn.zTree.getZTreeObj(target).expandAll(true);
}



Doc.LoadTreeTo = function (target, data,excludeIdArray,option) {

    var ztreeID = "ztree"+(Doc.GetTreeCount()+1);
    Doc.LoadHtmlTo(target, "<ul id='" + ztreeID + "' class='ztree'></ul>");
    
    var zTreeOnClick = function (event, treeId, treeNode) {
        var name = treeNode.Name;
        
        $('#category').hide();
        $("#parentNode").text(name);
        $("[data-propertyName='ParentID']").attr("data-propertyValue", treeNode.id);
 
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