// DB
let sql = require("mysql");
let connection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "Alswl3994!",
  database: "tabeiko",
});

// connection.connect((e) => {
//   if (e) throw e;
//   // connect 결과가 Error라면 Throw를 통해 error로 보내준다.
//   // Throw : 예외처리에 사용되며 이때에는 함수가 중지되고 추후에 연습할 try & catch에서 catch로 보내지게 된다.
//   console.log("성공");
// });

const express = require("express");
const app = express();

connection.connect();

app.use("/css", express.static(__dirname + "/css"));
app.use("/images", express.static(__dirname + "/images"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/views", express.static(__dirname + "/views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("views", "./views");

// index - Main Page
app.get("/", (req, res) => {
  res.render("index.html");
});

// Shop List Page
app.get("/list-page", (req, res) => {
  res.render("list-page.html");
});

// Shop Detail Page
app.post("/shop-detail", (req, res) => {
  let { obj } = req.body;
  // console.log(obj);
  // console.log(JSON.parse(obj));
  let shopObj = JSON.parse(obj);

  let dataHtml = `
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
  
      <div class="menu-and-map">
        <!--menu-->
        <div id="detail-menu">
          <div class="detail-menu-title">menu</div>
          <div class="detail-menu-list"><div>準備中です。少々お待ちください。</div></div>
        </div>

        <!--map-->
        <div class="shop-map">
          <div class="shop-map-title">位置</div>
          <input type="hidden" id="shopLatitude" value="${shopObj.lat}">     <!-- 店の緯度 -->
          <input type="hidden" id="shopLongitude" value="${shopObj.lng}">   <!-- 店の経度 -->
          <div id="map"></div>
        </div>
      </div>`;

  connection.query(
    "SELECT * FROM review_table order by review_date desc",
    (e, r, f) => {
      let review = `
      <!-- review -->
      <div id="detail-review">
        <div class="detail-review-title">review</div>
         <table class="detail-review-list">
          <tbody>
            <th class="review-writer" colspan=3>作成者</th>
            <th class="review-text">レビュー</th>
            <th class="review-date">日時</th>
            <th class="review-delete"></th>`;

      for (let i = 0; i < r.length; i++) {
        const e = r[i];
        review += `<tr class="review-content">
                <td><input type="hidden" value="${e.shop_id}"></td>
                <td><input type="hidden" value="${e.review_seq}"></td>
                <td class="review-writer-td">${e.review_id}</td>
                <td class="review-text-td">${e.review_text}</td>
                <td class="review-date-td">${e.review_date}</td>
                <td><button class="review-delete-button">削除</button></td>
              </tr>`;
      }
      review += `</tbody></table></div>`;
      dataHtml += review;

      // console.log(dataHtml);
      res.render("shop-detail.html", { shop: dataHtml });
    }
  );
});

// Review Write Page
app.get("/review-write", (req, res) => {
  res.render("review-page.html");
});

app.listen(8000, () => {
  console.log("Start Server");
});
