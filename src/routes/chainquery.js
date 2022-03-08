"use strict";

const express = require("express");
const getAppInfo = require("$core-services/getAppInfo");
// const {deleteTodo, updateTodo, getTodo, createTodo  } = require("$services/todo");
const {searchMoralisERC1155} = require("$services/chain-operations")

const router = new express.Router();

router.get("/:id", async (request, response) => {
  
  try{
    const todo = await getTodo({_id :request.params.id});
    response.status(200).json(todo);
  }catch(ex){
    console.error('get todo ',  ex);
    response.status(500).json({error : ex});
  }

});


router.post("/", async (request, response) =>
{
    try
    {
        const wallet  =  request.body.wallet;
        const options  =  request.body.options;

        if( !(wallet &&  wallet.length > 0) )
        {
          console.log('Should supply Wallet to search');
          throw "wallet not supply in [POST]"
        }

        let data = await searchMoralisERC1155(wallet, options);

        response.status(200).json({data : data});

    }catch(ex){
        console.error('get todo ',  ex);
        response.status(500).json({error : ex});
    }
});


module.exports = router;