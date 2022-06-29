"use strict";

const express = require("express");
const getAppInfo = require("$core-services/getAppInfo");
// const {deleteTodo, updateTodo, getTodo, createTodo  } = require("$services/todo");
const { proxyData } = require("$services/proxy")

const router = new express.Router();

// router.get("/:id", async (request, response) => {
  
//   try{
//     const todo = await getTodo({_id :request.params.id});
//     response.status(200).json(todo);
//   }catch(ex){
//     console.error('get todo ',  ex);
//     response.status(500).json({error : ex});
//   }

// });


router.post("/", async (request, response) =>
{
    try
    {
        
        console.log('proxy data with parameters ', request.body );

        let data = await proxyData(request.body);

        response.status(200).json(data);

    }catch(ex){
        console.error('error getting proxy ',  ex);
        response.status(500).json({error : ex});
    }
});


module.exports = router;