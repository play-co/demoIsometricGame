exports = {
	tileWidth: 150,
	tileHeight: ~~(150 * 0.8),

	gridWidth: 64,
	gridHeight: 64,

	underDrawX: 2,
	underDrawY: 2,
	overDrawX: 1,
	overDrawY: 5,

	layers: [
		{
			dynamicViews: 0,
			particleSystems: 0,
			particleSystemSize: 0,
			overDrawY: 3
		},
		{
			dynamicViews: 30,
			particleSystems: 10,
			particleSystemSize: 50
		}
	]
};