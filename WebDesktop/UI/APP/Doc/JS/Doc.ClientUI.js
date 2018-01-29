
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