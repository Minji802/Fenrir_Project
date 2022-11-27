$(function () {
  $("header").load("header.html");
  $("footer").load("footer.html");

  getUserLocation();
  search_restaurant();
  doAjax(
    "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3aed834ab74d67bd&lat=35.6773686&lng=139.7694908&format=jsonp" +
      "&callback=successCall&count=100",
    1,
    1
  ); // url, range, startNum
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

// result of getting restaurant
function successCall(data) {
  //console.log(data);
  let shops = data.results.shop;
  let cnt = data.results.results_available;

  dataSet.push.apply(dataSet, shops);

  let url =
    "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=3aed834ab74d67bd&lat=35.6773686&lng=139.7694908&format=jsonp" +
    "&callback=successCall&count=100";
  let range = $("#range").val();
  console.log(range);
  let startNum = parseInt($("#startNum").text()) + 100; // 1 ~ 100, 101 ~ 200, 201 ~ 300, .... 100以上　全ての情報を呼び出す
  $("#startNum").text(startNum);
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

/* ページング処理*/
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
