/*Shop Detail Page*/
function shopDetail(shopObj) {
  // console.log(shopObj);
  $("#loading").hide();
  $("#total").hide();
  $("#search-list").hide();
  $("#pagination").hide();
  $(".add-detailed-search").hide();
  $(".searchBackground").hide();

  let dataHtml = `<!--shop detail-->
    <div id="detail-page">
      <div id="detail-shop">
      <button  class="detail-close-btn" onclick="location.reload()"> x </button>
      <div class="detail-shop-img"><img src="${shopObj.photo.pc.l}"></div>
      <div class="detail-title">
        <div class="detail-shop-name">${shopObj.name}</div>
        <div class="detail-shop-access">${shopObj.access}</div>
      </div>
      <div class="detail-info">
        <div class="detail-shop-catch"><strong>~ ${shopObj.catch} ~</strong></div>
      <table class="detail-shop-table">
      <tr class="detail-shop-adress">
        <td class="detail-shop-table-title"><strong>住所</strong></td>
        <td>${shopObj.address}</td>
      </tr>
      <tr class="detail-shop-open">
        <td class="detail-shop-table-title"><strong>営業時間</strong></td>
        <td>${shopObj.open}</td>
      </tr>
      <tr class="detail-shop-close">
        <td class="detail-shop-table-title"><strong>休日</strong></td>
        <td>${shopObj.close}</td>
      </tr>
      <tr class="detail-shop-tel">
        <td class="detail-shop-table-title"><strong>Tel</strong></td>
        <td>00-000-0000</td>
      </tr>
      <tr class="detail-shop-card">
        <td class="detail-shop-table-title"><strong>カード決済</strong></td>
        <td>${shopObj.card}</td>
      </tr>
      <tr class="detail-shop-budget">
        <td class="detail-shop-table-title"><strong>予算</strong></td>
        <td>${shopObj.budget.name}</td>
      </tr>
      <tr class="detail-shop-child">
        <td class="detail-shop-table-title"><strong>子供連れ</strong></td>
        <td>${shopObj.child}</td>
      </tr>
      <tr class="detail-shop-pet">
        <td class="detail-shop-table-title"><strong>ペット連れ</strong></td>
        <td>${shopObj.pet}</td>
      </tr>
      <tr class="detail-shop-parking">
        <td class="detail-shop-table-title"><strong>駐車場</strong></td>
        <td>${shopObj.parking}</td>
      </tr>
    </table>
    <div class="star-point">
    <span class="star">
      ★★★★★</span>
          <div class="star-point-average">( ? / 5.0)</div>
          <button onclick='showReviewPage();'>投稿</button>
        </div>
        </div>
      </div>
      <hr />
  
      <!--menu-->
      <div id="detail-menu">
        <div class="detail-menu-title">menu</div>
        <div class="detail-menu-list"><div>準備中です。少々お待ちください。</div></div>
      </div>
  
      <!--review-->
      <div id="detail-review">
        <div class="detail-review-title">review</div>
        <div class="detail-review-list"><div>準備中です。少々お待ちください。</div></div>
      </div>
    </div>`;

  $("#detail-shop").append(dataHtml);
}
