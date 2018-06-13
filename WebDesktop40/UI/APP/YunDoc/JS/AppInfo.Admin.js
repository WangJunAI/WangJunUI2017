
App = {};
App.Doc = {};
App.Doc.Info = {};

App.Doc.Info.ID = "YBJ";
App.Doc.Info.Name = "汪俊企业知识库管理端";

App.Doc.CSS = {};
App.Doc.CSS.LeftMenu = {};
App.Doc.CSS.LeftMenu.Width = { Value: 10, Unit: "em" };

App.Doc.CSS.LeftList = {};
App.Doc.CSS.LeftList.View1 = {};
App.Doc.CSS.LeftList.View1.Width = { Value: 30, Unit: "em" };

App.Doc.CSS.LeftList.View3 = {};
App.Doc.CSS.LeftList.View3.Width = { Value: 12, Unit: "em" };

App.Doc.ServerHost = YunConfig.ServerHost(this);

App.Doc.Server = {
    Url1: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=LoadEntityList", ///加载文档目录
    Url2: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=Count",///文档数量
    Url3: "Detail.html",
    Url31: "Detail.Admin.html",
    Url4: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=SaveEntity",///保存一个文档
    Url5: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=GetEntity",///获取一个文档
    Url6: "Category.html",
    Url61: "Category.Admin.html",
    Url7: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=SaveCategory",///保存一个目录
    Url8: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=LoadCategoryList",///加载目录列表
    Url9: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=RemoveEntity",///移除一份文档,暂未使用
    Url10: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=RemoveCategory",///移除一个目录
    Url11: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=GetCategory", ///获取一个目录
    Url12: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.DocManager&m=UpdateStatus&p=0",///暂未使用
    Url13: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=MoveToRecycleBin", ///移除到回收站
    Url14: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=LoadRecycleBinEntityList",///加载回收站
    Url15: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.DataAnalysor&m=GetHotWords",///暂未使用
    Url16: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=Aggregate",///聚合查询
    Url17: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.ClientBehaviorManager&m=Aggregate",
    Url18: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.DocWebAPI&m=RecycleBinCount",///回收站数量
    Url19: App.Doc.ServerHost + "/API.ashx?c=WangJun.App.YunUserAPI&m=LoadAll",///回收站数量
    Url90: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=EmptyRecycleBin",///加载回收站
    Url91: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=DeleteEntity",///加载回收站
    Url81: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=LoadShareArticleList",///加载回收站
    Url82: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=GetPermissionByArticleID",///加载回收站

};


App.Doc.LeftMenu = [];

App.Doc.LeftMenu.push({ Name: "公司知识库", ID: "LeftMenu.公司知识库", Method: "Doc.LeftMenuGroupToggle", ParentID: null });
//App.Doc.LeftMenu.push({ Name: "新建企业文档", ID: "LeftMenu.新建文档", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司知识库" });
//App.Doc.LeftMenu.push({ Name: "新建企业目录", ID: "LeftMenu.新建目录", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司知识库" });
App.Doc.LeftMenu.push({ Name: "个人文档", ID: "LeftMenu.个人文档", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司知识库", TopButtonGroupID: "左侧菜单.个人文档.TopButton" });
App.Doc.LeftMenu.push({ Name: "与我共享", ID: "LeftMenu.与我共享", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司知识库", TopButtonGroupID: "左侧菜单.与我共享.TopButton" });
App.Doc.LeftMenu.push({ Name: "企业知识库", ID: "LeftMenu.企业知识库", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司知识库", TopButtonGroupID: "左侧菜单.企业文档.TopButton" });
App.Doc.LeftMenu.push({ Name: "员工知识库", ID: "LeftMenu.员工知识库", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司知识库", TopButtonGroupID: "左侧菜单.员工知识库.TopButton" });



App.Doc.LeftMenu.push({ Name: "数据分析", ID: "LeftMenu.数据分析", Method: "Doc.LeftMenuGroupToggle", ParentID: null });
App.Doc.LeftMenu.push({ Name: "文档分析", ID: "LeftMenu.文档分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.文档分析.TopButton" });
App.Doc.LeftMenu.push({ Name: "共享分析", ID: "LeftMenu.评论分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.评论分析.TopButton" });
App.Doc.LeftMenu.push({ Name: "用户参与", ID: "LeftMenu.用户参与", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.用户参与.TopButton" });
App.Doc.LeftMenu.push({ Name: "外网关联", ID: "LeftMenu.外网关联", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.外网关联.TopButton" });

///系统管理
App.Doc.LeftMenu.push({ Name: "系统管理", ID: "LeftMenu.系统管理", Method: "Doc.LeftMenuGroupToggle", ParentID: null });
App.Doc.LeftMenu.push({ Name: "回收站", ID: "LeftMenu.回收站", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.回收站.TopButton" });
App.Doc.LeftMenu.push({ Name: "存储管理", ID: "LeftMenu.存储管理", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.存储管理.TopButton" });
App.Doc.LeftMenu.push({ Name: "使用帮助", ID: "LeftMenu.使用帮助", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.使用帮助.TopButton" });

App.Doc.Content = {};
App.Doc.Content.TopButton = [];

///个人文档TopButton菜单
App.Doc.Content.TopButton.push({ Name: "个人文档", ID: "TopButton.个人文档", Method: "", Type: "Title", GroupID: "左侧菜单.个人文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.个人文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建文档", ID: "TopButton.新建个人文档", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.个人文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "TopButton.新建个人目录", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.个人文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.个人文档.TopButton" });
//App.Doc.Content.TopButton.push({ Name: "移动至", ID: "TopButton.移动至", Method: "",  Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.个人文档.TopButton"});
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "TopButton.个人文档移动至", Method: "", Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.个人文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "共享给", ID: "TopButton.共享给", Method: "", Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.个人文档.TopButton" });

App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.个人文档.TopButton" });

///与我共享TopButton菜单
App.Doc.Content.TopButton.push({ Name: "与我共享", ID: "TopButton.与我共享", Method: "", Type: "Title", GroupID: "左侧菜单.与我共享.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.与我共享.TopButton" });


///企业文档TopButton菜单
App.Doc.Content.TopButton.push({ Name: "企业文档", ID: "TopButton.企业文档", Method: "", Type: "Title", GroupID: "左侧菜单.企业文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.企业文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建文档", ID: "TopButton.新建企业文档", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.企业文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "TopButton.新建企业目录", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.企业文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.企业文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "TopButton.企业知识库移动至", Method: "", Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.企业文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.企业文档.TopButton" });

///企业文档TopButton菜单
App.Doc.Content.TopButton.push({ Name: "员工知识库", ID: "TopButton.员工知识库", Method: "", Type: "Title", GroupID: "左侧菜单.员工知识库.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.员工知识库.TopButton" });


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
App.Doc.Content.TopButton.push({ Name: "存储管理", ID: "TopButton.存储管理", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.存储管理.TopButton", Type: "Title" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.存储管理.TopButton" });

///使用帮助菜单
App.Doc.Content.TopButton.push({ Name: "使用帮助", ID: "TopButton.使用帮助", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.使用帮助.TopButton", Type: "Title" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.使用帮助.TopButton" });

///云文档测试菜单
App.Doc.Content.TopButton.push({ Name: "云文档测试", ID: "TopButton.云文档测试", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.云文档测试.TopButton", Type: "Title" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.云文档测试.TopButton" });


App.Doc.Data = {};

App.Doc.Data.Pager = {};

App.Doc.Data.Pager.Size = 10;

App.Doc.Data.DocTable = {};
App.Doc.Data.DocTable.Info = {
    Column: [],
    Pager: {
        Url: App.Doc.Server.Url2, PagerIndexClick: function () { }
    },
    Data: { Url: App.Doc.Server.Url1 },
    RowClickDetailUrl: "Detail.html?"
}
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "全选", Method: "", Sort: "", PropertyName: "Type", DataType: "checkbox" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "标题", Method: "Doc.TableRowClick", Sort: "", PropertyName: "Title", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "目录", Method: "", Sort: "", PropertyName: "ParentName", DataType: "string" });
//App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "阅读量", Method: "", Sort: "", PropertyName: "ReadCount", DataType: "string"});
//App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "点赞量", Method: "", Sort: "", PropertyName: "LikeCount", DataType: "string" });
//App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "评论量", Method: "", Sort: "", PropertyName: "CommentCount", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "创建时间", Method: "", Sort: "", PropertyName: "CreateTime", DataType: "date" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "详细", Method: "", Sort: "", PropertyName: "Type", DataType: "link", Value: "详细" });

App.Doc.Data.DocTable.Info.Pager.PagerIndexClick = function () {
    LOGGER.Log("App.Doc.Data.DocTable.Info.Pager.PagerIndexClick");
    var index = $(event.target).attr("data-Index");
    var query = Doc.GetQuery();
    Doc.LoadTable(parseInt(index), App.Doc.Data.Pager.Size, query, App.Doc.Data.DocTable.Info);
}

App.Doc.Data.ShareTable = {};
App.Doc.Data.ShareTable.Info = {
    Column: [],
    Pager: {
        Url: App.Doc.Server.Url2, PagerIndexClick: function () { }
    },
    Data: { Url: App.Doc.Server.Url81 },
    RowClickDetailUrl: "Detail.html?"
}
App.Doc.Data.ShareTable.Info.Column.push({ ID: "", Text: "全选", Method: "", Sort: "", PropertyName: "Type", DataType: "checkbox" });
App.Doc.Data.ShareTable.Info.Column.push({ ID: "", Text: "标题", Method: "Doc.TableRowClick", Sort: "", PropertyName: "Title", DataType: "string" });
App.Doc.Data.ShareTable.Info.Column.push({ ID: "", Text: "目录", Method: "", Sort: "", PropertyName: "ParentName", DataType: "string" }); 
App.Doc.Data.ShareTable.Info.Column.push({ ID: "", Text: "创建时间", Method: "", Sort: "", PropertyName: "CreateTime", DataType: "date" });
App.Doc.Data.ShareTable.Info.Column.push({ ID: "", Text: "详细", Method: "", Sort: "", PropertyName: "Type", DataType: "link", Value: "详细" });

App.Doc.Data.ShareTable.Info.Pager.PagerIndexClick = function () {
    LOGGER.Log("App.Doc.Data.ShareTable.Info.Pager.PagerIndexClick");
    var index = $(event.target).attr("data-Index");
    var query = Doc.GetQuery();
    Doc.LoadTable(parseInt(index), App.Doc.Data.Pager.Size, query, App.Doc.Data.ShareTable.Info);
}


App.Doc.Data.RecycleBin = {};
App.Doc.Data.RecycleBin.Info = {
    Column: [],
    Pager: {
        Url: App.Doc.Server.Url18, PagerIndexClick: function () { }
    },
    Data: { Url: App.Doc.Server.Url14 }
}
App.Doc.Data.RecycleBin.Info.Column.push({ ID: "", Text: "全选", Method: "", Sort: "", PropertyName: "Type", DataType: "checkbox" });
App.Doc.Data.RecycleBin.Info.Column.push({ ID: "", Text: "标题", Method: "Doc.TableRowClick", Sort: "", PropertyName: "Title", DataType: "string" });
App.Doc.Data.RecycleBin.Info.Column.push({ ID: "", Text: "类别", Method: "", Sort: "", PropertyName: "Type", DataType: "string" });
App.Doc.Data.RecycleBin.Info.Column.push({ ID: "", Text: "删除时间", Method: "", Sort: "", PropertyName: "DeleteTime", DataType: "date" });
App.Doc.Data.RecycleBin.Info.Column.push({ ID: "", Text: "详细", Method: "Doc.TableRowClick", Sort: "", PropertyName: "Type", DataType: "link", Value: "详细" });
App.Doc.Data.RecycleBin.Info.Pager.PagerIndexClick = function () {
    LOGGER.Log("App.Doc.Data.RecycleBin.Info.Pager.PagerIndexClick");
    var index = $(event.target).attr("data-Index");
    Doc.LoadTable(parseInt(index), App.Doc.Data.Pager.Size, "{}", App.Doc.Data.RecycleBin.Info);
}

/////查询条件/////
App.Doc.QueryDict = {
    "默认公司通讯录": [JSON.stringify({ OwnerID: SESSION.Current().CompanyID }), "{}", "{}", 0, 1000],
    "默认个人知识库目录查询条件": [JSON.stringify({ OwnerID: SESSION.Current().UserID }), "{}", "{}", 0, 1000],
    "默认企业知识库目录查询条件": [JSON.stringify({ OwnerID: SESSION.Current().CompanyID }), "{}", "{}", 0, 1000],
}