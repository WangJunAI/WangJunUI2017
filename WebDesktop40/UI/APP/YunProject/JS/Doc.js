 
var Doc = {};
 



 


Doc.MoveToRecycleBin = function () {
    var submitId = Doc.SubmitStart();
    var docId = $("#id").val();
    var idArray = [docId];

    var count = idArray.length;
    for (var k = 0; k < idArray.length; k++) {
        var context = ["DocService", "DocItem", idArray[k]];

        var callback = function (res) {
            LOGGER.Log(res);
            count--;
            Doc.SubmitEnd(submitId);

        }
        NET.PostData(App.Doc.Server.Url13, callback, context);
    }

}

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
        Doc.LeftMenuClick("LeftMenu.个人项目");
     });
}

Doc.LoadHtmlTo = function (target,html) {
    $(target).empty();
    $(target).append(html);
}
 