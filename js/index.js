/*Index Page */

//headerとfooter
$(window).on("load", function () {
  $("header").load("header.html");
  $("footer").load("footer.html");
});

$(function () {
  slider();
  getUserLocation();
  search_restaurant();
  doAjax(
    "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3aed834ab74d67bd&lat=35.680930&lng=139.766863&format=jsonp" +
      "&callback=successCall&count=5&range=1",
    1
  ); // url, startNum
});

// bxslider
function slider() {
  $(".bxslider").bxSlider({
    auto: true, // イメージ回転
    speed: 500, // 次のイメージに変わるのにかかる時間
    pause: 4000, // 一つのイメージが止まって見せる時間
    mode: "fade", // イメージが変わる方式
  });
}
