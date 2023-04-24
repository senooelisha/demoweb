$(document).ready(function() {
    var appId = 176; // replace with your app ID
    var token = "o6FeN4CrqHvInaxruscPfU7TCuexjA1BohOqtqpZ"; // replace with your API token
    var query = "";
  
    $.ajax({
      url: "https://smartexchange.cybozu.com/k/v1/records.json?app="+appId+"&query="+query+"&totalCount=true",
      type: "GET",
      dataType: "json",
      headers: {"X-Cybozu-API-Token": token},
      success: function(response) {
        console.log(response);
      },
      error: function(xhr, status, error) {
        console.log("Error: " + error);
      }
    });
  });

