
App = {};
App.Doc = {};
App.Doc.Info = {};

App.Doc.Info.ID = "YBJ";
App.Doc.Info.Name = "汪俊股票分析客户端";
 

App.Doc.ServerHost = ("localhost" === window.location.hostname) ? window.location.protocol + "//" + window.location.hostname + ":9990" : "http://aifuwu.wang";
App.Doc.Server = {
    Url1: App.Doc.ServerHost + "/API.ashx?c=WangJun.HTML.HTMLItem&m=GetNew", ///加载新闻分类
    Url2: App.Doc.ServerHost + "/API.ashx?c=WangJun.HTML.HTMLItem&m=SaveData", ///加载新闻分类

};

 