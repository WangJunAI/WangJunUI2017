Doc.LoadDetail = function () {

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
    var context = [id];

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.ShowDetail(res);
    }
    NET.LoadData(App.Doc.Server.Url5, callback, context, NET.POST);
}

Doc.ShowDetail = function (data, option){
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
        $("#Title").val(data.Title);
        $("#id").val(data.id);

 
         

        $("#preView").attr("href", "http://localhost:39641/TouTiao/TouTiaoArticle.html?id=[id]".replace("[id]", data.id));
    }
}