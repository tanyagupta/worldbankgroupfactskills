/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');

const SKILL_NAME = 'World Bank Facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a World Bank fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'The World Bank Facts skill can\'t help you with that.  It can help you discover facts about World Bank if you say tell me a World Bank fact. What can I help you with?';
const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

// const LaunchRequestHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
//   },
//   handle(handlerInput) {
//     const speechText = 'Welcome to the World Bank Facts, you can find out about World Bank Group!';
//
//     return handlerInput.responseBuilder
//       .speak(speechText)
//       .reprompt(speechText)
//       .withSimpleCard('WBG Facts', speechText)
//       .getResponse();
//   },
// };

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest'
          || (request.type === 'IntentRequest'
            && request.intent.name === 'GetNewFactIntent');
  },
  handle(handlerInput) {
    const speechText = 'Hello World!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const FallbackHandler = {
  // 2018-May-01: AMAZON.FallbackIntent is only currently available in en-US locale.
  //              This handler will not be triggered except in that locale, so it can be
  //              safely deployed for any locale.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};


const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
//    LaunchRequestHandler,
      GetNewFactHandler,
      HelpHandler,
      ExitHandler,
      FallbackHandler,
      SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();



/*
const Alexa = require('ask-sdk');
var https = require('https');
var requestlib = require('request');

const GET_FACT_MESSAGE: 'Here is your fact' ;
const HELP_MESSAGE: 'You can say tell me a World Bank fact, or, you can say exit... What can I help you with?';
const HELP_REPROMPT: 'What can I help you with?';
const FALLBACK_MESSAGE: 'The World Bank Facts skill cannot help you with that.  It can help you discover facts about World Bank if you say tell me a World Bank fact. What can I help you with?';
const FALLBACK_REPROMPT: 'What can I help you with?';
const ERROR_MESSAGE: 'Sorry, an error occurred.';
const STOP_MESSAGE: 'Goodbye!';

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GetNewFactIntent');
  },
  // async handle(handlerInput) {
  handle(handlerInput) {
  // //const response = await httpGet();
  // var response = await anotherGet();
  //
  // response = JSON.parse(response)
  // const factIndex = Math.floor(Math.random() * response.length)
  // const randomFact = response[factIndex];

  return handlerInput.responseBuilder
          .speak('Here is your fact')
          .getResponse();
 }

};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
          .speak(HELP_MESSAGE)
          .reprompt(HELP_REPROMPT)
          .getResponse();
  },
};

const FallbackHandler = {
  // 2018-May-01: AMAZON.FallbackIntent is only currently available in en-US locale.
  //              This handler will not be triggered except in that locale, so it can be
  //              safely deployed for any locale.
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

     return handlerInput.responseBuilder
       .speak('Sorry, an error occurred.')
       .reprompt('Sorry, an error occurred.')
       .getResponse();
  },
};





const skillBuilder = Alexa.SkillBuilders.standard();

exports.handler = skillBuilder
  .addRequestHandlers(
   GetNewFactHandler
   HelpHandler,
   ExitHandler,
   FallbackHandler,
   SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
*/
