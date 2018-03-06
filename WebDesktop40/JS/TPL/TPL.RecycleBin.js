Doc.LoadRecycleBinEntityList = function () {
    Doc.LoadTable(0, App.Doc.Data.Pager.Size, "{}", App.Doc.Data.RecycleBin.Info);
}

Doc.EmptyRecycleBin = function () {
 
    var param = []
    var callback = function (res) {
        LOGGER.Log(res);
        if (false === PARAM_CHECKER.IsTopWindow()) {
            Doc.ShowDialog();
        }
    }
    NET.PostData(App.Doc.Server.Url90, callback, param);
}