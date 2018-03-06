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

///移除一个文档
Doc.DeleteDetail = function (id) {
    var id = (true === PARAM_CHECKER.IsNotEmptyString(id)) ? id : $("#ID").val();
    var context = [id];

    var callback = function (res) {
        LOGGER.Log(res);
        if (false === PARAM_CHECKER.IsTopWindow()) {
            Doc.ShowDialog();
        }
    }
    NET.PostData(App.Doc.Server.Url91, callback, context);
}

Doc.DeleteSelectedDetail = function () {
    var idArray = Doc.GetSelectedTableRow();
    for (var k = 0; k < idArray.length; k++) {
        var id = idArray[k];
        Doc.DeleteDetail(id);
    }
}