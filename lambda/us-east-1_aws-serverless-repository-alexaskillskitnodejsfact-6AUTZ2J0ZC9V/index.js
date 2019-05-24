/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk');
var requestlib = require('request');

const SKILL_NAME = 'New York Times Movies';
const GET_FACT_MESSAGE = 'Here\'s your movie: ';
const HELP_MESSAGE = 'You can say tell me a New York Times Movie, or, you can say stop... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'The New York Times Movies skill can\'t help you with that.  It can help you discover hot new movies if you say tell me a New York Times Movie. What can I help you with?';
const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const ANOTHER_FACT = 'Would you like another movie?';
const LAST_FACT = "You have now finished hearing about all the critics choice movies for today";

//var factIndex = 0
var ALL_FACTS;
var max;


const GetNewFactHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
        return request.type === 'LaunchRequest'
          || (request.type === 'IntentRequest'
            && request.intent.name === 'GetNewFactIntent');
          },

      async handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        sessionAttributes.invokeReason = 'another-fact';
        var result = await anotherGet();

        var response_array = JSON.parse(result);

        const factIndex = Math.floor(Math.random() * response_array.length);

        ALL_FACTS = response_array;
        //max = response_array.length

        const movie_name = ALL_FACTS[factIndex][0];
        const review_headline = ALL_FACTS[factIndex][1];
        const reviewer_name = ALL_FACTS[factIndex][3];
        const review_snippet = ALL_FACTS[factIndex][2];
        const review_date = ALL_FACTS[factIndex][4];


        var response_string = "A current movie is "+movie_name+", reviewed by "+reviewer_name+". Here's a snippet of the review: "+review_snippet;
        var response_clean = response_string.replace(/\&/ig, 'and')
        sessionAttributes.lastSpeech = response_clean;

        var MSG = response_clean+" Would you like to hear another movie review?"

        var display = String(response_clean.substr(0,150))

      return handlerInput.responseBuilder
        .speak(MSG)
        .withShouldEndSession(false)
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

        switch (invokeReason) {
          case 'another-fact':
            // return a new fact, if in yes-handler and end session if in no-handler.


          //  if (factIndex<max){
              const factIndex = Math.floor(Math.random() * ALL_FACTS.length);
              const movie_name = ALL_FACTS[factIndex][0];
              const review_headline = ALL_FACTS[factIndex][1];
              const reviewer_name = ALL_FACTS[factIndex][3];
              const review_snippet = ALL_FACTS[factIndex][2];
              const review_date = ALL_FACTS[factIndex][4];

              var response_string = "A current movie is "+movie_name+", reviewed by "+reviewer_name+". Here's a snippet of the review: "+review_snippet;
              var response_clean = response_string.replace(/\&/ig, 'and')
              sessionAttributes.lastSpeech = response_clean;
              var display = String(response_clean.substr(0,150))

              var MSG = response_clean+" Would you like to hear another movie review ?"

              return handlerInput.responseBuilder
                .speak(MSG)
                .withShouldEndSession(false)
                .withSimpleCard(SKILL_NAME,display)
                .getResponse();

            break;

            default:
              MSG=FALLBACK_MESSAGE
              // handle situation, where someone said yes or no without you asking it.
              break;
            }
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

    const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();

    const REPEAT = sessionAttributes.lastSpeech


    return handlerInput.responseBuilder
      .speak(REPEAT+" Would you like another movie?")
      .reprompt(REPEAT+" Would you like another movie?")
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
      var url = 'https://script.google.com/macros/s/AKfycbxDldtSHoZoYMBct9BrmYohyFO10JdOeAaMoO3F0e9HSrOZQTEJ/exec'
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
