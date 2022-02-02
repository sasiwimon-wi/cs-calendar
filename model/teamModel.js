var sql = require("./db");

var UserTeamRlt = function (team) {
  (this.user_id = team.userId),
    (this.name = team.name),
    (this.username = team.username),
    (this.email = team.email),
    (this.team_id = team.teamId),
    (this.team_name = team.teamName);
};

var Usergroup = function (u) {
  this.user_id = u.userId;
};

var UserList = function (u) {
  (this.team_name = u.teamName), (this.UserGroup = [{ Usergroup }]);
};

let columns = [
  "usercalendar.user_id",
  "usercalendar.name",
  "usercalendar.username",
  "usercalendar.email",
  "team.team_id",
  "team.team_name",
];

UserTeamRlt.getAllTeams = function (userId, result) {
  let sqlQuery =
    "SELECT ?? FROM usercalendar INNER JOIN userteam ON usercalendar.user_id = userteam.user_id INNER JOIN team ON userteam.team_id = team.team_id WHERE userteam.user_id = ?";
  sql.query(sqlQuery, [columns, userId], function (err, res) {
    if (err) {
      result(err);
    }
    result(null, res);
  });
};

UserTeamRlt.getTeamById = function (userId, teamId, result) {
  let sqlQuery =
    "SELECT ?? FROM usercalendar INNER JOIN userteam ON usercalendar.user_id = userteam.user_id INNER JOIN team ON userteam.team_id = team.team_id WHERE userteam.user_id = ? AND team.team_id = ?";
  sql.query(sqlQuery, [columns, userId, teamId], function (err, res) {
    if (err) {
      result(err);
    }
    console.log(sqlQuery);

    result(null, res);
  });
};

UserList.postTeam = function (newTeam, result) {
  const userElement = newTeam.UserGroup;
  const teamName = newTeam.team_name;

  let sqlTeam = "INSERT INTO team (team_name) VALUES (?)";
  let sqlUserTeam = "INSERT INTO userteam (user_id, team_id) VALUES (?, ?)";

  // CHECK DUPLICATE TEAM NAME
  // -------------------------
  // CHECK DUPLICATE TEAM NAME

  sql.query(sqlTeam, [teamName], function (err, res) {
    if (err) {
      result(err);
    }

    // LOOP ADD USERTEAM
    userElement.forEach((e) => {
      // CHECK DUPLICATE USER ID ---------- //

      sql.query(sqlUserTeam, [e.user_id, res.insertId], function (error, rlt) {
        if (error) {
          result(error);
        }
        console.log("res: ", rlt);
      });

    });

    result(null, newTeam);

  });
};

module.exports = {
  UserTeamRlt,
  UserList,
};
