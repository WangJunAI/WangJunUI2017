///加载APP信息
Doc.LoadAppInfo = function () {
    var appInfo = App.Doc.Info;
    Doc.ShowAppInfo(appInfo);
}


Doc.ShowAppInfo = function (data) {
    $("#appName").text(data.Name);
    document.title = App.Doc.Info.Name;
}
