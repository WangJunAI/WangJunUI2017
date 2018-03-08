
App = {};
App.TouTiao = {};
App.TouTiao.Info = {};

App.TouTiao.Info.ID = "WJTT";
App.TouTiao.Info.Name = "汪俊头条";

App.TouTiao.Pager = {};
App.TouTiao.Pager.Size = 5;

App.TouTiao.Server = {
    Url1: "http://localhost:9990//API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=LoadEntityList", 
    Url2: "http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=LoadCategoryList",
    Url3: "http://localhost:9990/API.ashx?c=WangJun.YunNews.YunNewsWebAPI&m=GetEntity",
    Url4: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocWebAPI&m=AddComment",
    Url5:"http://localhost:9990/API.ashx?c=WangJun.Doc.DocWebAPI&m=LoadCommentList"
};
 