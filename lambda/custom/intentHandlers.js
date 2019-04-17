/* eslint-disable  func-names */
/* eslint-disable  no-console */

const {
    listToText,
    randomize,
    godOrGoddess,
    heOrShe,
    hisOrHer,
    getGodSample,
    getGodNotKnownSpeechOutputs,
    getGodsListByType,
    getGod,
} = require('./util');

const SKILL_NAME = 'mythology land';

const LaunchHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'LaunchRequest';
    },

    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        const speechOutput = `Welcome to ${SKILL_NAME}! You can ask me about greek and roman mythology.`;
        return responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const ListGodsIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'ListGodsIntent';
    },

    handle(handlerInput) {
        console.log('ListGodsIntent');

        const responseBuilder = handlerInput.responseBuilder;
        const type = handlerInput.requestEnvelope.request.intent.slots.type.value;

        let speechOutput;
        const godsList = getGodsListByType(type);
        if (!godsList || godsList.length === 0) {
            speechOutput = 'Sorry, I only know greek and roman gods.';
        } else {
            const gods = listToText(godsList.map(god => god.name));
            const possibleSpeechOutputs = [
                `I know the following ${type} gods and goddesses: ${gods}.`,
                `The following ${type} gods and goddesses come into my mind: ${gods}.`
            ];
            speechOutput = randomize(possibleSpeechOutputs);
        }

        return responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const GodDetailIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'GodDetailIntent';
    },

    handle(handlerInput) {
        console.log('GodDetailIntent');

        const responseBuilder = handlerInput.responseBuilder;
        const name = handlerInput.requestEnvelope.request.intent.slots.god.value;

        let speechOutputs;
        const god = getGod(name);
        if (!god) {
            speechOutputs = getGodNotKnownSpeechOutputs(name);
        } else {
            const counterpartType = god.type === 'greek' ? 'roman' : 'greek';
            speechOutputs = [
                `${god.name} is a ${god.type} ${godOrGoddess(god)}. `,
                `${heOrShe(god)} is ${god.role}.`,
                `${hisOrHer(god)} symbols are ${listToText(god.symbols)}.`,
                `${hisOrHer(god)} parents are ${listToText(god.parents)}.`,
                `${hisOrHer(god)} ${counterpartType} counterpart is ${god.counterpart}.`,
            ];
        }
        const speechOutput = speechOutputs.join(' ');

        return responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const CompareGodsIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'CompareGodsIntent';
    },

    handle(handlerInput) {
        console.log('CompareGodsIntent');

        const responseBuilder = handlerInput.responseBuilder;
        const name = handlerInput.requestEnvelope.request.intent.slots.god.value;

        let speechOutputs;
        const god = getGod(name);
        if (!god) {
            speechOutputs = getGodNotKnownSpeechOutputs(name);
        } else {
            const counterpartGod = getGod(god.counterpart);
            speechOutputs = [
                `Let's compare the ${god.type} ${godOrGoddess(god)} ${god.name} with its ${counterpartGod.type} counterpart ${counterpartGod.name}.`,
                '<break time="500ms"/>',
                `${god.name} is ${god.role}, while ${counterpartGod.name} is ${counterpartGod.role}.`,
                '<break time="500ms"/>',
                `${god.name}s symbols are ${listToText(god.symbols)}, whereas ${counterpartGod.name}s are ${listToText(counterpartGod.symbols)}.`,
                '<break time="500ms"/>',
                `${god.name}s parents are ${listToText(god.parents)}, ${counterpartGod.name}s are ${listToText(counterpartGod.parents)}.`,
            ];
        }
        const speechOutput = speechOutputs.join(' ');

        return responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const CounterpartIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'CounterpartIntent';
    },

    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        const name = handlerInput.requestEnvelope.request.intent.slots.god.value;

        let speechOutput;
        const god = getGod(name);
        if (!god) {
            const speechOutputs = getGodNotKnownSpeechOutputs(name);
            speechOutput = speechOutputs.join(' ');
        } else {
            const counterpartType = god.type === 'greek' ? 'roman' : 'greek';
            const godOrGoddess = god.gender === 'male' ? 'god' : 'goddess';
            speechOutput = `The ${counterpartType} counterpart of the ${god.type} ${godOrGoddess} ${god.name} is ${god.counterpart}.`;
        }

        return responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const ParentsIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'ParentsIntent';
    },

    handle(handlerInput) {
        console.log('ParentsIntent');

        const responseBuilder = handlerInput.responseBuilder;
        const name = handlerInput.requestEnvelope.request.intent.slots.god.value;

        let speechOutput;
        const god = getGod(name);
        if (!god) {
            const speechOutputs = getGodNotKnownSpeechOutputs(name);
            speechOutput = speechOutputs.join(' ');
        } else {
            speechOutput = `${god.name}s parents are ${listToText(god.parents)}.`;
        }

        return responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const SymbolsIntentHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'SymbolsIntent';
    },

    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;
        const name = handlerInput.requestEnvelope.request.intent.slots.god.value;

        let speechOutput;
        const god = getGod(name);
        if (!god) {
            const speechOutputs = getGodNotKnownSpeechOutputs(name);
            speechOutput = speechOutputs.join(' ');
        } else {
            speechOutput = `${god.name}s symbols are ${listToText(god.symbols)}.`;
        }

        return responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const AboutHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AboutIntent';
    },

    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        const speechOutputs = [
            `This is an open source project. Just search for ${SKILL_NAME} on GitHub and you will find it!`,
            '<break time="500ms"/>',
            'All information is taken from Wikipedia.',
            '<break time="500ms"/>',
            'You can also checkout the corresponding webapp www.lyktos.ml',
        ];
        const speechOutput = speechOutputs.join(' ');

        return responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const HelpHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest' && request.intent.name === 'AMAZON.HelpIntent';
    },

    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        const randomGods = getGodSample(2);

        const speechOutputs = [
            'You can ask me about greek and roman mythology.',
            'I am happy list greek or roman gods.',
            `Or give you details about the god ${randomGods[0].name}.`,
            `Or compare the god ${randomGods[1].name} with its counterpart.`,
        ];
        const speechOutput = speechOutputs.join(' ');

        return responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    },
};

const StopHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;

        return request.type === 'IntentRequest'
            && (request.intent.name === 'AMAZON.NoIntent'
            || request.intent.name === 'AMAZON.CancelIntent'
            || request.intent.name === 'AMAZON.StopIntent');
    },

    handle(handlerInput) {
        const responseBuilder = handlerInput.responseBuilder;

        const speechOutputs = [
            'OK.  Goodbye!',
	    	'Have a great day!',
		    'Come back again soon!',
        ];
        const speechOutput = randomize(speechOutputs);

        return responseBuilder
            .speak(speechOutput)
            .getResponse();
    },
};

const ErrorHandler = {
    canHandle() {
        return true;
    },

    handle(handlerInput, error) {
        const request = handlerInput.requestEnvelope.request;

        console.log(`Error handled: ${error.message}`);
        console.log(` Original request was ${JSON.stringify(request, null, 2)}\n`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

const FallbackHandler = {
    canHandle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        return request.type === 'IntentRequest'
            && request.intent.name === 'AMAZON.FallbackIntent';
    },

    handle(handlerInput) {
        const FALLBACK_MESSAGE = `The ${SKILL_NAME} skill can't help you with that. It can help you learn about greek and roman mythology. What can I help you with?`;
        const FALLBACK_REPROMPT = 'What can I help you with?';

        return handlerInput.responseBuilder
            .speak(FALLBACK_MESSAGE)
            .reprompt(FALLBACK_REPROMPT)
            .getResponse();

    },
};

module.exports = {
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
};
