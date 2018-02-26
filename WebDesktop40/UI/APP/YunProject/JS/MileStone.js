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

            var itemHtml = $("#tpl_Milestone_6").html();
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
             itemHtml = $("#tpl_Milestone_3").html();
        }
        else if ("未开始" === data.Status) {
             itemHtml = $("#tpl_Milestone_5").html();
        }
        else if ("处理中" === data.Status) {
             itemHtml = $("#tpl_Milestone_4").html();
        }
        else if ("新增按钮" === data.Status) {
            itemHtml = "<li><a href='javascript:;' class='addbtn' onclick= 'Milestone.AddTask()'> 添加新任务</a></li>";
        }
        $(target).find("ul").append(itemHtml);
    }

}


Milestone.LoadData = function () {
    var data = [{ Status: "", TaskArray: [{ "Status": "已完成" }, { "Status": "未开始" }, { "Status": "处理中" }, { "Status": "新增按钮" }] }, { TaskArray: [{ "Status": "已完成" }, { "Status": "未开始" }, { "Status": "处理中" }, { "Status": "新增按钮" }] }, { Status: "新增按钮", TaskArray:[]}];
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
