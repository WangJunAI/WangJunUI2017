﻿
App = {};
App.Doc = {};
App.Doc.Info = {};

App.Doc.Info.ID = "YBJ";
App.Doc.Info.Name = "汪俊云项目管理端";

App.Doc.CSS = {};
App.Doc.CSS.LeftMenu = {};
App.Doc.CSS.LeftMenu.Width = { Value: 10, Unit: "em" };

App.Doc.CSS.LeftList = {};
App.Doc.CSS.LeftList.View1 = {};
App.Doc.CSS.LeftList.View1.Width = { Value: 30, Unit: "em" };

App.Doc.CSS.LeftList.View3 = {};
App.Doc.CSS.LeftList.View3.Width = { Value: 18, Unit: "em" };

App.Doc.ServerHost = ("localhost" === window.location.hostname) ? window.location.protocol + "//" + window.location.hostname + ":9990" : "http://aifuwu.wang";
App.Doc.Server = {
    Url1: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=LoadEntityList", ///加载文档目录
    Url2: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=Count",///文档数量
    Url3: "Detail.html",
    Url4: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=SaveEntity",///保存一个文档
    Url5: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=GetEntity",///获取一个文档
    Url6: "Category.html",
    Url7: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=SaveCategory",///保存一个目录
    Url8: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=LoadCategoryList",///加载目录列表
    Url9: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=RemoveEntity",///移除一份文档,暂未使用
    Url10: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=RemoveCategory",///移除一个目录
    Url11: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=GetCategory", ///获取一个目录
    Url12: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.DocManager&m=UpdateStatus&p=0",///暂未使用
    Url13: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=MoveToRecycleBin", ///移除到回收站
    Url14: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=LoadRecycleBinEntityList",///加载回收站
    Url15: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.DataAnalysor&m=GetHotWords",///暂未使用
    Url16: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=Aggregate",///聚合查询
    Url17: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.ClientBehaviorManager&m=Aggregate",
    Url18: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.DocWebAPI&m=RecycleBinCount",///回收站数量
    Url19: App.Doc.ServerHost + "/API.ashx?c=WangJun.App.YunUserAPI&m=LoadAll",///回收站数量
    Url20: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=GetTaskGroup",///回收站数量
    Url90: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=EmptyRecycleBin",///加载回收站
    Url70: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=SaveComment",
    Url71: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=LoadCommentList",
    Url81: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=LoadShareArticleList",///加载回收站
    Url90: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=EmptyRecycleBin",///加载回收站
    Url91: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunProject.YunProjectWebAPI&m=DeleteEntity",///加载回收站
    Url50: "Chart1.html",
    Url51: "Chart2.html",
};


App.Doc.LeftMenu = [];

App.Doc.LeftMenu.push({ Name: "公司项目", ID: "LeftMenu.公司项目", Method: "Doc.LeftMenuGroupToggle", ParentID: null });
//App.Doc.LeftMenu.push({ Name: "新建项目", ID: "LeftMenu.新建项目", Method: "Doc.LeftMenuClick",    ParentID: "LeftMenu.公司项目" });
//App.Doc.LeftMenu.push({ Name: "新建目录", ID: "LeftMenu.新建目录", Method: "Doc.LeftMenuClick",  ParentID: "LeftMenu.公司项目" });
App.Doc.LeftMenu.push({ Name: "发起的项目", ID: "LeftMenu.发起的项目", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司项目", TopButtonGroupID: "左侧菜单.发起的项目.TopButton" });
App.Doc.LeftMenu.push({ Name: "参与的项目", ID: "LeftMenu.参与的项目", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司项目", TopButtonGroupID: "左侧菜单.参与的项目.TopButton" });
App.Doc.LeftMenu.push({ Name: "运行中项目", ID: "LeftMenu.运行中项目", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司项目", TopButtonGroupID: "左侧菜单.运行中项目.TopButton" });
App.Doc.LeftMenu.push({ Name: "已超时项目", ID: "LeftMenu.已超时项目", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司项目", TopButtonGroupID: "左侧菜单.已超时项目.TopButton" });
App.Doc.LeftMenu.push({ Name: "已结束项目", ID: "LeftMenu.已结束项目", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司项目", TopButtonGroupID: "左侧菜单.已结束项目.TopButton" });



App.Doc.LeftMenu.push({ Name: "数据分析", ID: "LeftMenu.数据分析", Method: "Doc.LeftMenuGroupToggle", ParentID: null });
App.Doc.LeftMenu.push({ Name: "项目分析", ID: "LeftMenu.项目分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.项目分析.TopButton" });
App.Doc.LeftMenu.push({ Name: "用户分析", ID: "LeftMenu.用户分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.用户分析.TopButton" });

///系统管理
App.Doc.LeftMenu.push({ Name: "系统管理", ID: "LeftMenu.系统管理", Method: "Doc.LeftMenuGroupToggle", ParentID: null });
App.Doc.LeftMenu.push({ Name: "回收站", ID: "LeftMenu.回收站", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.回收站.TopButton" });
App.Doc.LeftMenu.push({ Name: "使用帮助", ID: "LeftMenu.使用帮助", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.使用帮助.TopButton" });

App.Doc.Content = {};
App.Doc.Content.TopButton = [];

///发起的项目TopButton菜单
App.Doc.Content.TopButton.push({ Name: "发起的项目", ID: "TopButton.发起的项目", Method: "", Type: "Title", GroupID: "左侧菜单.发起的项目.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.发起的项目.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建项目", ID: "TopButton.新建项目", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.发起的项目.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "TopButton.新建目录", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.发起的项目.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.发起的项目.TopButton" });
//App.Doc.Content.TopButton.push({ Name: "移动至", ID: "TopButton.移动至", Method: "",  Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.发起的项目.TopButton"});
//App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.发起的项目.TopButton"});

///参与的项目TopButton菜单
App.Doc.Content.TopButton.push({ Name: "参与的项目", ID: "TopButton.参与的项目", Method: "", Type: "Title", GroupID: "左侧菜单.参与的项目.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.参与的项目.TopButton" });
//App.Doc.Content.TopButton.push({ Name: "新建项目", ID: "TopButton.新建项目", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.参与的项目.TopButton" });
//App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "TopButton.新建目录", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.参与的项目.TopButton" });
//App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.参与的项目.TopButton" });
//App.Doc.Content.TopButton.push({ Name: "移动至", ID: "TopButton.移动至", Method: "", Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.参与的项目.TopButton" });
//App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.参与的项目.TopButton" });

///运行中项目TopButton菜单
App.Doc.Content.TopButton.push({ Name: "运行中项目", ID: "TopButton.运行中项目", Method: "", Type: "Title", GroupID: "左侧菜单.运行中项目.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.运行中项目.TopButton" });

///已超时项目TopButton菜单
App.Doc.Content.TopButton.push({ Name: "已超时项目", ID: "TopButton.已超时项目", Method: "", Type: "Title", GroupID: "左侧菜单.已超时项目.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.已超时项目.TopButton" });


///已结束项目TopButton菜单
App.Doc.Content.TopButton.push({ Name: "已结束项目", ID: "TopButton.已结束项目", Method: "", Type: "Title", GroupID: "左侧菜单.已结束项目.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.已结束项目.TopButton" });


///文档分析菜单
App.Doc.Content.TopButton.push({ Name: "文档分析", ID: "TopButton.文档分析", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.文档分析.TopButton", Type: "Title" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.文档分析.TopButton" });

///评论分析菜单
App.Doc.Content.TopButton.push({ Name: "评论分析", ID: "TopButton.评论分析", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.评论分析.TopButton", Type: "Title" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.评论分析.TopButton" });

///用户参与菜单
App.Doc.Content.TopButton.push({ Name: "用户参与", ID: "TopButton.用户参与", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.用户参与.TopButton", Type: "Title" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.用户参与.TopButton" });

///外网关联菜单
App.Doc.Content.TopButton.push({ Name: "外网关联", ID: "TopButton.外网关联", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.外网关联.TopButton", Type: "Title" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.外网关联.TopButton" });


///回收站TopButton菜单
App.Doc.Content.TopButton.push({ Name: "回收站", ID: "TopButton.回收站", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.回收站.TopButton", Type: "Title" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.回收站.TopButton" });
App.Doc.Content.TopButton.push({ Name: "彻底删除", ID: "TopButton.彻底删除", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.回收站.TopButton", Type: "Button" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.回收站.TopButton" });
App.Doc.Content.TopButton.push({ Name: "清空回收站", ID: "TopButton.清空回收站", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.回收站.TopButton", Type: "Button" });

///存储管理菜单
//App.Doc.Content.TopButton.push({ Name: "存储管理", ID: "TopButton.存储管理", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.存储管理.TopButton", Type: "Title" });
//App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.存储管理.TopButton" });

///使用帮助菜单
App.Doc.Content.TopButton.push({ Name: "使用帮助", ID: "TopButton.使用帮助", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.使用帮助.TopButton", Type: "Title" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.使用帮助.TopButton" });
 


App.Doc.Data = {};

App.Doc.Data.Pager = {};

App.Doc.Data.Pager.Size = 10;

App.Doc.Data.DocTable = {};
App.Doc.Data.DocTable.Info = {
    Column: [],
    Pager: {
        Url: App.Doc.Server.Url2, PagerIndexClick: function () { }
    },
    Data: { Url: App.Doc.Server.Url1 }
}
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "全选", Method: "", Sort: "", PropertyName: "Type", DataType: "checkbox" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "标题", Method: "Doc.TableRowClick", Sort: "", PropertyName: "Title", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "分类", Method: "", Sort: "", PropertyName: "CategoryName", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "阅读量", Method: "", Sort: "", PropertyName: "ReadCount", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "点赞量", Method: "", Sort: "", PropertyName: "LikeCount", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "评论量", Method: "", Sort: "", PropertyName: "CommentCount", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "发布时间", Method: "", Sort: "", PropertyName: "PublishTime", DataType: "date" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "创建时间", Method: "", Sort: "", PropertyName: "CreateTime", DataType: "date" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "状态", Method: "", Sort: "", PropertyName: "Status", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "详细", Method: "", Sort: "", PropertyName: "Type", DataType: "link", Value: "详细" });

App.Doc.Data.DocTable.Info.Pager.PagerIndexClick = function () {
    LOGGER.Log("App.Doc.Data.DocTable.Info.Pager.PagerIndexClick");
    var index = $(event.target).attr("data-Index");

    Doc.LoadTable(parseInt(index), App.Doc.Data.Pager.Size, "{}", App.Doc.Data.DocTable.Info);
}

App.Doc.Data.RecycleBin = {};
App.Doc.Data.RecycleBin.Info = {
    Column: [],
    Pager: {
        Url: App.Doc.Server.Url2, PagerIndexClick: function () { }
    },
    Data: { Url: App.Doc.Server.Url14 }
}
App.Doc.Data.RecycleBin.Info.Column.push({ ID: "", Text: "全选", Method: "", Sort: "", PropertyName: "Type", DataType: "checkbox" });
App.Doc.Data.RecycleBin.Info.Column.push({ ID: "", Text: "标题", Method: "Doc.TableRowClick", Sort: "", PropertyName: "Title", DataType: "string" });
App.Doc.Data.RecycleBin.Info.Column.push({ ID: "", Text: "类别", Method: "", Sort: "", PropertyName: "ParentName", DataType: "string" });
App.Doc.Data.RecycleBin.Info.Column.push({ ID: "", Text: "删除时间", Method: "", Sort: "", PropertyName: "DeleteTime", DataType: "date" });
//App.Doc.Data.RecycleBin.Info.Column.push({ ID: "", Text: "详细", Method: "Doc.TableRowClick", Sort: "", PropertyName: "Type", DataType: "link", Value: "详细" });
App.Doc.Data.RecycleBin.Info.Pager.PagerIndexClick = function () {
    LOGGER.Log("App.Doc.Data.RecycleBin.Info.Pager.PagerIndexClick");
    var index = $(event.target).attr("data-Index");
    var query = [{ _RedirectID: null, OwnerID: SESSION.Current().UserID, 'StatusCode': { $eq: -1 } }, { Content: 0, PlainText: 0, Summary: 0 }, { CreateTime: -1 }];
    Doc.LoadTable(parseInt(index), App.Doc.Data.Pager.Size, query, App.Doc.Data.RecycleBin.Info);
}
