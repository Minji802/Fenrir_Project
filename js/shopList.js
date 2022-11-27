// 東京駅
// lat=35.680930
// lng=139.766863

let dataSet = [];

function search_restaurant() {
  // when the button clicked
  $(".search-button").click(function () {
    let range = $("#range2 option:selected").val(); //選択されたoptionのvalueを読み込む
    let latitude = $("#latitude").text(); //緯度
    let longitude = $("#longitude").text(); //軽度
    let startNum = 1;

    console.log(range);
    console.log(latitude);
    console.log(longitude);

    // let url =
    //   "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3aed834ab74d67bd&lat=35.680930&lng=139.766863&format=jsonp&callback=successCall&count=100&";

    // doAjax(url, range, startNum);

    let openUrl = `list-page.html?range=${range}`;
    window.open(openUrl);
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
  //console.log(data);
  let shops = data.results.shop;
  let cnt = data.results.results_available;

  dataSet.push.apply(dataSet, shops);

  let url =
    "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3aed834ab74d67bd&lat=35.6773686&lng=139.7694908&format=jsonp" +
    "&callback=successCall&count=100";
  let range = $("#range2").val();
  let startNum = parseInt($("#startNum").text()) + 100; // 1 ~ 100, 101 ~ 200, 201 ~ 300, .... 100以上　全ての情報を呼び出す
  $("#startNum").text(startNum);
  console.log(url);

  // // データパースの進行度を表す
  // if (parseInt((startNum / cnt) * 100) < 100) {
  //   $("#loading").text("Loading..." + parseInt((startNum / cnt) * 100) + "%");
  // }

  // // startNumがデータの総個数(results_available)を超えないように
  // if (parseInt(startNum / 100) != parseInt(cnt / 100) + 1) {
  //   doAjax(url, range, startNum);
  // } else {
  //   $("#loading").text("Loading...100%");
  //   pagination(dataSet);
  //   return;
  // }

  // index.htmlの一番近い五つのレストラン紹介の部分
  let content = "";
  if (shops.length != 0) {
    $.each(shops, function (i, s) {
      let shopObj = JSON.stringify(s);
      content = `<div class="shop-info" onclick='ShopDetail(${shopObj});'>
		 <div class="shop-img"><img src="${s.photo.pc.l}"></div>
		<div class="shop-title">${s.name}</div>
		</div>`;
      $("#search-list").append(content);
    });
    $("#search-list").css("display", "flex");
    $("#search-list").css("flex-wrap", "wrap");
    $("#search-list").css("justify-content", "center");
  }
}
