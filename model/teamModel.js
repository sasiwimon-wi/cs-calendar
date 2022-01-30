var sql = require("./db");

var UserTeamRlt = function (team) {
  (this.user_id = team.userId),
    (this.name = team.name),
    (this.username = team.username),
    (this.email = team.email);
  (this.team_id = team.teamId), (this.team_name = team.teamName);
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
      result(null, res);
    });
  };

module.exports = UserTeamRlt;
