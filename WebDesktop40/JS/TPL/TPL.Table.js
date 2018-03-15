 
Doc.SetQuery = function (query,replace) {
    if (true === PARAM_CHECKER.IsNotEmptyString(query)) {
        query = JSON.parse(query);
    }


    if (true === replace) {
        $("#tableQuery").val(JSON.stringify(query));
    }
    else {
        var oldQuery = Doc.GetQuery();
        if ((JSON.stringify({}) === JSON.stringify(oldQuery)) && true === PARAM_CHECKER.IsArray(query)) {
            oldQuery = query;
        }
        else {
            for (var key in query) {
                oldQuery[key] = query[key];
            }
        }
        $("#tableQuery").val(JSON.stringify(oldQuery));
    }
}

Doc.GetQuery = function () {
    var query = $("#tableQuery").val();
    if (true ===  PARAM_CHECKER.IsNotEmptyString(query)) {
        return JSON.parse(query);
    }
    return {};
}


Doc.LoadPager = function (pageIndex, pageSize, query, tableInfo) {
    var pagerUrl = tableInfo.Pager.Url;
    var callback = function (res) {
        var data = res[0];
        var pagerInfo = { Count: data.Count, Index: pageIndex, Size: pageSize }
        Doc.ShowPager(pagerInfo, tableInfo);
    }

    var param = [];
    if (true === PARAM_CHECKER.IsArray(query)) {
        param = [JSON.stringify(query[0])];
    }
    else {
        param = query;
    }

    NET.LoadData(pagerUrl, callback, param, NET.POST);
    
}

Doc.ShowTable = function (tableData) {
    if (PARAM_CHECKER.IsObject(tableData) && PARAM_CHECKER.IsArray(tableData.Column) && PARAM_CHECKER.IsArray(tableData.Rows)) {
        var columnHtml = "<tr>";
        for (var k = 0; k < tableData.Column.length; k++) {
            var itemData = tableData.Column[k];
            var html = "<th>[Text]</th>";
            if (0 == k) {
                html = "<th><input type='checkbox' onclick=Doc.ToggleTableRows() /></th>"
            }

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
                if (0 == m) {
                    itemHtml = "<td><input type='checkbox' data-param='[id]'/></td>".replace("[id]", itemData.ID);
                }
                if ("Button" === itemData.Type) {
                    if (PARAM_CHECKER.IsEmptyString(itemData.Method)) {
                        rowHtml += itemHtml.replace("[Text]", itemData.Text).replace("href=\"[Href]\"", "");
                    }
                    else {
                        rowHtml += itemHtml.replace("[Text]", itemData.Text).replace("[Href]", "javascript:;").replace("[Method]", itemData.Method).replace("[Param]", itemData.ID);
                    }
                }
                else if ("DownloadLink" === itemData.Type) {
                    itemHtml = "<td><a target='_blank' href='[Href]' >[Text]</a></td>";
                    rowHtml += itemHtml.replace("[Text]", itemData.Text).replace("[Href]", itemData.Href);
                }
            }
            rowHtml += "</tr>";
            rowsHtml += rowHtml;
        }

        $("#thead1").html(columnHtml);
        $("#tbody1").html(rowsHtml);
    }
}

Doc.ShowPager = function (pagerInfo, tableInfo) {
    if (PARAM_CHECKER.IsObject(pagerInfo)) {
        var pagerCount = (0 === pagerInfo.Count % pagerInfo.Size) ? parseInt(pagerInfo.Count / pagerInfo.Size) : parseInt(pagerInfo.Count / pagerInfo.Size) + 1;
        var aSummaryHtml = "<a href=\"javascript:;\">共" + pagerInfo.Count + "个&nbsp;&nbsp;每页" + pagerInfo.Size + "个</a>";
        var selectionHtml = "<select onchange='var index=$(this).val();var method=\"Doc.LoadTable(\"+index+\")\";$(this).next().attr(\"onclick\",method)'>";
        var ellipsisHtml = "";
        var aItemTplHtml = "<a href=\"javascript:;\" class=\"[Class]\" data-Index=\"[Index]\">[Text]</a>";
        var ellipsisTplHtml = "<a href=\"javascript:;\">....</a>";
        var pagerIndexClick = tableInfo.Pager.PagerIndexClick;
        ///生成页码
        var aIndexHtml = "";
        for (var k = pagerInfo.Index - 2; k <= pagerInfo.Index + 2; k++) {
            ///生成前两个和后两个
            if (0 <= k && k < pagerCount - 1) {
                aIndexHtml += aItemTplHtml.replace("[Text]", k + 1).replace("[Index]", k);
            }
        }
        ///若Index小于等于3,则不生成
        if (3 <= pagerInfo.Index) {
            //生成1和省略
            aIndexHtml = aItemTplHtml.replace("[Text]", 0 + 1).replace("[Index]", 0) + ellipsisTplHtml + aIndexHtml;
        }

        if (pagerInfo.Index < pagerCount - 2) {
            ///生成最后一页和省略
            aIndexHtml = aIndexHtml + ellipsisTplHtml + aItemTplHtml.replace("[Text]", (pagerCount - 1) + 1).replace("[Index]", (pagerCount - 1));
        }
        else if (pagerInfo.Index === pagerCount - 2) {
            ///生成最后一页和省略
            aIndexHtml = aIndexHtml + aItemTplHtml.replace("[Text]", (pagerCount - 1) + 1).replace("[Index]", (pagerCount - 1));
        }
        else if (pagerInfo.Index === pagerCount - 1) {
            ///生成最后一页和省略
            aIndexHtml = aIndexHtml + aItemTplHtml.replace("[Text]", (pagerCount - 1) + 1).replace("[Index]", (pagerCount - 1));
        }

        for (var k = 0; k < pagerCount; k++) {
            var optionHtml = "<option value=[Value]>[Text]</option>";
            selectionHtml += optionHtml.replace("[Text]", k + 1).replace("[Value]", k);
        }

        selectionHtml += "</select><a href=\"javascript:;\" onclick=[Method]([Param])>跳转</a>".replace("[Method]", "Doc.LoadTable").replace("[Param]", 0 + "," + pagerInfo.Size + ",'" + '{"Status":"已发布"}' + "'");
        var html = aSummaryHtml + aIndexHtml + selectionHtml;
        $("#pager").html(html);

        $("#pager").find("[data-Index=\"" + pagerInfo.Index + "\"]").addClass("selected");
        $("#pager").find("[data-Index]").on("click", pagerIndexClick)
    }
}

Doc.TableRowClick = function () {
    var param = $(event.target).attr("data-param");
    var url = App.Doc.Data.DocTable.Info.RowClickDetailUrl + "id=" + param;
    Doc.ShowWindow(url);
}


////
Doc.LoadTable = function (pageIndex, pageSize, query, tableInfo) {
 
    var param = [0, 1, 2, 3, 4];
    if (!PARAM_CHECKER.IsInt(pageIndex)) {
        pageIndex = 0;
    } 
    if (true === PARAM_CHECKER.IsArray(query) && 3 === query.length) {
        if (true === PARAM_CHECKER.IsObject(query[0])) {
            param[0] = JSON.stringify(query[0]);
        }
        else if (true === PARAM_CHECKER.IsNotEmptyString(query[0])) {
            param[0] = query[0];
        }

        if (true === PARAM_CHECKER.IsObject(query[1])) {
            param[1] = JSON.stringify(query[1]);
        }
        else if (true === PARAM_CHECKER.IsNotEmptyString(query[1])) {
            param[1] = query[1];
        }

        if (true === PARAM_CHECKER.IsObject(query[2])) {
            param[2] = JSON.stringify(query[2]);
        }
        else if (true === PARAM_CHECKER.IsNotEmptyString(query[2])) {
            param[2] = query[2];
        }

        param[3] = pageIndex;
        param[4] = pageSize;
    }
    else if (false === PARAM_CHECKER.IsNotEmptyString(query)) {
        param = [JSON.stringify(query), "{}", "{DeleteTime:-1}", pageIndex, pageSize];
    }
    else {
        param = [query, "{}", "{DeleteTime:-1}", pageIndex, pageSize];
    }

    var listDataUrl = tableInfo.Data.Url;
    var tplTable = $("#tplTable").html();
    Doc.ShowContent(tplTable);



    var callback = function (res) {

        var tableData = {
            Column: [], Rows: [], Pager: {}
        };
        tableData.Column = tableInfo.Column;
 
        var rows = res;

        for (var k = 0; k < rows.length; k++) {
             var id = rows[k].ID;
             var rowData = [{ ID: id, Text: "checkbox", Method: "", Type: "Button" }];

            for (var m = 1; m < tableData.Column.length; m++) {
                var column = tableData.Column[m];
                var propertyName = column.PropertyName;
                var dataType = column.DataType;
                var value = rows[k][propertyName];
                var defaultVal = column.Value;
                var method = column.Method;
                if ("string" === dataType) {
                    rowData.push({ ID: id, Text: value, Method: method, Type: "Button" });
                }
                else if ("date" === dataType) {
                    var date = Convertor.DateFormat(eval(value.replace(/\//g, "")), "yyyy/MM/dd hh:mm");
                    rowData.push({ ID: id, Text: date, Method: method, Type: "Button"  });
                }
                else if ("link" === dataType) {
                    rowData.push({ ID: id, Text: defaultVal,Type:"DownloadLink",Href:value });
                }
                else if ("checkbox" === dataType) {
                }
            }
            tableData.Rows.push(rowData);
        }


        Doc.ShowTable(tableData);

        Doc.LoadPager(pageIndex, pageSize, query,tableInfo);
    }
     
    NET.LoadData(listDataUrl, callback, param, NET.POST);
}