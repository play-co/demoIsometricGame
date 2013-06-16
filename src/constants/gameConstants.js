import lib.Enum as Enum;

exports.startFunds = 700;

exports.people = Enum(
	'CITIZEN',
	'ENGINEER',
	'FIREMAN',
	'GUARD',
	'TRADER'
);

exports.missionResisents = 50;
exports.missionHouses = 50;
exports.missionMoney = 2000;

exports.buildingProperties = [];

exports.noWaterCrumbleChance = 0.001;

exports.buildingProperties[exports.people.CITIZEN] = {
	startValue: 30000,
	passByValue: 5000,
	decreaseValue: 2000,
	chance: 0.01 // Chance of needing repair if not enough citizens pass by
};
exports.buildingProperties[exports.people.ENGINEER] = {
	startValue: 45000,
	passByValue: 7000,
	decreaseValue: 500,
	chance: 0.01, // Chance of it needing repair
	chanceCollapse: 0.02 // Chance of the building collapsing once it needs repair
};
exports.buildingProperties[exports.people.FIREMAN] = {
	startValue: 45000,
	passByValue: 7000,
	decreaseValue: 500,
	chance: 0.005 // Chance of it burning down
};
exports.buildingProperties[exports.people.GUARD] = {
	startValue: 30000,
	passByValue: 5000,
	decreaseValue: 600,
	chance: 0.003 // Chance of it being robbed
};
exports.buildingProperties[exports.people.TRADER] = {
	startValue: 30000,
	passByValue: 5000,
	decreaseValue: 1000,
	chance: 0.02 // Chance of needing repair if not enough traders pass by
};

exports.tileGroups = Enum(
	'GROUND',
	'GROUND_ITEM',
	'WATER',
	'GREEN',
	'ROAD_DIRT',
	'ROAD_PAVED',
	'AQUA_EMPTY',
	'AQUA_FULL',
	'BUILDING_BRAZIER',
	'BUILDING_COLUMN',
	'BUILDING_ENGINEERS',
	'BUILDING_FIREMEN',
	'BUILDING_GARDEN',
	'BUILDING_GUARDS',
	'BUILDING_HOUSE',
	'BUILDING_MARKET',
	'BUILDING_MANSION',
	'BUILDING_PUMP',
	'BUILDING_TEMPLE',
	'PLANT',
	'TREE',
	'CURSOR'
);