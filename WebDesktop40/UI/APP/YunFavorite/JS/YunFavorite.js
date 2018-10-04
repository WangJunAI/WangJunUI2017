var host = "http://api.aifuwu.wang:9990";
var vm = new Vue({
    el: "#yunfav",
    methods: {
        Save: Save
    }

});

function Save() {
    var url = $("#favurl").val().toLowerCase().replace(/group\//g, "a");
    $.ajax({
        method: "GET",
        url: host+"/API.ashx?c=WangJun.Yun.YunTools&m=HTTPGet&p0=" + url+"&p1=utf-8",
        data: "",
        success: function (res1) {
            console.log(res1);
            $html = $(res1);
            var title = $html.find(".article-title").text();
            var content = $html.find(".article-content").html();
            var parentName = $html.find(".articleInfo span").first().text().trim();
            var createTime = $html.find(".articleInfo .time").text().trim() + ":00";
            var article = {
                Title: title, Content: content, Version: 1, Name: "",CreateTime:createTime,ParentName:parentName, AppName: "今日头条", AppCode: 20181003
            }; 

            SaveArticle(article);
        },
        error: function (res2) {
            console.log(res2);

        }
    });
}

function SaveArticle(article) {
    var option2 = {
        url: host+"/API.ashx?_SID=Test&c=WangJun.App.YunWebAPI&m=SaveJson",
        method: "POST",
        data: JSON.stringify(["YunArticle", Convertor.ToBase64String(JSON.stringify(article), true), { 1: "base64" }]),
        success: function (res5) {
            console.log(res5); 
            $("[role='alert']").text(article.Title+" 收藏成功");
        },
        error: function (res6) {
            console.log(res6);
        }
    };
    $.ajax(option2);
}