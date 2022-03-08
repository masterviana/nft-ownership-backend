# Backend to support NFT ownership nodejs

## how to configure the backend for filters

In order to filter for a specific contract address should be added the contract address to the list on file "OwnedTokensContracts.json" within folder filters. 


## Deployed URL

https://nft-ownership-backend.herokuapp.com/

# Route to search NFT 

### url
`POST /api/v1/chainquery`

### body 
```
{
    "wallet" : "0x3Ca48686212Af897019a8E89140e64E8F2cC2f30",
    "options" : {
        "chain" : "mumbai"
    }
}
```
### response

```
{
    "data": {
        "totalFilter": <total_filtered>,
        "totalOwned": <total_owned>,
        "nfts": [
            {
                "token_address": "0x13131231231232",
                "token_id": "7",
                "block_number_minted": "25166681",
                "owner_of": "0x13131231231232",
                "block_number": "25166681",
                "amount": "7000000000000000000",
                "contract_type": "ERC1155",
                "name": "<Collection_named>",
                "symbol": null,
                "token_uri": "https://<domain>",
            }
         ]
      }
}
```
