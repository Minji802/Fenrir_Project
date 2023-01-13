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
app.set("view engine", "ejs");
app.set("views", "./views");

// index - Main Page
app.get("/", (req, res) => {
  res.render("index");
});

// Shop List Page
app.get("/list-page", (req, res) => {
  res.render("list-page");
});

// Review Write Page
app.get("/review-write", (req, res) => {
  res.render("review-page");
});

app.listen(8000, () => {
  console.log("Start Server");
});
