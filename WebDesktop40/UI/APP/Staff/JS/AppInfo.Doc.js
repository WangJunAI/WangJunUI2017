
App = {};
App.Doc = {};
App.Doc.Info = {};

App.Doc.Info.ID = "汪俊人员和组织管理";
App.Doc.Info.Name = "汪俊人员和组织管理";

App.Doc.CSS = {};
App.Doc.CSS.LeftMenu = {};
App.Doc.CSS.LeftMenu.Width = { Value: 10, Unit: "em" };

App.Doc.CSS.LeftList = {};
App.Doc.CSS.LeftList.View1 = {};
App.Doc.CSS.LeftList.View1.Width = { Value: 30, Unit: "em" };

App.Doc.CSS.LeftList.View3 = {};
App.Doc.CSS.LeftList.View3.Width = { Value: 18, Unit: "em" };

 

 App.Doc.Server = {
     Url1: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=LoadEntityList", ///加载人员列表
     Url2: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=Count",///文档数量
    Url3: "Detail.html",
    Url4: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=SaveEntity",///保存一个文档
    Url5: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=GetEntity",///获取一个文档
    Url6: "Category.html",
    Url7: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=SaveOrg",///保存一个目录
    Url8: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=LoadOrgList",///加载组织列表
    Url9: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=RemoveEntity",///移除一份文档,暂未使用
    Url10: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=RemoveOrg",///移除一个目录
    Url11: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=GetOrg", ///获取一个目录
    Url12: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=UpdateStatus&p=0",///暂未使用
    Url13: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocWebAPI&m=MoveToRecycleBin", ///移除到回收站
    Url14: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=LoadRecycleBinEntityList",///加载回收站
    Url15: "http://localhost:9990/API.ashx?c=WangJun.Doc.DataAnalysor&m=GetHotWords",///暂未使用
    Url16: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocWebAPI&m=Aggregate",///聚合查询
    Url17: "http://localhost:9990/API.ashx?c=WangJun.Doc.ClientBehaviorManager&m=Aggregate",
    Url18: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=RecycleBinCount",///回收站数量
    Url19: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=LoadAll",///回收站数量
    Url90: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=EmptyRecycleBin",///加载回收站
    Url91: "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=DeleteEntity",///加载回收站
};


App.Doc.LeftMenu = [];

App.Doc.LeftMenu.push({ Name: "人员和组织", ID: "LeftMenu.人员和组织", Method: "Doc.LeftMenuGroupToggle",    ParentID: null });
App.Doc.LeftMenu.push({ Name: "新建人员", ID: "LeftMenu.新建人员", Method: "Doc.LeftMenuClick",    ParentID: "LeftMenu.人员和组织" });
App.Doc.LeftMenu.push({ Name: "新建组织", ID: "LeftMenu.新建组织", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.人员和组织" });
App.Doc.LeftMenu.push({ Name: "在职人员", ID: "LeftMenu.在职人员", Method: "Doc.LeftMenuClick",   ParentID: "LeftMenu.人员和组织", TopButtonGroupID: "左侧菜单.在职人员.TopButton"  });
App.Doc.LeftMenu.push({ Name: "离职人员", ID: "LeftMenu.离职人员", Method: "Doc.LeftMenuClick",   ParentID: "LeftMenu.人员和组织", TopButtonGroupID:"左侧菜单.离职人员.TopButton" });
 
App.Doc.LeftMenu.push({ Name: "权限设置", ID: "LeftMenu.权限设置", Method: "Doc.LeftMenuGroupToggle", ParentID: null });
App.Doc.LeftMenu.push({ Name: "新建角色", ID: "LeftMenu.新建角色", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.权限设置" });
App.Doc.LeftMenu.push({ Name: "角色列表", ID: "LeftMenu.角色列表", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.权限设置", TopButtonGroupID: "左侧菜单.角色列表.TopButton" });
App.Doc.LeftMenu.push({ Name: "使用说明", ID: "LeftMenu.使用说明", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.权限设置", TopButtonGroupID: "左侧菜单.使用说明.TopButton" });


App.Doc.LeftMenu.push({ Name: "数据分析", ID: "LeftMenu.数据分析", Method: "Doc.LeftMenuGroupToggle" , ParentID: null });
App.Doc.LeftMenu.push({ Name: "人员分析", ID: "LeftMenu.人员分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.文档分析.TopButton"});
App.Doc.LeftMenu.push({ Name: "组织分析", ID: "LeftMenu.组织分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.评论分析.TopButton" });
App.Doc.LeftMenu.push({ Name: "角色分析", ID: "LeftMenu.角色分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析", TopButtonGroupID: "左侧菜单.评论分析.TopButton" });

///系统管理
App.Doc.LeftMenu.push({ Name: "系统管理", ID: "LeftMenu.系统管理", Method: "Doc.LeftMenuGroupToggle",   ParentID: null });
App.Doc.LeftMenu.push({ Name: "回收站", ID: "LeftMenu.回收站", Method: "Doc.LeftMenuClick",  ParentID: "LeftMenu.系统管理", TopButtonGroupID:"左侧菜单.回收站.TopButton" });
App.Doc.LeftMenu.push({ Name: "存储管理", ID: "LeftMenu.存储管理", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.存储管理.TopButton" });
App.Doc.LeftMenu.push({ Name: "应用信息", ID: "LeftMenu.应用信息", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理", TopButtonGroupID: "左侧菜单.应用信息.TopButton" });

App.Doc.Content = {};
App.Doc.Content.TopButton = [];
  
///在职人员TopButton菜单
App.Doc.Content.TopButton.push({ Name: "在职人员", ID: "TopButton.在职人员", Method: "",   Type: "Title", GroupID: "左侧菜单.在职人员.TopButton"});
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.在职人员.TopButton"});
App.Doc.Content.TopButton.push({ Name: "新建人员", ID: "TopButton.新建人员", Method: "Doc.TopButtonClick",    GroupID: "左侧菜单.在职人员.TopButton"});
App.Doc.Content.TopButton.push({ Name: "新建组织", ID: "TopButton.新建组织", Method: "Doc.TopButtonClick",    GroupID: "左侧菜单.在职人员.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.在职人员.TopButton"});
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "TopButton.移动至", Method: "",  Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.在职人员.TopButton"});
App.Doc.Content.TopButton.push({ Name: "导入", ID: "TopButton.导入", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.在职人员.TopButton" });
App.Doc.Content.TopButton.push({ Name: "导出", ID: "TopButton.导出", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.在职人员.TopButton" });
App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.在职人员.TopButton" });

///离职人员TopButton菜单
App.Doc.Content.TopButton.push({ Name: "离职人员", ID: "TopButton.离职人员", Method: "", Type: "Title", GroupID: "左侧菜单.离职人员.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", GroupID: "左侧菜单.离职人员.TopButton" });
App.Doc.Content.TopButton.push({ Name: "导出", ID: "TopButton.导出", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.离职人员.TopButton" });
App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.离职人员.TopButton" });

///权限设置TopButton菜单
App.Doc.Content.TopButton.push({ Name: "权限设置", ID: "TopButton.权限设置", Method: "", ParentID: null, GroupID: "", Type: "Title", GroupID: "左侧菜单.角色列表.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.权限设置.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建角色", ID: "TopButton.新建角色", Method: "Doc.TopButtonClick", Param: App.Doc.Server.Url3, GroupID: "左侧菜单.角色列表.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.权限设置.TopButton" });
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "TopButton.移动至", Method: "", Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.角色列表.TopButton" });
App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.角色列表.TopButton" });

///草稿箱TopButton菜单
App.Doc.Content.TopButton.push({ Name: "草稿箱文档", ID: "TopButton.草稿箱文档", Method: "",   GroupID: "", Type: "Title", GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建文章", ID: "TopButton.新建文章", Method: "Doc.TopButtonClick", Param: App.Doc.Server.Url3,   GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "TopButton.新建目录", Method: "Doc.TopButtonClick", Param: App.Doc.Server.Url6,   GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "",   GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "", Method: "",   Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "删除", ID: "TopButton.删除", Method: "Doc.TopButtonClick",   GroupID: "左侧菜单.草稿箱.TopButton" });

///全部文档TopButton菜单
App.Doc.Content.TopButton.push({ Name: "全部文档", ID: "TopButton.全部文档", Method: "",   Type: "Title", GroupID: "左侧菜单.全部文档.TopButton" });
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
    Data: { Url: App.Doc.Server.Url1 },
    RowClickDetailUrl: "Detail.html?"
}
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "全选", Method: "", Sort: "", PropertyName: "Type", DataType: "checkbox" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "姓名", Method: "Doc.TableRowClick", Sort: "", PropertyName: "Name", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "部门", Method: "", Sort: "", PropertyName: "ParentName", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "岗位", Method: "", Sort: "", PropertyName: "PositionName", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "邮箱", Method: "", Sort: "", PropertyName: "Email", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "电话", Method: "", Sort: "", PropertyName: "Phone", DataType: "string" });
App.Doc.Data.DocTable.Info.Column.push({ ID: "", Text: "QQ/微信", Method: "", Sort: "", PropertyName: "QQ", DataType: "string" });


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
