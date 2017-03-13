//This module does 2 functions
//1 - It fetches the list of tasks, defects, userstories and test cases that are assigned to the user in the current iteration.
//2 - It helps the user to modify a userstory, defect, task based on his progress.

var express = require('express');
var router = express.Router();
var Promise = require('promise');
var rallyUserStory = require("./getUserStoryList.js");
var rallyTask = require("./getTaskList.js");
var rallyDefect = require("./getDefectList.js");
var postToSlack = require("./postToSlack.js");
var request = require("request");
//Initialize the rally api also

/* GET users listing. */
router.post('/', function(req, res, next) {
	
        var userName = req.body;
        var requestUpdate = req.body.text;
        console.log(req.body);
        console.log(req.body.text);
        //Get the user mail id from the request we got
        var userId = req.body.user_id;
	console.log(req.body.user_id);

        var requestUpdate = req.body.text;

        var updateArr = requestUpdate.split(" ");
  	console.log('The first arg' + updateArr[0]);
        console.log('The second arg' + updateArr[1]);
        console.log('The third arg' + updateArr[2]);




  	//res.send('respond with a resource using nodemon' + requestUpdate);
  	//
	var userEmail = '';
	var p2 = new Promise(function(resolve, reject) {

		var options = { method: 'GET',
  			url: 'https://slack.com/api/users.info',
  			json: true,
  			qs:
   			{ token: 'xoxp-73682018566-73679687940-148470253792-a5c154a3281508c7de382b143389ba69',
     				user: userId,
     pretty: '1' },
  headers:
   { 'postman-token': '12e9f11a-b6e3-b88d-a444-b73b3b9eb5a1',
     'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);
  var igot = response;
  console.log(igot.body.user.profile.email);

  userEmail = igot.body.user.profile.email;
  console.log(userEmail);
  resolve(userEmail);
  
});

})


p2.then(function(value) {
  console.log(value);
  //var value = sample1(value);
  //Do a dummy post to slack to avoid 200ms error
  return userEmail;
}).then(function(value) {
  console.log(value);
  var value = rallyUserStory.getUserStoryList(value);
  console.log('The value is' + value);
  return value;
}).then(function(value) {
  console.log(value);
  var value = rallyTask.getTaskList();
  console.log('The value is' + value);
  return value;

}).then(function(value) {
  console.log(value);
  var value = rallyDefect.getDefectList();
  console.log('The value is' + value);
  return value;


}).then(function(value) {
  //Post to slack the results we have fetched
  console.log('In third function' + value);
});



}); // End of the post 

module.exports = router;
