// 東京駅
// lat=35.680930
// lng=139.766863

let dataSet = [];

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
  //console.log(data);
  let shops = data.results.shop;
  let cnt = data.results.results_available;

  let url =
    "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3aed834ab74d67bd&lat=35.6773686&lng=139.7694908&format=jsonp" +
    "&callback=successCall&count=100";
  let range = $("#range").val();
  let startNum = parseInt($("#startNum").text()) + 100; // 1 ~ 100, 101 ~ 200, 201 ~ 300, .... 100以上　全ての情報を呼び出す
  $("#startNum").text(startNum);
  dataSet.push.apply(dataSet, shops);
  console.log(url);

  // データパースの進行度を表す
  if (parseInt((startNum / cnt) * 100) < 100) {
    $("#loading").text("Loading..." + parseInt((startNum / cnt) * 100) + "%");
  }

  // startNumがデータの総個数(results_available)を超えないように
  if (parseInt(startNum / 100) != parseInt(cnt / 100) + 1) {
    doAjax(url, range, startNum);
  } else {
    $("#loading").text("Loading...100%");
    pagination(dataSet);
    return;
  }
}

// ページング処理
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
function pagination(data) {
  console.log("----------------");
  console.log(data);
  let list = $("#pagination");
  list.pagination({
    dataSource: data,
    callback: function (data, pagination) {
      let dataHtml = "<ul>";
      $.each(data, function (index, item) {
        dataHtml += "<li>" + index + "  " + item.name + "</li>";
      });
      dataHtml += "</ul>";
      $("#search-list").html(dataHtml);
    },
  });
}

$(function () {
  search_restaurant();
});
