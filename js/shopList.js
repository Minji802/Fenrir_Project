// 東京駅
// lat=35.680930
// lng=139.766863

function search_restaurant() {
  // when the button clicked
  $("#searchBtn").click(function () {
    let range = $("#range").val();
    let latitude = $("#latitude").text();
    let longitude = $("#longitude").text();
    let startNum = 1;

    console.log(range);
    console.log(latitude);
    console.log(longitude);

    let url =
      "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3aed834ab74d67bd&lat=35.680930&lng=139.766863&format=jsonp&callback=successCall&count=100&";

    doAjax(url, range, startNum);
  });
}

function doAjax(url, range, startNum) {
  $.ajax({
    url: url,
    async: false, //同期通信
    data: {
      range: range,
      start: startNum,
    },
    dataType: "jsonp",
  });
}

// result of getting restaurant
function successCall(data) {
  console.log(data);
}
