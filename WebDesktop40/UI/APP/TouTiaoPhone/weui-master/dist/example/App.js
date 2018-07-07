var App = {
    Server: {
        YunDoc: {
            Url1: YunConfig.ServerHost(this) + "/API.ashx?c=WangJun.YunDoc.YunDocWebAPI&m=LoadEntityList"
        }
    },
    Pager: { Size: 10 }
}














App.Initial = function () {
    App.TabClick();
    App.LoadTab1();
    App.LoadTab2();
    App.LoadTab3();
}

App.TabClick = function () {
    $('.weui-tabbar__item').on('click', function () {
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        var targetId = $(this).attr("targetId");
        $(".weui-tab__panel").hide();
        $("#" + targetId).show();
    });
}

App.AppClick = function () {
    $("#tab3 .weui-cell").on("click", function () {

        var targetId = $(this).attr("targetId");
        $(".weui-tab__panel").hide();
        $("#" + targetId).show();
    });
}

App.LoadTouTiao = function () {

}

App.LoadTab1 = function () {
    $(".weui-tab__panel").hide();
    $("#" + "tab1").show();
}

App.LoadTab2 = function () {
    ///通讯录
    var $searchBar = $('#searchBar'),
        $searchResult = $('#searchResult'),
        $searchText = $('#searchText'),
        $searchInput = $('#searchInput'),
        $searchClear = $('#searchClear'),
        $searchCancel = $('#searchCancel');

    function hideSearchResult() {
        $searchResult.hide();
        $searchInput.val('');
    }
    function cancelSearch() {
        hideSearchResult();
        $searchBar.removeClass('weui-search-bar_focusing');
        $searchText.show();
    }

    $searchText.on('click', function () {
        $searchBar.addClass('weui-search-bar_focusing');
        $searchInput.focus();
    });
    $searchInput
        .on('blur', function () {
            if (!this.value.length) cancelSearch();
        })
        .on('input', function () {
            if (this.value.length) {
                $searchResult.show();
            } else {
                $searchResult.hide();
            }
        })
        ;
    $searchClear.on('click', function () {
        hideSearchResult();
        $searchInput.focus();
    });
    $searchCancel.on('click', function () {
        cancelSearch();
        $searchInput.blur();
    });
}

App.LoadTab3 = function () { 
    $("#tab3 .weui-cell").on("click", function () {

        var targetId = $(this).attr("targetId");
        $(".weui-tab__panel").hide();
        $("#" + targetId).show();
        App.ShowMessage();
        App["Load" + targetId]();
    });
     
}

App.LoadTab5 = function () {
    TouTiao.Initial("list");
}


App.LoadTab6 = function () {
    var callback = function (res) {
        LOGGER.Log(res);
        App.ShowMessage();
        var vue = new Vue({
            el: "#hiddenTab6-1",
            data: {
                list: res
            },
            mounted: function () {
                $("#yunDocList").append($("#hiddenTab6-1").children());
                $("#hiddenTab6-1").empty();
            },
            methods: {
                TimeFormat: function (listItem) {
                    if (true === PARAM_CHECKER.IsNotEmptyString(listItem.CreateTime) && '/' === listItem.CreateTime[0]) {
                        listItem.CreateTime = eval("new " + listItem.CreateTime.replace(/\//g, ''));
                    }
                    else if (true === PARAM_CHECKER.IsDate(listItem.CreateTime)) {
                        listItem.CreateTime = Convertor.DateFormat(listItem.CreateTime, "yyyy/MM/dd hh:mm");
                    }

                    return listItem.CreateTime.toString();
                }
            }
        });
    }
    var query =     JSON.stringify({});
    var protection = JSON.stringify ({});
    var sort = JSON.stringify ({});
    var pageIndex = 0;
    var param = [query, protection, sort, pageIndex, App.Server.Size];
    NET.PostData(App.Server.YunDoc.Url1, callback, param);
}

App.Tab11Click = function () {
    $(".weui-media-box").on("click", function () {
        var targetId = $(this).attr("targetId");
        $(".weui-tab__panel").hide();
        $("#" + targetId).show();
        
        
    });
}

App.ShowMessage = function (type,message) {
    var $toast = ("loading" === type) ? $("#loadingToast") : $('#toast');
    $toast.text(message);
    if ($toast.css('display') != 'none') return;

        $toast.fadeIn(100);
        setTimeout(function () {
            $toast.fadeOut(100);
            $toast.text("未定义任何消息");
        }, 2000); 
 }