
Doc.LoadTable = function (pageIndex, pageSize, query) {
 
    var tplTable = $("#tplTable").html();
    Doc.ShowContent(tplTable);

    if (!PARAM_CHECKER.IsInt(pageIndex)) {
        pageIndex = 0;
    }
    //pageSize = 20;

    var callback = function (res) {

        var tableData = {
            Column: [], Rows: [], Pager: {}
        };
        tableData.Column.push({ ID: "", Text: "全选", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "标题", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "分类", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "阅读量", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "点赞量", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "收藏量", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "发布时间", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "创建时间", Method: "", Sort: "" });
        tableData.Column.push({ ID: "", Text: "状态", Method: "", Sort: "" });
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
            var createTime = Convertor.DateFormat(eval(rows[k].CreateTime.replace(/\//g, "")), "yyyy/MM/dd hh:mm");
            var status = rows[k].Status;
            tableData.Rows.push([{ ID: id, Text: "checkbox", Method: "", Param: url }, { ID: id, Text: title, Method: "Doc.TableRowClick", Param: url }, { ID: "", Text: categoryName, Method: "" }, { ID: "", Text: readCount, Method: "" }, { ID: "", Text: likeCount, Method: "" }, { ID: "", Text: commentCount, Method: "" }, { ID: "", Text: createTime, Method: "" }, { ID: "", Text: createTime, Method: "" }, { ID: "", Text: status, Method: "" }, { ID: id, Text: "详细", Method: "Doc.TableRowClick", Param: url }]);
        }


        Doc.ShowTable(tableData);

        Doc.LoadPager(pageIndex, pageSize, query);
    }
    var context = [query, JSON.stringify({ "Content": 0, "PlainText": 0 }), "{CreateTime:-1}", pageIndex, pageSize];
    NET.LoadData(App.Doc.Server.Url1, callback, context, NET.POST);
}

Doc.LoadPager = function (pageIndex, pageSize, query, pagerParam) {
    var callback = function (res) {
        var pagerInfo = { Count: res.Count, Index: pageIndex, Size: pageSize }
        Doc.ShowPager(pagerInfo);
    }
    var context = [query];
    if (true === PARAM_CHECKER.IsObject(pagerParam)) {
        NET.LoadData(pagerParam.Url, callback, context, NET.POST);
    }
    else {
        NET.LoadData(App.Doc.Server.Url2, callback, context, NET.POST);
    }

}

Doc.LoadPager2 = function (pageIndex, pageSize, query, tableInfo) {
    var pagerUrl = tableInfo.Pager.Url;
    var callback = function (res) {
        var pagerInfo = { Count: res.Count, Index: pageIndex, Size: pageSize }
        Doc.ShowPager2(pagerInfo, tableInfo);
    }
    var context = [query];

    NET.LoadData(pagerUrl, callback, context, NET.POST);
    
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
        var aSummaryHtml = "<a href=\"javascript:;\">共" + pagerInfo.Count + "个&nbsp;&nbsp;每页" + pagerInfo.Size + "个</a>";
        var selectionHtml = "<select onchange='var index=$(this).val();var method=\"Doc.LoadTable(\"+index+\")\";$(this).next().attr(\"onclick\",method)'>";
        var ellipsisHtml = "";
        var aItemTplHtml = "<a href=\"javascript:;\" class=\"[Class]\" onclick=[Method]([Param]) data-param=\"[Index]\">[Text]</a>";
        var ellipsisTplHtml = "<a href=\"javascript:;\">....</a>";
        ///生成页码
        var aIndexHtml = "";
        for (var k = pagerInfo.Index - 2; k <= pagerInfo.Index + 2; k++) {
            ///生成前两个和后两个
            if (0<= k&&k<pagerCount-1) {
                aIndexHtml += aItemTplHtml.replace("[Text]", k + 1).replace("[Method]", "Doc.LoadTable").replace("[Param]", k + "," + pagerInfo.Size + ",'" + '{"Status":"已发布"}' + "'").replace("[Index]", k);
            }
        }
        ///若Index小于等于3,则不生成
        if (3 <= pagerInfo.Index) {
            //生成1和省略
            aIndexHtml = aItemTplHtml.replace("[Text]", 0 + 1).replace("[Method]", "Doc.LoadTable").replace("[Param]", 0 + "," + pagerInfo.Size + ",'" + '{"Status":"已发布"}' + "'").replace("[Index]", 0) + ellipsisTplHtml + aIndexHtml ;
        }

        if (pagerInfo.Index < pagerCount-2) {
            ///生成最后一页和省略
            aIndexHtml = aIndexHtml + ellipsisTplHtml + aItemTplHtml.replace("[Text]", (pagerCount - 1) + 1).replace("[Method]", "Doc.LoadTable").replace("[Param]", (pagerCount - 1) + "," + pagerInfo.Size + ",'" + '{"Status":"已发布"}' + "'").replace("[Index]", (pagerCount - 1)) ;
        }
        else if (pagerInfo.Index === pagerCount-2) {
            ///生成最后一页和省略
            aIndexHtml = aIndexHtml  + aItemTplHtml.replace("[Text]", (pagerCount - 1) + 1).replace("[Method]", "Doc.LoadTable").replace("[Param]", (pagerCount - 1) + "," + pagerInfo.Size + ",'" + '{"Status":"已发布"}' + "'").replace("[Index]", (pagerCount - 1));
        }
        else if (pagerInfo.Index === pagerCount - 1) {
            ///生成最后一页和省略
            aIndexHtml = aIndexHtml + aItemTplHtml.replace("[Text]", (pagerCount - 1) + 1).replace("[Method]", "Doc.LoadTable").replace("[Param]", (pagerCount - 1) + "," + pagerInfo.Size + ",'" + '{"Status":"已发布"}' + "'").replace("[Index]", (pagerCount - 1));
        }

        for (var k = 0; k < pagerCount; k++) {
            var optionHtml = "<option value=[Value]>[Text]</option>";
            selectionHtml += optionHtml.replace("[Text]", k + 1).replace("[Value]", k);
        }

        selectionHtml += "</select><a href=\"javascript:;\" onclick=[Method]([Param])>跳转</a>".replace("[Method]", "Doc.LoadTable").replace("[Param]", 0+ "," + pagerInfo.Size + ",'" + '{"Status":"已发布"}' + "'");
        var html = aSummaryHtml + aIndexHtml + selectionHtml;
        $("#pager").html(html);

        $("#pager").find("[data-param=\"" + pagerInfo.Index + "\"]").addClass("selected");
    }
}

Doc.ShowPager2 = function (pagerInfo, tableInfo) {
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
    var url = $(event.target).attr("data-param");
    Doc.ShowWindow(url);
}


////
Doc.LoadTable2 = function (pageIndex, pageSize, query,tableInfo) {
    var listDataUrl = tableInfo.Data.Url;
    var tplTable = $("#tplTable").html();
    Doc.ShowContent(tplTable);

    if (!PARAM_CHECKER.IsInt(pageIndex)) {
        pageIndex = 0;
    } 

    var callback = function (res) {

        var tableData = {
            Column: [], Rows: [], Pager: {}
        };
        tableData.Column = tableInfo.Column;
 
        var rows = res;

        for (var k = 0; k < rows.length; k++) {
             var id = rows[k].id;
             var rowData = [{ ID: id, Text: "checkbox", Method: "" }];

            for (var m = 1; m < tableData.Column.length; m++) {
                var column = tableData.Column[m];
                var propertyName = column.PropertyName;
                var dataType = column.DataType;
                var value = rows[k][propertyName];
                var defaultVal = column.Value;
                var method = column.Method;
                if ("string" === dataType) {
                    rowData.push({ ID: id, Text: value, Method: method });
                }
                else if ("date" === dataType) {
                    var date = Convertor.DateFormat(eval(value.replace(/\//g, "")), "yyyy/MM/dd hh:mm");
                    rowData.push({ ID: id, Text: date, Method: method });
                }
                else if ("link" === dataType) {
                    rowData.push({ ID: id, Text: defaultVal, method });
                }
                else if ("checkbox" === dataType) {

                }
            }
            tableData.Rows.push(rowData);
        }


        Doc.ShowTable(tableData);

        Doc.LoadPager2(pageIndex, pageSize, query,tableInfo);
    }
    var context = [query,"{}", "{DeleteTime:-1}", pageIndex, pageSize];
    NET.LoadData(listDataUrl, callback, context, NET.POST);
}