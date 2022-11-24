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
  console.log(data);
  let shops = data.results.shop;

  dataSet.push.apply(dataSet, shops);

  // if (shops.length > 0) {
  //   $.each(shops, function (i, s) {
  //     //console.log(i);
  //     // console.log(s);
  //     //console.log(s.name);
  //     let shopObj = JSON.stringify(s); // 객체를 json문자열로 변환
  //     let content = `<div class="textBox"><div class="shop-title">${s.name}</div><div class="shop-access">${s.access}</div><hr /></div>`;
  //     $("#search-list").append(content);
  //   });
  // }

  pagination(dataSet);
}

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
