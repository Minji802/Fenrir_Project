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
function tabMenu() {
  $("ul.tabs li").click(function () {
    var tab_id = $(this).attr("data-tab");

    $("ul.tabs li").removeClass("current");
    $(".tab-content").removeClass("current");

    $(this).removeClass("bookmark");
    $(this).addClass("current");
    $("." + tab_id).addClass("current");
  });
}

// shop bookmark　機能
function favoriteShop(obj) {
  var bookmarkBtn = document.getElementById("bookmark-btn");
  bookmarkBtn.style.color = "#ff5c5d";
  alert("ブックマーク機能は準備中です。少々お待ちください。");
  // var bookmarkBtn = document.getElementsByClassName("selected");
  // $(obj).addClass("selected");
}
