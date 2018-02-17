Doc.ShowView1 = function () {

    var leftMenuWidth = App.Doc.CSS.LeftMenu.Width.Value;
    var view1LeftListWidth = App.Doc.CSS.LeftList.View1.Width.Value + App.Doc.CSS.LeftList.View1.Width.Unit;
    var contentLeft = (leftMenuWidth + App.Doc.CSS.LeftList.View1.Width.Value) + "em";
    $("#leftList").css("width", view1LeftListWidth);
    $("#leftList").html($("#tplView1").html());
    $("#leftList").show();
    $("#content").css("left", contentLeft);
}

Doc.ShowView2 = function () {
    var leftMenuWidth = App.Doc.CSS.LeftMenu.Width.Value + "em";
    $("#leftList").html("");
    $("#leftList").hide();

    $("#content").css("left", leftMenuWidth);
}

Doc.ShowView3 = function () {
    var leftMenuWidth = App.Doc.CSS.LeftMenu.Width.Value;
    var view3LeftListWidth = App.Doc.CSS.LeftList.View3.Width.Value + App.Doc.CSS.LeftList.View3.Width.Unit;
    var contentLeft = (leftMenuWidth + App.Doc.CSS.LeftList.View3.Width.Value) + "em";
    $("#leftList").css("width", view3LeftListWidth);
    $("#leftList").html("");

    $("#leftList").show();
    $("#content").css("left", contentLeft);




}