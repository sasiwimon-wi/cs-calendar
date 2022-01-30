var UserTeamRlt = require("../model/teamModel");

exports.getAllTeams = function (req, res) {
  UserTeamRlt.getAllTeams(req.params.user_id, function (err, rlt) {
    if (err) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }

    if (rlt.length === 0)
      return res.status(400).json({
        status: 400,
        message: `No teams of user_id = ${req.params.user_id} or not found`,
      });
    res.json(rlt);
  });
};

exports.getTeamById = function (req, res) {
  UserTeamRlt.getTeamById(
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
