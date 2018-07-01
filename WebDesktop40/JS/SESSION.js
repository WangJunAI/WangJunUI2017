


var SESSION = {
    ServerHost: YunConfig.ServerHost(this) //("localhost" === window.location.hostname) ? window.location.protocol + "//" + window.location.hostname + ":9990" : "http://aifuwu.wang",
};
SESSION.LoginUrl = SESSION.ServerHost + "/API.ashx?c=WangJun.App.YunUserAPI&m=Login";
SESSION.RegisterUrl = SESSION.ServerHost + "/API.ashx?c=WangJun.Admin.AdminWebAPI&m=CreateCompany";
SESSION.Heartbeat = SESSION.ServerHost + "/API.ashx?c=WangJun.App.YunUserAPI&m=Heartbeat";
SESSION.IsFromPC = (function () {
    return "WeUI" != $("#PageName").val();
});


SESSION.Login = function () {
    if (true === SESSION.IsFromPC) {
        $(event.target).attr("disabled", "disabled");
        $(event.target).val("登录中,请稍后...");
    }
    else {

    }


    $.cookie("SESSION", JSON.stringify({ "UserID": "Login" }), { path: '/' });
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

    var callback = null;
    var callbackPC = function (res) {

        LOGGER.Log(res);
        $.cookie("SESSION", JSON.stringify(res), { path: '/' });
        alert("登陆成功" + res.UserName);
        window.location.href = "../Desktop/Desktop.html";
    }

    var callbackMobile = function (res) {
        App.Initial();
    }
    callback = (true === SESSION.IsFromPC()) ? callbackPC : callbackMobile;

     
    NET.PostData(url, callback, param);
}

SESSION.Current = function () {
    //return $.cookie("SESSION");
    var session = $.cookie("SESSION");
    if ("{}" === session || undefined === session) {
        var pageName = $("#pageName").val();
        if ("Login" != pageName && "Main" === pageName) {
            window.location.href = "../../Login/Login.html";
        }
        else if ("Desktop" === pageName) {
            window.location.href = "../Login/Login.html";

        }
        else if ("Detail" === pageName || "Detail.Company" === pageName) {
            window.location.href = "../../Login/Login.html";

        }
        return { UserID: "_" };
    }
    else {
        var res = JSON.parse(session);
        $("#userName").text(res.UserName);

        SESSION.SendHeartbeat();
        return res;
    }
}

SESSION.HeartbeatCount = 0;
SESSION.SendHeartbeat = function () {
    var pageName = $("#pageName").val();
    if (0 === SESSION.HeartbeatCount && "Desktop" === pageName) {
        SESSION.HeartbeatCount = 1;
        setInterval(function () {
            var current = SESSION.Current();
        }, 10000);
    }
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
            $("#personIcon").attr("href", "../APP/YunUser/Detail.html?id=[id]".replace("[id]", session.UserID));
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


    });
}

SESSION.Register = function () {
    if (true === SESSION.IsFromPC) {
        $(event.target).attr("disabled", "disabled");
        $(event.target).val("正在注册,请稍后...");
    }
    else {

    }


    $.cookie("SESSION", JSON.stringify({ "UserID": "CreateCompany" }), { path: '/' });
    var url = SESSION.RegisterUrl;

    var item = {};

    var $ctrls = $("[data-FormName='Default']").each(function () {
        var propertyName = $(this).attr("data-propertyName");
        var propertyValue = $(this).val();
        if (PARAM_CHECKER.IsNotEmptyString(propertyName)) {
            item[propertyName.trim()] = propertyValue;
        }
    });

    var param = [Convertor.ToBase64String(JSON.stringify(item), true), { 0: "base64" }];
    var callback = null;
    var callbackPC = function (res) {
        LOGGER.Log(res);
        if (true === PARAM_CHECKER.IsNotEmptyString()) {
            res = JSON.parse(res);
        }
        $.cookie("SESSION", JSON.stringify(res), { path: '/' });
        alert("注册成功" + res.CompanyName + " ，将以超级管理员 " + res.UserName + "身份登录");
        window.location.href = "../Desktop/Desktop.html";
    }

    var callbackMobile = function (res) {

    }
    callback = (true === SESSION.IsFromPC()) ? callbackPC : callbackMobile;

    NET.PostData(url, callback, param);
    $.cookie("SESSION", JSON.stringify({}), { path: '/' });

    ///动画显示
    var info = ["正在激活公司服务...", "正在初始化人员和组织管理服务...", "正在初始化新闻服务...", "正在初始化知识库服务...", "正在初始化云笔记服务...", "正在初始化群组服务...", "正在初始化云项目服务...", "正在初始化云盘服务...", "正在整合信息,即将完成..."];
    setInterval(function () {
        if (0 < info.length) {
            $("#regBtn").val(info.shift());
        }
    }, 2000);

}


SESSION.Initial();



