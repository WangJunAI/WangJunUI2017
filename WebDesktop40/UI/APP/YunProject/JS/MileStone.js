var Milestone = {
}



Milestone.AddCheckPoint = function (target, data) {
    if (false === PARAM_CHECKER.IsValid(data)) {
        var itemHtml = $("#tpl_Milestone_1").html();
        $(itemHtml).insertBefore($(event.target));
    }
    else {
        if ("新增按钮" === data.Status) {
            $(target).append("<li>  <a href='javascript:;' class='addbtn' onclick='Milestone.AddCheckPoint()'>添加新时间节点</a>  </li>");
        }
        else {

            var itemHtml = $("#tpl_Milestone_6").html().replace("[CheckPointTitle]", data.Title).replace("[CheckPointSummary]", data.Summary);
            $(target).append(itemHtml);
        }
    }
}

Milestone.AddTask = function (target, data) {
    var itemHtml = "";
    if (false === PARAM_CHECKER.IsValid(data)) {
        var itemHtml = $("#tpl_Milestone_7").html();
        $(itemHtml).insertBefore($(event.target));
    }
    else {
        if ("已完成" === data.Status) {
            itemHtml = $("#tpl_Milestone_3").html().replace("[Content]", data.Content).replace("[ExpectedEndTime]", data.ExpectedEndTime);
        }
        else if ("未开始" === data.Status) {
            itemHtml = $("#tpl_Milestone_5").html().replace("[Content]", data.Content).replace("[ExpectedEndTime]", data.ExpectedEndTime);
        }
        else if ("处理中" === data.Status) {
            itemHtml = $("#tpl_Milestone_4").html().replace("[Content]", data.Content).replace("[ExpectedEndTime]", data.ExpectedEndTime);
        }
        else if ("新增按钮" === data.Status) {
            itemHtml = "<li><a href='javascript:;' class='addbtn' onclick= 'Milestone.AddTask()'> 添加新任务</a></li>";
        }
        $(target).find("ul").append(itemHtml);
    }

}


Milestone.LoadData = function () {
    var data = [{
        Title: "完成界面代码", Summary: "预计2017年12月18日结束，当前完成度63.5%，剩余时间 4天", Status: ""
        , TaskArray: [{ "Status": "已完成", "Content": "将数据提交上去", "ExpectedEndTime": "2017/12/12" }, { "Status": "未开始", "Content": "将数据获取出来", "ExpectedEndTime": "2017/12/12" }, { "Status": "处理中", "Content": "最后完整检查一遍", "ExpectedEndTime": "2017/12/12" }, { "Status": "新增按钮" }]
    }
        , {
            Title: "完成JS测试", Summary: "预计2017年12月18日结束，当前完成度23.5%，剩余时间 4天"
            , TaskArray: [{ "Status": "已完成", "Content": "将数据提交上去", "ExpectedEndTime": "2017/12/12" }, { "Status": "未开始", "Content": "将数据获取出来", "ExpectedEndTime": "2017/12/12" }, { "Status": "处理中", "Content": "最后完整检查一遍", "ExpectedEndTime": "2017/12/12" }, { "Status": "新增按钮" }]

        }
        , { Status: "新增按钮", TaskArray: [] }];
    Milestone.ShowData(data);
}

Milestone.GetData = function () {

}

Milestone.ShowData = function (dataArray) {
    $("#milestone").empty();
    for (var k = 0; k < dataArray.length; k++) {
        var checkPoint = dataArray[k];
        Milestone.AddCheckPoint($("#milestone"),checkPoint);
        var $targetTask = $("#milestone").find("li").last();
        var taskArray = checkPoint.TaskArray;
        for (var m = 0; m < taskArray.length; m++) {
            var task = taskArray[m];
            Milestone.AddTask($targetTask,task);
        }


    }
}
