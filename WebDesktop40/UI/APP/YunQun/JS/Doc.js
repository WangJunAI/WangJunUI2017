﻿ 
var Doc = {};
 
 

Doc.Initial = function () {
    $(document).ready(function () {
 

        if (true === SESSION.Current().CanManageYunQun) {
            $.getScript("./JS/AppInfo.Admin.js", function () {
                Doc.LoadAppInfo();
                Doc.LoadMenu();
                Doc.LeftMenuClick("LeftMenu.活跃群组");
            });
        }
        else {
            $.getScript("./JS/AppInfo.Client.js", function () {
                Doc.LoadAppInfo();
                Doc.LoadMenu();
                Doc.LeftMenuClick("LeftMenu.创建的群组");
            });
        }
     });
}
 