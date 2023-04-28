const DOMAIN = 'smartexchange';
const APP_ID = 176; // Replace with your app ID
const API_TOKEN = 'o6FeN4CrqHvInaxruscPfU7TCuexjA1BohOqtqpZ';
const QUERY = ''; // Replace with your query

function getRecords(offset) {
  const limit = 100; // Set the limit to 100 records per request
  const url = `https://${DOMAIN}.cybozu.com/k/v1/records.json?_=${Math.random()}`;
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      method: 'GET',
      data: {
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
        resolve(records);
      },
      error: function(xhr, status, error) {
        reject(error);
      }
    });
  });
}

(async function () {
  "use strict";
  
  var countriesDropdownSpace = "countriesDropdownSpace";
  var events = [
    "app.record.detail.show",
    "app.record.edit.show",
    "app.record.create.show",
  ];

  kintone.events.on(events, async function (event) {
    var record = event.record;
    // var countriesSel = document.createElement('select');
    // countriesSel.setAttribute("id", "countriesDropdown");
    // countriesSel.setAttribute("class", "countriesDropdownClass");
    var countriesSel = document.getElementById("CountriesDropdownField");

    var countriesList = await getRecords(0);
    countriesList.map(item => ({label:item, value: item}))

    countriesList.forEach(element => {
        var countriesOp = document.createElement('option');
        countriesOp.value = element.countryName.value;
        countriesOp.innerHTML = element.countryName.value;

        countriesSel.appendChild(countriesOp);
    });

    // kintone.app.record.setFieldShown('countriesDropdown', true);
    // kintone.app.record.getSpaceElement(countriesDropdownSpace).appendChild(countriesSel);

    // Add a submit handler to the form
    // kintone.events.on('app.record.create.submit', function(event) {
    //   var selectedOption = $('#countriesDropdown option:selected').val();
    //   console.log(selectedOption);
    //   event.record.countriesDropdown.value = selectedOption;
    //   return event;
    // });

  });
})();


