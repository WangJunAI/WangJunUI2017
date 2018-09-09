App = {};
App.YunNews2 = {};
App.YunNews2.Info = {};

App.YunNews2.Info.ID = "YunNews2";
App.YunNews2.Info.Name = "汪俊头条2";
App.YunNews2.Info.Version =1;

App.YunNews2.Server = {
    Url01: "http://localhost:9990/API.ashx?_SID=Test&c=WangJun.App.YunWebAPI&m=LoadList&p0=YunArticle&p1={}&p2={}&p3={}&p4=[pageIndex]&p5=[pageSize]"
};
App.YunNews2.VM01 = new Vue({
    el: '#list',
    data: {
        list: []
    }
});

App.YunNews2.LoadList = function (pageIndex, pageSize,callback) {
    var url = App.YunNews2.Server.Url01.replace("[pageIndex]", pageIndex).replace("[pageSize]", pageSize);
    $.getJSON(url, function (res) {
        console.log(res);
        App.YunNews2.VM01.list = App.YunNews2.VM01.list.concat(res);
        if (true === PARAM_CHECKER.IsFunction(callback)) {
            callback();
        }
    }); 
};

App.YunNews2.Initial = function () {
    $("[data-ctrl='pager']").on("click", function () {
        var _pager = this;
        var pageIndex = $(_pager).attr("data-pageIndex");
        var pageSize = $(_pager).attr("data-pageSize");
        var callback = function () {
            $(_pager).attr("data-pageIndex", parseInt(pageIndex) + 1);
        }; 

        App.YunNews2.LoadList(pageIndex, pageSize, callback);
    });
    $("[data-ctrl='pager']").click();
};

$(document).ready(function () {
    App.YunNews2.Initial();
});