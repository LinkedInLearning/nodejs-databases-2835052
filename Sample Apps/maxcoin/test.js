// request is a module that makes http calls easier
const axios = require('axios');

// Generic function that fetches the closing bitcoin dates of the last month from a public API
async function fetchFromAPI(callback) {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
}

fetchFromAPI((err, data) => {
    if (err) throw err;
    console.log(data);
});