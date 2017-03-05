var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  console.log('i got some response here..');
        console.log(req.body);
        console.log(req.body.message.object_id);
	console.log(req.body.message.object_type);
	console.log(req.body.message.project.name);
	console.log(req.body.message.detail_link);
	console.log(req.body.rule.AppName);
        var slackURL = req.body.rule.AppName;



var request = require("request");

request(
	{
	method: 'POST',
	url: slackURL, 
	body: 
	    {
		"text":req.body.message.object_type+" Changed to ="+"TBD"+"\n"+"Project Name="+req.body.message.project.name+"\n"+"Change Link="+req.body.message.detail_link+"\n"

	    },
	json:true
	},


 function (error, response, body) {
  if (error) { console.log("Error in posting");throw new Error(error)};

  console.log("Posting to slack");
 console.log(body);
});



});

module.exports = router;
