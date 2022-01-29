const express = require('express');
const config = require('config');
const router = express.Router();
const loginURI = config.get('loginURI');
const tokenURI = config.get('tokenURI');
const client_id = config.get('client_id');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const fs = require('fs');

router.post('/', async (req, res) => {
  const sub = req.body.sub;
  console.log(req.body);
  const payload = {
    iss: client_id,
    sub,//dynamic users this must be the username
    aud: loginURI,
    exp: Math.floor(Date.now() / 1000) + 60 * 3,
  };

  let privateKey = fs.readFileSync('server.key');
  let token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });
  let payloadString = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`;

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  //make sure the connected app is either a managed policy where the profile/permission set you are trying to use is authorized or login with the connected app using a different flow first other wise you will get - 	Remote Access 2.0	Failed: Not approved	JWT Test App	login.salesforce.com - in the login history and on the server     data: {error: 'invalid_grant', error_description: "user hasn't approved this consumer"} https://salesforce.stackexchange.com/questions/184363/salesforce-jwt-user-hasnt-approved-this-consumer-again

  try {
    grant = await axios.post(tokenURI, payloadString, axiosConfig);
    console.log(grant.data);
    res.json(grant.data);
  } catch (err) {
    console.log('error');
    console.log(err);
    res = err.data;
  }
}

);

module.exports = router;
