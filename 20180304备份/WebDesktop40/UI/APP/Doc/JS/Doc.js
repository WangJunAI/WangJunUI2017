 
var Doc = {};












 


Doc.MoveToRecycleBin = function () {
    var submitId = Doc.SubmitStart();
    var topButtonId = $(event.target).attr("data-id");
    var idArray = [];
    var source = $("[type='checkbox'][data-param]").each(function () {
        if (true == $(this).prop("checked")) {
            var id = $(this).attr("data-param");
            idArray.push(id);
        }
    });
    var count = idArray.length;
    for (var k = 0; k < idArray.length; k++) {
        var context = ["DocService", "DocItem", idArray[k]];

        var callback = function (res) {
            LOGGER.Log(res);
            count--;
            Doc.SubmitEnd(submitId);

            if (count === 0) {
                var categoryId = $("#topButton").attr("data-categoryId");
                var status = $("#topButton").attr("data-status");
                var query = "{}";
                if (true === PARAM_CHECKER.IsNotEmptyString(status) || true === PARAM_CHECKER.IsNotEmptyString(categoryId)) {
                    query = "{'CategoryID':'[CategoryID]','Status':'[Status]'}".replace("[CategoryID]", categoryId).replace("[Status]", status);
                }
                else if (true === PARAM_CHECKER.IsNotEmptyString(status) || false=== PARAM_CHECKER.IsNotEmptyString(categoryId)) {
                    query = "{'Status':'[Status]'}".replace("[Status]", status);
                }
                else if (false === PARAM_CHECKER.IsNotEmptyString(status) || true === PARAM_CHECKER.IsNotEmptyString(categoryId)) {
                    query = "{'CategoryID':'[CategoryID]'}".replace("[CategoryID]", categoryId);
                }        

                Doc.LoadTable(0, App.Doc.Data.Pager.Size, query);
            }
        }
        NET.PostData(App.Doc.Server.Url13, callback, context);
    }

}

///暂未用上
Doc.RemoveDetail = function () {

    var query = { _id: { $in: [] } };
    var source = $("[type='checkbox'][data-param]").each(function () {
        if (true == $(this).prop("checked")) {
            var id = $(this).attr("data-param");
            query._id.$in.push("_ObjectId('" + id + "')_");
        }
    });

    query = JSON.stringify(query).replace(/"_ObjectId/g, "ObjectId").replace(/\)_"/g, ")");

    var context = [query];

    var callback = function (res) {
        LOGGER.Log(res);

    }
    NET.PostData(App.Doc.Server.Url9, callback, context);
}

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



Doc.CloseDialog = function () {
    $('#modal').css("display", "none");
    $('#dialog').css("display", "none");
}

Doc.ShowDialog = function (message,type,title) {
    $('#modal').css("display","block");
    $('#dialog').css("display", "block");
    $(window.parent).find('#modal').show();
    $(window.parent).find('#dialog').show();
    $('#dialog').find(".message").text(message);
    setTimeout(function () {
        Doc.CloseDialog();
    }, 1000 * 2);

}

Doc.Initial = function () {
    $(document).ready(function () {
 
        Doc.LoadAppInfo();
        Doc.LoadMenu();
        //Doc.ShowView3();
        //Doc.LoadTopButton("左侧菜单.已发布.TopButton");
        //Doc.LoadData_Category(["{}", "{}", "{}", 0, 1000], function (res1) { Doc.LoadTreeTo("#leftList", res1, [], {}); });
        Doc.LeftMenuClick("LeftMenu.已发布");
     });
}

Doc.LoadHtmlTo = function (target,html) {
    $(target).empty();
    $(target).append(html);
}
 