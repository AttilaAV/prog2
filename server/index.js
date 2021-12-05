const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "./config/config.env" });
const PORT = process.env.PORT || 3001;

const transactions = require("./routes/transactions");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "bigSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: 60 * 60 * 24 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "mydb",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) console.log(err);
    db.query(
      "INSERT INTO loginsystem (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
    db.query(
      "INSERT INTO data (username) VALUES ?",
      [username],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({
      loggedIn: true,
      user: req.session.user,
      username: req.session.user[0].username,
    });
    username = req.session.user[0].username;
  } else {
    res.send({ loggedIn: false });
  }
});

app.get("/logout", (req, res) => {
  res.send({ loggedIn: false });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM loginsystem WHERE username = ?;",
    username,
    (err, result) => {
      if (err) res.send({ err: err });

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
            global.username = username;
            db.query(
              "SELECT * FROM expense WHERE username = ?",
              [username],
              function (error, results) {
                if (results) {
                  console.log("user is there already");
                } else {
                  db.query(
                    "INSERT INTO expense (username) VALUES (?)",
                    [username],
                    (err, result) => {
                      console.log(err);
                    }
                  );
                }
              }
            );
          } else {
            res.send({ message: "Wrong username/password combination" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});

app.post("/create", (req, res) => {
  const username = req.body.username;
  if (username) {
    db.connect(function (err) {
      var sql =
          "SELECT * FROM mydb.expense INNER JOIN mydb.loginsystem ON mydb.expense.username = mydb.loginsystem.username;",
        username;
      db.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
      });
    });
  } else {
    console.log("no user");
  }
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/transactions", transactions);

app.listen(PORT, () => {
  console.log("running server on port 3001");
});
