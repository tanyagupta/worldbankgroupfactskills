// const GetNewFactHandler = {
//   canHandle(handlerInput) {
//     const request = handlerInput.requestEnvelope.request;
//         return request.type === 'LaunchRequest'
//           || (request.type === 'IntentRequest'
//             && request.intent.name === 'GetNewFactIntent');
//           },
//           handle(handlerInput) {
//             async handle(handlerInput) {
//               handle(handlerInput) {
//                 var response = await anotherGet();
//                 response = JSON.parse(response);
//                 const factIndex = Math.floor(Math.random() * response.length);
//                 const randomFact = response[factIndex];
//                 return handlerInput.responseBuilder
//                 .speak(speechText)
//                 .withSimpleCard(randomFact)
//                 .getResponse();
//               }
//             }
//           }
//         }
var https = require('https');
var requestlib = require('request');

        function anotherGet() {
          return new Promise(function (resolve, reject) {

              requestlib('https://script.google.com/macros/s/AKfycbyhiU-SAMGIace7uVXX5L06_-FKpibmkLkyrNO1AZG1SDuJ9KPe/exec', function (error, res, body) {


              if (!error && res.statusCode == 200) {
                resolve(body);
              } else {
                reject(error);
              }
            });
          });

        return body
        }

async function f(){
     var response = await anotherGet();
     console.log(JSON.parse(response)[1][0])
   }
   f()
