// 35.6797053  lat
//139.7515491 lng

function getUserLocation() {
  // Geolocation APIにアクセスできるかどうかを確認
  if (navigator.geolocation) {
    // navigator.geolocation.getCurrentPosition() - ユーザーの現在地をリクエスト
    navigator.geolocation.getCurrentPosition(function (pos) {
      $("#latitude").html(pos.coords.latitude); // latitude
      $("#longitude").html(pos.coords.longitude); // longitude
    });
  } else {
    alert("このブラウザではGeolocationができません");
  }
}

$(function () {
  getUserLocation();
});
