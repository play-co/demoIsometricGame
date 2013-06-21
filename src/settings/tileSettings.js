import src.constants.gameConstants as gameConstants;

exports = [
	{
		cursorYes: 'resources/images/layer0/cursorYes.png',
		cursorNo: 'resources/images/layer0/cursorNo.png'
	},
	{
		group: gameConstants.tileGroups.GROUND,
		miniMapLayer: 0,
		images: [
			{
				index: 0,
				url: [
					'resources/images/layer0/ground0a.png',
					'resources/images/layer0/ground0b.png',
					'resources/images/layer0/ground0c.png',
					'resources/images/layer0/ground0d.png'
				]
			},
			{index: 1, url: 'resources/images/layer0/ground1.png'},
			{index: 2, url: 'resources/images/layer0/ground2.png'},
			{index: 3, url: 'resources/images/layer0/ground3.png'},
			{index: 4, url: 'resources/images/layer0/ground2.png', flipY: true},
			{index: 5, url: 'resources/images/layer0/ground5.png'},
			{index: 6, url: 'resources/images/layer0/ground6.png'},
			{index: 7, url: 'resources/images/layer0/ground7.png'},
			{index: 8, url: 'resources/images/layer0/ground1.png', flipX: true},
			{index: 9, url: 'resources/images/layer0/ground9.png'},
			{index: 10, url: 'resources/images/layer0/ground3.png', flipX: true},
			{index: 11, url: 'resources/images/layer0/ground11.png'},
			{index: 12, url: 'resources/images/layer0/ground5.png', flipX: true},
			{index: 13, url: 'resources/images/layer0/ground11.png', flipY: true},
			{index: 14, url: 'resources/images/layer0/ground7.png', flipX: true},
			{
				index: 15,
				url: [
					'resources/images/layer0/ground15a.png',
					'resources/images/layer0/ground15b.png',
					'resources/images/layer0/ground15c.png',
					'resources/images/layer0/ground15d.png'
				]
			}
		],
		x: 0,
		y: 0,
		z: [0, 0],
		width: 150,
		height: 120
	},
	{
		group: gameConstants.tileGroups.GROUND_ITEM,
		miniMapLayer: 0,
		images: [
			{
				index: 1,
				url: [
					'resources/images/layer0/ground0e.png',
					'resources/images/layer0/ground0f.png',
					'resources/images/layer0/ground0g.png',
					'resources/images/layer0/ground0h.png'
				]
			},
		],
		x: 0,
		y: 0,
		z: [0, 0],
		width: 150,
		height: 120
	},
	{
		group: gameConstants.tileGroups.WATER,
		miniMapLayer: 0,
		images: [
			{
				index: 0,
				url: [
					'resources/images/layer0/water0a.png',
					'resources/images/layer0/water0b.png',
					'resources/images/layer0/water0c.png',
					'resources/images/layer0/water0d.png'
				]
			},
			{index: 1, url: 'resources/images/layer0/water1.png'},
			{index: 2, url: 'resources/images/layer0/water2.png'},
			{index: 3, url: 'resources/images/layer0/water3.png'},
			{index: 4, url: 'resources/images/layer0/water2.png', flipY: true},
			{index: 5, url: 'resources/images/layer0/water5.png'},
			{index: 6, url: 'resources/images/layer0/water6.png'},
			{index: 7, url: 'resources/images/layer0/water7.png'},
			{index: 8, url: 'resources/images/layer0/water1.png', flipX: true},
			{index: 9, url: 'resources/images/layer0/water9.png'},
			{index: 10, url: 'resources/images/layer0/water3.png', flipX: true},
			{index: 11, url: 'resources/images/layer0/water11.png'},
			{index: 12, url: 'resources/images/layer0/water5.png', flipX: true},
			{index: 13, url: 'resources/images/layer0/water11.png', flipY: true},
			{index: 14, url: 'resources/images/layer0/water7.png', flipX: true},
			{index: 15, url: false}
		],
		x: 0,
		y: 0,
		z: [0, 0],
		width: 150,
		height: 120
	},
	{
		group: gameConstants.tileGroups.ROAD_DIRT,
		miniMapLayer: 0,
		images: [
			{index: 16, url: 'resources/images/layer0/roadDirt16.png'},
			{index: 18, url: 'resources/images/layer0/roadDirt18.png'},
			{index: 24, url: 'resources/images/layer0/roadDirt18.png', flipY: true},
			{index: 26, url: 'resources/images/layer0/roadDirt176.png'},
			{index: 48, url: 'resources/images/layer0/roadDirt18.png', flipX: true},
			{index: 50, url: 'resources/images/layer0/roadDirt152.png'},
			{index: 56, url: 'resources/images/layer0/roadDirt56.png'},
			{index: 58, url: 'resources/images/layer0/roadDirt184.png'},
			{index: 144, url: 'resources/images/layer0/roadDirt24.png', flipX: true},
			{index: 146, url: 'resources/images/layer0/roadDirt56.png', flipX: true},
			{index: 152, url: 'resources/images/layer0/roadDirt152.png', flipY: true},
			{index: 154, url: 'resources/images/layer0/roadDirt154.png'},
			{index: 176, url: 'resources/images/layer0/roadDirt176.png', flipX: true},
			{index: 178, url: 'resources/images/layer0/roadDirt184.png', flipX: true},
			{index: 184, url: 'resources/images/layer0/roadDirt154.png', flipX: true},
			{index: 186, url: 'resources/images/layer0/roadDirt186.png'}
		],
		x: 0,
		y: 0,
		z: [0, 0],
		width: 150,
		height: 120
	},
	{
		group: gameConstants.tileGroups.ROAD_PAVED,
		miniMapLayer: 0,
		images: [
			{index: 16, url: 'resources/images/layer0/roadPaved16.png'},
			{index: 18, url: 'resources/images/layer0/roadPaved18.png'},
			{index: 24, url: 'resources/images/layer0/roadPaved18.png', flipY: true},
			{index: 26, url: 'resources/images/layer0/roadPaved176.png'},
			{index: 48, url: 'resources/images/layer0/roadPaved18.png', flipX: true},
			{index: 50, url: 'resources/images/layer0/roadPaved152.png'},
			{index: 56, url: 'resources/images/layer0/roadPaved56.png'},
			{index: 58, url: 'resources/images/layer0/roadPaved184.png'},
			{index: 144, url: 'resources/images/layer0/roadPaved24.png', flipX: true},
			{index: 146, url: 'resources/images/layer0/roadPaved56.png', flipX: true},
			{index: 152, url: 'resources/images/layer0/roadPaved152.png', flipY: true},
			{index: 154, url: 'resources/images/layer0/roadPaved154.png'},
			{index: 176, url: 'resources/images/layer0/roadPaved176.png', flipX: true},
			{index: 178, url: 'resources/images/layer0/roadPaved184.png', flipX: true},
			{index: 184, url: 'resources/images/layer0/roadPaved154.png', flipX: true},
			{index: 186, url: 'resources/images/layer0/roadPaved186.png'}
		],
		x: 0,
		y: 0,
		z: [0, 0],
		width: 150,
		height: 120
	},
	{
		group: gameConstants.tileGroups.AQUA_EMPTY,
		miniMapLayer: 1,
		images: [
			{index: 16, url: 'resources/images/layer0/aquaEmpty16.png'},
			{index: 18, url: 'resources/images/layer0/aquaEmpty18.png'},
			{index: 24, url: 'resources/images/layer0/aquaEmpty24.png'},
			{index: 26, url: 'resources/images/layer0/aquaEmpty26.png'},
			{index: 48, url: 'resources/images/layer0/aquaEmpty18.png', flipX: true},
			{index: 50, url: 'resources/images/layer0/aquaEmpty50.png'},
			{index: 56, url: 'resources/images/layer0/aquaEmpty56.png'},
			{index: 58, url: 'resources/images/layer0/aquaEmpty58.png'},
			{index: 144, url: 'resources/images/layer0/aquaEmpty24.png', flipX: true},
			{index: 146, url: 'resources/images/layer0/aquaEmpty56.png', flipX: true},
			{index: 152, url: 'resources/images/layer0/aquaEmpty152.png'},
			{index: 154, url: 'resources/images/layer0/aquaEmpty154.png'},
			{index: 176, url: 'resources/images/layer0/aquaEmpty26.png', flipX: true},
			{index: 178, url: 'resources/images/layer0/aquaEmpty58.png', flipX: true},
			{index: 184, url: 'resources/images/layer0/aquaEmpty184.png'},
			{index: 186, url: 'resources/images/layer0/aquaEmpty186.png'},

			/* Road & aquaduct crossings... */
			{index: 252, url: 'resources/images/layer0/roadPaved56a.png', flipX: true},
			{index: 253, url: 'resources/images/layer0/roadDirt56a.png', flipX: true},
			{index: 254, url: 'resources/images/layer0/roadPaved56a.png'},
			{index: 255, url: 'resources/images/layer0/roadDirt56a.png'}
		],
		x: 0,
		y: 0,
		z: [1, 50],
		width: 150,
		height: 180
	},
	{
		group: gameConstants.tileGroups.AQUA_FULL,
		miniMapLayer: 1,
		images: [
			{index: 18, url: 'resources/images/layer0/aquaFull18.png'},
			{index: 24, url: 'resources/images/layer0/aquaFull24.png'},
			{index: 26, url: 'resources/images/layer0/aquaFull26.png'},
			{index: 48, url: 'resources/images/layer0/aquaFull18.png', flipX: true},
			{index: 50, url: 'resources/images/layer0/aquaFull50.png'},
			{index: 56, url: 'resources/images/layer0/aquaFull56.png'},
			{index: 58, url: 'resources/images/layer0/aquaFull58.png'},
			{index: 144, url: 'resources/images/layer0/aquaFull24.png', flipX: true},
			{index: 146, url: 'resources/images/layer0/aquaFull56.png', flipX: true},
			{index: 152, url: 'resources/images/layer0/aquaFull152.png'},
			{index: 154, url: 'resources/images/layer0/aquaFull154.png'},
			{index: 176, url: 'resources/images/layer0/aquaFull26.png', flipX: true},
			{index: 178, url: 'resources/images/layer0/aquaFull58.png', flipX: true},
			{index: 184, url: 'resources/images/layer0/aquaFull184.png'},
			{index: 186, url: 'resources/images/layer0/aquaFull186.png'},

			/* Road & aquaduct crossings... */
			{index: 252, url: 'resources/images/layer0/roadPaved56b.png', flipX: true},
			{index: 253, url: 'resources/images/layer0/roadDirt56b.png', flipX: true},
			{index: 254, url: 'resources/images/layer0/roadPaved56b.png'},
			{index: 255, url: 'resources/images/layer0/roadDirt56b.png'}
		],
		x: 0,
		y: 0,
		z: [1, 50],
		width: 150,
		height: 180
	},
	{
		group: gameConstants.tileGroups.BUILDING_PUMP,
		miniMapLayer: 1,
		images: [
			{index: 0, url: 'resources/images/layer1a/buildingPumpA.png', selectable: true},
			{index: 1, url: 'resources/images/layer1a/buildingPumpB.png', selectable: true},
			{index: 2, url: 'resources/images/layer1a/buildingPumpB.png', selectable: true, flipX: true},
			{index: 3, url: 'resources/images/layer1a/buildingPumpC.png', selectable: true}
		],
		x: 0,
		y: 0,
		z: [1, 0],
		width: 150,
		height: 236
	},
	{
		group: gameConstants.tileGroups.BUILDING_HOUSE,
		miniMapLayer: 1,
		images: [
			{index: 0, url: 'resources/images/layer1a/buildingHouse.png', selectable: true},
			{index: 1, url: 'resources/images/layer1a/buildingHouseRepair.png', selectable: true},
			{index: 2, url: 'resources/images/layer1a/building1x1Rubble.png', selectable: true}
		],
		x: 0,
		y: 0,
		z: [1, 0],
		width: 150,
		height: 191 * 150 / 120
	},
	{
		group: gameConstants.tileGroups.BUILDING_FIREMEN,
		miniMapLayer: 1,
		images: [
			{index: 0, url: 'resources/images/layer1a/buildingFiremen.png', selectable: true},
			{index: 1, url: 'resources/images/layer1a/buildingFiremenRepair.png', selectable: true},
			{index: 2, url: 'resources/images/layer1a/building1x1Rubble.png', selectable: true}
		],
		x: 0,
		y: 0,
		z: [1, 0],
		width: 150,
		height: 192 * 150 / 120
	},
	{
		group: gameConstants.tileGroups.BUILDING_GUARDS,
		miniMapLayer: 1,
		images: [
			{index: 0, url: 'resources/images/layer1a/buildingGuards.png', selectable: true},
			{index: 1, url: 'resources/images/layer1a/buildingGuardsRepair.png', selectable: true},
			{index: 2, url: 'resources/images/layer1a/building1x1Rubble.png', selectable: true}
		],
		x: 0,
		y: 0,
		z: [1, 0],
		width: 150,
		height: 192 * 150 / 120
	},
	{
		group: gameConstants.tileGroups.BUILDING_ENGINEERS,
		miniMapLayer: 1,
		images: [
			{index: 0, url: 'resources/images/layer1a/buildingEngineers.png', selectable: true},
			{index: 1, url: 'resources/images/layer1a/buildingEngineersRepair.png', selectable: true},
			{index: 2, url: 'resources/images/layer1a/building1x2Rubble.png', selectable: true}
		],
		x: 0,
		y: 0,
		z: [1, 0],
		width: 150 * 1.5,
		height: 240 * 150 / 120
	},
	{
		group: gameConstants.tileGroups.BUILDING_GARDEN,
		miniMapLayer: 1,
		images: [
			{index: 0, url: 'resources/images/layer1a/buildingGarden.png', selectable: true},
			{index: 1, url: 'resources/images/layer1a/buildingGardenRepair.png', selectable: true},
			{index: 2, url: 'resources/images/layer1b/building2x2Rubble.png', selectable: true}
		],
		x: -75,
		y: 0,
		z: [1, -101],
		width: 150 * 2,
		height: 120 * 3
	},
	{
		group: gameConstants.tileGroups.BUILDING_TEMPLE,
		miniMapLayer: 1,
		images: [
			{index: 0, url: 'resources/images/layer1b/buildingTemple.png', selectable: true},
			{index: 1, url: 'resources/images/layer1b/buildingTempleRepair.png', selectable: true},
			{index: 2, url: 'resources/images/layer1b/building2x2Rubble.png', selectable: true}
		],
		x: -75,
		y: 0,
		z: [1, -101],
		width: 150 * 2,
		height: 120 * 3
	},
	{
		group: gameConstants.tileGroups.BUILDING_MANSION,
		miniMapLayer: 1,
		images: [
			{index: 0, url: 'resources/images/layer1a/buildingMansion.png', selectable: true},
			{index: 1, url: 'resources/images/layer1a/buildingMansionRepair.png', selectable: true},
			{index: 2, url: 'resources/images/layer1a/building1x2Rubble.png', selectable: true}
		],
		x: 0,
		y: 0,
		z: [1, 0],
		width: 150 * 1.5,
		height: 240 * 150 / 120
	},
	{
		group: gameConstants.tileGroups.BUILDING_MARKET,
		miniMapLayer: 1,
		images: [
			{index: 0, url: 'resources/images/layer1a/buildingMarket.png', selectable: true},
			{index: 1, url: 'resources/images/layer1a/buildingMarketRepair.png', selectable: true},
			{index: 2, url: 'resources/images/layer1a/building1x2Rubble.png', selectable: true}
		],
		x: 0,
		y: 0,
		z: [1, 0],
		width: 150 * 1.5,
		height: 240 * 150 / 120
	},
	{
		group: gameConstants.tileGroups.BUILDING_COLUMN,
		miniMapLayer: 1,
		images: [
			{index: 0, url: 'resources/images/layer1a/buildingColumn.png', selectable: true},
			{index: 1, url: 'resources/images/layer1a/buildingColumnRepair.png', selectable: true},
			{index: 2, url: 'resources/images/layer1a/building1x1Rubble.png', selectable: true}
		],
		x: 0,
		y: 0,
		z: [1, 0],
		width: 150,
		height: 192 * 150 / 120
	},
	{
		group: gameConstants.tileGroups.BUILDING_BRAZIER,
		miniMapLayer: 1,
		images: [
			{index: 0, url: 'resources/images/layer1a/buildingBrazier.png', selectable: true},
			{index: 1, url: 'resources/images/layer1a/buildingBrazierRepair.png', selectable: true},
			{index: 2, url: 'resources/images/layer1a/building1x1Rubble.png', selectable: true}
		],
		x: 0,
		y: 0,
		z: [1, 0],
		width: 150,
		height: 192 * 150 / 120
	},

	{
		group: gameConstants.tileGroups.TREE,
		miniMapLayer: 1,
		images: [
			{
				index: 0,
				url: [
					'resources/images/layer1a/treeNormal.png',
					'resources/images/layer1a/treeDouble.png'
				],
				blockEvents: true
			}
		],
		x: 0,
		y: 0,
		z: [1, 0],
		width: 150,
		height: 240 * 150 / 120
	},
	{
		group: gameConstants.tileGroups.PLANT,
		miniMapLayer: 1,
		images: [
			{
				index: 0,
				url: [
					'resources/images/layer1a/bushDouble.png',
					'resources/images/layer1a/bushNormal.png'
				],
				blockEvents: true
			}
		],
		x: 0,
		y: 0,
		z: [1, 0],
		width: 150,
		height: 144 * 150 / 120
	}
];