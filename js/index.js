$(function () {
  $("header").load("header.html");
  $("footer").load("footer.html");

  slider();
  getUserLocation();
  search_restaurant();
  doAjax(
    "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3aed834ab74d67bd&lat=35.6773686&lng=139.7694908&format=jsonp" +
      "&callback=successCall&count=5",
    1,
    1
  ); // url, range, startNum
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
