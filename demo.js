// Set the App ID and API Token for your Kintone application
const appId = 176;
const apiToken = 'hBTd9nwPPPiiehx3CnPtUuG4byUJvTUmy8j2ZIAZ';
const domain = 'smartexchange.cybozu.com'

// Define the endpoint for the Kintone REST API
const apiEndpoint = `https://${domain}/k/v1/records.json`;

// Set the parameters for the API request
const params = {
  app: appId,
  query: '',
  totalCount: true
};

// Define the headers for the API request
const headers = {
  'X-Cybozu-API-Token': apiToken
};

// Send the API request using jQuery's AJAX function
$.ajax({
  url: apiEndpoint,
  type: 'GET',
  data: params,
  headers: headers
}).done(function(response) {
  // Handle the response from the Kintone API
  console.log("Success")
  console.log(response);
}).fail(function(jqXHR, textStatus, errorThrown) {
  // Handle any errors that occur during the API request
  console.log("Failed")
  console.error(jqXHR, textStatus, errorThrown);
});
