
App = {};
App.Doc = {};
App.Doc.Info = {};

App.Doc.Info.ID = "YBJ";
App.Doc.Info.Name = "汪俊云群组客户端";

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
    Url1: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=LoadEntityList", ///加载文档目录
    Url2: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=Count",///文档数量
    Url3: "Detail.html",
    Url4: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=SaveEntity",///保存一个文档
    Url5: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=GetEntity",///获取一个文档
    Url6: "Category.html",
    Url7: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=SaveCategory",///保存一个目录
    Url8: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=LoadCategoryList",///加载目录列表
    Url9: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=RemoveEntity",///移除一份文档,暂未使用
    Url10: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=RemoveCategory",///移除一个目录
    Url11: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=GetCategory", ///获取一个目录
    Url12: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.DocManager&m=UpdateStatus&p=0",///暂未使用
    Url13: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=MoveToRecycleBin", ///移除到回收站
    Url14: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=LoadRecycleBinEntityList",///加载回收站
    Url15: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.DataAnalysor&m=GetHotWords",///暂未使用
    Url16: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.DocWebAPI&m=Aggregate",///聚合查询
    Url17: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.ClientBehaviorManager&m=Aggregate",
    Url18: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.DocWebAPI&m=RecycleBinCount",///回收站数量
    Url19: App.Doc.ServerHost + "/API.ashx?c=WangJun.App.YunUserAPI&m=LoadAll",///回收站数量
    Url90: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=EmptyRecycleBin",///加载回收站
    Url70: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=SaveComment",
    Url71: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=LoadCommentList",
    Url81: App.Doc.ServerHost + "/API.ashx?c=WangJun.YunQun.YunQunWebAPI&m=LoadShareArticleList",///加载回收站
    Url50: "Chart1.html",
    Url51: "Chart2.html",
};


App.Doc.LeftMenu = [];

App.Doc.LeftMenu.push({ Name: "公司群组", ID: "LeftMenu.公司群组", Method: "Doc.LeftMenuGroupToggle",    ParentID: null });
App.Doc.LeftMenu.push({ Name: "新建群组", ID: "LeftMenu.新建群组", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司群组" });
App.Doc.LeftMenu.push({ Name: "创建的群组", ID: "LeftMenu.创建的群组", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司群组", TopButtonGroupID: "左侧菜单.创建的群组.TopButton" });
App.Doc.LeftMenu.push({ Name: "参与的群组", ID: "LeftMenu.参与的群组", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司群组", TopButtonGroupID: "左侧菜单.参与的群组.TopButton" });
//App.Doc.LeftMenu.push({ Name: "活跃群组", ID: "LeftMenu.活跃群组", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司群组", TopButtonGroupID:"左侧菜单.活跃群组.TopButton" });
//App.Doc.LeftMenu.push({ Name: "睡眠群组", ID: "LeftMenu.睡眠群组", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.公司群组", TopButtonGroupID: "左侧菜单.睡眠群组.TopButton" });
 
App.Doc.LeftMenu.push({ Name: "数据分析", ID: "LeftMenu.数据分析", Method: "Doc.LeftMenuGroupToggle" , ParentID: null });
App.Doc.LeftMenu.push({ Name: "群组分析", ID: "LeftMenu.文档分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.文档分析.TopButton" });
App.Doc.LeftMenu.push({ Name: "用户分析", ID: "LeftMenu.用户分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.用户参与.TopButton" });

///系统管理
App.Doc.LeftMenu.push({ Name: "系统管理", ID: "LeftMenu.系统管理", Method: "Doc.LeftMenuGroupToggle",   ParentID: null });
App.Doc.LeftMenu.push({ Name: "回收站", ID: "LeftMenu.回收站", Method: "Doc.LeftMenuClick",  ParentID: "LeftMenu.系统管理", TopButtonGroupID:"左侧菜单.回收站.TopButton" });
App.Doc.LeftMenu.push({ Name: "使用帮助", ID: "LeftMenu.使用帮助", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.使用帮助.TopButton" });

App.Doc.Content = {};
App.Doc.Content.TopButton = [];

///创建的群组TopButton菜单
App.Doc.Content.TopButton.push({ Name: "创建的群组", ID: "TopButton.创建的群组", Method: "", Type: "Title", GroupID: "左侧菜单.创建的群组.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.创建的群组.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建群组", ID: "TopButton.新建群组", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.创建的群组.TopButton" });
 
///参与的群组TopButton菜单
App.Doc.Content.TopButton.push({ Name: "参与的群组", ID: "TopButton.参与的群组", Method: "", Type: "Title", GroupID: "左侧菜单.参与的群组.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.参与的群组.TopButton" });


///活跃群组TopButton菜单
App.Doc.Content.TopButton.push({ Name: "活跃群组", ID: "TopButton.活跃群组", Method: "",   Type: "Title", GroupID: "左侧菜单.活跃群组.TopButton"});
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.活跃群组.TopButton"});
//App.Doc.Content.TopButton.push({ Name: "新建笔记", ID: "TopButton.新建笔记", Method: "Doc.TopButtonClick",    GroupID: "左侧菜单.活跃群组.TopButton"});
//App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "TopButton.新建目录", Method: "Doc.TopButtonClick",    GroupID: "左侧菜单.活跃群组.TopButton" });
//App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.活跃群组.TopButton"});
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "TopButton.移动至", Method: "",  Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.活跃群组.TopButton"});
App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.活跃群组.TopButton"});

///睡眠群组TopButton菜单
App.Doc.Content.TopButton.push({ Name: "睡眠群组", ID: "TopButton.睡眠群组", Method: "", Type: "Title", GroupID: "左侧菜单.睡眠群组.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.睡眠群组.TopButton" });


///与我共享TopButton菜单
App.Doc.Content.TopButton.push({ Name: "与我共享", ID: "TopButton.与我共享", Method: "", Type: "Title", GroupID: "左侧菜单.与我共享.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.与我共享.TopButton" });
  
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
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "标题", Method: "Doc.TableRowClick", Sort: "", PropertyName: "Title", DataType: "string"});
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "分类", Method: "", Sort: "", PropertyName: "CategoryName", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "阅读量", Method: "", Sort: "", PropertyName: "ReadCount", DataType: "string"});
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "点赞量", Method: "", Sort: "", PropertyName: "LikeCount", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "评论量", Method: "", Sort: "", PropertyName: "CommentCount", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "发布时间", Method: "", Sort: "", PropertyName: "PublishTime", DataType: "date" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "创建时间", Method: "", Sort: "", PropertyName: "CreateTime", DataType: "date"  });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "状态", Method: "", Sort: "", PropertyName: "Status", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "详细", Method: "", Sort: "", PropertyName: "Type", DataType: "link", Value: "详细"  });

App.Doc.Data.DocTable.Info.Pager.PagerIndexClick = function () {
    LOGGER.Log("App.Doc.Data.DocTable.Info.Pager.PagerIndexClick");
    var index = $(event.target).attr("data-Index");
    
    Doc.LoadTable(parseInt(index), App.Doc.Data.Pager.Size, "{}", App.Doc.Data.DocTable.Info);
}

App.Doc.Data.RecycleBin = {};
App.Doc.Data.RecycleBin.Info = {
    Column: [],
    Pager: {
        Url: App.Doc.Server.Url18, PagerIndexClick: function () { }
    },
    Data: { Url: App.Doc.Server.Url14}
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
