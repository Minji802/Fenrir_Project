/*Shop Detail Page*/
let shopLatitude;
let shopLongitude;

//headerとfooter
$(window).on("load", function () {
  $("header").load("/views/header.html");
  $("footer").load("/views/footer.html");
});

function shopDetail(shopObj) {
  // console.log(shopObj);
  // データをpost方式で転送
  shopObj = JSON.stringify(shopObj);
  let f = document.createElement("form");

  let shopData;
  shopData = document.createElement("input");
  shopData.setAttribute("type", "hidden");
  shopData.setAttribute("name", "obj");
  shopData.setAttribute("value", shopObj);

  f.appendChild(shopData);
  f.setAttribute("method", "post");
  f.setAttribute("action", "shop-detail");
  document.body.appendChild(f);
  f.submit();

  window.initMap = initMap;
}

/*地図に店の位置表示 */
function initMap() {
  shopLatitude = document.getElementById("shopLatitude").value;
  shopLongitude = document.getElementById("shopLongitude").value;

  const myLatLng = { lat: +shopLatitude, lng: +shopLongitude };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: myLatLng,
  });
  new google.maps.Marker({
    position: myLatLng,
    map,
  });
}
