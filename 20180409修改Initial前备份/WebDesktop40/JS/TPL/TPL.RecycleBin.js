Doc.LoadRecycleBinEntityList = function () {
    Doc.LoadTable(0, App.Doc.Data.Pager.Size, "{}", App.Doc.Data.RecycleBin.Info);
}

Doc.EmptyRecycleBin = function () {
    var submitId = Doc.SubmitStart();
    var param = []
    var callback = function (res) {
        Doc.SubmitEnd(submitId);
        Doc.LoadTable(0, App.Doc.Data.Pager.Size, "{}", App.Doc.Data.RecycleBin.Info);
    }
    NET.PostData(App.Doc.Server.Url90, callback, param);
}

///移除一个文档
Doc.DeleteDetail = function (id, callback) {
    var id = (true === PARAM_CHECKER.IsNotEmptyString(id)) ? id : $("#ID").val();
    var context = [id];
    NET.PostData(App.Doc.Server.Url91, callback, context);
}

Doc.DeleteSelectedDetail = function () {
    var submitId = Doc.SubmitStart();

    var idArray = Doc.GetSelectedTableRow();

    var successCount = idArray.length;
    while (0 < idArray.length) {
        var id = idArray.pop();
        Doc.DeleteDetail(id, function () {
            successCount--;
            if (0 === successCount) {
                Doc.SubmitEnd(submitId);
                var query = Doc.GetQuery();
                Doc.LoadTable(0, App.Doc.Data.Pager.Size, "{}", App.Doc.Data.RecycleBin.Info);
            }
        });
    }
}