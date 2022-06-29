
const Data = require('$database')
const axios = require('axios')

const logError = require('$core-services/logFunctionFactory').getErrorLogger()
const logWarn = require('$core-services/logFunctionFactory').getWarnLogger()
const logDebug = require('$core-services/logFunctionFactory').getDebugLogger()

let proxyData = async function(data)
{

    try
    {
        console.log('Post Data method ', data)

        if(data.method === 'get')
        {
            let result = await axios.get( data.url , data.data,  {
                headers: data.headers
            })

            return result.data;

        }else if (data.method === 'post')
        {
            let result = await axios.post( data.url , {
                headers: data.headers
            })
            return result.data;
        }else{
            return {message : 'no method was supplied'};
        }


    }
    catch(ex){
        console.log('Error calling proxt ', data)
        throw ex;
    }
}








module.exports = { proxyData  };