﻿
App = {};
App.Doc = {};
App.Doc.Info = {};

App.Doc.Info.ID = "WDGL";
App.Doc.Info.Name = "汪俊文档管理";

App.Doc.CSS = {};
App.Doc.CSS.LeftMenu = {};
App.Doc.CSS.LeftMenu.Width = { Value: 10, Unit: "em" };

App.Doc.CSS.LeftList = {};
App.Doc.CSS.LeftList.View1 = {};
App.Doc.CSS.LeftList.View1.Width = { Value: 30, Unit: "em" };

App.Doc.CSS.LeftList.View3 = {};
App.Doc.CSS.LeftList.View3.Width = { Value: 12, Unit: "em" };

 App.Doc.Server = {
    Url1: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocWebAPI&m=LoadDocList", ///加载文档目录
    Url2: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocWebAPI&m=DocCount",///文档数量
    Url3: "Detail.html",
    Url4: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocWebAPI&m=SaveDoc",///保存一个文档
    Url5: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocWebAPI&m=GetDoc",///获取一个文档
    Url6: "Category.html",
    Url7: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocWebAPI&m=SaveCategory",///保存一个目录
    Url8: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocWebAPI&m=LoadCategory",///加载目录列表
    Url9: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocWebAPI&m=RemoveDoc",///移除一份文档,暂未使用
    Url10: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocWebAPI&m=RemoveCategory",///移除一个目录
    Url11: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocWebAPI&m=GetCategory", ///获取一个目录
    Url12: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocManager&m=UpdateStatus&p=0",///暂未使用
    Url13: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocWebAPI&m=MoveToRecycleBin", ///移除到回收站
    Url14: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocWebAPI&m=LoadRecycleBinItem",///加载回收站
    Url15: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DataAnalysor&m=GetHotWords",///暂未使用
    Url16: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocWebAPI&m=Aggregate",///聚合查询
    Url17: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.ClientBehaviorManager&m=Aggregate",
    Url18: "http://aifuwu.wang/API.ashx?c=WangJun.Doc.DocWebAPI&m=RecycleBinCount",///回收站数量

};


App.Doc.LeftMenu = [];

App.Doc.LeftMenu.push({ Name: "文档操作", ID: "LeftMenu.文档操作", Method: "Doc.LeftMenuGroupToggle",    ParentID: null });
App.Doc.LeftMenu.push({ Name: "新建文章", ID: "LeftMenu.新建文章", Method: "Doc.LeftMenuClick",    ParentID: "LeftMenu.文档操作" });
App.Doc.LeftMenu.push({ Name: "新建目录", ID: "LeftMenu.新建目录", Method: "Doc.LeftMenuClick",  ParentID: "LeftMenu.文档操作" });
App.Doc.LeftMenu.push({ Name: "草稿箱", ID: "LeftMenu.草稿箱", Method: "Doc.LeftMenuClick",   ParentID: "LeftMenu.文档操作", TopButtonGroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.LeftMenu.push({ Name: "待发布", ID: "LeftMenu.待发布", Method: "Doc.LeftMenuClick",   ParentID: "LeftMenu.文档操作", TopButtonGroupID: "左侧菜单.待发布.TopButton"  });
App.Doc.LeftMenu.push({ Name: "已发布", ID: "LeftMenu.已发布", Method: "Doc.LeftMenuClick",   ParentID: "LeftMenu.文档操作", TopButtonGroupID:"左侧菜单.已发布.TopButton" });
App.Doc.LeftMenu.push({ Name: "全部文档", ID: "LeftMenu.全部文档", Method: "Doc.LeftMenuClick",  ParentID: "LeftMenu.文档操作", TopButtonGroupID: "左侧菜单.全部文档.TopButton" });

App.Doc.LeftMenu.push({ Name: "数据分析", ID: "LeftMenu.数据分析", Method: "Doc.LeftMenuGroupToggle" , ParentID: null });
App.Doc.LeftMenu.push({ Name: "文档分析", ID: "LeftMenu.文档分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.文档分析.TopButton"});
App.Doc.LeftMenu.push({ Name: "评论分析", ID: "LeftMenu.评论分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.评论分析.TopButton" });
App.Doc.LeftMenu.push({ Name: "用户参与", ID: "LeftMenu.用户参与", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.用户参与.TopButton" });
App.Doc.LeftMenu.push({ Name: "外网关联", ID: "LeftMenu.外网关联", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.外网关联.TopButton" });

///系统管理
App.Doc.LeftMenu.push({ Name: "系统管理", ID: "LeftMenu.系统管理", Method: "Doc.LeftMenuGroupToggle",   ParentID: null });
App.Doc.LeftMenu.push({ Name: "回收站", ID: "LeftMenu.回收站", Method: "Doc.LeftMenuClick",  ParentID: "LeftMenu.系统管理", TopButtonGroupID:"左侧菜单.回收站.TopButton" });
App.Doc.LeftMenu.push({ Name: "存储管理", ID: "LeftMenu.存储管理", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.存储管理.TopButton" });
App.Doc.LeftMenu.push({ Name: "应用信息", ID: "LeftMenu.应用信息", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.应用信息.TopButton" });
App.Doc.LeftMenu.push({ Name: "云笔记测试", ID: "LeftMenu.云笔记测试", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.云笔记测试.TopButton" });

App.Doc.Content = {};
App.Doc.Content.TopButton = [];
  
///已发布TopButton菜单
App.Doc.Content.TopButton.push({ Name: "已发布文档", ID: "TopButton.已发布文档", Method: "",   Type: "Title", GroupID: "左侧菜单.已发布.TopButton"});
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.已发布.TopButton"});
App.Doc.Content.TopButton.push({ Name: "新建文章", ID: "TopButton.新建文章", Method: "Doc.TopButtonClick",    GroupID: "左侧菜单.已发布.TopButton"});
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "TopButton.新建目录", Method: "Doc.TopButtonClick",    GroupID: "左侧菜单.已发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.已发布.TopButton"});
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "TopButton.移动至", Method: "",  Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.已发布.TopButton"});
App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.已发布.TopButton"});

///待发布TopButton菜单
App.Doc.Content.TopButton.push({ Name: "待发布文档", ID: "TopButton.待发布文档", Method: "",  ParentID: null, GroupID: "", Type: "Title", GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建文章", ID: "TopButton.新建文章", Method: "Doc.TopButtonClick", Param: App.Doc.Server.Url3,   GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "TopButton.新建目录", Method: "Doc.TopButtonClick", Param: App.Doc.Server.Url6,   GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "TopButton.移动至", Method: "",   Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick",   GroupID: "左侧菜单.待发布.TopButton" });

///草稿箱TopButton菜单
App.Doc.Content.TopButton.push({ Name: "草稿箱文档", ID: "TopButton.草稿箱文档", Method: "",   GroupID: "", Type: "Title", GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建文章", ID: "TopButton.新建文章", Method: "Doc.TopButtonClick", Param: App.Doc.Server.Url3,   GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "TopButton.新建目录", Method: "Doc.TopButtonClick", Param: App.Doc.Server.Url6,   GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "", Method: "",   Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick",   GroupID: "左侧菜单.草稿箱.TopButton" });

///全部文档TopButton菜单
App.Doc.Content.TopButton.push({ Name: "全部文档", ID: "TopButton.全部文档", Method: "",   GroupID: "", Type: "Title", GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "",   GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建文章", ID: "TopButton.新建文章", Method: "Doc.TopButtonClick", Param: App.Doc.Server.Url3,    GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "TopButton.新建目录", Method: "Doc.TopButtonClick", Param: App.Doc.Server.Url6,  GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "",   GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "", Method: "",   Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "全部文档" }], GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick",    GroupID: "左侧菜单.全部文档.TopButton" });

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

///应用信息菜单
App.Doc.Content.TopButton.push({ Name: "应用信息", ID: "TopButton.应用信息", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.应用信息.TopButton", Type: "Title" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.应用信息.TopButton" });

///云笔记测试菜单
App.Doc.Content.TopButton.push({ Name: "云笔记测试", ID: "TopButton.云笔记测试", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.云笔记测试.TopButton", Type: "Title" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.云笔记测试.TopButton" });


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
