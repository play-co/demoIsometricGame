import src.constants.gameConstants as gameConstants;

var tileGroups = gameConstants.tileGroups;

/*

road, 56:    road, 146:
    +            +
   / \          / \
  /  /\        /\  \
 +  /  +      +  \  +
  \/  /        \  \/
   \ /          \ /
    +            +

254, 255     252, 253
    +            +
   / \          / \
  /\ A\        /A /\
 +  A  +      +  A  +
  \A \/        \/ A/
   \ /          \ /
    +            +
*/
var ROAD_DIRT = tileGroups.ROAD_DIRT;
var ROAD_PAVED = tileGroups.ROAD_PAVED;
var AQUA_EMPTY = tileGroups.AQUA_EMPTY;
var AQUA_FULL = tileGroups.AQUA_FULL;

exports = {
	rules: [
		{ag: ROAD_DIRT, ai: 146, bg: AQUA_EMPTY, bi: 56, rg: AQUA_EMPTY, ri: 255},
		{ag: ROAD_DIRT, ai: 56, bg: AQUA_EMPTY, bi: 146, rg: AQUA_EMPTY, ri: 253},
		{ag: AQUA_EMPTY, ai: 56, bg: ROAD_DIRT, bi: 146, rg: AQUA_EMPTY, ri: 255},
		{ag: AQUA_EMPTY, ai: 146, bg: ROAD_DIRT, bi: 56, rg: AQUA_EMPTY, ri: 253},

		{ag: ROAD_DIRT, ai: 146, bg: AQUA_FULL, bi: 56, rg: AQUA_FULL, ri: 255},
		{ag: ROAD_DIRT, ai: 56, bg: AQUA_FULL, bi: 146, rg: AQUA_FULL, ri: 253},
		{ag: AQUA_FULL, ai: 56, bg: ROAD_DIRT, bi: 146, rg: AQUA_FULL, ri: 255},
		{ag: AQUA_FULL, ai: 146, bg: ROAD_DIRT, bi: 56, rg: AQUA_FULL, ri: 253},

		{ag: ROAD_PAVED, ai: 146, bg: AQUA_EMPTY, bi: 56, rg: AQUA_EMPTY, ri: 254},
		{ag: ROAD_PAVED, ai: 56, bg: AQUA_EMPTY, bi: 146, rg: AQUA_EMPTY, ri: 252},
		{ag: AQUA_EMPTY, ai: 56, bg: ROAD_PAVED, bi: 146, rg: AQUA_EMPTY, ri: 254},
		{ag: AQUA_EMPTY, ai: 146, bg: ROAD_PAVED, bi: 56, rg: AQUA_EMPTY, ri: 252},

		{ag: ROAD_PAVED, ai: 146, bg: AQUA_FULL, bi: 56, rg: AQUA_FULL, ri: 254},
		{ag: ROAD_PAVED, ai: 56, bg: AQUA_FULL, bi: 146, rg: AQUA_FULL, ri: 252},
		{ag: AQUA_FULL, ai: 56, bg: ROAD_PAVED, bi: 146, rg: AQUA_FULL, ri: 254},
		{ag: AQUA_FULL, ai: 146, bg: ROAD_PAVED, bi: 56, rg: AQUA_FULL, ri: 252}
	],

	generatorSteps: [
		{
			type: 'rectangles',
			firstRectangle: {x: 62, y: 9, w: 4, h: 4},
			stepsPerFrame: 20,
			repeat: 105,
			count: 15,
			layer: 0,
			group: tileGroups.WATER,
			width: 3,
			height: 3,
		},
		{
			type: 'rectangles',
			stepsPerFrame: 20,
			repeat: 200,
			count: 7,
			layer: 0,
			group: tileGroups.GROUND,
			accept: [
				{
					layer: 0,
					group: tileGroups.GROUND,
					tiles: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
				},
				{
					layer: 0,
					group: tileGroups.WATER,
					tiles: [0]
				}
			],
			width: 4,
			height: 4
		},
		{
			type: 'fill',
			stepsPerFrame: 200,
			repeat: 200,
			layer: 0,
			index: 1,
			group: tileGroups.GROUND_ITEM,
			chance: 0.1,
			accept: [
				{
					layer: 0,
					group: tileGroups.GROUND,
					tiles: [0]
				}
			]
		},
		{
			type: 'fill',
			stepsPerFrame: 200,
			repeat: 200,
			layer: 1,
			index: 0,
			group: tileGroups.TREE,
			chance: 0.1,
			accept: [
				{
					layer: 0,
					group: tileGroups.GROUND,
					tiles: [15]
				}
			]
		}
	],
	randomTiles: [
		{
			group: tileGroups.GROUND,
			index: 0,
			chances: [0.85, 0.05, 0.05, 0.05]
		},
		{
			group: tileGroups.GROUND,
			index: 15,
			chances: [0.85, 0.05, 0.05, 0.05]
		},
		{
			group: tileGroups.PLANT,
			index: 0,
			chances: [0.5, 0.5]
		},
		{
			group: tileGroups.TREE,
			index: 0,
			chances: [0.5, 0.5]
		},
		{
			group: tileGroups.GROUND_ITEM,
			index: 1,
			chances: [0.25, 0.25, 0.25, 0.25]
		}
	]
};