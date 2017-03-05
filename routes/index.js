var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var userEmail = '';

/* GET home page. */
router.post('/', function(req, res, next) {
  var userName = req.body;
  console.log(req.body);
  var userId = req.body.user_id;
 var requestUpdate = req.body.text;

  var updateArr = requestUpdate.split(" ");
  console.log('The first arg' + updateArr[0]);
  console.log('The second arg' + updateArr[1]);
  console.log('The third arg' + updateArr[2]);
  var request = require("request");

  //Read the project name and get the project object id
  var rally = require('rally'),
    restApi = rally({
		apiKey: '_5bbElOOaQnCVR31GcSr2JtKvsSHTkeFitsPbuCVY',
		server: 'https://rally1.rallydev.com', 
		requestOptions: {
            headers: {
		'X-RallyIntegrationName': 'My cool node.js program',  
		'X-RallyIntegrationVendor': 'My company',  
		 'X-RallyIntegrationVersion': '1.0'   
		}
	}
    });

    refUtils = rally.util.ref;

    queryUtils = rally.util.query;

var taskQuery = queryUtils.where('Name', '=', updateArr[0]);

restApi.query({
        type: 'project',
        fetch: ['FormattedID', 'Name', 'ScheduleState'],
        query: taskQuery
}, function(error, result) {
        if (error) {
            onError(error);
        } else {
            console.log(result);
            console.log(result.Results[0].Name);
	   //Lets create a webhook since we got the project name and the slack incoming channnel
	   //
	   var projectName = result.Results[0]._refObjectUUID; //The first argument is the project name
           var slackWebHookName = updateArr[1];// The second argument is the rally web hook name
           console.log(projectName);
 	   console.log(slackWebHookName);


var request = require("request");

var options = { method: 'POST',
  url: 'https://rally1.rallydev.com/notifications/api/v2/webhook',
  headers: 
   { //'postman-token': '5b2bae4c-3016-c62f-d082-75d84339db5f',
     //'cache-control': 'no-cache',
     //'content-type': 'application/json',
     cookie: 'ZSESSIONID=_5bbElOOaQnCVR31GcSr2JtKvsSHTkeFitsPbuCVY' },
  body: 
   { AppName: slackWebHookName, //Slack WebHook Name which has the incoming web hook details user created.
     AppUrl: 'Slack Incoming Webhook',
     Name: 'American Express',
     TargetUrl: 'http://ec2-54-244-41-228.us-west-2.compute.amazonaws.com:3000/fromRally', //This is the post URL to which the user sends the request
     ObjectTypes: [ 'HierarchicalRequirement', 'Defect' ],
     Expressions: 
      [ { AttributeName: 'Project',
          Operator: '=',
          Value: projectName } ] },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


        }
});
  



});

module.exports = router;
