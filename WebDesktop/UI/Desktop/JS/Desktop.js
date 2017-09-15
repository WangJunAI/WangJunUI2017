﻿

$(document).ready(function () {
    DESKTOP.Initial();
});

var DESKTOP = {
    
}

///创建一个对话框
DESKTOP.CreateDialog = function () {
    var id = "test";
    var url ="../../UI/APP/THS/THS.html";
    var html ='<div class="desktop_dialog" id="'+id+'">'
        + '<div class="title"><a href="javascript:void(0)" class="name">同花顺智能平台</a><a href="javascript:void(0)" class="fa fa-window-close button" onclick="$(this).parents(\'.desktop_dialog\').remove()"></a><a href="javascript:void(0)" class="fa fa-window-maximize button"></a><a class="fa fa-window-minimize button" href="javascript:void(0)"></a></div>'
        +'<iframe style="border:none; width:100%;height:calc(100% - (2em));" src="'+url+'"></iframe>'
            +'</div>';
    $(document.body).append($(html));
    $('.desktop_dialog').draggable();
}

///方法绑定
DESKTOP.EventBind = function () {
    $("[data-method]").each(function () {
        var val = $(this).attr("data-method");
        $(this).attr("onclick", val + "()");
        $(this).removeAttr("data-method");
    });
}

///显示或收缩开始菜单
DESKTOP.ToggleStartMenu = function () {
    $(".startmenu").toggle();
}

///显示或收缩通知中心
DESKTOP.ToggleNoticeCenter = function () {
    $(".notice_center").toggle();
}

///桌面初始化
DESKTOP.Initial = function () {
    DESKTOP.EventBind();
}