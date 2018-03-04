var SESSION = {};
SESSION.Login = function () {
    var url = "http://localhost:9990/API.ashx?c=WangJun.HumanResource.StaffWebAPI&m=Login";
    ///保存一个目录
         var item = {};

        var $ctrls = $("[data-FormName='Default']").each(function () {
            var propertyName = $(this).attr("data-propertyName");
            var propertyValue = $(this).attr("data-propertyValue");
            if (PARAM_CHECKER.IsNotEmptyString(propertyName)) {
                item[propertyName.trim()] = propertyValue;
            }
        });

        var param = [Convertor.ToBase64String(JSON.stringify(item), true), { 0: "base64" }];

        var callback = function (res) {
            LOGGER.Log(res);
            $.cookie("SESSION", JSON.stringify(res), { path: '/' });
            alert("登陆成功" + res.UserName);
            window.location.href = "../Desktop/Desktop.html";
         }
        NET.PostData(url, callback, param);
}

SESSION.Current = function () {
    //return $.cookie("SESSION");
    var session = $.cookie("SESSION");
    if (undefined === session) {
        return { UserID: "_" };
    }
    else {
        var res = JSON.parse(session);
        $("#userName").text(res.UserName);
        return res;
    }
}

///
SESSION.SendHeartbeat = function () {

}
