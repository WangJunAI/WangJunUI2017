 
App.TouTiao = {};
App.TouTiao.Info = {};

App.TouTiao.Info.ID = "WJTT";
App.TouTiao.Info.Name = "汪俊头条";

App.TouTiao.Pager = {};
App.TouTiao.Pager.Size = 5;

App.TouTiao.ServerHost = ("localhost" === window.location.hostname) ? window.location.protocol + "//" + window.location.hostname + ":9990" : "http://aifuwu.wang";
App.TouTiao.Server = {
    Url1: App.TouTiao.ServerHost+"/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=LoadEntityList", 
    Url2: App.TouTiao.ServerHost +"/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=LoadCategoryList",
    Url3: App.TouTiao.ServerHost +"/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=GetEntity",
    Url4: App.TouTiao.ServerHost +"/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=SaveComment",
    Url5: App.TouTiao.ServerHost +"/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=LoadCommentList",
    Url6: App.TouTiao.ServerHost +"/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=AddLikeCount",
    Url7: App.TouTiao.ServerHost +"/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=AddFavoriteCount",
    Url8: App.TouTiao.ServerHost +"/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=ClientRead",
    Url9: App.TouTiao.ServerHost +"/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=GetBehaviorByArticleID"

};
 