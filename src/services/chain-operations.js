const logError = console.error; //require('$core-services/logFunctionFactory').getErrorLogger()
const logWarn = require('$core-services/logFunctionFactory').getWarnLogger()
const logDebug = console.log; //require('$core-services/logFunctionFactory').getDebugLogger()
const axios = require('axios')

const CONTRACTS_TO_SEARCH = require('../../filters/OwnedTokensContracts.json')
const CONTRACTS_TYPES = require('../../filters/TokenTypes.json')

/**
 * 
 *    https://docs.moralis.io/moralis-server/web3-sdk/nft-api 
 * 
 * 
 *    https://moralis.io/ultimate-nft-api-exploring-moralis-nft-api/
 * 
 * 
      https://ethereum.stackexchange.com/questions/92275/how-can-i-get-a-list-of-all-owners-of-an-erc1155-nft-by-using-a-web3-call
 */


let erc1155Ownership = async function(walletAddress)
{

    try{

        return 'query';

    }
    catch(ex){
        console.log('Error create nft stamp ', ex)
        throw ex;
    }
}

let filterForContracts =  async function(results){

  try
  {

    let nft_helded = 
        results.result.filter((item)=>
        {
            return  CONTRACTS_TYPES.includes(item.contract_type) 
                      && (CONTRACTS_TO_SEARCH.length > 0 ? CONTRACTS_TO_SEARCH.includes(item.token_address) : true )
        });

    return {totalFilter : nft_helded.length, totalOwned : results.total,  nfts : nft_helded  };

  }catch(ex)
  {
    logDebug('Filter contracts  ', ex)
    throw ex;
  }
}

const WALLET_SEARCH = '/$WALLET/nft'

let searchMoralisERC1155 = async function(walletAddress, options)
{
   logDebug("**************** searchMoralisERC1155 **************** ");

    try
    {
      let moralis_base = process.env.MORALIS_ENDPOINT;
      let querySearch = WALLET_SEARCH.replace('$WALLET', walletAddress);
      let params = ''

      if(!options.chain){
        params ='?chain=eth'
      }else {
        //fill with all query params
        params ='?chain=' + options.chain;
      }
      
      const FINAL_URL =   moralis_base + querySearch + params;
      console.log('FINAL URL ', FINAL_URL );

      const res = 
          await axios.get( FINAL_URL , {
            headers: {
              'X-API-Key': process.env.MORALIS_APP_KEY,
              'Content-Type' : 'application/json'
            }
          });

        console.log('Result from axios total: ', res.data.total );

        return await filterForContracts(res.data);
    }
    catch(ex){
        logDebug('Search moralis APi ', ex)
        throw ex;
    }
}


module.exports = { erc1155Ownership , searchMoralisERC1155 };