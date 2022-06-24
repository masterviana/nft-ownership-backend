"use strict";

const express = require("express");
const getAppInfo = require("$core-services/getAppInfo");
// const {deleteTodo, updateTodo, getTodo, createTodo  } = require("$services/todo");
const { readApprovedProjects } = require("$services/chain-operations")

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


router.get("/", async (request, response) =>
{
    try
    {
     
        let data = await readApprovedProjects();

        response.status(200).json(data);

    }catch(ex){
        console.error('error getting projects ',  ex);
        response.status(500).json({error : ex});
    }
});


module.exports = router;