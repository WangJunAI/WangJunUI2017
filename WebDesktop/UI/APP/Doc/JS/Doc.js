var Doc = {
    //AppInfo: {},
    Server: {
        Url1: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Find&p=0",
        Url2: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Count&p=0",
        Url3: "Detail.html",
        Url4: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Save&p=0",
        Url5: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Get&p=0",
        Url6: "Category.html",
        Url7: "http://localhost:9990/API.ashx?c=WangJun.Doc.CategoryManager&m=Save&p=0",
    },
};







Doc.ShowWindow = function (url) {
    url = (PARAM_CHECKER.IsNotEmptyString(url)) ? url : $(event.target).attr("data-param");
    $("#detailWindow iframe").attr("src", url);
    $("#detailWindow").show();
}

Doc.LoadDetail = function () {
    $(document).ready(function () {
        var id = NET.GetQueryParam("id");
        var context = [id];

        var callback = function (res) {
            LOGGER.Log(res);
            Doc.ShowDetail(res);
        }
        NET.LoadData(App.Doc.Server.Url5, callback, context, NET.POST);
    });
}

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




    var context = [item.Title, item.Content, item.CategoryID, item.PublistTime, item.Status, item.id,item.PlainText, { 0: "base64", 1: "base64"}];

    var callback = function (res) {
        LOGGER.Log(res);
        $(window.parent.document).find('#detailWindow').hide(); window.close();
        Doc.ShowDialog();
    }
    NET.PostData(App.Doc.Server.Url4, callback, context);
}

Doc.SaveCategory = function () {
    var item = {};
    item.Title = $("#Title").val().trim();
    //item.Content = UE.getEditor('editor').getContent();
    item.CreatorName = "创建人姓名";
    item.CreatorID = "创建人ID";
    item.ParentID = $("#parentNode").attr("data-param");
    // item.Content = item.Content.replace(/</g, "«").replace(/>/g, "»");
    var context = [item.Title, item.ParentID, item.CreatorName, item.CreatorID];

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.ShowDialog();

        $(window.parent.document).find('#detailWindow').hide(); window.close();
    }
    NET.PostData(App.Doc.Server.Url7, callback, context);
}


Doc.RemoveCategory = function () {
    var id = $("#id").val();
    var context = ["{\"_id\":ObjectId('" + id + "')}"];

    var callback = function (res) {
        LOGGER.Log(res);

    }
    NET.PostData(App.Doc.Server.Url10, callback, context);
}

 

Doc.LoadCategoryDetail = function () {
    var id = NET.GetQueryParam("id");
    var context = [id];

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.ShowCategoryDetail(res);
    }
    NET.LoadData(App.Doc.Server.Url11, callback, context, NET.POST);
}

Doc.ShowCategoryDetail = function (data) {
    if (PARAM_CHECKER.IsObject(data)) {
        $("#Title").val(data.Name);
        $("#id").val(data.id);
        if (true === !PARAM_CHECKER.IsNotEmptyString(data.ParentName)) {
            data.CategoryName = "选择分类";
        }
        $("#parentNode").text(data.ParentName);
        $("#parentNode").attr("data-param", data.ParentID);
    }
}




Doc.ShowDetail = function (data) {
    if (PARAM_CHECKER.IsObject(data)) {
        if (true === PARAM_CHECKER.IsNotEmptyString(data.Content) && "<" === data.Content[0]) {
            UE.getEditor('editor').setContent(data.Content);
            UE.getEditor('editor').setHeight(400);
        }
        else if (true === PARAM_CHECKER.IsNotEmptyString(data.Content)) {
            var html = data.Content.substring(data.Content.indexOf("&lt;"), data.Content.lastIndexOf("&gt;") + 4);
            var $div = $("<div></div>").html(html);
            data.Content = $div.text();
            UE.getEditor('editor').setContent(data.Content);
            UE.getEditor('editor').setHeight(400);
        }
        $("#Title").val(data.Title);
        $("#id").val(data.id);


        if (true === !PARAM_CHECKER.IsNotEmptyString(data.CategoryName)) {
            data.CategoryName = "选择分类";
        }
        $("#parentNode").text(data.CategoryName);
        $("#parentNode").attr("data-param", data.CategoryID);
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

Doc.ToggleTableRows = function () {
    var checked = $(event.target).prop("checked");
    $("#tbody1").find("[type='checkbox'][data-param]").prop("checked", checked);
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
        Doc.LoadTopButton();
        Doc.LoadTable(0,20,'{"Status":"已发布"}');
        Doc.LoadTree();
    });
}

Doc.LoadHtmlTo = function (target,html) {
    $(target).empty();
    $(target).append(html);
}

///


Doc.TopButtonClick = function () {

}