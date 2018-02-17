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

Doc.ShowDetail = function (data) {
    var ue = UE.getEditor('editor', { initialFrameWidth: $(top.window.document).find("#content").width() - 20, initialFrameHeight: 300 });
    if (true === PARAM_CHECKER.IsObject(data)) {
        if (true === PARAM_CHECKER.IsNotEmptyString(data.Content) && "<" === data.Content[0]) {
            ue.setContent(data.Content);
            ue.setHeight(400);
        }
        else if (true === PARAM_CHECKER.IsNotEmptyString(data.Content)) {
            var html = data.Content.substring(data.Content.indexOf("&lt;"), data.Content.lastIndexOf("&gt;") + 4);
            var $div = $("<div></div>").html(html);
            data.Content = $div.text();
            ue.setContent(data.Content);
            ue.setHeight(400);
        }
        $("#Title").val(data.Title);
        $("#id").val(data.id);


        if (true === !PARAM_CHECKER.IsNotEmptyString(data.CategoryName)) {
            data.CategoryName = "选择分类";
        }
        $("#parentNode").text(data.CategoryName);
        $("#parentNode").attr("data-param", data.CategoryID);

        if (PARAM_CHECKER.IsNotEmptyString(data.Status)) {
            $("[data-single='status']").each(function () {
                $(this).removeClass("selected");
                if (data.Status === $(this).text()) {
                    $(this).addClass("selected");
                }
            });
        }

        $("#preView").attr("href", "http://localhost:39641/TouTiao/TouTiaoArticle.html?id=[id]".replace("[id]", data.id));
    }
}