

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
SYS.CreateTask = function () {

    ///搜集信息
    var formData = {};
    $("[data-form1]").each(function (index,ele) {
        var name = $(this).attr("data-form1");
        var val = $(this).val();
        formData[name] = val;
    });

    

    console.log(formData);

    var context = {
        CMD: "系统任务",
        Method: "CreateTask",
        Args: formData
    };

    SYS.POST(context, function (res) {
        console.log(res);
    });
}

SYS.Initial = function () {
    $(document).ready(function () {
        
    });
};

SYS.Initial();
