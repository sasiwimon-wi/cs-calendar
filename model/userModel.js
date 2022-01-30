"user strict";
var sql = require("./db.js");

//User object constructor
var User = function (user) {
  (this.user_id = user.userId),
  (this.name = user.displayName),
  (this.username = user.username),
  (this.email = user.email),
  (this.role_id = user.role_id);
};

User.createUser = function (newUser, result) {
  sql.query("INSERT INTO usercalendar set ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
User.getUserById = function (userId, result) {
  sql.query(
    "Select * from usercalendar where user_id = ? ",
    userId,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};
User.getAllUser = function (result) {
  sql.query("Select * from usercalendar", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      console.log("tasks : ", res);

      result(null, res);
    }
  });
};
User.updateById = function (id, user, result) {
  sql.query(
    "UPDATE usercalendar SET username = ?, email = ? WHERE user_id = ?",
    [user.username, user.email, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};
User.remove = function (id, result) {
  sql.query(
    "DELETE FROM usercalendar WHERE user_id = ?",
    [id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = User;
