var UserTeamRlt = require("../model/teamModel")

exports.getAllTeams = function(req, res){
    UserTeamRlt.getAllTeams(req.params.user_id, function(err, teams){
        if(err){
            res.send(err)
        }
        res.json(teams)
    })
}

exports.getTeamById = function(req, res){
    UserTeamRlt.getTeamById(req.params.user_id, req.params.team_id, function(err, teams){
        if(err){
            res.send(err)
        }
        res.json(teams)
    })
}