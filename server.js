const appId = 176;
const apiToken = 'o6FeN4CrqHvInaxruscPfU7TCuexjA1BohOqtqpZ';
const domain = 'smartexchange.cybozu.com'
const URL = '/k/v1/records.json?app='+appId+'&query=&totalCount=true'
const method = 'GET'

const express = require('express');
const https = require('https');

const app = express();
const port = 3062;

// function fetchKintoneData(fDomain, fURL, fApiToten, fMethod){
  let resData;
  app.get('/', (req, res) => {
    const options = {
      hostname: fDomain,
      path: fURL,
      method: fMethod,
      headers: {
        'X-Cybozu-API-Token': fApiToten
      }
    };

    const request = https.request(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        res.setHeader('Access-Control-Allow-Origin', 'http://brief-moon.surge.sh');
        // let JSONData = JSON.parse(data);
        // if(JSONData.totalCount > JSONData.records.length){
        //   let tempData = JSONData.records
        // }
        // let countries = JSONData.records.map(item => item.countryName.value);
        // console.log(countries);
        // console.log(JSONData.records.length);
        // console.log(JSONData.totalCount);
        res.send(data.totalCount);
        resData = data;
      });
    });

    request.on('error', (error) => {
      console.error(error);
      res.sendStatus(500);
    });

    request.end();
  });

  return resData;
// }

let receivedData = fetchKintoneData(domain, URL, apiToken, method)
console.log(receivedData)


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
