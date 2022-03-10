
const Data = require('$database')

const logError = require('$core-services/logFunctionFactory').getErrorLogger()
const logWarn = require('$core-services/logFunctionFactory').getWarnLogger()
const logDebug = require('$core-services/logFunctionFactory').getDebugLogger()

let getTodo = async function(criteria)
{

    try
    {

        let query = await Data.findTodo(criteria, null, null);
        return query;

    }
    catch(ex){
        console.log('Error create nft stamp ', ex)
        throw ex;
    }
}

let storeMetacraft = async function(updateBody)
{
    try
    {

        let updated = await Data.storeMetacraft(updateBody );
        return updated;
    }
    catch(ex){
        console.log('Error updated storeMetacraft  ', ex)
        throw ex;
    }
}

let updateTodo = async function(id, updateBody)
{
   try
   {

        let updated = await Data.findTodoAndUpdate({_id : id }, updateBody,  {returnOriginal: false, upsert: true } );
        return updated;
    }
    catch(ex){
        console.log('Error updated todo ', ex)
        throw ex;
    }
}

let deleteTodo = async function(id)
{
    try
    {

        let updated = await Data.deleteOne({_id : id });
        return updated;
    }
    catch(ex)
    {
        console.log('Error updated todo ', ex)
        throw ex;
    }
}



module.exports = { storeMetacraft };