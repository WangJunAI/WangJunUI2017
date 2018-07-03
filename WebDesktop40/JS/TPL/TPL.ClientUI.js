 
 

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
 


Doc.ToggleTableRows = function () {
    var checked = $(event.target).prop("checked");
    $("#tbody1").find("[type='checkbox'][data-param]").prop("checked", checked);
}

///获取选中行
Doc.GetSelectedTableRow = function () {
    var idArray = [];
    var $source = $("#tbody1 [type='checkbox'][data-param]").each(function () {
        if (true == $(this).prop("checked")) {
            var id = $(this).attr("data-param");
            idArray.push(id);
        }
    });
    return idArray;
}

Doc.RemoveSelectedDetail = function () {
    var submitId = Doc.SubmitStart();

    var idArray = Doc.GetSelectedTableRow();

    var successCount = idArray.length;
    while (0 < idArray.length) {
        var id = idArray.pop();
        Doc.RemoveDetail(id, function () {
            successCount--;
            if (0 === successCount) {
                Doc.SubmitEnd(submitId);
                var query = Doc.GetQuery();
                Doc.LoadTable(0, App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);
             }
        });
    }
}

Doc.IsNotEmptyPage = function () {
    var id = NET.GetQueryParam("id");
    return PARAM_CHECKER.IsNotEmptyObjectId(id);
}




Doc.ShowWindow = function (url) {
    $("#detailWindow iframe").attr("src", url);
    $("#detailWindow").show();
}


Doc.CloseWindow = function (option) {
    url = window.location.origin + "/redirect.html";
    if (false === PARAM_CHECKER.IsTopWindow()) {
        Doc.ShowDialog();
        var tId = setTimeout(function () {
            clearTimeout(tId);
            $(window.parent.document).find('#detailWindow').hide();
            window.close();
        }, 1000);
    }
    else if (true === PARAM_CHECKER.IsObject(option) && window.name === option.WindowName) {
        window.close();
    }
    else {
        $("#detailWindow iframe").attr("src", url);
        $("#detailWindow").hide();
    }

}

Doc.LoadHtmlTo = function (target, html) {
    $(target).empty();
    $(target).append(html);
}

Doc.CloseDialog = function () {
    $('#modal').css("display", "none");
    $('#dialog').css("display", "none");
}

Doc.ShowDialog = function (message, type, title) {
    $('#modal').css("display", "block");
    $('#dialog').css("display", "block");
    $(window.parent).find('#modal').show();
    $(window.parent).find('#dialog').show();
    $('#dialog').find(".message").text(message);
    setTimeout(function () {
        Doc.CloseDialog();
    }, 1000 * 2);

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

Doc.ActiveDesktop = function () {
    window.open('', 'Desktop');
}

Doc.AutoCloseCtrl = function (selector) {

    var isIn = $(event.target).parents(selector).length;
    var isIn2 = $(event.target).next().find(selector).length;
    if (0 === isIn && 0 == isIn2) {
        $(selector).hide();
    }

}

Doc.CheckInput = function () {
    var ctrls = $("[data-FormName='Default'][data-inputcheck]");
    ctrls.tooltip();
    var checkResult = true;
    for (var k = 0; k < ctrls.length; k++) {
        var rules = JSON.parse($(ctrls[k]).attr("data-inputcheck").replace(/'/g, '"'));
        var val = $(ctrls[k]).val();
        if ("string" === rules.checkas && (0 == val.length || rules.limit < val.length)) {
            $(ctrls[k]).tooltip().tooltip("open");
            checkResult = false;
        }
        else if ("parentNodeSelected".toLowerCase() == rules.checkas.toLowerCase()) {
            var parentName = $("[data-propertyName='ParentName']").attr("data-propertyValue");
            var parentID = $("[data-propertyName='ParentID']").attr("data-propertyValue");
            if (true === PARAM_CHECKER.IsEmptyString(parentName)) {
                $(ctrls[k]).tooltip().tooltip("open");
                checkResult = false;
            }
        }
        else if ("treeNodeSelected".toLowerCase() == rules.checkas.toLowerCase()) {
            var propertyNameArray = rules.PropertyNameArray;
            for (var m = 0; m < propertyNameArray.length; m++) {
                var propertyName = propertyNameArray[m];
                var propertyVal = $("[data-propertyName='" + propertyName + "']").attr("data-propertyValue");
                if (true === PARAM_CHECKER.IsEmptyString(propertyVal)) {
                    $(ctrls[k]).tooltip().tooltip("open");
                    checkResult = false;
                }
            }
        }

    }

    return checkResult;
}

Doc.LoadPermissionToDetail = function (callback1) {
    var id = NET.GetQueryParam("id");
    var context = [id];
    var res1 = null;
    var isNotNew = (PARAM_CHECKER.IsNotEmptyString(id) && 24 === id.length);
    if (true === isNotNew) {
        var callback2 = function (res) {
            res1 = res;
            LOGGER.Log(res);
            if (res[1].Value === false) {
                ///只读模式
                $(".buttons").remove();
                $(".minibuttons").remove();
                $(".options").remove();
            }
        }
        NET.PostData(App.Doc.Server.Url82, callback2, context);
    }
    if (PARAM_CHECKER.IsFunction(callback1)) {
        callback1(res1);
    }
}