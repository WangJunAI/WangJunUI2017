 
var Doc = {};
 

 
Doc.Initial = function () {
    $(document).ready(function () {
 

        if (true === SESSION.Current().CanManageYunDoc) {
            $.getScript("./JS/AppInfo.Admin.js", function () {
                Doc.LoadAppInfo();
                Doc.LoadMenu();
                Doc.LeftMenuClick("LeftMenu.企业知识库");
            });
        }
        else {
            $.getScript("./JS/AppInfo.Client.js", function () {
                Doc.LoadAppInfo();
                Doc.LoadMenu();
                Doc.LeftMenuClick("LeftMenu.企业知识库");
            });
        }
     });
}
 