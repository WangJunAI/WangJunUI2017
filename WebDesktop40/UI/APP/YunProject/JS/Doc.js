 
var Doc = {};
  

Doc.Initial = function () {
    $(document).ready(function () {
        Doc.LoadAppInfo();
        Doc.LoadMenu(); 
        Doc.LeftMenuClick("LeftMenu.发起的项目");
     });
}


 