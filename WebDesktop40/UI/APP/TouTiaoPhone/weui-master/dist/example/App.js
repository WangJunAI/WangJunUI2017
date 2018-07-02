var App = {
    
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
    });

    App.LoadTab5();
}

App.LoadTab5 = function () {
    TouTiao.Initial("list");



}

App.Tab11Click = function () {
    $(".weui-media-box").on("click", function () {
        var targetId = $(this).attr("targetId");
        $(".weui-tab__panel").hide();
        $("#" + targetId).show();
        TouTiao.LoadArticle();
        
    });
}

App.ShowMessage = function () {
    var $toast = $('#toast');
    if ($toast.css('display') != 'none') return;

        $toast.fadeIn(100);
        setTimeout(function () {
            $toast.fadeOut(100);
        }, 2000); 
 }