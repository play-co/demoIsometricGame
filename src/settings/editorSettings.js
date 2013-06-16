import isometric.models.item.DynamicModel as DynamicModel;
import isometric.models.item.PathWalkerModel as PathWalkerModel;
import isometric.models.item.SpawnerModel as SpawnerModel;

import isometric.models.map.updaters.lineUpdater as lineUpdater;

import src.constants.gameConstants as gameConstants;

import src.models.item.buildings.BuildingColumn as BuildingColumn;
import src.models.item.buildings.BuildingEngineers as BuildingEngineers;
import src.models.item.buildings.BuildingGarden as BuildingGarden;
import src.models.item.buildings.BuildingFiremen as BuildingFiremen;
import src.models.item.buildings.BuildingGuards as BuildingGuards;
import src.models.item.buildings.BuildingHouse as BuildingHouse;
import src.models.item.buildings.BuildingMansion as BuildingMansion;
import src.models.item.buildings.BuildingMarket as BuildingMarket;
import src.models.item.buildings.BuildingPump as BuildingPump;
import src.models.item.buildings.BuildingBrazier as BuildingBrazier;
import src.models.item.buildings.BuildingTemple as BuildingTemple;

import src.models.item.people.ItemCitizen as ItemCitizen;
import src.models.item.people.ItemEngineer as ItemEngineer;
import src.models.item.people.ItemFireman as ItemFireman;
import src.models.item.people.ItemGuard as ItemGuard;
import src.models.item.people.ItemTrader as ItemTrader;

import src.models.updaters.aquaductUpdater as aquaductUpdater;

import src.models.validators.aquaductRoadValidator as aquaductRoadValidator;
import src.models.validators.roadAquaductValidator as roadAquaductValidator;
import src.models.validators.walkableValidator as walkableValidator;
import src.models.validators.pumpValidator as pumpValidator;

exports = {
	/* ========================== Infrastructure ========================== */
	aquaduct: {
		type: 'line',
		price: 25,
		layer: 1,
		group: gameConstants.tileGroups.AQUA_EMPTY,
		tileSet: {
			horizontal: [24, 56, 48],
			vertical: [18, 146, 144]
		},
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero', validator: aquaductRoadValidator},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND], validator: aquaductRoadValidator}
			],
			decline: [
				{layer: 1, type: 'notEmptyAndNotGroup', groups: [gameConstants.tileGroups.AQUA_EMPTY, gameConstants.tileGroups.AQUA_FULL], validator: aquaductRoadValidator}
			]
		},
		updater: aquaductUpdater
	},
	roadDirt: {
		type: 'line',
		price: 20,
		layer: 1,
		group: gameConstants.tileGroups.ROAD_DIRT,
		tileSet: {
			horizontal: [24, 56, 48],
			vertical: [18, 146, 144]
		},
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero', validator: roadAquaductValidator},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND], validator: roadAquaductValidator}
			],
			decline: [
				{layer: 1, type: 'notEmptyAndNotGroup', groups: [gameConstants.tileGroups.ROAD_DIRT], validator: roadAquaductValidator}
			]
		},
		updater: lineUpdater
	},
	roadPaved: {
		type: 'line',
		price: 30,
		layer: 1,
		group: gameConstants.tileGroups.ROAD_PAVED,
		tileSet: {
			horizontal: [24, 56, 48],
			vertical: [18, 146, 144]
		},
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero', validator: roadAquaductValidator},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND], validator: roadAquaductValidator}
			],
			decline: [
				{layer: 1, type: 'notEmptyAndNotGroup', groups: [gameConstants.tileGroups.ROAD_PAVED], validator: roadAquaductValidator}
			]
		},
		updater: lineUpdater
	},

	/* ========================== Utility buildings ========================== */
	buildingEngineers: {
		type: 'item',
		price: 100,
		model: BuildingEngineers,
		modelOpts: {
			modelInfo: [
				{count: 1, type: gameConstants.people.ENGINEER, ctor: ItemEngineer, opts: { item: 'engineer' }}
			],
			conditions: {
				accept: [
					{layer: 1, type: 'group', groups: [gameConstants.tileGroups.ROAD_DIRT, gameConstants.tileGroups.ROAD_PAVED], validator: walkableValidator}
				]				
			}
		},
		layer: 1,
		group: gameConstants.tileGroups.BUILDING_ENGINEERS,
		width: 2,
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero'},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND]}
			],
			decline: [
				{layer: 1, type: 'notEmpty'},
			]
		}
	},
	buildingFiremen: {
		type: 'item',
		price: 100,
		model: BuildingFiremen,
		modelOpts: {
			modelInfo: [
				{count: 1, type: gameConstants.people.FIREMAN, ctor: ItemFireman, opts: { item: 'fireman' }}
			],
			conditions: {
				accept: [
					{layer: 1, type: 'group', groups: [gameConstants.tileGroups.ROAD_DIRT, gameConstants.tileGroups.ROAD_PAVED], validator: walkableValidator}
				]				
			}
		},
		layer: 1,
		group: gameConstants.tileGroups.BUILDING_FIREMEN,
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero'},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND]}
			],
			decline: [
				{layer: 1, type: 'notEmpty'},
			]
		}
	},
	buildingGuards: {
		type: 'item',
		price: 100,
		model: BuildingGuards,
		modelOpts: {
			modelInfo: [
				{count: 2, type: gameConstants.people.GUARD, ctor: ItemGuard, opts: { item: 'guard' }}
			],
			conditions: {
				accept: [
					{layer: 1, type: 'group', groups: [gameConstants.tileGroups.ROAD_DIRT, gameConstants.tileGroups.ROAD_PAVED], validator: walkableValidator}
				]				
			}
		},
		layer: 1,
		group: gameConstants.tileGroups.BUILDING_GUARDS,
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero'},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND]}
			],
			decline: [
				{layer: 1, type: 'notEmpty'},
			]
		}
	},
	buildingMarket: {
		type: 'item',
		price: 250, // Total is 500
		model: BuildingMarket,
		modelOpts: {
			modelInfo: [
				{count: 2, type: gameConstants.people.TRADER, ctor: ItemTrader, opts: { item: 'trader' }}
			],
			conditions: {
				accept: [
					{layer: 1, type: 'group', groups: [gameConstants.tileGroups.ROAD_DIRT, gameConstants.tileGroups.ROAD_PAVED], validator: walkableValidator}
				]				
			}
		},
		layer: 1,
		group: gameConstants.tileGroups.BUILDING_MARKET,
		width: 2,
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero'},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND]}
			],
			decline: [
				{layer: 1, type: 'notEmpty'},
			]
		}
	},
	buildingPump: {
		type: 'item',
		price: 100,
		model: BuildingPump,
		layer: 1,
		group: gameConstants.tileGroups.BUILDING_PUMP,
		conditions: {
			accept: [
				{layer: 0, type: 'group', groups: [], validator: pumpValidator}
			],
			decline: [
				{layer: 1, type: 'notEmpty'},
			]
		},
		surrounding: [
			{tileX: -1, tileY: 0, groups: [gameConstants.tileGroups.AQUA_EMPTY, gameConstants.tileGroups.AQUA_FULL], index: 24},
			{tileX: 1, tileY: 0, groups: [gameConstants.tileGroups.AQUA_EMPTY, gameConstants.tileGroups.AQUA_FULL], index: 48},
			{tileX: 0, tileY: -1, groups: [gameConstants.tileGroups.AQUA_EMPTY, gameConstants.tileGroups.AQUA_FULL], index: 18},
			{tileX: 0, tileY: 1, groups: [gameConstants.tileGroups.AQUA_EMPTY, gameConstants.tileGroups.AQUA_FULL], index: 144}
		]
	},

	/* ========================== Houses ========================== */
	buildingHouse: {
		type: 'item',
		price: 70,
		model: BuildingHouse,
		modelOpts: {
			modelInfo: [
				{count: 1, type: gameConstants.people.CITIZEN, ctor: ItemCitizen, opts: { item: 'citizen' }}
			],
			conditions: {
				accept: [
					{layer: 1, type: 'group', groups: [gameConstants.tileGroups.ROAD_DIRT, gameConstants.tileGroups.ROAD_PAVED], validator: walkableValidator}
				]				
			}
		},
		layer: 1,
		group: gameConstants.tileGroups.BUILDING_HOUSE,
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero'},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND]}
			],
			decline: [
				{layer: 1, type: 'notEmpty'},
			]
		}
	},
	buildingMansion: {
		type: 'item',
		price: 125, // Total is 250
		model: BuildingMansion,
		modelOpts: {
			modelInfo: [
				{count: 1, type: gameConstants.people.TRADER, ctor: ItemTrader, opts: { item: 'trader' }},
				{count: 1, type: gameConstants.people.CITIZEN, ctor: ItemCitizen, opts: { item: 'citizen' }}
			],
			conditions: {
				accept: [
					{layer: 1, type: 'group', groups: [gameConstants.tileGroups.ROAD_DIRT, gameConstants.tileGroups.ROAD_PAVED], validator: walkableValidator}
				]				
			}
		},
		layer: 1,
		group: gameConstants.tileGroups.BUILDING_MANSION,
		width: 2,
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero'},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND]}
			],
			decline: [
				{layer: 1, type: 'notEmpty'},
			]
		}
	},

	/* ========================== Land value ========================== */
	buildingBrazier: {
		type: 'item',
		price: 120,
		model: BuildingBrazier,
		modelOpts: {
			modelInfo: [
				{count: 0}
			],
			conditions: {
				accept: [
					{layer: 1, type: 'group', groups: [gameConstants.tileGroups.ROAD_DIRT, gameConstants.tileGroups.ROAD_PAVED], validator: walkableValidator}
				]				
			}
		},
		layer: 1,
		group: gameConstants.tileGroups.BUILDING_BRAZIER,
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero'},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND]}
			],
			decline: [
				{layer: 1, type: 'notEmpty'},
			]
		}
	},
	buildingColumn: {
		type: 'item',
		price: 120,
		model: BuildingColumn,
		modelOpts: {
			modelInfo: [
				{count: 0}
			],
			conditions: {
				accept: [
					{layer: 1, type: 'group', groups: [gameConstants.tileGroups.ROAD_DIRT, gameConstants.tileGroups.ROAD_PAVED], validator: walkableValidator}
				]				
			}
		},
		layer: 1,
		group: gameConstants.tileGroups.BUILDING_COLUMN,
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero'},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND]}
			],
			decline: [
				{layer: 1, type: 'notEmpty'},
			]
		}
	},
	buildingGarden: {
		type: 'item',
		price: 40, // Total is 160
		model: BuildingGarden,
		modelOpts: {
			modelInfo: [
				{count: 0}
			],
			conditions: {
				accept: [
					{layer: 1, type: 'group', groups: [gameConstants.tileGroups.ROAD_DIRT, gameConstants.tileGroups.ROAD_PAVED], validator: walkableValidator}
				]				
			}
		},
		layer: 1,
		group: gameConstants.tileGroups.BUILDING_GARDEN,
		width: 2,
		height: 2,
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero'},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND]}
			],
			decline: [
				{layer: 1, type: 'notEmpty'},
			]
		}
	},
	buildingTemple: {
		type: 'item',
		price: 125,
		model: BuildingTemple,
		modelOpts: {
			modelInfo: [
				{count: 0}
			],
			conditions: {
				accept: [
					{layer: 1, type: 'group', groups: [gameConstants.tileGroups.ROAD_DIRT, gameConstants.tileGroups.ROAD_PAVED], validator: walkableValidator}
				]				
			}
		},
		layer: 1,
		group: gameConstants.tileGroups.BUILDING_TEMPLE,
		width: 2,
		height: 2,
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero'},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND]}
			],
			decline: [
				{layer: 1, type: 'notEmpty'},
			]
		}
	},

	/* ========================== Decoration ========================== */
	plant: {
		type: 'item',
		price: 0,
		layer: 1,
		group: gameConstants.tileGroups.PLANT,
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero'},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND]}
			],
			decline: [
				{layer: 1, type: 'notEmpty'},
			]
		}
	},
	tree: {
		type: 'item',
		price: 0,
		layer: 1,
		group: gameConstants.tileGroups.TREE,
		conditions: {
			accept: [
				{layer: 0, type: 'emptyOrZero'},
				{layer: 0, type: 'group', groups: [gameConstants.tileGroups.GROUND]}
			],
			decline: [
				{layer: 1, type: 'notEmpty'},
			]
		}
	}
};