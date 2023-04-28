(function() {
    "use strict";
    
    kintone.events.on('app.record.create.show', function(event) {
      var currentUser = kintone.getLoginUser();
      var query = ``;
      kintone.app.record.setFieldShown('date', true);
      console.log(kintone.app.record.getFieldElement('hourly_rate'));
      //   var query = `user = "${currentUser.name}" order by recordNumber desc limit 1`;
      kintone.api('/k/v1/records', 'GET', {
        app: 195, // Replace with your app ID
        query: query,
        fields: ['hourly_rate', 'date'],
        totalCount: true
      }, function(resp) {
        if (resp.records.length > 0) {
          console.log(resp.records);
          var hourlyRate = parseInt((resp.records[0]['hourly_rate']['value']??0), 10);
          console.log(hourlyRate);
        //   // Set the Hourly Rate field with the hourlyRate value
          console.log(kintone.app.record.getFields());
          //   kintone.app.record.setFieldShown('hourly_rate', true);
        //   kintone.app.record.getFieldElement('hourly_rate').value = hourlyRate;
        } else {
          console.log("User has no attendance records.");
        }
      }, function(error) {
        console.log(error);
      });
    });
  })();
  
  
  
//   (function () {
//   "use strict";

//   // Get the logged-in user's ID
//   var userId = kintone.getLoginUser().code;

//   // Set up the query to retrieve the user's last attendance record
//   var query = "user='" + userId + "' order by date desc limit 1";

//   // Set up the API request to retrieve the attendance record data
//   var body = {
//     app: 195,
//     // app: kintone.app.getId(),
//     query: query
//   };
//   kintone.api("/k/v1/records", "GET", body, function(resp) {
//     // Get the hourly rate from the attendance record
//     var hourlyRate = resp.records[0] ? resp.records[0].hourly_rate.value : 0;

//     // Set the Hourly Rate field with the hourlyRate value
//     kintone.app.record.setFieldShown('hourly_rate', true);
//     kintone.app.record.getFieldElement('hourly_rate').value = hourlyRate;
//   });
// })();
