/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
var requestlib = require('request');

const SKILL_NAME = 'World Bank Group Facts';
const GET_FACT_MESSAGE = 'Here\'s your fact: ';
const HELP_MESSAGE = 'You can say tell me a World Bank fact, or, you can say stop... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'The World Bank Facts skill can\'t help you with that.  It can help you discover facts about World Bank if you say tell me a World Bank fact. What can I help you with?';
const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const ANOTHER_FACT = 'Would you like another fact?'

var ALL_FACTS

const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest'
          || (request.type === 'IntentRequest'
            && request.intent.name === 'GetNewFactIntent');
          },
        //  handle(handlerInput) {
            async handle(handlerInput) {
              const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
              sessionAttributes.invokeReason = 'another-fact';



                var response = await anotherGet();
                response = JSON.parse(response)

                ALL_FACTS = response

                const factIndex = Math.floor(Math.random() * response.length);
                response = response[factIndex][0];

                sessionAttributes.lastSpeech = response;

                const display = String(response.substr(0,150))

                return handlerInput.responseBuilder
                .speak(response+" Would you like another fact?")
                .withShouldEndSession(false)
            //    .reprompt("Would you like another fact?")
                .withSimpleCard(SKILL_NAME,display)
                .getResponse();
              }


        }



const YesHandler = {
  canHandle(handlerInput) {
  const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name ===  "AMAZON.YesIntent"
      },

      handle(handlerInput) {

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
    const invokeReason = sessionAttributes.invokeReason;


    var MSG;
    var FACT;

    switch (invokeReason) {
      case 'another-fact':
        // return a new fact, if in yes-handler and end session if in no-handler.
        const LEN = ALL_FACTS.length



        FACT = (ALL_FACTS[Math.floor(Math.random() * LEN)])[0]
        sessionAttributes.lastSpeech = FACT;
        MSG = FACT+" Would you like another fact?"

        break;

      default:

        MSG=FALLBACK_MESSAGE
        // handle situation, where someone said yes or no without you asking it.
        break;
    }
    return handlerInput.responseBuilder
      .speak(MSG)
      .withShouldEndSession(false)
      .withSimpleCard(SKILL_NAME,FACT)
      .getResponse();
  },
};

const NoHandler = {
  canHandle(handlerInput) {
  const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
        && request.intent.name ===  "AMAZON.NoIntent"
      },

      handle(handlerInput) {


    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const RepeatHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.RepeatIntent';
  },
  handle(handlerInput) {
    /*code goes here */
    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const REPEAT = sessionAttributes.lastSpeech
//const REPEAT = "repeat"

    return handlerInput.responseBuilder
      .speak(REPEAT+" Would you like another fact?")
      .reprompt(REPEAT+" Would you like another fact?")
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
      .withShouldEndSession(true)
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
      RepeatHandler,
      YesHandler,
      NoHandler,
      SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

  function anotherGet() {
    return new Promise(function (resolve, reject) {
      var url = 'https://script.google.com/macros/s/AKfycbyhiU-SAMGIace7uVXX5L06_-FKpibmkLkyrNO1AZG1SDuJ9KPe/exec'
        //var url = "http://jsonplaceholder.typicode.com/todos/2"
        //var url = 'https://reqres.in/api/products/3'
        requestlib(url, function (error, res, body) {


        if (!error && res.statusCode == 200) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    });

  return body
  }
