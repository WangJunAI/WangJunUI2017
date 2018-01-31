
Doc.CloseLeftList = function () {
    $("#leftList").hide();
    $("#content").css("left", "10em");
}

Doc.ShowLeftList = function () {
    $("#leftList").show();
    $("#content").removeAttr("style");
}

Doc.ShowContent = function (input) {
    if (true === PARAM_CHECKER.IsHtml(input)) {
        $("#content").html(input);
    }
    else/* if (true === PARAM_CHECKER.IsUrl(input))*/ {
        $("#content").html("<iframe src='" + input + "'/>");
        $("#content iframe").css("width", "100%");
        $("#content iframe").css("border", "none");
        $("#content iframe").height($("#content").height() - 10);
    }
}


Doc.LoadCategoryDetail = function () {
    var id = NET.GetQueryParam("id");
    if (true === PARAM_CHECKER.IsNotEmptyString(id)) {

        var context = [id];

        var callback = function (res) {
            LOGGER.Log(res);
            Doc.ShowCategoryDetail(res);
        }
        NET.LoadData(App.Doc.Server.Url11, callback, context, NET.POST);
    }
    else {
        Doc.ShowCategoryDetail();
    }
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
        $("#deleteBtn").removeAttr("style");
    }
}


