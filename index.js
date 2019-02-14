#!/usr/bin/env node
const validator = require("email-validator");
const axios = require('axios');
const argv = require('yargs').argv

  email = argv._[0]
  emailUri = encodeURIComponent(email)

  if (validator.validate(email)){
    console.log("email passed")
    axios.get('https://haveibeenpwned.com/api/breachedaccount/'+emailUri, { "headers": { 'User-Agent': "learning how to work with node" } })
      .then(function(response){
        console.log(`Breaches of ${email} have been found for the following platforms ${response.data}`);
      })
      .catch(function(error){
        if(error.response.status == 404){
          console.log(`Huray! No breaches have been found for ${email}`)
        }
        else {
          console.log(`Whoops! Something went wrong. We didn't check ${email}`)
        };
      });
}
  else {
    console.log("email didn't pass")
  };
