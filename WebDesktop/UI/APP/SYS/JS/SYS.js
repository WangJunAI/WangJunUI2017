

///系统管理业务
var SYS = {
    POST: function (context, callback) {
        ///检查数据
        if (true === PARAM_CHECKER.IsObject(context)) {
            context = JSON.stringify(context);
        }

        $.ajax({
            url: "http://localhost:8990",
            data:context,
            type: "POST",
            success: function (data, textStatus) {
                callback(data);
            }
        });
    }
}

///创建一个新任务
SYS.CreateTask = function (data) {
    var context = {
        CMD: "系统任务",
        Method: "CreateTask",
        Args: {"ContentType":"测试任务添加"}
    };

    SYS.POST(context, function (res) {
        console.log(res);
    });
}

SYS.Initial = function () {
    $(document).ready(function () {
        SYS.CreateTask();
    });
};

SYS.Initial();
