var App = {};
App.Doc = {};

App.Doc.Info = {};
App.Doc.Info.ID = "WDGL";
App.Doc.Info.Name = "汪俊文档管理";

App.Doc.Server = {
    Url1: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Find&p=0",
    Url2: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Count&p=0",
    Url3: "Detail.html",
    Url4: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Save&p=0",
    Url5: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Get&p=0",
    Url6: "Category.html",
    Url7: "http://localhost:9990/API.ashx?c=WangJun.Doc.CategoryManager&m=Save&p=0",
    Url8: "http://localhost:9990/API.ashx?c=WangJun.Doc.CategoryManager&m=Find&p=0"
};


App.Doc.LeftMenu = [];

App.Doc.LeftMenu.push({ Name: "文档操作", ID: "ptcd", Method: "", Position: "", ParentID: null });
App.Doc.LeftMenu.push({ Name: "新建文章", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url3, Position: "", ParentID: "ptcd" });
App.Doc.LeftMenu.push({ Name: "新建目录", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url6, ParentID: "ptcd" });
App.Doc.LeftMenu.push({ Name: "草稿箱", ID: "", Method: "", Position: "", ParentID: "ptcd" });
App.Doc.LeftMenu.push({ Name: "已发布", ID: "", Method: "", Position: "", ParentID: "ptcd" });
App.Doc.LeftMenu.push({ Name: "数据分析", ID: "glcd", Method: "", Position: "", ParentID: null });
App.Doc.LeftMenu.push({ Name: "热词", ID: "", Method: "", Position: "", ParentID: "glcd" });
App.Doc.LeftMenu.push({ Name: "统计", ID: "", Method: "", Position: "", ParentID: "glcd" });
App.Doc.LeftMenu.push({ Name: "评论", ID: "", Method: "", Position: "", ParentID: "glcd" });
App.Doc.LeftMenu.push({ Name: "用户", ID: "", Method: "", Position: "", ParentID: "glcd" });
App.Doc.LeftMenu.push({ Name: "系统管理", ID: "glcd", Method: "", Position: "", ParentID: null });
App.Doc.LeftMenu.push({ Name: "回收站", ID: "", Method: "", Position: "", ParentID: "glcd" });
App.Doc.LeftMenu.push({ Name: "存储管理", ID: "", Method: "", Position: "", ParentID: "glcd" });
App.Doc.LeftMenu.push({ Name: "应用信息", ID: "", Method: "", Position: "", ParentID: "glcd" });

App.Doc.Content = {};
App.Doc.Content.TopButton = [];
App.Doc.Content.TopButton.push({ Name: "文档中心", ID: "ptcd", Method: "", Position: "", ParentID: null });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd" });
App.Doc.Content.TopButton.push({ Name: "新建文章", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url3, Position: "", ParentID: "ptcd" });
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url6, Position: "", ParentID: "ptcd" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd" });
App.Doc.Content.TopButton.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "glcd" });
App.Doc.Content.TopButton.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "glcd" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "glcd" });
App.Doc.Content.TopButton.push({ Name: "刷新", ID: "", Method: "", Position: "", ParentID: "glcd" });