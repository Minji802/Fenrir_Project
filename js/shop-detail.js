/*shop detail page*/
function shopDetail(shopObj) {
  console.log(shopObj);
  $("#search-list").hide();
  $("#pagination").hide();
  $(".add-detailed-search").hide();

  let dataHtml = `<!--shop detail-->
    <div id="detail-page">
      <div id="detail-shop">
      <div class="detail-shop-img"><img src="${shopObj.photo.pc.l}"></div>
      <div class="detail-title">
        <div class="detail-shop-name">${shopObj.name}</div>
        <div class="detail-shop-access">${shopObj.access}</div>
      </div>
      <div class="detail-info">
        <div class="detail-shop-catch">~${shopObj.catch}~</div>
        <div class="detail-shop-adress"><strong>住所 : </strong>${shopObj.address}</div>
        
        <div class="detail-shop-open"><strong>営業時間：</strong>${shopObj.open}</div>
        <div class="detail-shop-close"><strong>休日：</strong>${shopObj.close}</div>
        
        <div class="detail-shop-tel"><strong>Tel</strong> 00-000-0000</div>
        <div class="detail-shop-card"><strong>カード決済：</strong>${shopObj.card}</div>
        <div class="detail-shop-budget"><strong>予算：</strong>${shopObj.budget.name}</div>
        
        <div class="detail-shop-child"><strong>子供連れ：</strong>${shopObj.child}</div>
        <div class="detail-shop-pet"><strong>ペット連れ：</strong>${shopObj.pet}</div>
        
        <div class="star-point">
          <span class="star">
            ★★★★★
            <span>★★★★★</span>
            <input
              type="range"
              oninput="drawStar(this)"
              value="1"
              step="1"
              min="0"
              max="10"
            />
          </span>
          <div class="star-point-average">( ? / 5.0)</div>
          <button onclick='showReviewPage();'>등록</button>
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
