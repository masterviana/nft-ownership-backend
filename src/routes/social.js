"use strict";

const express = require("express");
const getAppInfo = require("$core-services/getAppInfo");
const axios = require('axios')

const router = new express.Router();
const {TwitterApi} = require('twitter-api-v2');


// https://github.com/PLhery/node-twitter-api-v2/blob/master/doc/v2.md#followings
router.post("/twitter/follow", async (request, response) => {
  
  try{

    console.log('[/twitter/follow] body : ', request.body );

    if(!( request.body.accesstoken && request.body.userid )){
        throw "Should supply accesstoken and userid";
    }

    let _access_token = request.body.accesstoken;
    let account_to_follow = process.env.TWITTER_ACCOUNT_TO_FOLLOW;
    let userid = request.body.userid;

    const client = new TwitterApi(_access_token);
    // pagination_token : ''
    const followingUsers = await client.v2.following(userid, 
                                                     { 
                                                         max_results : 1000
                                                        //  ,pagination_token : ''
                                                     }, 
                                                     { asPaginator: true });
                                                     
    let followAccount = []
    if(followingUsers.data){
        followAccount = followingUsers.data.filter((item, i ) => {
            return item.id === account_to_follow;
        })
    }
  
    response.json({message : 'done', data : { account_to_follow, followAccount}})
    
  }catch(ex){
    console.error('get todo ',  ex);
    response.status(500).json({error : ex});
  }

});

router.post("/twitter/retweet", async (request, response) => {
  
    try{
        console.log('[/twitter/retweet] body : ', request.body );

        if(!( request.body.accesstoken && request.body.userid )){
            throw "Should supply accesstoken and userid";
        }

        const client = new TwitterApi(request.body.accesstoken);

        let userid = request.body.userid;
        const POSTID_TO_RETWEET = process.env.TWITTER_POST_TO_RETWEET;

        const users = await client.v2.tweetRetweetedBy(POSTID_TO_RETWEET,
                                                        { 
                                                            max_results : 100
                                                        //  ,pagination_token : ''
                                                        }, 
                                                        { asPaginator: true });

        let retweetUser  = []
        if(users.data){
            retweetUser = users.data.filter((item, i ) => {
                return item.id === userid;
            })
        }                      
       

        response.status(200).json({message : 'done', data : { retweetUser, twitter_postid : POSTID_TO_RETWEET }});

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
