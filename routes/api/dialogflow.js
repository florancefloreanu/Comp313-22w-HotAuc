/*
 * Filename: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack\routes\api\dialogflow.js
 * Path: f:\study\2022winter\comp313-project2\comp-231-hot-auc-full-stack
 * Created Date: Tuesday, March 29th 2022, 6:39:21 pm
 * Author: Heesoo
 * 
 * Copyright (c) 2022 HotAuc
 * 
 * Purpose: Endpoints for chatbot
 */


const express = require("express");
const router = express.Router();
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const config = require('../../dev');

const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;


// Create a new session
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);


// send the user input to Dialogflow API
router.post("/textQuery", async (req, res) => {

    /**
     * Send a query to the dialogflow agent, and return the query result.
     * @param {string} projectId The project to be used
     */
    // A unique identifier for the given session
    // const sessionId = uuid.v4();
    console.log(req.body);
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // The query to send to the dialogflow agent
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    //console.log('Detected intent');
    const result = responses[0].queryResult;
    //console.log(`  Query: ${result.queryText}`);
    //console.log(`  Response: ${result.fulfillmentText}`);
    // console.log((`Data: ${JSON.stringify(result.fulfillmentMessages)}`));
    //console.log((`Result: ${JSON.stringify(responses[0].queryResult)}`));
    if (result.intent) {
        // console.log(`  Intent: ${JSON.stringify(result.intent)}`);
    } else {
       // console.log(`  No intent matched.`);
    }

    res.send(result)
});


// Event Query Route
router.post("/eventQuery", async (req, res) => {
    // A unique identifier for the given session
    // const sessionId = uuid.v4();
   // console.log(req.body);
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                // The query to send to the dialogflow agent
                name: req.body.event,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    //console.log('Detected intent');
    const result = responses[0].queryResult;
   // console.log(`  Query: ${result.queryText}`);
   // console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
       // console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      //  console.log(`  No intent matched.`);
    }

    res.send(result)
});
module.exports = router;