
var Doc = {};

Doc.Initial = function (permission,adminCallback, clientCallback) {
    $(document).ready(function () {
        if (true ===permission) {
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
