import lib.Enum as Enum;

exports = Enum(
	'FIND_WATER',
	'FOUND_WATER',
	'PLACE_PUMP',
	'FIRST_PUMP',
	'FIRST_HOUSE',
	'FIRST_MARKET',
	'FIRST_FIRESTATION',
	'FIRST_GUARDS'
);

exports.texts = [];

exports.texts[exports.PLACE_PUMP] = {
	once: true,
	texts: [
		'Welcome to Rome, sweet Rome.',
		'The first thing you probably want to do is',
		'place a pump house at the egde of the water.'
	]
};
exports.texts[exports.FIRST_PUMP] = {
	once: true,
	texts: [
		'Your first pump!',
		'You can connect it to buildings with an aquaduct.'
	]
};
exports.texts[exports.FIRST_HOUSE] = {
	once: true,
	texts: [
		'Your first house!',
		'Make sure it\'s close enough to an aquaduct',
		'and it needs a road.',
		'You are starting to collect taxes!'
	]
};
exports.texts[exports.FIRST_MARKET] = {
	once: true,
	texts: [
		'Your first market!',
		'A market generates a lot of tax income.'
	]
};
exports.texts[exports.FIRST_FIRESTATION] = {
	once: true,
	texts: [
		'Your first fire station!',
		'Make sure a road connects it to other buildings.',
		'Warning: The fire station',
		'does not generate tax income!'
	]
};
exports.texts[exports.FIRST_GUARDS] = {
	once: true,
	texts: [
		'Your first watch tower!',
		'Make sure a road connects it to other buildings.',
		'Warning: The guard tower',
		'does not generate tax income!'
	]
};