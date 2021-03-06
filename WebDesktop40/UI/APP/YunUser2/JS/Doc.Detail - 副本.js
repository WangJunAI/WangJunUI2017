﻿
///加载数据
Doc.LoadDetail = function () {
    $(document).ready(function () {
        $("[data-single]").on("click", function () {
            var val = $(this).attr("data-single");
            var isShow = $(this).attr("data-show");
            $(this).parentsUntil(".item").find("[data-single='" + val + "']").removeClass("selected");
            $(this).addClass("selected");
            $(this).parentsUntil("li").last().find("[data-propertyvalue]").attr("data-propertyvalue", $(this).text());

            if ("show" === isShow) {
                $('[data-ClientGroupID="' + val + '"]').show();
            }
            else if ("hide" === isShow) {
                $('[data-ClientGroupID="' + val + '"]').hide();
            }
        });

        if (PARAM_CHECKER.IsNotEmptyString(NET.GetQueryParam("ID"))) {

            var id = NET.GetQueryParam("id");
            var context = [id];

            var callback = function (res) {
                LOGGER.Log(res);
                Doc.ShowDetail(res);
            }
            NET.LoadData(App.Doc.Server.Url5, callback, context, NET.POST);






        }
    });
}

Doc.ShowDetail = function (data, option) {
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