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
        $("#id").val(data.id);
        $("#name").text(data.Name);
        $("#detail").attr("src", data.FileHttpUrl);
    }
}