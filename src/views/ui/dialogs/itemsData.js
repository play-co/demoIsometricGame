import src.constants.gameConstants as gameConstants;

exports = [
	{
		ctor: 'ItemView',
		type: 'instructions',
		title: 'Instructions',
		icon: 'resources/images/ui/toolPan.png',
		items: [
			{
				ctor: 'ItemView',
				type: 'instructionsWater',
				title: 'Starting a town',
				icon: 'resources/images/ui/toolPan.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'instructionsWater',
						fontSize: 32,
						fontColor: '#606060',
						description: 'The first thing to do is find some open space close to water. ' +
							'Every building has to be within 5 tiles of an aquaduct. The pump building ' +
							'provides water for the aquaduct system and needs to be on the water side.',
						icon: 'resources/images/ui/toolPump.png'
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'instructionsRoads',
				title: 'Roads',
				icon: 'resources/images/ui/toolRoadPaved.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'instructionsRoads',
						fontSize: 32,
						fontColor: '#606060',
						description: 'Al buildings have to be connected with roads. ' +
							'There are two types of roads: dirt roads and paved roads. ' +
							'Dirt roads are cheaper but people move slower on them.',
						icon: 'resources/images/ui/toolRoadPaved.png'
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'instructionsTaxes',
				title: 'Taxes',
				icon: 'resources/images/ui/toolHouse.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'instructionsTaxes',
						fontSize: 32,
						fontColor: '#606060',
						description: 'To be able to buy new buildings you have to make some money. ' +
							'There are 3 buildings which provide tax revenue: the house, the mansion ' +
							'and the market.',
						icon: 'resources/images/ui/toolHouse.png'
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'instructionsMaintenance',
				title: 'Maintenance',
				icon: 'resources/images/ui/toolWorkshop.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'instructionsMaintenance',
						fontSize: 32,
						fontColor: '#606060',
						description: 'Almost all buildings need maintanance. There\'s a worker in the ' +
							'workplace whenever he passes a building the building is fixed. You can see a ' +
							'green tool icon appearing when that happens',
						icon: 'resources/images/ui/toolWorkshop.png'
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'instructionsFire',
				title: 'Fire station',
				icon: 'resources/images/ui/toolFireTower.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'instructionsFire',
						fontSize: 32,
						fontColor: '#606060',
						description: 'To make sure that your buildings don\'t burn down you have to build ' +
							'a fire station. Whenever a fireman from the station passes a building the ' +
							'building is protected and you can see a yellow flame icon appearing.',
						icon: 'resources/images/ui/toolFireTower.png'
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'instructionsGuards',
				title: 'Watch tower',
				icon: 'resources/images/ui/toolGuardTower.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'instructionsGuards',
						fontSize: 32,
						fontColor: '#606060',
						description: 'When someone is robbed taxes can not be collected. ' +
							'A watch tower can be built to protect your population. ' +
							'The tower houses two quards. The second one becomes active when ' +
							'the first guard passes a column commemorating his falling comrades.',
						icon: 'resources/images/ui/toolGuardTower.png'
					}
				]
			}
		]
	},
	{
		ctor: 'ItemView',
		title: 'Houses',
		icon: 'resources/images/ui/toolHouse.png',
		items: [
			{
				ctor: 'ItemView',
				type: 'buildingHouse',
				title: 'House',
				icon: 'resources/images/ui/toolHouse.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'buildingHouse',
						description: 'Increase your tax paying population with this house.',
						icon: 'resources/images/ui/toolHouse.png',
						needs: ['engineer', 'fireman', 'guard', 'road', 'water'],
						residents: [{type: 'citizen', count: 1}],
						taxValue: 10,
						states: [
							{image: 'resources/images/layer1a/buildingHouse.png', name: 'Complete', value: 1},
							{image: 'resources/images/layer1a/buildingHouseRepair.png', name: 'Needs repair', value: 0.5},
							{image: 'resources/images/layer1a/buildingHouseRepair.png', name: 'Burning', value: 0.2},
							{image: 'resources/images/layer1a/building1x1Rubble.png', name: 'Collapsed', value: 0}
						]
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'buildingMansion',
				title: 'Mansion',
				icon: 'resources/images/ui/toolMansion.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'buildingMansion',
						description: 'Increase your tax paying population with this house.',
						icon: 'resources/images/ui/toolMansion.png',
						needs: ['engineer', 'fireman', 'guard', 'road', 'water'],
						residents: [{type: 'citizen', count: 1}, {type: 'trader', count: 1}],
						taxValue: 15,
						states: [
							{image: 'resources/images/layer1a/buildingMansion.png', name: 'Complete', value: 1},
							{image: 'resources/images/layer1a/buildingMansionRepair.png', name: 'Needs repair', value: 0.5},
							{image: 'resources/images/layer1a/buildingMansionRepair.png', name: 'Burning', value: 0.2},
							{image: 'resources/images/layer1a/building1x2Rubble.png', name: 'Collapsed', value: 0}
						]
					}
				]
			}
		]
	},
	{
		ctor: 'ItemView',
		title: 'Utility buildings',
		icon: 'resources/images/ui/toolGuardTower.png',
		items: [
			{
				ctor: 'ItemView',
				type: 'buildingFiremen',
				title: 'Fire station',
				icon: 'resources/images/ui/toolFireTower.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'buildingFiremen',
						description: 'These guys will keep your city safe.',
						icon: 'resources/images/ui/toolFireTower.png',
						needs: ['engineer', 'road', 'water'],
						residents: [{type: 'fireman', count: 1}]
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'buildingGuards',
				title: 'Guards',
				icon: 'resources/images/ui/toolGuardTower.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'buildingGuards',
						description: 'Adding guards to your city will keep the crime rate down.',
						icon: 'resources/images/ui/toolGuardTower.png',
						needs: ['engineer', 'fireman', 'road', 'water'],
						residents: [{type: 'guard', count: 2}]
					}
				]
			},			
			{
				ctor: 'ItemView',
				type: 'buildingMarket',
				title: 'Market',
				icon: 'resources/images/ui/toolMarket.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'buildingMarket',
						description: 'Increase your tax paying population with this market.',
						icon: 'resources/images/ui/toolMarket.png',
						needs: ['citizen', 'engineer', 'fireman', 'guard', 'road', 'water'],
						residents: [{type: 'trader', count: 2}]
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'buildingPump',
				title: 'Pump',
				icon: 'resources/images/ui/toolPump.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'buildingPump',
						description: 'Place this building on the edge of the water and connect it with an aquaduct for water supply.',
						icon: 'resources/images/ui/toolPump.png',
						needs: ['water']
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'buildingEngineers',
				title: 'Workshop',
				icon: 'resources/images/ui/toolWorkshop.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'buildingEngineers',
						description: 'This building houses an engineer who will immediately start maintaining your other buildings.',
						icon: 'resources/images/ui/toolWorkshop.png',
						needs: ['fireman', 'road', 'water'],
						residents: [{type: 'engineer', count: 1}]
					}
				]
			}
		]
	},
	{
		ctor: 'ItemView',
		title: 'Land value',
		icon: 'resources/images/ui/toolTemple.png',
		items: [
			{
				ctor: 'ItemView',
				type: 'buildingBrazier',
				title: 'Brazier',
				icon: 'resources/images/ui/toolBrazier.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'buildingBrazier',
						description: 'This eternal flame will make your people happy.',
						icon: 'resources/images/ui/toolBrazier.png',
						needs: ['engineer', 'guard', 'road', 'trader']
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'buildingColumn',
				title: 'Column',
				icon: 'resources/images/ui/toolColumn.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'buildingColumn',
						description: 'This column makes your city nicer and your citizens more productive.',
						icon: 'resources/images/ui/toolColumn.png',
						needs: ['engineer', 'guard', 'road', 'trader']
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'buildingGarden',
				title: 'Garden',
				icon: 'resources/images/ui/toolGarden.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'buildingGarden',
						description: 'Garden.',
						icon: 'resources/images/ui/toolGarden.png',
						needs: ['engineer', 'road', 'water']
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'buildingTemple',
				title: 'Temple',
				icon: 'resources/images/ui/toolTemple.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'buildingTemple',
						description: 'A temple where your people can worship the gods of construction.',
						icon: 'resources/images/ui/toolTemple.png',
						needs: ['engineer', 'fireman', 'guard', 'road', 'trader']
					}
				]
			}
		]
	},
	{
		ctor: 'ItemView',
		title: 'Infrastructure',
		icon: 'resources/images/ui/toolAqua.png',
		items: [
			{
				ctor: 'ItemView',
				type: 'aquaduct',
				title: 'Aquaduct',
				icon: 'resources/images/ui/toolAqua.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'aquaduct',
						description: 'All buildings need to be within 5 tiles of an aquaduct for their water supply.',
						icon: 'resources/images/ui/toolAqua.png'
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'roadDirt',
				title: 'Road',
				icon: 'resources/images/ui/toolRoadDirt.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'roadDirt',
						description: 'Your citizens need roads to move from one plase to another. ' + 
							'Each building must be next to a road to receive supplies and maintenance.',
						icon: 'resources/images/ui/toolRoadDirt.png'
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'roadPaved',
				title: 'Road',
				icon: 'resources/images/ui/toolRoadPaved.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'roadPaved',
						description: 'Your citizens need roads to move from one plase to another. ' + 
							'Each building must be next to a road to receive supplies and maintenance. ' +
							'Your citizens can move faster on paved roads.',
						icon: 'resources/images/ui/toolRoadPaved.png'
					}
				]
			}
		]
	},
	{
		ctor: 'ItemView',
		title: 'Decoration',
		icon: 'resources/images/ui/toolTree.png',
		items: [
			{
				ctor: 'ItemView',
				type: 'tree',
				title: 'Tree',
				icon: 'resources/images/ui/toolTree.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'tree',
						description: 'You can decorate your town with trees.',
						icon: 'resources/images/ui/toolTree.png'
					}
				]
			},
			{
				ctor: 'ItemView',
				type: 'plant',
				title: 'Plant',
				icon: 'resources/images/ui/toolPlant.png',
				items: [
					{
						ctor: 'ItemDetailView',
						type: 'plant',
						description: 'You can decorate your town with plants.',
						icon: 'resources/images/ui/toolPlant.png'
					}
				]
			}
		]
	}
];

exports.needsDetails = {
	water: {
		image: 'resources/images/ui/calloutBubbleHydro.png',
		description: 'Aquaduct'
	},
	road: {
		image: 'resources/images/ui/calloutBubbleRoad.png',
		description: 'Road'
	},
	citizen: {
		image: 'resources/images/ui/calloutBubblePop.png',
		description: 'Customer'
	},
	engineer: {
		image: 'resources/images/ui/calloutBubbleRepair.png',
		description: 'Maintenance'
	},
	fireman: {
		image: 'resources/images/ui/calloutBubbleFire.png',
		description: 'Firemen'
	},
	guard: {
		image: 'resources/images/ui/calloutBubbleGuard.png',
		description: 'Guards'
	},
	trader: {
		image: 'resources/images/ui/calloutBubblePop.png',
		description: 'Donations'
	}
};

exports.residentsDetails = {
	citizen: {
		image: 'resources/images/layer1a/manDownWalk01.png',
		icon: 'resources/images/ui/calloutIconPop.png',
		one: 'Citizen',
		more: 'Citizens'
	},
	trader: {
		image: 'resources/images/layer1a/traderDownWalk01.png',
		icon: 'resources/images/ui/calloutIconCoin.png',
		one: 'Trader',
		more: 'Traders'
	},
	fireman: {
		image: 'resources/images/layer1a/firemanDownWalk01.png',
		icon: 'resources/images/ui/calloutIconFire.png',
		one: 'Fireman',
		more: 'Firemen'
	},
	guard: {
		image: 'resources/images/layer1a/guardDownWalk01.png',
		icon: 'resources/images/ui/calloutIconGuard.png',
		one: 'Guard',
		more: 'Gaurds'
	},
	engineer: {
		image: 'resources/images/layer1a/engineerDownWalk01.png',
		icon: 'resources/images/ui/calloutIconRepair.png',
		one: 'Engineer',
		more: 'Engineers'
	}
};
