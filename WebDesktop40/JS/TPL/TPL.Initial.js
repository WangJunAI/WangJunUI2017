
var Doc = {};

Doc.Initial = function (adminCallback, clientCallback) {
    $(document).ready(function () {
        if (true === SESSION.Current().CanManageYunPan) {
            $.getScript("./JS/AppInfo.Admin.js", function () {
                if (true === PARAM_CHECKER.IsFunction(adminCallback)) {
                    adminCallback();
                }
            });
        }
        else {
            $.getScript("./JS/AppInfo.Client.js", function () {
                if (true === PARAM_CHECKER.IsFunction(clientCallback)) {
                    clientCallback();
                }
            });
        }
    });
}
