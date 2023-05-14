//Request

import request from 'request';
var options = {
  'method': 'POST',
  'url': 'http://localhost:8000/sleep/wakeTime',
  'headers': {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    'Content-Type': 'application/json',
    'Content-Length': '91',
    'Host': ''
  },
  body: JSON.stringify({
    "wakeTime": "2023-05-13T09:00:19+05:30",
    "dataCollectionStep": 3
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

//Response
/*
{
    "status": "success",
    "data": {
        "wakeTime": "2023-05-13T09:00:19+05:30",
        "dataCollectionStep": 3
    },
    "message": "operation completed successfully",
    "displayMessage": "Successful"
}
*/
