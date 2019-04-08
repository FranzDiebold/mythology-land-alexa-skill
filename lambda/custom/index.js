/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');

const {
    LaunchHandler,
    ListGodsIntentHandler,
    GodDetailIntentHandler,
    CompareGodsIntentHandler,
    CounterpartIntentHandler,
    ParentsIntentHandler,
    SymbolsIntentHandler,
    AboutHandler,
    HelpHandler,
    StopHandler,
    FallbackHandler,
    ErrorHandler,
} = require('./intentHandlers');


const SessionEndedRequestHandler = {
	canHandle(handlerInput) {
		return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
	},

	handle(handlerInput) {
		console.log(
			`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`
		);

		return handlerInput.responseBuilder.getResponse();
	},
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchHandler,
        ListGodsIntentHandler,
        GodDetailIntentHandler,
        CompareGodsIntentHandler,
        CounterpartIntentHandler,
        ParentsIntentHandler,
        SymbolsIntentHandler,
        AboutHandler,
        HelpHandler,
        StopHandler,
        FallbackHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
