$(function () {
  $("header").load("header.html");
  $("footer").load("footer.html");

  changeVal = true;
  getUserLocation();
  setTimeout(function () {
    const urlParams = new URLSearchParams(window.location.search);
    let range = urlParams.get("range");
    $("#range").val(range);
    let url =
      "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3aed834ab74d67bd&lat=35.6773686&lng=139.7694908&format=jsonp" +
      "&callback=successCall&count=100&";
    doAjax(url, range, 1);
  }, 100);
});

// tab menu
$(document).ready(function () {
  $("ul.tabs li").click(function () {
    var tab_id = $(this).attr("data-tab");

    $("ul.tabs li").removeClass("current");
    $(".tab-content").removeClass("current");

    $(this).addClass("current");
    $("#" + tab_id).addClass("current");
  });
});
