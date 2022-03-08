"use strict";

const express = require("express");
const getAppInfo = require("$core-services/getAppInfo");
const {deleteTodo, updateTodo, getTodo, createTodo  } = require("$services/todo");

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

router.get("/many", async (request, response) => {
    try{
        const todo = await getTodo({});
        response.status(200).json(todo);
    }catch(ex){
        console.error('get todo ',  ex);
        response.status(500).json({error : ex});
    }

  });

router.post("/", async (request, response) =>
{
    try{
        const added =  await createTodo(request.body  );
        response.status(200).json(added);
    }catch(ex){
        console.error('get todo ',  ex);
        response.status(500).json({error : ex});
    }
});

router.put("/:id", async (request, response) =>
{
    try{
        const updated =  await updateTodo(req.params.id, request.body  );
        response.status(200).json(updated);
    }catch(ex){
        console.error('get todo ',  ex);
        response.status(500).json({error : ex});
    }
});

router.delete("/:id", async (request, response) => {

    try{
        const del =  await deleteTodo(req.params.id);
        response.status(200).json(del);
    }catch(ex){
        console.error('get todo ',  ex);
        response.status(500).json({error : ex});
    }

});


module.exports = router;
