(function() {
  "use strict";

  kintone.events.on("app.record.create.show", function(event) {
    // Get the logged-in user's information
    kintone.api(
      kintone.api.url("/v1/user.json", true),
      "GET",
      {},
      function(resp) {
        // Get the supervisor's name of the logged-in user
        var supervisorName = resp.supervisor.name;

        // Set the default value of the field to the supervisor's name
        event.record.supervisor.value = supervisorName;

        // Set the field to be shown
        kintone.app.record.setFieldShown("supervisor", true);
      }
    );
  });
})();
