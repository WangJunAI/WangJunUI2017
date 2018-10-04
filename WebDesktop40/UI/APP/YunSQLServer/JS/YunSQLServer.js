var host = "http://localhost:9990";
var vm = new Vue({
    el: "#yunsql",
    methods: {
        Save: Save
    }

});

function Save() {
    var sql = $("#sql").val();
    var data = { SQL: sql};
    $.ajax({
        method: "POST",
        url: host +"/API.ashx?c=WangJun.Yun.YunSQLServer&m=Execute",
        data: JSON.stringify([Convertor.ToBase64String(JSON.stringify(data), true), { 0: "base64" }]),
        success: function (res1) {
            console.log(res1);
            $("[role='alert']").text(data.SQL + " 执行成功");
         },
        error: function (res2) {
            console.log(res2);

        }
    });
} 