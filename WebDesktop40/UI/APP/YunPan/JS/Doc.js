 
var Doc = {};

 

Doc.UpdateDoc = function () {
    var query = { _id: { $in: [] } };
    var source = $("[type='checkbox'][data-param]").each(function () {
        if (true == $(this).prop("checked")) {
            var id = $(this).attr("data-param");
            query._id.$in.push("_ObjectId('" + id + "')_");
        }
    });

    query = JSON.stringify(query).replace(/"_ObjectId/g, "ObjectId").replace(/\)_"/g, ")");
    var updateJson = JSON.stringify({"Status":"已回收"});
    var context = [query,updateJson];

    var callback = function (res) {
        LOGGER.Log(res);

    }
    NET.PostData(App.Doc.Server.Url12, callback, context);
}

 

Doc.Initial = function () {
    $(document).ready(function () {
 
        Doc.LoadAppInfo();
        Doc.LoadMenu(); 
        Doc.LeftMenuClick("LeftMenu.个人云盘");
     });
}
 