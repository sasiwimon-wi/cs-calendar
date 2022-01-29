'use strict';

var User = require('../model/userModel');

exports.list_all_users = function(req, res) {
  User.getAllUser(function(err, users) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', users);
    res.send(users);
  });
};


exports.create_a_user = function(req, res) {
  var new_user = new User(req.body);

  //handles null error 
   if(!new_user.user_id || !new_user.email){

            res.status(400).send({ error:true, message: 'Please provide user_id/email' });

        }
else{
  
  User.createUser(new_user, function(err, user) {
    
    if (err)
      res.send(err);
    res.json(user);
  });
}
};


exports.read_a_user = function(req, res) {
  User.getUserById(req.params.user_id, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.update_a_user = function(req, res) {
  User.updateById(req.params.user_id, new User(req.body), function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.delete_a_user = function(req, res) {


  User.remove( req.params.user_id, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};