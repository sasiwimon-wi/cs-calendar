module.exports = function (app) {
  var teamList = require("../controller/teamController");

  app.route("/teams/:user_id")
  .get(teamList.getAllTeams);

  app.route("/team/:user_id/:team_id")
  .get(teamList.getTeamById);

  app.route("/team")
  .post(teamList.postTeam);
};
