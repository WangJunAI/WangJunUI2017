var Milestone = {
}



Milestone.AddCheckPoint = function (target) {
    var itemHtml = $("#tpl_Milestone_1").html();
    $(itemHtml).insertBefore($(event.target));
}

Milestone.AddTask = function () {
    var itemHtml = $("#tpl_Milestone_2").html();
    $(itemHtml).insertBefore($(event.target));

}
