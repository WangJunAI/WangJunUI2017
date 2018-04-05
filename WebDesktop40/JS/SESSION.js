 
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
    if ("{}" === session || undefined === session) {
        var pageName = $("#pageName").val();
        if ("Login" != pageName) {
            window.location.href = "../Login/Login.html";
        }
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
    //setInterval(function () {
    //    var current = SESSION.Current();
    //},5000);
}


SESSION.Logout = function () {
    $.cookie("SESSION", JSON.stringify({}), { path: '/' });
    SESSION.Current();
}



SESSION.Initial = function () {
    $(document).ready(function () {
        var pageName = $("#pageName").val();
        if ("Login" === pageName) {

        }
        else if ("Desktop" === pageName) {
            var session = SESSION.Current();
            $("#personIcon").attr("href", "../APP/Staff/Detail.html?id=[id]".replace("[id]", session.UserID));
        }
        else if ("TouTiao" === pageName) {
            $("[data-PropertyName='Name']").text(SESSION.Current().UserName);
            $("[data-PropertyName='Position']").text(SESSION.Current().Position);
        }
        else if ("TouTiaoArticle" === pageName) {
            $("[data-PropertyName='Name']").text(SESSION.Current().UserName);
            $("[data-PropertyName='Position']").text(SESSION.Current().Position);
        }
        if (("Detail" === pageName || "Category" === pageName) && true === SESSION.Current().IsSuperAdmin) {
            $('<input type="hidden" data-FormName="Default" data-propertyName="OwnerID" />').appendTo(document.body);
            $("[data-propertyName='OwnerID']").attr("data-PropertyValue", SESSION.Current().CompanyID);
        }

        SESSION.SendHeartbeat();
    });
}

SESSION.Register = function () {
    $.cookie("SESSION", JSON.stringify({"UserID":"Register"}), { path: '/' });
    var url = "http://localhost:9990//API.ashx?c=WangJun.Admin.AdminWebAPI&m=CreateCompany";

    var item = {};

    var $ctrls = $("[data-FormName='Default']").each(function () {
        var propertyName = $(this).attr("data-propertyName");
        var propertyValue = $(this).val();
        if (PARAM_CHECKER.IsNotEmptyString(propertyName)) {
            item[propertyName.trim()] = propertyValue;
        }
    });

    var param = [Convertor.ToBase64String(JSON.stringify(item), true), { 0: "base64" }];

    var callback = function (res) {
        LOGGER.Log(res);
        $.cookie("SESSION", JSON.stringify(res), { path: '/' });
        alert("注册成功" + res.UserName);
        window.location.href = "../Desktop/Desktop.html";
    }
    NET.PostData(url, callback, param);
    $.cookie("SESSION", JSON.stringify({  }), { path: '/' });

}


SESSION.Initial();



