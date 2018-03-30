var ClientBehavior = {};

ClientBehavior.Read = function () {
    var context = [NET.GetQueryParam("id")];

    var callback = function (res) {
        LOGGER.Log(res);

    }
    NET.PostData(App.TouTiao.Server.Url8, callback, context);
}

ClientBehavior.LoadBehaviorByArticleID = function () {
    var context = [NET.GetQueryParam("id")];

    var callback = function (res) {
        LOGGER.Log(res);
        ClientBehavior.ShowBehaviorByArticleID(res);
    }
    NET.PostData(App.TouTiao.Server.Url9, callback, context);
}


ClientBehavior.ShowBehaviorByArticleID = function (data) {
    if (true === PARAM_CHECKER.IsArray(data)) {
        for (var k = 0; k < data.length; k++) {
            var item = data[k];
            $("[data-type='" + item.Behavior + "']").text("已"+item.Behavior).removeAttr("onclick");
        }
    }

}