var stepFunction = function (view, opts, d, dt) {
		var style = view.style;
		var start = opts.start;

		style.x = start.x + opts.dx * d;
		style.y = start.y + opts.dy * d;
		style.visible = true;
	};

var warningOffset = 0;

exports = {
	fire: {
		count: 4,
		duration: 300,
		radius: 100,
		size: 50,
		initCB: function (view) {
			var opts = view.getOpts();
			opts.dir = Math.random() < 0.5 ? -1 : 1;
			opts.sinScale = 3 + Math.random() * 3;
		},
		initEndCB: function (start, end) {
			end.x = start.x;
			end.y = start.y - 70 - Math.random() * 50;
		},
		stepCB: function (view, opts, d, dt) {
			var style = view.style;
			var start = opts.start;
			var sin = Math.sin;

			style.scale = sin(d * Math.PI);
			style.x = start.x + opts.dx * d + sin(d * opts.sinScale) * opts.dir * 10;
			style.y = start.y + opts.dy * d;

			style.visible = true;
		},
		image: 'resources/images/ui/particleFire.png'
	},
	brazierFire: {
		count: 4,
		duration: 300,
		radius: 100,
		size: 30,
		initCB: function (view) {
			var opts = view.getOpts();
			opts.dir = Math.random() < 0.5 ? -1 : 1;
			opts.sinScale = 3 + Math.random() * 3;
		},
		initEndCB: function (start, end) {
			end.x = start.x;
			end.y = start.y - 50 - Math.random() * 30;
		},
		stepCB: function (view, opts, d, dt) {
			var style = view.style;
			var start = opts.start;
			var sin = Math.sin;

			style.scale = sin(d * Math.PI);
			style.x = start.x + opts.dx * d + sin(d * opts.sinScale) * opts.dir * 10;
			style.y = start.y + opts.dy * d;

			style.visible = true;
		},
		image: 'resources/images/ui/particleFire.png'
	},

	smoke: {
		count: 1,
		duration: 500,
		radius: 100,
		size: 50,
		initCB: function (view) {
			var opts = view.getOpts();
			opts.dir = Math.random() < 0.5 ? -1 : 1;
			opts.sinScale = 3 + Math.random() * 3;
		},
		initEndCB: function (start, end) {
			end.x = start.x;
			end.y = start.y - 90 - Math.random() * 70;
		},
		stepCB: function (view, opts, d, dt) {
			var style = view.style;
			var start = opts.start;
			var sin = Math.sin;

			style.scale = sin(d * Math.PI);
			style.x = start.x + opts.dx * d + sin(d * opts.sinScale) * opts.dir * 10;
			style.y = start.y + opts.dy * d;

			style.visible = true;
		},
		image: 'resources/images/ui/particleSmoke.png'
	},
	collapseSmoke: {
		count: 8,
		duration: 600,
		radius: 100,
		size: 70,
		initCB: function (view) {
			var opts = view.getOpts();
			opts.dir = Math.random() < 0.5 ? -1 : 1;
			opts.sinScale = 3 + Math.random() * 3;
		},
		initEndCB: function (start, end) {
			end.x = start.x;
			end.y = start.y - 90 - Math.random() * 90;
		},
		stepCB: function (view, opts, d, dt) {
			var style = view.style;
			var start = opts.start;
			var sin = Math.sin;

			style.scale = sin(d * Math.PI);
			style.x = start.x + opts.dx * d + sin(d * opts.sinScale) * opts.dir * 20;
			style.y = start.y + opts.dy * d;

			style.visible = true;
		},
		image: 'resources/images/ui/particleSmoke.png'
	},

	warning: {
		count: 1,
		duration: Number.MAX_VALUE,
		radius: 0,
		size: 96,
		stepCB: function (view, opts, d, dt) {
			var style = view.style;
			var start = opts.start;

			style.scale = 1;
			style.x = start.x;
			style.y = start.y + Math.sin(start.x * 0.03 + warningOffset) * 4;
			style.opacity = 1;
			style.zIndex = 0;
			style.visible = true;
		}
	},
	warningFire: {
		extnds: 'warning',
		image: 'resources/images/ui/calloutBubbleFire.png'
	},
	warningGuard: {
		extnds: 'warning',
		image: 'resources/images/ui/calloutBubbleGuard.png'
	},
	warningRepair: {
		extnds: 'warning',
		image: 'resources/images/ui/calloutBubbleRepair.png'
	},
	warningWater: {
		extnds: 'warning',
		image: 'resources/images/ui/calloutBubbleHydro.png'
	},
	warningRoad: {
		extnds: 'warning',
		image: 'resources/images/ui/calloutBubbleRoad.png'
	},
	warningPopulation: {
		extnds: 'warning',
		image: 'resources/images/ui/calloutBubblePop.png'
	},
	warningMoney: {
		extnds: 'warning',
		image: 'resources/images/ui/calloutBubbleCoin.png'
	},

	callout: {
		count: 1,
		duration: 800,
		radius: 0,
		size: 80,
		stepCB: function (view, opts, d, dt) {
			var style = view.style;

			style.x = opts.start.x + 10;
			style.y = opts.start.y - 70 * d - 50;
			style.opacity = Math.sin(Math.PI * d);
			style.visible = true;
			style.zIndex = 50;
		}
	},
	calloutFire: {
		extnds: 'callout',
		image: 'resources/images/ui/calloutIconFire.png'
	},
	calloutGuard: {
		extnds: 'callout',
		image: 'resources/images/ui/calloutIconGuard.png'
	},
	calloutRepair: {
		extnds: 'callout',
		image: 'resources/images/ui/calloutIconRepair.png'
	},
	calloutCitizen: {
		extnds: 'callout',
		image: 'resources/images/ui/calloutIconPop.png'
	},
	calloutMoney: {
		extnds: 'callout',
		image: 'resources/images/ui/calloutIconCoin.png'
	},
	calloutLandValue: {
		extnds: 'callout',
		image: 'resources/images/ui/calloutIconHappy.png'
	}
};

exports.tick = function (dt) {
	warningOffset += dt * 0.003;
};