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

function getGodsListByType(type) {
    return filterByType(godsList, type.toLowerCase());
}

function getGod(name) {
    const godsMap = getGodsMap(godsList);
    return godsMap[name.toLowerCase()];
}

module.exports = {
    listToText,
    randomize,
    godOrGoddess,
    heOrShe,
    hisOrHer,
    getGodsListByType,
    getGod,
};
