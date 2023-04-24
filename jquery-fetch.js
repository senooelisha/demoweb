const DOMAIN = 'smartexchange';
const APP_ID = 176; // Replace with your app ID
const API_TOKEN = 'o6FeN4CrqHvInaxruscPfU7TCuexjA1BohOqtqpZ';
const QUERY = ''; // Replace with your query
const MAX_DATA_SIZE = 300

$(document).ready(function() {
  let allRecords = [];

  function getRecords(offset) {
    console.log("records");

    const limit = 100; // Set the limit to 100 records per request
    const url = `https://${DOMAIN}.cybozu.com/k/v1/records.json?app=${APP_ID}&query=${QUERY}&offset=${offset}&limit=${limit}`;
    $.ajax({
      url: url,
      method: 'GET',
      data: {
        url: url,
        headers: {
          'X-Cybozu-API-Token': API_TOKEN
        }
      },
      success: function(response) {
        // const records = response.records;
        allRecords = allRecords.concat(response.records);

        if (MAX_DATA_SIZE > allRecords.length) {
          // If there are more records, make another request with a new offset
          getRecords(offset + limit);
        } else {
          // All records have been fetched, do something with the data
          console.log(allRecords);
        }
      },
      error: function(xhr, status, error) {
        console.log('Error:', error);
      }
    });
  }

  // Call the function to fetch the first batch of records
  getRecords(0);
  getRecords(100);
  getRecords(200);
});
