/* eslint-disable no-console */
const axios = require('axios');

// Generic function that fetches the closing bitcoin dates of the last month from a public API
async function fetchFromAPI() {
  const response = await axios.get(
    'https://api.coindesk.com/v1/bpi/histerical/close.json'
  );
  return response.data;
}

fetchFromAPI().then((response) => {
  console.log(response);
}).catch((error) => {
  console.error(error.message);
});