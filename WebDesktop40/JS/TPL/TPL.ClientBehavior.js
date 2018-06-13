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
 
    $('[data-PropertyName="ReadCount"]').text("阅读 " + data[0].Value.length);
    $('[data-PropertyName="LikeCount"]').text("点赞 " + data[1].Value.length);
    $('[data-PropertyName="FavoriteCount"]').text("收藏 " + data[2].Value.length);
    $('[ data-type="点赞"]').text(((true === data[4].Value) ? "已" : "" )+ "点赞");
    $('[ data-type="收藏"]').text(((true === data[5].Value) ? "已" : "") + "收藏");

}

