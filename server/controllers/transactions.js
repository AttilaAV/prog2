const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "mydb",
});

let output;

const setOutput = (rows) => {
  output = rows;
  //res.send({ data: output });
  return output;
};

exports.getTransactions = (req, res, next) => {
  console.log(global.username);
  var username = global.username;
  try {
    db.query(
      "SELECT * FROM expense WHERE username = ?;",
      [username],
      (err, rows) => {
        if (err) {
          console.log("internal error", err);
          return;
        } else {
          res.send({ data: setOutput(rows) });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.addTransactions = (req, res, next) => {
  try {
    const text = req.body.text;
    const amount = req.body.amount;
    const username = global.username;
    db.query(
      "INSERT INTO expense (text, amount, username) VALUES (?,?,?)",
      [text, amount, username],
      (err, result) => {
        console.log(err);
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.deleteTransactions = (req, res, next) => {
  const username = global.username;
  try {
    const transaction = req.params.id;
    db.query(
      "SELECT * FROM expense WHERE username = ?;",
      [username],
      (err, rows) => {
        if (err) {
          console.log("internal error", err);
          return;
        } else {
          array = setOutput(rows);

          const data = array.filter(function (data) {
            return data.id == transaction;
          });
          res.send({ data: data });

          db.query(
            "DELETE FROM mydb.expense WHERE id = ?",
            [data[0].id],
            (err, result) => console.log("Deleted.")
          );
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }

  //const deleteId = array.find((item) => item.id == transaction);

  //res.send({ delete: deleteId });
  //console.log(array);
};
