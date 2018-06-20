 

var Milestone = {
}



Milestone.AddCheckPoint = function (target, data) {
    if (false === PARAM_CHECKER.IsValid(data)) {
        var itemHtml = $("#tpl_Milestone_1").html();
        $(itemHtml).insertBefore($(event.target).parent());
    }
    else {
        if ("新增按钮" === data.Status) {
            $(target).append("<li>  <a href='javascript:;' class='addbtn' onclick='Milestone.AddCheckPoint()'>添加新时间节点</a>  </li>");
        }
        else {
            var itemHtml = $("#tpl_Milestone_6").html().replace(/\[Title\]/g, data.Title).replace(/\[Summary\]/g, data.Summary);
            $(target).append(itemHtml);
        }
    }
}

Milestone.EditCheckPoint = function (mode) {
    if ("readonly" === mode) {

        var data = {};
        $(event.target).parent().find("[data-PropertyName]").each(function () {
            var propertyName = $(this).attr("data-PropertyName");
            data[propertyName] = $(this).val();
        });

        var itemHtml = $("#tpl_Milestone_6").html().replace(/\[Title\]/g, data.Title).replace(/\[Summary\]/g, data.Summary);
        $(itemHtml).insertBefore($(event.target).parent().parent());

        $(event.target).parent().parent().remove();
    }
}

Milestone.EditTask = function (mode) {
    if ("readonly" === mode) {
        var data = {};
        $(event.target).parentsUntil("li").find("[data-PropertyName]").each(function () {
            var propertyName = $(this).attr("data-PropertyName");
            data[propertyName] = $(this).val();
        });

        var itemHtml = $("#tpl_Milestone_5").html().replace("[Title]", data.Title).replace("[ExpectedStopTime]", data.ExpectedStopTime);
        $(itemHtml).insertBefore($(event.target).parent().parent().parent());
        $(event.target).parent().parent().parent().remove();
    }
}


Milestone.AddTask = function (target, data) {
    var itemHtml = "";
    if (false === PARAM_CHECKER.IsValid(data)) {
        var itemHtml = $("#tpl_Milestone_7").html();
        $(itemHtml).insertBefore($(event.target).parent());
    }
    else {
        if ("已完成" === data.Status) {
            itemHtml = $("#tpl_Milestone_3").html().replace(/\[Title\]/g, data.Title).replace(/\[ExpectedStopTime\]/g, data.ExpectedStopTime).replace("[ID]", data.ID);
        }
        else if ("未开始" === data.Status) {
            itemHtml = $("#tpl_Milestone_5").html().replace(/\[Title\]/g, data.Title).replace(/\[ExpectedStopTime\]/g, data.ExpectedStopTime).replace("[ID]", data.ID);
        }
        else if ("进行中" === data.Status) {
            itemHtml = $("#tpl_Milestone_4").html().replace(/\[Title\]/g, data.Title).replace(/\[ExpectedStopTime\]/g, data.ExpectedStopTime).replace("[ID]", data.ID);
        }
        else if ("新增按钮" === data.Status) {
            itemHtml = "<li><a href='javascript:;' class='addbtn' onclick= 'Milestone.AddTask()'> 添加新任务</a></li>";
        }
        $(target).append(itemHtml);
    }

}

Milestone.CompleteTask = function () {
   
    var $sourceCtrl = $(event.target).parentsUntil("ul").last();
    var item = {};
    item.Title = $sourceCtrl.find("[data-propertyname='Title']").attr("data-PropertyValue");
    item.ExpectedStopTime = $sourceCtrl.find("[data-propertyname='ExpectedStopTime']").attr("data-PropertyValue");
    item.ActualStopTime = Convertor.DateFormat(new Date().toString(), "yyyy/MM/dd");
    var html = $("#tpl_Milestone_3").html().replace(/\[Title\]/g, item.Title).replace(/\[ExpectedStopTime\]/g, item.ExpectedStopTime).replace(/\[ActualStopTime\]/g, item.ActualStopTime);
    $(html).insertBefore($sourceCtrl);

    $(event.target).parentsUntil("ul").last().remove();

}


Milestone.LoadData = function (data) { 
    if (true === PARAM_CHECKER.IsArray(data) && 0 < data.length) {
        
    }
    else {
        data = [{ Status: "新增按钮", TaskArray: [] }];
    }
    Milestone.ShowData(data);
}

Milestone.GetData = function () {
    var dataArray = [];
    var checkPointArray = $("#milestone").find(".checkpoint");
    for (var k = 0; k < checkPointArray.length; k++) {
        var $checkPoint = $(checkPointArray[k]);
        var checkPoint = { TaskArray: [] };
        dataArray.push(checkPoint);
        $checkPoint.find("[data-PropertyName]").each(function () {
            var propertyName = $(this).attr("data-PropertyName");
            if (true === $(this).is("input")) {
                checkPoint[propertyName] = $(this).val();
            }
            else {
                checkPoint[propertyName] = $(this).attr("data-PropertyValue");

            }
        })

        var taskArray = $checkPoint.next("ul").find("li");
        for (var m = 0; m < taskArray.length; m++) {
            var $taskItem = $(taskArray[m]);
            var taskItem = {};
            $taskItem.find("[data-PropertyName]").each(function () {
                var propertyName = $(this).attr("data-PropertyName");
                if (true === $(this).is("input")) {
                    taskItem[propertyName] = $(this).val();
                }
                else {
                    taskItem[propertyName] = $(this).attr("data-PropertyValue");
                }
            })

            if (true === PARAM_CHECKER.IsNotEmptyObject(taskItem)) {
                taskItem["ID"] = new Date().getTime();
                checkPoint.TaskArray.push(taskItem);
            }
        }
    }

    return dataArray;
}

Milestone.ShowData = function (dataArray) {
    $("#milestone").empty();
    for (var k = 0; k < dataArray.length; k++) {
        var checkPoint = dataArray[k];
        Milestone.AddCheckPoint($("#milestone"),checkPoint);
        var $targetTask = $("#milestone").find(".checkpoint").last().next(); ///UL
        $targetTask.empty();
        var taskArray = checkPoint.TaskArray;
        for (var m = 0; m < taskArray.length; m++) {
            var task = taskArray[m];
            Milestone.AddTask($targetTask,task);
        }


    }
}
