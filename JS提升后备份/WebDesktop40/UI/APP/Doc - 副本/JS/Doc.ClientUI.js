
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


Doc.ToggleTableRows = function () {
    var checked = $(event.target).prop("checked");
    $("#tbody1").find("[type='checkbox'][data-param]").prop("checked", checked);
}

Doc.ShowWindow = function (url) {
    $("#detailWindow iframe").attr("src", url);
    $("#detailWindow").show();
}


Doc.CloseWindow = function (url) {
    url = "redirect.html";
    if (false === PARAM_CHECKER.IsTopWindow()) {
        top.window.Doc.LoadTable(0, 20, "{'Status':'已发布'}");
        $(window.parent.document).find('#detailWindow').hide(); window.close();
        Doc.ShowDialog();
    }
    else {
        $("#detailWindow iframe").attr("src", url);
        $("#detailWindow").hide();
    }

}

Doc.SubmitStart = function () {
    Doc.ShowDialog("正在提交数据...");
    var id = new Date().getTime();
    $(event.target).attr("data-submitBtnId",id);
    var prevText = $(event.target).text();
    $(event.target).text("正在" + prevText);
    $(event.target).attr("_onclick", $(event.target).attr("onclick")).removeAttr("onclick");
    return id;
}

Doc.SubmitEnd = function (id) {
    var $filter = $("[data-submitBtnId='" + id + "']");
    $filter.attr("onclick", $filter.attr("_onclick")).removeAttr("_onclick");
    $filter.text($filter.text().replace("正在", ""));
    Doc.ShowDialog("提交成功...");
}