const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // 데이터베이스 사용자명
  password: "123456", // 데이터베이스 비밀번호
  database: "my_database", // 데이터베이스명
});

db.connect((err) => {
  if (err) {
    console.error("DB 연결 오류:", err);
  } else {
    console.log("DB 연결 성공");

    const app = express();

    // body-parser 미들웨어 설정
    app.use(bodyParser.json());

    // 정적 파일 경로 설정
    app.use(express.static(path.join(__dirname, "public")));
    app.use(express.static(path.join(__dirname, "models")));
    app.use(express.static(path.join(__dirname, "views")));

    // 루트 경로 요청 처리
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "./views/index.html"));
    });

    // 회원가입 정보를 받아서 DB에 저장
    app.post("/register", (req, res) => {
      const { userid, name, email, password } = req.body;
      
      // 간단한 유효성 검사
      if (!userid || !name || !email || !password) {
        return res.json({ success: false, message: '모든 필수 항목을 입력하세요.' });
      }

      // DB에 회원가입 정보 저장
      const sql = "INSERT INTO User (user_id, username, email, password) VALUES (?, ?, ?, ?)";
      db.query(sql, [userid, name, email, password], (err, result) => {
        if (err) {
          console.error("DB 쿼리 오류:", err);
          return res.json({ success: false, message: '회원 가입에 실패했습니다.' });
        }
      
        return res.json({ success: true, message: '회원 가입이 완료되었습니다.' });
      });
    });

    // 서버 시작
    app.listen(3000, () => {
      console.log("서버가 3000번 포트에서 대기 중");
    });
  }
});
