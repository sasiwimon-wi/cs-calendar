// var UserTeamRlt = require("../model/teamModel");
// var UserList = require("../model/teamModel");
// var { UserTeamRlt, UserList } = require("../model/teamModel");
var teamModel = require("../model/teamModel")


exports.getAllTeams = function (req, res) {
  teamModel.UserTeamRlt.getAllTeams(req.params.user_id, function(err, rlt) {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error"
      });
    }

    if (rlt.length === 0) {
      return res.status(400).json({
        status: 400,
        message: `No teams of user_id = ${req.params.user_id} or not found`
      });
    }

    res.json(rlt);
  });
};

exports.getTeamById = function (req, res) {
  teamModel.UserTeamRlt.getTeamById(
    req.params.user_id,
    req.params.team_id,
    function (err, rlt) {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error",
        });
      }

      if (rlt.length === 0)
        return res.status(400).json({
          status: 400,
          message: `Not found`,
        });
      res.json(rlt);
    }
  );
};

exports.postTeam = function (req, res) {
  var newTeam = req.body;

  // console.log("CTL --> ", newTeam);

  if (newTeam.team_name === "") {
    return res.status(400).json({
      status: 400,
      message: `Bad request`,
    });
  } else {
    teamModel.UserList.postTeam(newTeam, function (err, rlt) {
      if (err) {
        return res.status(500).json({
          status: 500,
          message: "Internal Server Error",
        });
      }
      res.json(rlt);
    });
  }
};
