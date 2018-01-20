var Doc = {
    AppInfo: {},
    Server: {
        Url1: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Find&p=0",
        Url2: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Count&p=0",
        Url3: "Detail.html",
        Url4: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Save&p=0",
        Url5: "http://localhost:9990/API.ashx?c=WangJun.Doc.DocManager&m=Get&p=0",
    },
};

///加载APP信息
Doc.LoadAppInfo = function () {
    Doc.AppInfo.ID = "WDGL";
    Doc.AppInfo.Name = "汪俊文档管理";
    Doc.ShowAppInfo(Doc.AppInfo);
}


Doc.ShowAppInfo = function (data) {
    $("#appName").text(data.Name);
}

Doc.LoadMenu = function (menuArray) {
    var menuArray = [];
    menuArray.push({ Name: "文档操作", ID: "ptcd", Method: "", Position: "", ParentID: null });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "ptcd" });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "ptcd" });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "ptcd" });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "ptcd" });
    menuArray.push({ Name: "数据分析", ID: "glcd", Method: "", Position: "", ParentID: null });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "glcd" });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "glcd" });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "glcd" });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "glcd" });
    menuArray.push({ Name: "系统管理", ID: "glcd", Method: "", Position: "", ParentID: null });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "glcd" });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "glcd" });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "glcd" });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "glcd" });
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
                html = groupHtml.replace("[Name]", itemData.Name);
            }
            else {
                html = itemHtml.replace("[Name]", itemData.Name);
            }
            $("#leftMenu").append(html);
        }

    }


}

Doc.LoadTopButton = function () {
    var buttonArray = [];
    buttonArray.push({ Name: "文档中心", ID: "ptcd", Method: "", Position: "", ParentID: null });
    buttonArray.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd" });
    buttonArray.push({ Name: "新建", ID: "", Method: "Doc.ShowWindow", Param:"Url3", Position: "", ParentID: "ptcd" });
    buttonArray.push({ Name: "菜单1", ID: "", Method: "Doc.LoadArticle", Position: "", ParentID: "ptcd" });
    buttonArray.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "ptcd" });
    buttonArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "glcd" });
    buttonArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "glcd" });
    buttonArray.push({ Name: "|", ID: "", Method: "", Position: "", ParentID: "glcd" });
    buttonArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "glcd" });
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

Doc.LoadTable = function () {

    var callback = function (res) {

        var tableData = {
            Column: [], Rows: [], Pager: {}
        };

        tableData.Column.push({ ID: "", Text: "标题", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "分类", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "阅读量", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "点赞量", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "收藏量", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "详细", Method: "", Sort: "" });
        var rows = res;

        for (var k = 0; k < rows.length; k++) {
            var title = rows[k].Title;
            var readCount = rows[k].ReadCount;
            var likeCount = rows[k].LikeCount;
            var commentCount = rows[k].CommentCount;
            tableData.Rows.push([{ ID: "", Text: title, Method: "Doc.LoadDetail" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: readCount, Method: "" }, { ID: "", Text: likeCount, Method: "" }, { ID: "", Text: commentCount, Method: "Doc.LoadComment" }, { ID: "", Text: "详细", Method: "Doc.LoadDetail" }]);
        }

         
        tableData.Pager = { Count: 1088, Index: 3, Size: 20 };


        Doc.ShowTable(tableData);

        Doc.LoadPager();
    }
    var context = ["{}", JSON.stringify({ "Content": 0 }), 0, 20];
    NET.LoadData(Doc.Server.Url1, callback, context,NET.POST);
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
                var itemHtml = "<td><a href=\"[Href]\" onclick=\"[Method]\">[Text]</a></td>";
                if (PARAM_CHECKER.IsEmptyString(itemData.Method)) {
                    rowHtml += itemHtml.replace("[Text]", itemData.Text).replace("href=\"[Href]\"", "");
                }
                else {
                    rowHtml += itemHtml.replace("[Text]", itemData.Text).replace("[Href]", "javascript:;").replace("[Method]", itemData.Method);
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
        var aHtml = "<a href=\"javascript:;\">共" + pagerInfo.Count +"个&nbsp;&nbsp;每页"+pagerInfo.Size+"个</a>";
        var selectionHtml = "<select>";
        var ellipsisHtml = "";

        for (var k = 0; k < pagerCount; k++) {
            var aItemHtml = "<a href=\"javascript:;\">[Text]</a>";
            var optionHtml = "<option>[Text]</option>";
            if (k <= 3) {
                aHtml += aItemHtml.replace("[Text]", k + 1);
            }
            else if (3 <= k && k <= pagerCount - 3 && 6 < pagerCount) {
                ellipsisHtml = "<a href=\"javascript:;\">....</a>";
            }
            else if (pagerCount - 3 <= k) {
                aHtml += ellipsisHtml + aItemHtml.replace("[Text]", k + 1);
                ellipsisHtml = "";
            }
            selectionHtml += optionHtml.replace("[Text]", k + 1);
        }
        selectionHtml += "</select>";
        var html = aHtml + selectionHtml + "<a href=\"javascript:;\">跳转</a>";
        $("#pager").html(html);
    }
}
 
Doc.ShowWindow = function () {
    var urlid = $(event.target).attr("data-param");
    var url = Doc.Server[urlid];
    $("#detailWindow iframe").attr("src", url);
    $("#detailWindow").show();
}

Doc.LoadDetail = function () {
    var id = NET.GetQueryParam("id");
    var context = [id];

    var callback = function (res) {
        LOGGER.Log(res);
        Doc.ShowDetail(res);
    }
    NET.LoadData(Doc.Server.Url5, callback, context,NET.POST);
}

Doc.SaveDetail = function () {
    var item = {};
    item.Title = $("#Title").val().trim();
    item.Content = UE.getEditor('editor').getContent();
    item.CreatorName = "创建人姓名";
    item.CreatorID = "创建人ID";

    item.Content = item.Content.replace(/</g, "«").replace(/>/g,"»");
    var context = [item.Title, item.Content, item.CreatorName, item.CreatorID];
    
    var callback = function (res) {
        LOGGER.Log(res);
    }
    NET.PostData(Doc.Server.Url4, callback, context);

}

Doc.ShowDetail = function (data) {
    if (PARAM_CHECKER.IsObject(data)) {
        var html = data.Content.substring(data.Content.indexOf("&lt;"), data.Content.lastIndexOf("&gt;") + 4);
        var $div = $("<div></div>").html(html);
        data.Content = $div.text();
        $("#Title").val(data.Title);
        UE.getEditor('editor').setHeight(400);
        UE.getEditor('editor').setContent(data.Content);
    }
}

Doc.Initial = function () {
    $(document).ready(function () {
        Doc.LoadAppInfo();
        Doc.LoadMenu();
        Doc.LoadTopButton();
        Doc.LoadTable();
        Doc.LoadPager();
    });
}