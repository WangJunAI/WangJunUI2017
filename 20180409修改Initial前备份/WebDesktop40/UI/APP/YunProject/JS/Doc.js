 
var Doc = {};
  

Doc.Initial = function () {
    $(document).ready(function () {

        if (true === SESSION.Current().CanManageYunProject) {
            $.getScript("./JS/AppInfo.Admin.js", function () {
                Doc.LoadAppInfo();
                Doc.LoadMenu();
                Doc.LeftMenuClick("LeftMenu.运行中项目");
            });
        }
        else {
            $.getScript("./JS/AppInfo.Client.js", function () {
                Doc.LoadAppInfo();
                Doc.LoadMenu();
                Doc.LeftMenuClick("LeftMenu.发起的项目");
            });
        }
     });
}


 