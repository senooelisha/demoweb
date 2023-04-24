const DOMAIN = 'smartexchange';
const APP_ID = 176; // Replace with your app ID
const API_TOKEN = 'o6FeN4CrqHvInaxruscPfU7TCuexjA1BohOqtqpZ';
const QUERY = ''; // Replace with your query

$(document).ready(function() {
  let allRecords = [];

  function getRecords(offset) {
    const limit = 100; // Set the limit to 100 records per request
    const url = `https://${DOMAIN}.cybozu.com/k/v1/records.json?_=${Math.random()}`;
    $.ajax({
      url: url,
      method: 'GET',
      data: {
        // url: url,
        app: APP_ID,
        query: QUERY,
        limit: limit,
        offset: offset,
        totalCount: true,
        headers: {
          'X-Cybozu-API-Token': API_TOKEN
        }
      },
      success: function(response) {
        const records = response.records;
        allRecords = allRecords.concat(records);
        if (response.totalCount > allRecords.length) {
          // If there are more records, make another request with a new offset
          getRecords(offset + limit);
        } else {
          // All records have been fetched, do something with the data
          console.log(allRecords.map(item => item.countryName.value));
          return allRecords.map(item => item.countryName.value);
        }
      },
      error: function(xhr, status, error) {
        return null;
        console.log('Error:', error);
      }
    });
  }


  (function () {
    "use strict";
    var countriesDropdown = "countriesDropdown";
    var events = [
      "app.record.detail.show",
      "app.record.edit.show",
      "app.record.create.show",
    ];

    kintone.events.on(events, function () {
        var countriesSel = document.createElement('select');

        countriesList = getRecords(0);
        countriesList.forEach(element => {
            var countriesOp = document.createElement('option');
            countriesOp.value = element;
            countriesOp.innerHTML = element;

            countriesSel.appendChild(countriesOp);
        });
        
        kintone.app.record.getSpaceElement(countriesDropdown).appendChild(countriesSel);
    });
  })();
  
});
