"use strict";

const express = require("express");
const getAppInfo = require("$core-services/getAppInfo");

const router = new express.Router();

router.get("/", async (request, response) => {
  const appInfo = await getAppInfo();

  response.status(200).json({
    title: appInfo.title ,
    environment: appInfo.environment,
    version: appInfo.version,
    commit: appInfo.commit,
    build: appInfo.build,
  });
});

module.exports = router;
