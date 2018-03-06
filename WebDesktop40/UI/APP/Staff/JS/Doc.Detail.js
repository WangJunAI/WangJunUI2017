
///加载数据
Doc.LoadDetail = function () {

    if (PARAM_CHECKER.IsNotEmptyString(NET.GetQueryParam("ID"))) {


        $(document).ready(function () {

            $("[data-single]").on("click", function () {
                var val = $(this).attr("data-single");
                $("[data-single='" + val + "']").removeClass("selected");
                $(this).addClass("selected");
                $("[data-propertyName='" + val + "'").attr("data-propertyValue", $(this).text());
            });

            var id = NET.GetQueryParam("id");
            var context = [id];

            var callback = function (res) {
                LOGGER.Log(res);
                Doc.ShowDetail(res);
            }
            NET.LoadData(App.Doc.Server.Url5, callback, context, NET.POST);
        });
    }
}

Doc.ShowDetail = function (data) {
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
        $("#parentNode").text(data.ParentName);
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

   

        $("#preView").attr("href", "http://localhost:39641/TouTiao/TouTiaoArticle.html?id=[id]".replace("[id]", data.id));
    }
}