 
var Doc = {};





Doc.SaveDetail = function () {
    var item = {};
    item.id = $("#id").val();
    item.Title = $("#Title").val().trim();
    item.Content = UE.getEditor('editor').getContent();
    item.CategoryID = $("#parentNode").attr("data-Param");
    item.CreatorID = "创建人ID";
    item.Content =   item.Content;//.replace(/</g, "«").replace(/>/g, "»");
    item.Status = $("[data-single='status'].selected").text();
    item.PublistTime = $("#publishDate").val() + " " + $("#publishHour").val() + ":" + $("#publishMinute").val()+":00";

    ///Html转义
    //$div = $("<div></div>");
    //$div.text(item.Content);
    item.Title = Convertor.ToBase64String(item.Title).replace(/\+/g, "加号").replace(/\//g, "斜杠").replace(/=/g, "等于").replace(/ /g, "空格");
    item.Content = Convertor.ToBase64String(item.Content).replace(/\+/g, "加号").replace(/\//g, "斜杠").replace(/=/g, "等于").replace(/ /g, "空格");
    item.PlainText = UE.getEditor('editor').getContentTxt();
    item.PlainText = Convertor.ToBase64String(item.PlainText).replace(/\+/g, "加号").replace(/\//g, "斜杠").replace(/=/g, "等于").replace(/ /g, "空格");




    var context = [item.Title, item.Content, item.CategoryID, item.PublistTime, item.Status, item.id, item.PlainText, { 0: "base64", 1: "base64", 6: "base64"}];

    var callback = function (res) {
        LOGGER.Log(res);
        if (false === PARAM_CHECKER.IsTopWindow()) {
            top.window.Doc.LoadTable(0, 20, "{'Status':'已发布'}");
            $(window.parent.document).find('#detailWindow').hide(); window.close();
            Doc.ShowDialog();
        }
    }
    NET.PostData2(App.Doc.Server.Url4, callback, context);
}

Doc.SaveCategory = function () {
    var item = {};
    item.id = $("#id").val();
    item.Title = $("#Title").val().trim();
    //item.Content = UE.getEditor('editor').getContent();
    item.CreatorName = "创建人姓名";
    item.CreatorID = "创建人ID";
    item.ParentID = $("#parentNode").attr("data-param");
    // item.Content = item.Content.replace(/</g, "«").replace(/>/g, "»");
    var context = [item.Title, item.ParentID, item.id, item.CreatorID];

    var callback = function (res) {
        LOGGER.Log(res);
        if (false === PARAM_CHECKER.IsTopWindow()) {
            $(window.parent.document).find('#detailWindow').hide(); window.close();
            Doc.ShowDialog();
            top.window.Doc.LoadTree();
        }


    }
    NET.PostData(App.Doc.Server.Url7, callback, context);
}


Doc.RemoveCategory = function () {
    var id = $("#id").val();
    var context = [id];

    var callback = function (res) {
        LOGGER.Log(res);
        if (false === PARAM_CHECKER.IsTopWindow()) {
            $(window.parent.document).find('#detailWindow').hide(); window.close();
            Doc.ShowDialog();
            top.window.Doc.LoadTree();
        }
    }
    NET.PostData(App.Doc.Server.Url10, callback, context);
}

 


Doc.MoveToRecycleBin = function () {
    var idArray = [];
    var source = $("[type='checkbox'][data-param]").each(function () {
        if (true == $(this).prop("checked")) {
            var id = $(this).attr("data-param");
            idArray.push(id);
        }
    });

    for (var k = 0; k < idArray.length; k++) {
        var context = ["DocService", "DocItem", idArray[k]];

        var callback = function (res) {
            LOGGER.Log(res);
            if (k === idArray.length - 1) {
                Doc.LoadTopButton(topButtonId);
                Doc.CloseLeftList();
                Doc.LoadTable(0, 20, "{'Status':'已发布'}");
            }
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

Doc.ShowDialog = function () {
    $('#modal').css("display","block");
    $('#dialog').css("display", "block");
    $(window.parent).find('#modal').show();
    $(window.parent).find('#dialog').show();
    setTimeout(function () {
        Doc.CloseDialog();
    }, 1000 * 2);

}

Doc.Initial = function () {
    $(document).ready(function () {
        Doc.LoadAppInfo();
        Doc.LoadMenu();

        Doc.LoadTopButton("左侧菜单.已发布.TopButton");
        Doc.LoadTree();
        Doc.LoadTable(0, 20, "{'Status':'已发布'}");
    });
}

Doc.LoadHtmlTo = function (target,html) {
    $(target).empty();
    $(target).append(html);
}
 