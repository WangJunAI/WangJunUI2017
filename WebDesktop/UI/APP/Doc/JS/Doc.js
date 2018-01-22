var Doc = {
    AppInfo: {},
    Server: {
        Url1: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Find&p=0",
        Url2: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Count&p=0",
        Url3: "Detail.html",
        Url4: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Save&p=0",
        Url5: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Get&p=0",
        Url6: "Category.html",
        Url7: "http://localhost:9990/API.ashx?c=WangJun.Doc.CategoryManager&m=Save&p=0",
    },
};

///加载APP信息
Doc.LoadAppInfo = function () {
    var appInfo = App.Doc.Info;
    Doc.ShowAppInfo(appInfo);
}


Doc.ShowAppInfo = function (data) {
    $("#appName").text(data.Name);
}

Doc.LoadMenu = function (menuArray) {
    var menuArray = App.Doc.LeftMenu;
    Doc.ShowMenu(menuArray);
}

Doc.ShowMenu = function (data) {
    if (PARAM_CHECKER.IsArray(data)) {
        var groupHtml = $("#menuItem1").html();
        var itemHtml = $("#menuItem2").html();
        for (var k = 0; k < data.length; k++) {
            var itemData = data[k];
            var html = "";
            if (null === itemData.ParentID) {
                html = groupHtml.replace("[Name]", itemData.Name).replace("[Method]", itemData.Method).replace("[Param]", itemData.Param);
            }
            else {
                html = itemHtml.replace("[Name]", itemData.Name).replace("[Method]", itemData.Method).replace("[Param]", itemData.Param);
            }
            $("#leftMenu").append(html);
        }

    }


}

Doc.LoadTopButton = function () {
    var buttonArray = App.Doc.Content.TopButton;

    Doc.ShowTopButton(buttonArray);
}

Doc.ShowTopButton = function (data) {
    if (PARAM_CHECKER.IsArray(data)) {
        var topButtonHtml = $("#topButton1").html();
        for (var k = 0; k < data.length; k++) {
            var itemData = data[k];
            var html = topButtonHtml.replace("[Name]", itemData.Name).replace("[Method]", itemData.Method).replace("[Param]", itemData.Param);

            $(html).appendTo("#topButton");
        }
    }
}

Doc.LoadTable = function (pageIndex, pageSize) {

    if (!PARAM_CHECKER.IsInt(pageIndex)) {
        pageIndex = 0;
    }
    pageSize = 20;

    var callback = function (res) {

        var tableData = {
            Column: [], Rows: [], Pager: {}
        };
        tableData.Column.push({ ID: "", Text: "标题", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "分类", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "阅读量", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "点赞量", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "收藏量", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "创建时间", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "详细", Method: "", Sort: "" });
        var rows = res;

        for (var k = 0; k < rows.length; k++) {
            var title = rows[k].Title;
            var readCount = rows[k].ReadCount;
            var likeCount = rows[k].LikeCount;
            var commentCount = rows[k].CommentCount;
            var id = rows[k].id;
            var url = App.Doc.Server.Url3 + "?id=" + id;
            var categoryName = rows[k].CategoryName;
            var createTime = Convertor.DateFormat(eval(rows[k].CreateTime.replace(/\//g,"")),"yyyy-MM-dd hh:mm");
            tableData.Rows.push([{ ID: id, Text: title, Method: "Doc.ShowWindow", Param: url }, { ID: "", Text: categoryName, Method: "" }, { ID: "", Text: readCount, Method: "" }, { ID: "", Text: likeCount, Method: "" }, { ID: "", Text: commentCount, Method: "" }, { ID: "", Text: createTime, Method: "" }, { ID: id, Text: "详细", Method: "Doc.ShowWindow", Param: url }]);
        }


        Doc.ShowTable(tableData);

        Doc.LoadPager();
    }
    var context = ["{}", JSON.stringify({ "Content": 0 }),"{CreateTime:-1}", pageIndex, pageSize];
    NET.LoadData(Doc.Server.Url1, callback, context, NET.POST);
}

Doc.LoadPager = function () {
    var callback = function (res) {
        var pagerInfo = { Count: res.Count, Index: 3, Size: 20 }
        Doc.ShowPager(pagerInfo);
    }
    var context = ["{}"];
    NET.LoadData(Doc.Server.Url2, callback, context, NET.POST);
}

Doc.ShowTable = function (tableData) {
    if (PARAM_CHECKER.IsObject(tableData) && PARAM_CHECKER.IsArray(tableData.Column) && PARAM_CHECKER.IsArray(tableData.Rows)) {
        var columnHtml = "<tr>";
        for (var k = 0; k < tableData.Column.length; k++) {
            var itemData = tableData.Column[k];
            var html = "<th>[Text]</th>";
            columnHtml += html.replace("[Text]", itemData.Text);
        }
        columnHtml += "</tr>";

        var rowsHtml = "";
        for (var k = 0; k < tableData.Rows.length; k++) {
            var itemArray = tableData.Rows[k];
            var rowHtml = "<tr>";
            for (var m = 0; m < itemArray.length; m++) {
                var itemData = itemArray[m];
                var itemHtml = "<td><a href=\"[Href]\" onclick=\"[Method]()\" data-param=\"[Param]\">[Text]</a></td>";
                if (PARAM_CHECKER.IsEmptyString(itemData.Method)) {
                    rowHtml += itemHtml.replace("[Text]", itemData.Text).replace("href=\"[Href]\"", "");
                }
                else {
                    rowHtml += itemHtml.replace("[Text]", itemData.Text).replace("[Href]", "javascript:;").replace("[Method]", itemData.Method).replace("[Param]", itemData.Param);
                }
            }
            rowHtml += "</tr>";
            rowsHtml += rowHtml;
        }

        $("#thead1").html(columnHtml);
        $("#tbody1").html(rowsHtml);
    }
}

Doc.ShowPager = function (pagerInfo) {
    if (PARAM_CHECKER.IsObject(pagerInfo)) {
        var pagerCount = (0 === pagerInfo.Count % pagerInfo.Size) ? parseInt(pagerInfo.Count / pagerInfo.Size) : parseInt(pagerInfo.Count / pagerInfo.Size) + 1;
        var aHtml = "<a href=\"javascript:;\">共" + pagerInfo.Count + "个&nbsp;&nbsp;每页" + pagerInfo.Size + "个</a>";
        var selectionHtml = "<select onchange='var index=$(this).val();var method=\"Doc.LoadTable(\"+index+\")\";$(this).next().attr(\"onclick\",method)'>";
        var ellipsisHtml = "";

        for (var k = 0; k < pagerCount; k++) {
            var aItemHtml = "<a href=\"javascript:;\" onclick=[Method]([Param])>[Text]</a>";
            var optionHtml = "<option value=[Value]>[Text]</option>";
            if (k <= 3) {
                aHtml += aItemHtml.replace("[Text]", k + 1).replace("[Method]", "Doc.LoadTable").replace("[Param]", k);
            }
            else if (3 <= k && k <= pagerCount - 3 && 6 < pagerCount) {
                ellipsisHtml = "<a href=\"javascript:;\">....</a>";
            }
            else if (pagerCount - 3 <= k) {
                aHtml += ellipsisHtml + aItemHtml.replace("[Text]", k + 1).replace("[Method]", "Doc.LoadTable").replace("[Param]", k);
                ellipsisHtml = "";
            }
            selectionHtml += optionHtml.replace("[Text]", k + 1).replace("[Value]", k);
        }
        selectionHtml += "</select>";
        var html = aHtml + selectionHtml + "<a href=\"javascript:;\" onclick=[Method]([Param])>跳转</a>".replace("[Method]", "Doc.LoadTable").replace("[Param]", 0);
        $("#pager").html(html);
    }
}

Doc.ShowWindow = function (url) {
    url = (PARAM_CHECKER.IsNotEmptyString(url)) ? url : $(event.target).attr("data-param");
    $("#detailWindow iframe").attr("src", url);
    $("#detailWindow").show();
}

Doc.LoadDetail = function () {
    $(document).ready(function () {
        var id = NET.GetQueryParam("id");
        var context = [id];

        var callback = function (res) {
            LOGGER.Log(res);
            Doc.ShowDetail(res);
        }
        NET.LoadData(Doc.Server.Url5, callback, context, NET.POST);
    });
}

Doc.SaveDetail = function () {
    var item = {};
    item.Title = $("#Title").val().trim();
    item.Content = UE.getEditor('editor').getContent();
    item.CategoryID = $("#parentNode").attr("data-Param");
    item.CreatorID = "创建人ID";
    item.Content = item.Content.replace(/</g, "«").replace(/>/g, "»");
    item.PublistTime = $("#publishDate").val() + " " + $("#publishHour").val() + ":" + $("#publishMinute").val()+":00";

    var context = [item.Title, item.Content, item.CategoryID, item.PublistTime];

    var callback = function (res) {
        LOGGER.Log(res);
        $(window.parent.document).find('#detailWindow').hide(); window.close();
    }
    NET.PostData(Doc.Server.Url4, callback, context);
}

Doc.SaveCategory = function () {
    var item = {};
    item.Title = $("#Title").val().trim();
    //item.Content = UE.getEditor('editor').getContent();
    item.CreatorName = "创建人姓名";
    item.CreatorID = "创建人ID";
    item.ParentID = $("#parentNode").attr("data-param");
    // item.Content = item.Content.replace(/</g, "«").replace(/>/g, "»");
    var context = [item.Title, item.ParentID, item.CreatorName, item.CreatorID];

    var callback = function (res) {
        LOGGER.Log(res);
        $(window.parent.document).find('#detailWindow').hide(); window.close();
    }
    NET.PostData(Doc.Server.Url7, callback, context);

}

Doc.LoadCategory = function (target) {
    target = "#treeDemo";
    var zTreeOnClick = function (event, treeId, treeNode) {
        var name = treeNode.Name;
        $('#category').hide();
        $("#parentNode").text(name);
        $("#parentNode").attr("data-param",treeNode.id);
    }

    var zTreeOnDblClick = function (event, treeId, treeNode) {
        Doc.ShowWindow("Category.html");
    }
    var setting = {
        data: {
            key: {
                name: "Name"
            },
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "ParentID",
                rootPId: null
            }
        },
        callback: {
            onClick: zTreeOnClick,
            onDblClick: zTreeOnDblClick
        }
    };
 
    var context = ["{}", "{}", 0, 1000];

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.ShowCategory(target, setting, res);
    }
    NET.PostData(App.Doc.Server.Url8, callback, context);



}


Doc.ShowCategory = function (target, setting, zNodes) {
    $.fn.zTree.init($(target), setting, zNodes);
    $.fn.zTree.getZTreeObj($(target).attr("id")).expandAll(true);
}

Doc.ShowDetail = function (data) {
    if (PARAM_CHECKER.IsObject(data)) {
        var html = data.Content.substring(data.Content.indexOf("&lt;"), data.Content.lastIndexOf("&gt;") + 4);
        var $div = $("<div></div>").html(html);
        data.Content = $div.text();
        $("#Title").val(data.Title);
        $("#id").val(data.id);
        UE.getEditor('editor').setContent(data.Content);
        UE.getEditor('editor').setHeight(400);

    }
}

Doc.Initial = function () {
    $(document).ready(function () {
        Doc.LoadAppInfo();
        Doc.LoadMenu();
        Doc.LoadTopButton();
        Doc.LoadTable();
        Doc.LoadPager();
        Doc.LoadCategory();
    });
}