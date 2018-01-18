var Doc = {
    AppInfo: {}
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
    menuArray.push({ Name: "普通菜单", ID: "ptcd", Method: "", Position: "", ParentID: null });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "ptcd" });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "ptcd" });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "ptcd" });
    menuArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "ptcd" });
    menuArray.push({ Name: "管理菜单", ID: "glcd", Method: "", Position: "", ParentID: null });
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
    buttonArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "ptcd" });
    buttonArray.push({ Name: "菜单1", ID: "", Method: "", Position: "", ParentID: "ptcd" });
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
            var html = topButtonHtml.replace("[Name]", itemData.Name);
 
            $(html).appendTo("#topButton");
        }
    }
}

Doc.LoadTable = function () {
    var tableData = {
        Column: [], Rows: [], Pager: {}
    };

    tableData.Column.push({ ID: "", Text: "列名1", Method: "", Sort: "" });
    tableData.Column.push({ ID: "", Text: "列名1", Method: "", Sort: "" });
    tableData.Column.push({ ID: "", Text: "列名1", Method: "", Sort: "" });
    tableData.Column.push({ ID: "", Text: "列名1", Method: "", Sort: "" });
    tableData.Column.push({ ID: "", Text: "列名1", Method: "", Sort: "" });


    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);
    tableData.Rows.push([{ ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }, { ID: "", Text: "数值1", Method: "" }]);

    tableData.Pager = { Count: 1088, Index: 3, Size: 20 };

    Doc.ShowTable(tableData);
    Doc.ShowPager(tableData.Pager);
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
                var itemHtml = "<td>[Text]</td>";
                rowHtml += itemHtml.replace("[Text]",itemData.Text);
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

Doc.LoadPager = function (pagerData) {

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