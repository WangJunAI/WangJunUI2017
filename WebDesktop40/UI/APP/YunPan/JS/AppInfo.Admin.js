
App = {};
App.Doc = {};
App.Doc.Info = {};

App.Doc.Info.ID = "WDGL";
App.Doc.Info.Name = "企业云盘管理端";

App.Doc.CSS = {};
App.Doc.CSS.LeftMenu = {};
App.Doc.CSS.LeftMenu.Width = { Value: 10, Unit: "em" };

App.Doc.CSS.LeftList = {};
App.Doc.CSS.LeftList.View1 = {};
App.Doc.CSS.LeftList.View1.Width = { Value: 30, Unit: "em" };

App.Doc.CSS.LeftList.View3 = {};
App.Doc.CSS.LeftList.View3.Width = { Value: 18, Unit: "em" };

App.Doc.ServerHost =  YunConfig.ServerHost(this);
App.Doc.UploadServerHost = YunConfig.ServerHost(this);
 
App.Doc.Server = {
    Url1: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.YunPanWebAPI&m=LoadEntityList", ///加载文档目录
    Url2: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.YunPanWebAPI&m=Count",///文档数量
    Url3: "Detail.Admin.html",
    Url31: "Detail.html",
    Url4: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.YunPanWebAPI&m=SaveEntity",///保存一个文档
    Url5: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.YunPanWebAPI&m=GetEntity",///获取一个文档
    Url6: "Category.Admin.html",
    Url61: "Category.html",
    Url7: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.YunPanWebAPI&m=SaveCategory",///保存一个目录
    Url8: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.YunPanWebAPI&m=LoadCategoryList",///加载目录列表
    Url9: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.YunPanWebAPI&m=RemoveEntity",///移除一份文档,暂未使用
    Url10: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.YunPanWebAPI&m=RemoveCategory",///移除一个目录
    Url11: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.YunPanWebAPI&m=GetCategory", ///获取一个目录
    Url12: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.DocManager&m=UpdateStatus&p=0",///暂未使用
    Url13: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.DocWebAPI&m=MoveToRecycleBin", ///移除到回收站
    Url14: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.YunPanWebAPI&m=LoadRecycleBinEntityList",///加载回收站
    Url15: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.DataAnalysor&m=GetHotWords",///暂未使用
    Url16: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.DocWebAPI&m=Aggregate",///聚合查询
    Url17: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.ClientBehaviorManager&m=Aggregate",
    Url18: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.DocWebAPI&m=RecycleBinCount",///回收站数量
    Url19: App.Doc.ServerHost +"/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=LoadAll",///回收站数量
    Url90: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.YunPanWebAPI&m=EmptyRecycleBin",///加载回收站
    Url91: App.Doc.ServerHost +"/API.ashx?c=WangJun.YunPan.YunPanWebAPI&m=DeleteEntity",///加载回收站
};


App.Doc.LeftMenu = [];

App.Doc.LeftMenu.push({ Name: "云盘管理", ID: "LeftMenu.云盘管理", Method: "Doc.LeftMenuGroupToggle", ParentID: null });
//App.Doc.LeftMenu.push({ Name: "上传文件", ID: "LeftMenu.上传文件", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.云盘管理" });
//App.Doc.LeftMenu.push({ Name: "新建文件夹", ID: "LeftMenu.新建文件夹", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.云盘管理" });
App.Doc.LeftMenu.push({ Name: "个人云盘", ID: "LeftMenu.个人云盘", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.云盘管理", TopButtonGroupID: "左侧菜单.个人云盘.TopButton" });
App.Doc.LeftMenu.push({ Name: "与我共享", ID: "LeftMenu.与我共享", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.云盘管理", TopButtonGroupID: "左侧菜单.与我共享.TopButton" })
App.Doc.LeftMenu.push({ Name: "企业云盘", ID: "LeftMenu.企业云盘", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.云盘管理", TopButtonGroupID: "左侧菜单.企业云盘.TopButton" });
App.Doc.LeftMenu.push({ Name: "员工云盘", ID: "LeftMenu.员工云盘", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.云盘管理", TopButtonGroupID: "左侧菜单.员工云盘.TopButton" });


App.Doc.LeftMenu.push({ Name: "数据分析", ID: "LeftMenu.数据分析", Method: "Doc.LeftMenuGroupToggle", ParentID: null });
App.Doc.LeftMenu.push({ Name: "云盘分析", ID: "LeftMenu.云盘分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.云盘分析.TopButton" });

///系统管理
App.Doc.LeftMenu.push({ Name: "系统管理", ID: "LeftMenu.系统管理", Method: "Doc.LeftMenuGroupToggle", ParentID: null });
App.Doc.LeftMenu.push({ Name: "回收站", ID: "LeftMenu.回收站", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.回收站.TopButton" });
App.Doc.LeftMenu.push({ Name: "存储管理", ID: "LeftMenu.存储管理", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.存储管理.TopButton" });
App.Doc.LeftMenu.push({ Name: "使用帮助", ID: "LeftMenu.使用帮助", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.使用帮助.TopButton" });

App.Doc.Content = {};
App.Doc.Content.TopButton = [];

///个人云盘TopButton菜单
App.Doc.Content.TopButton.push({ Name: "个人云盘", ID: "TopButton.个人云盘", Method: "", ParentID: null, GroupID: "", Type: "Title", GroupID: "左侧菜单.个人云盘.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.个人云盘.TopButton" });
App.Doc.Content.TopButton.push({ Name: "上传文件", ID: "TopButton.上传个人云盘文件", Method: "Doc.TopButtonClick",   GroupID: "左侧菜单.个人云盘.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建文件夹", ID: "TopButton.新建个人云盘文件夹", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.个人云盘.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.个人云盘.TopButton" });
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "TopButton.个人云盘移动至", Method: "", Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.个人云盘.TopButton" });
App.Doc.Content.TopButton.push({ Name: "共享给", ID: "TopButton.共享给", Method: "", Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.个人云盘.TopButton" });
App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.个人云盘.TopButton" });


///企业云盘TopButton菜单
App.Doc.Content.TopButton.push({ Name: "企业云盘", ID: "TopButton.企业云盘", Method: "", Type: "Title", GroupID: "左侧菜单.企业云盘.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.企业云盘.TopButton" });
App.Doc.Content.TopButton.push({ Name: "上传文件", ID: "TopButton.上传企业云盘文件", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.企业云盘.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建文件夹", ID: "TopButton.新建企业云盘文件夹", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.企业云盘.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.企业云盘.TopButton" });
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "TopButton.企业云盘移动至", Method: "", Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.企业云盘.TopButton"});
App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.企业云盘.TopButton" });

///与我共享TopButton菜单
App.Doc.Content.TopButton.push({ Name: "与我共享", ID: "TopButton.与我共享", Method: "", Type: "Title", GroupID: "左侧菜单.与我共享.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.与我共享.TopButton" });

///员工云盘TopButton菜单
App.Doc.Content.TopButton.push({ Name: "员工云盘", ID: "TopButton.员工云盘", Method: "", Type: "Title", GroupID: "左侧菜单.员工云盘.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.员工云盘.TopButton" });
 

///云盘分析菜单
App.Doc.Content.TopButton.push({ Name: "云盘分析", ID: "TopButton.云盘分析", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.云盘分析.TopButton", Type: "Title" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.云盘分析.TopButton" });

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
    Data: { Url: App.Doc.Server.Url1 },
    RowClickDetailUrl: "Show.html?"
}
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "全选", Method: "", Sort: "", PropertyName: "ID", DataType: "checkbox" ,Value: ""});
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "文件名", Method: "Doc.TableRowClick", Sort: "", PropertyName: "Name", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "目录", Method: "", Sort: "", PropertyName: "ParentName", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "大小", Method: "", Sort: "", PropertyName: "FileLengthText", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "上传时间", Method: "", Sort: "", PropertyName: "UpdateTime", DataType: "date" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "详细", Method: "", Sort: "", PropertyName: "FileHttpUrl", DataType: "link", Value: "下载" });

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
    Data: { Url: App.Doc.Server.Url14 }
}
App.Doc.Data.RecycleBin.Info.Column.push({ ID: "", Text: "全选", Method: "", Sort: "", PropertyName: "Type", DataType: "checkbox" });
App.Doc.Data.RecycleBin.Info.Column.push({ ID: "", Text: "标题", Method: "Doc.TableRowClick", Sort: "", PropertyName: "Name", DataType: "string" });
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
    "默认企业云盘目录查询条件": [JSON.stringify({ OwnerID: SESSION.Current().CompanyID }), "{}", "{}", 0, 1000],
    "默认个人云盘目录查询条件": [JSON.stringify({ OwnerID: SESSION.Current().UserID }), "{}", "{}", 0, 1000],
}