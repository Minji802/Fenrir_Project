// 東京駅
// lat=35.680930
// lng=139.766863

let dataSet = [];
let changeVal = false; // indexとlist-pageを分ける

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

  if (changeVal) {
    /* list-page.htmlで見せる*/
    console.log(changeVal);
    let url =
      "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3aed834ab74d67bd&lat=35.6773686&lng=139.7694908&format=jsonp" +
      "&callback=successCall&count=100";
    let range = $("#range").val();
    let startNum = parseInt($("#startNum").text()) + 100; // 1 ~ 100, 101 ~ 200, 201 ~ 300, .... 100以上　全ての情報を呼び出す
    $("#startNum").text(startNum);
    console.log(url);

    // データパースの進行度を表す
    if (parseInt((startNum / cnt) * 100) < 100) {
      $("#loading").text("Loading..." + parseInt((startNum / cnt) * 100) + "%");
      $("#total").text("周りに" + cnt + "個のレストランを見つかりました。");
    }

    // startNumがデータの総個数(results_available)を超えないように
    if (parseInt(startNum / 100) != parseInt(cnt / 100) + 1) {
      doAjax(url, range, startNum);
    } else {
      pagination(dataSet);
      $("#loading").text("Loading...100%");
      $("#total").text("周りに" + cnt + "個のレストランを見つかりました。");
      return;
    }
  } else {
    /*index.htmlの一番近い五つのレストラン紹介の部分*/
    let content = "";
    if (shops.length != 0) {
      $.each(shops, function (i, s) {
        let shopObj = JSON.stringify(s);
        content = `<div class="shop-info" onclick='shopDetail(${shopObj});'>
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
}

/* list-page.html & ページング処理*/
function pagination(data) {
  console.log("----------------");
  console.log(data);
  let list = $("#pagination");
  list.pagination({
    dataSource: data,
    callback: function (data, pagination) {
      let dataHtml = "";
      if (data.length != 0) {
        dataHtml = `<div class="search-result-page">
        <div class="container">
          <!-- tab menu 上段始まり -->
          <ul class="tabs">
          <li class="tab-link current" data-tab="tab-1" onclick="tabMenu()">近い順</li>
          <li class="tab-link" data-tab="tab-2" onclick="tabMenu()">評価順</li>
          <li class="tab-link" data-tab="tab-3" onclick="tabMenu()">投稿順</li>
          </ul>
          <!-- tab menu 上段終わり -->`;

        $.each(data, function (i, s) {
          //console.log(s);
          let shopObj = JSON.stringify(s);
          dataHtml += `
          <!-- tab menu 内容始まり -->
          <div class="tab-content current tab-1" onclick='shopDetail(${shopObj});'>
            <div class="shop-list">
              <div class="shop-img"><img src="${s.photo.pc.l}"></div>
              <div class="textBox">
                <div class="bookmark">お気に入り</div>
                <div class="shop-title">${s.name}</div>
                <div class="shop-info">
                  <div class="shop-access">${s.access}</div>
                  <hr />
                  <div class="shop-intro">
                    ~${s.catch}~
                  </div>
                  <div class="shop-adress">住所：${s.address}</div>
                  <div class="shop-budget">予算：${s.budget.name}</div>
                  <div class="shop-card">カード決済：${s.card}</div>
                  <div class="shop-starPoint">★★★★☆ ( ? / 5.0)</div>
                  <div class="shop-reviewCount">review count</div>
                </div>
              </div>
            </div>
          </div>`;
        });

        dataHtml += `<div class="tab-content tab-2">
        <div>評価順はまだ準備中です。少々お待ちください。</div>
      </div>
      <div class="tab-content tab-3">
      <div>投稿順はまだ準備中です。少々お待ちください。</div>
      </div>
      <!-- tab menu 内容終わり --></div></div>`;
        $("#search-list").html(dataHtml);
      }
    },
  });
}
/*Pagination Library - Normal(https://pagination.js.org/)*/
//   使い方
//       $('#demo').pagination({
//     dataSource: [1, 2, 3, 4, 5, 6, 7, ... , 195],
//     callback: function(data, pagination) {
//         // template method of yourself
//         var html = template(data);
//         dataContainer.html(html);
//     }
// })
