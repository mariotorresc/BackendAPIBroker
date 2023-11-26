const axios = require('axios');

async function PublishNewRequest(stockRequest) {
  await axios
    .post('http://mqttsender:3010/sender/newRequest', stockRequest)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}
async function PublishValidation(validationBody) {
  await axios
    .post('http:/mqttsender:3010/sender/validation', validationBody)
    .then((res) => res.data)
    .catch((err) => console.log(err));
}

module.exports = { PublishNewRequest, PublishValidation };
