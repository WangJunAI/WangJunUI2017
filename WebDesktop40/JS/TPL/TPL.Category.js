Doc.LoadCategoryDetail = function () {


    $("[data-single]").on("click", function () {
        var val = $(this).attr("data-single");
        var isShow = $(this).attr("data-show");
        $("[data-single='" + val + "']").removeClass("selected");
        $(this).addClass("selected");
        if ("show" === isShow) {
            $('[data-ClientGroupID="' + val + '"]').show();
        }
        else if ("hide" === isShow) {
            $('[data-ClientGroupID="' + val + '"]').hide();
        }
    });

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
        var $ctrls = $("[data-FormName='Default']").each(function () {
            var propertyName = $(this).attr("data-propertyName");
            if (PARAM_CHECKER.IsNotEmptyString(propertyName)) {
                var propertyValue = data[propertyName];
                $(this).attr("data-propertyValue", propertyValue);

                if (true === $(this).is("input")) {
                    $(this).val(propertyValue);
                }
                else if (true === $(this).is("a")) {
                    propertyValue = (true === PARAM_CHECKER.IsValid(propertyValue) || true === PARAM_CHECKER.IsEmptyString(propertyValue)) ? propertyValue : "请选择";
                    $(this).text(propertyValue);
                }
            }
        });

        $("#deleteBtn").removeAttr("style");

        var isRoot =(true ===  PARAM_CHECKER.IsEmptyObjectId(data.ParentID));
        if (true === isRoot) {
            $(".options").hide();
            $("#deleteBtn").hide();
        }
    }
}
