﻿
App = {};
App.TouTiao = {};
App.TouTiao.Info = {};

App.TouTiao.Info.ID = "WJTT";
App.TouTiao.Info.Name = "汪俊头条";

App.TouTiao.Pager = {};
App.TouTiao.Pager.Size = 5;

App.TouTiao.ServerHost = "http://localhost:9990";
App.TouTiao.Server = {
    Url1: "http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=LoadEntityList", 
    Url2: "http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=LoadCategoryList",
    Url3: "http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=GetEntity",
    Url4: "http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=SaveComment",
    Url5: "http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=LoadCommentList",
    Url6: "http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=AddLikeCount",
    Url7: "http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=AddFavoriteCount",
    Url8: "http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=ClientRead",
    Url9: "http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=GetBehaviorByArticleID"

};
 