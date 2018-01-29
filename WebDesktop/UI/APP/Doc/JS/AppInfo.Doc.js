

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
    Url8: "http://localhost:9990/API.ashx?c=WangJun.Doc.CategoryManager&m=Find&p=0",
    Url9: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Remove&p=0",
    Url10: "http://localhost:9990/API.ashx?c=WangJun.Doc.CategoryManager&m=Remove&p=0",
    Url11: "http://localhost:9990/API.ashx?c=WangJun.Doc.CategoryManager&m=Get&p=0",
    Url12: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=UpdateStatus&p=0"

};


App.Doc.LeftMenu = [];

App.Doc.LeftMenu.push({ Name: "文档操作", ID: "LeftMenu.文档操作", Method: "Doc.LeftMenuGroupToggle",    ParentID: null });
App.Doc.LeftMenu.push({ Name: "新建文章", ID: "LeftMenu.新建文章", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url3,  ParentID: "LeftMenu.文档操作" });
App.Doc.LeftMenu.push({ Name: "新建目录", ID: "LeftMenu.新建目录", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url6, ParentID: "LeftMenu.文档操作" });
App.Doc.LeftMenu.push({ Name: "草稿箱", ID: "LeftMenu.草稿箱", Method: "Doc.LeftMenuClick",   ParentID: "LeftMenu.文档操作", TopButtonGroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.LeftMenu.push({ Name: "待发布", ID: "LeftMenu.待发布", Method: "Doc.LeftMenuClick",   ParentID: "LeftMenu.文档操作", TopButtonGroupID: "左侧菜单.待发布.TopButton"  });
App.Doc.LeftMenu.push({ Name: "已发布", ID: "LeftMenu.已发布", Method: "Doc.LeftMenuClick",   ParentID: "LeftMenu.文档操作", TopButtonGroupID:"左侧菜单.已发布.TopButton" });
App.Doc.LeftMenu.push({ Name: "全部文档", ID: "LeftMenu.全部文档", Method: "Doc.LeftMenuClick",  ParentID: "LeftMenu.文档操作", TopButtonGroupID: "左侧菜单.全部文档.TopButton" });

App.Doc.LeftMenu.push({ Name: "数据分析", ID: "LeftMenu.数据分析", Method: "Doc.LeftMenuGroupToggle" , ParentID: null });
App.Doc.LeftMenu.push({ Name: "文档分析", ID: "LeftMenu.文档分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析" });
App.Doc.LeftMenu.push({ Name: "评论分析", ID: "LeftMenu.评论分析", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析" });
App.Doc.LeftMenu.push({ Name: "用户参与", ID: "LeftMenu.用户参与", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析" });
App.Doc.LeftMenu.push({ Name: "外网关联", ID: "LeftMenu.外网关联", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.数据分析" });

///系统管理
App.Doc.LeftMenu.push({ Name: "系统管理", ID: "LeftMenu.系统管理", Method: "Doc.LeftMenuGroupToggle",   ParentID: null });
App.Doc.LeftMenu.push({ Name: "回收站", ID: "LeftMenu.回收站", Method: "Doc.LeftMenuClick", Param: "[0,20,{'Status':'已回收'}]",  ParentID: "LeftMenu.系统管理", TopButtonGroupID:"左侧菜单.回收站.TopButton" });
App.Doc.LeftMenu.push({ Name: "存储管理", ID: "LeftMenu.存储管理", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理" });
App.Doc.LeftMenu.push({ Name: "应用信息", ID: "LeftMenu.应用信息", Method: "Doc.LeftMenuClick", ParentID: "LeftMenu.系统管理" });

App.Doc.Content = {};
App.Doc.Content.TopButton = [];
App.Doc.Content.TopButton.push({ Name: "文档中心", ID: "ptcd", Method: "", Position: "", ParentID: null ,GroupID:"",Type:"Title"});
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd" });
App.Doc.Content.TopButton.push({ Name: "新建文章", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url3, Position: "", ParentID: "ptcd" });
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url6, Position: "", ParentID: "ptcd" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd" });
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "", Method: "", Position: "", ParentID: "glcd", Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }] });
App.Doc.Content.TopButton.push({ Name: "删除", ID: "", Method: "Doc.UpdateDoc", Position: "", ParentID: "glcd" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "glcd" });
App.Doc.Content.TopButton.push({ Name: "刷新", ID: "", Method: "", Position: "", ParentID: "glcd" });
App.Doc.Content.TopButton.push({ Name: "彻底删除", ID: "", Method: "", Position: "", ParentID: "glcd" });


///已发布TopButton菜单
App.Doc.Content.TopButton.push({ Name: "已发布文档", ID: "ptcd", Method: "", Position: "", ParentID: null, GroupID: "", Type: "Title", GroupID: "左侧菜单.已发布.TopButton"});
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd", GroupID: "左侧菜单.已发布.TopButton"});
App.Doc.Content.TopButton.push({ Name: "新建文章", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url3, Position: "", ParentID: "ptcd", GroupID: "左侧菜单.已发布.TopButton"});
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url6, Position: "", ParentID: "ptcd", GroupID: "左侧菜单.已发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd", GroupID: "左侧菜单.已发布.TopButton"});
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "", Method: "", Position: "", ParentID: "glcd", Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.已发布.TopButton"});
App.Doc.Content.TopButton.push({ Name: "删除", ID: "", Method: "Doc.UpdateDoc", Position: "", ParentID: "glcd", GroupID: "左侧菜单.已发布.TopButton"});
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "glcd", GroupID: "左侧菜单.已发布.TopButton"});
App.Doc.Content.TopButton.push({ Name: "刷新", ID: "", Method: "", Position: "", ParentID: "glcd", GroupID: "左侧菜单.已发布.TopButton"});
App.Doc.Content.TopButton.push({ Name: "彻底删除", ID: "", Method: "", Position: "", ParentID: "glcd", GroupID: "左侧菜单.已发布.TopButton"});

///待发布TopButton菜单
App.Doc.Content.TopButton.push({ Name: "待发布文档", ID: "ptcd", Method: "", Position: "", ParentID: null, GroupID: "", Type: "Title", GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd", GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建文章", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url3, Position: "", ParentID: "ptcd", GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url6, Position: "", ParentID: "ptcd", GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd", GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "", Method: "", Position: "", ParentID: "glcd", Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "删除", ID: "", Method: "Doc.UpdateDoc", Position: "", ParentID: "glcd", GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "glcd", GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "刷新", ID: "", Method: "", Position: "", ParentID: "glcd", GroupID: "左侧菜单.待发布.TopButton" });
App.Doc.Content.TopButton.push({ Name: "彻底删除", ID: "", Method: "", Position: "", ParentID: "glcd", GroupID: "左侧菜单.待发布.TopButton" });

///草稿箱TopButton菜单
App.Doc.Content.TopButton.push({ Name: "草稿箱文档", ID: "ptcd", Method: "", Position: "", ParentID: null, GroupID: "", Type: "Title", GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd", GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建文章", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url3, Position: "", ParentID: "ptcd", GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url6, Position: "", ParentID: "ptcd", GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd", GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "", Method: "", Position: "", ParentID: "glcd", Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "草稿箱" }], GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "删除", ID: "", Method: "Doc.UpdateDoc", Position: "", ParentID: "glcd", GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "glcd", GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "刷新", ID: "", Method: "", Position: "", ParentID: "glcd", GroupID: "左侧菜单.草稿箱.TopButton" });
App.Doc.Content.TopButton.push({ Name: "彻底删除", ID: "", Method: "", Position: "", ParentID: "glcd", GroupID: "左侧菜单.草稿箱.TopButton" });

///全部文档TopButton菜单
App.Doc.Content.TopButton.push({ Name: "全部文档", ID: "ptcd", Method: "", Position: "", ParentID: null, GroupID: "", Type: "Title", GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd", GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建文章", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url3, Position: "", ParentID: "ptcd", GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "新建目录", ID: "", Method: "Doc.ShowWindow", Param: App.Doc.Server.Url6, Position: "", ParentID: "ptcd", GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd", GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "移动至", ID: "", Method: "", Position: "", ParentID: "glcd", Type: "dropdownlist", Menu: [{ Text: "回收站" }, { Text: "全部文档" }], GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "删除", ID: "", Method: "Doc.UpdateDoc", Position: "", ParentID: "glcd", GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "glcd", GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "刷新", ID: "", Method: "", Position: "", ParentID: "glcd", GroupID: "左侧菜单.全部文档.TopButton" });
App.Doc.Content.TopButton.push({ Name: "彻底删除", ID: "", Method: "", Position: "", ParentID: "glcd", GroupID: "左侧菜单.全部文档.TopButton" });



///回收站TopButton菜单
App.Doc.Content.TopButton.push({ Name: "回收站", ID: "TopButton.回收站", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.回收站.TopButton", Type: "Title" });
App.Doc.Content.TopButton.push({ Name: "|", ID: "TopButton.|.1", Method: "", Position: "", ParentID: "ptcd", GroupID: "左侧菜单.回收站.TopButton"});
App.Doc.Content.TopButton.push({ Name: "彻底删除", ID: "TopButton.彻底删除", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.回收站.TopButton", Type: "Button" });  
App.Doc.Content.TopButton.push({ Name: "清空回收站", ID: "TopButton.清空回收站", Method: "Doc.TopButtonClick", GroupID: "左侧菜单.回收站.TopButton", Type: "Button" });  

