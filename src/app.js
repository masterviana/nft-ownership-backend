"use strict";

require("dotenv").config(); // load configurations
require("module-alias/register");

const express = require("express");
const middlewareFactory = require("./app-middleware/middlewareFactory");
const config = require("./config");
let axios = require('axios');

const app = express();
app.use(middlewareFactory(config));


/** JUST TO DEBUG SERVICES IN CLOUD */
/**  test if could contact external services */
async function testExternalCalls ()
{
    
}

const get = async function(url) {
    return await axios.get(url)
        .then((response) => {
        // console.log('response from axios ', response.data );
        return {response : response.data };
    })
    .catch((error) => {
        return {error : true, data : error, statusCode: 999 };

    })
}


setTimeout(testExternalCalls, 1000 * 5);

module.exports = app;
