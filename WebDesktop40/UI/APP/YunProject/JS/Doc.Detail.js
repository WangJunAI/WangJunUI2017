Doc.LoadDetail = function () {
    $(document).ready(function () {

        $("[data-single]").on("click", function () {
            var val = $(this).attr("data-single");
            $("[data-single='" + val + "']").removeClass("selected");
            $(this).addClass("selected");
            $("[data-propertyName='" + val + "'").attr("data-propertyValue", $(this).text());
        });


        var id = NET.GetQueryParam("id");
        if (true === PARAM_CHECKER.IsNotEmptyObjectId(id)) {

            var context = [id];

            var callback = function (res) {
                LOGGER.Log(res);
                if (null === res._RedirectID) {
                    Doc.ShowDetail(res);
                    Milestone.LoadData(res.Milestone);

                }
                else {

                    NET.LoadData(App.Doc.Server.Url5, function (res) { Doc.ShowDetail(res, { ReadOnly: true }); }, [res._RedirectID], NET.POST);
                }
            }
            NET.LoadData(App.Doc.Server.Url5, callback, context, NET.POST);
        }
    });
}

Doc.ShowDetail = function (data,option) {
    if (true === PARAM_CHECKER.IsObject(data)) {
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

        if (true === PARAM_CHECKER.IsObject(option) && true === option.ReadOnly) {
            $("#editor").html(UE.getEditor('editor').getContent(data.Content));
            $("#editor").css("height", "auto");
            $("#editor img").parent().css("text-align", "center");
            $(".options").remove();
            $(".buttons").remove();
        }

        var $ctrls = $("[data-FormName='Default']").each(function () {
            var propertyName = $(this).attr("data-propertyName");
            if (PARAM_CHECKER.IsNotEmptyString(propertyName)) {
                var propertyValue = data[propertyName];
                $(this).attr("data-propertyValue", propertyValue);
                $(this).val(propertyValue);
            }
        });

        if (true === !PARAM_CHECKER.IsNotEmptyString(data.ParentName)) {
            data.ParentName = "选择分类";
        } 
        $("#deleteBtn").removeAttr("style");

        $("[data-single]").each(function () {
            var propertyName = $(this).attr("data-single");
            var text = $(this).text();
            var propertyValue = data[propertyName];
            if (text === propertyValue) {
                $("[data-single='" + propertyName + "']").removeClass("selected");

                $(this).addClass("selected");
            }
        });

        $("[data-propertyname='ParentName']").text(data.ParentName);
        $("[data-propertyname='UserAllowedArrayText']").text(data.UserAllowedArrayText);
        Doc.SetCheckedTreeNodes($("#category3").find(".ztree").attr("id"), data.UserAllowedArray);


   

        $("#preView").attr("href", "http://localhost:39641/TouTiao/TouTiaoArticle.html?id=[id]".replace("[id]", data.id));
    }
}