var ClientBehavior = {};

ClientBehavior.Read = function () {
    var context = [NET.GetQueryParam("id")];

    var callback = function (res) {
        LOGGER.Log(res);

    }
    NET.PostData(App.TouTiao.Server.Url8, callback, context);
}

ClientBehavior.GetBehaviorByArticleID = function () {
    var context = [NET.GetQueryParam("id")];

    var callback = function (res) {
        LOGGER.Log(res);

    }
    NET.PostData(App.TouTiao.Server.Url9, callback, context);
}
