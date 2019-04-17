const { godsList } = require('./gods-data');

function listToText(list) {
    if (! list || list.length === 0) {
        return '';
    } else if (list.length === 1) {
        return list[0].replace(/[^\w\s,]/gi, '');
    } else {
        return `${list.slice(0, list.length - 1).join(', ')} and ${list.slice(-1)[0]}`.replace(/[^\w\s,]/gi, '');
    }
}

function randomize(array){
	const randomItem = array[Math.floor(Math.random() * array.length)];
	return randomItem;
}

function godOrGoddess(god) {
    return god.gender === 'male' ? 'god' : 'goddess';
}

function heOrShe(god) {
    return god.gender === 'male' ? 'He' : 'She';
}

function hisOrHer(god) {
    return god.gender === 'male' ? 'His' : 'Her';
}

function filterByType(godsList, type) {
    return godsList.filter(god => god.type === type);
}

function getGodsMap(godsList) {
    return godsList.reduce((godsMap, god) => {
        godsMap[god.id] = god;
        return godsMap;
    }, {});
}

function shuffle(array) {
	var currentIndex = array.length;
    var temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

function getGodSample(sampleSize) {
    return shuffle(godsList).slice(0, sampleSize);
}

function getGodNotKnownSpeechOutputs(name) {
    const godNamesSample = getGodSample(3).map(god => god.name);
    const speechOutputs = [
        `Sorry, I do not know the god ${name}.`,
        `But you can ask me about ${listToText(godNamesSample)} for example.`,
    ];
    return speechOutputs;
}

function getGodsListByType(type) {
    if (!type) {
        return null;
    }
    return filterByType(godsList, type.toLowerCase());
}

function getGod(name) {
    if (!name) {
        return null;
    }
    const godsMap = getGodsMap(godsList);
    return godsMap[name.toLowerCase()];
}

module.exports = {
    listToText,
    randomize,
    godOrGoddess,
    heOrShe,
    hisOrHer,
    getGodSample,
    getGodNotKnownSpeechOutputs,
    getGodsListByType,
    getGod,
};
