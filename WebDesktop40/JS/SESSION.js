 

 
var SESSION = {
    ServerHost: YunConfig.ServerHost(this) //("localhost" === window.location.hostname) ? window.location.protocol + "//" + window.location.hostname + ":9990" : "http://aifuwu.wang",
};
SESSION.LoginUrl = SESSION.ServerHost + "/API.ashx?c=WangJun.Yun.YunUser&m=Login";
SESSION.RegisterUrl = SESSION.ServerHost + "/API.ashx?c=WangJun.Admin.AdminWebAPI&m=CreateCompany";




SESSION.Login = function () {
    $(event.target).attr("disabled", "disabled");
    $(event.target).val("登录中,请稍后...");
    var url = SESSION.LoginUrl;
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
        if (("Detail.Company" === pageName || "Category.Company" === pageName) && true === SESSION.Current().IsSuperAdmin) {
            $('<input type="hidden" data-FormName="Default" data-propertyName="OwnerID" />').appendTo(document.body);
            $("[data-propertyName='OwnerID']").attr("data-PropertyValue", SESSION.Current().CompanyID);
        }

        SESSION.SendHeartbeat();
    });
}

SESSION.Register = function () {
    $(event.target).attr("disabled", "disabled");
    $(event.target).val("正在注册,请稍后...");


    $.cookie("SESSION", JSON.stringify({ "UserID":"CreateCompany"}), { path: '/' });
    var url = SESSION.RegisterUrl ;

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
    $.cookie("SESSION", JSON.stringify({}), { path: '/' });

    ///动画显示
    setTimeout(function () {
        $(event.target).val("正在初始化企业,请稍后...");
    }, 2000);

    setTimeout(function () {
        $(event.target).val("正在整合信息,即将完成...");
    }, 5000);

}


SESSION.Initial();



