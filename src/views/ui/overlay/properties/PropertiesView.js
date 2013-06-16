import animate;

import ui.View as View;
import ui.ImageView as ImageView;
import ui.ImageScaleView as ImageScaleView;

import src.constants.gameConstants as gameConstants;

import ..MiniButtonView;

import .PropertyView;

exports = Class(View, function (supr) {
	this.init = function (opts) {
		var items = [
				{
					image: 'resources/images/ui/calloutIconRepair.png',
					up: 'resources/images/ui/buttonBoxGreen.png',
					down: 'resources/images/ui/buttonBoxGreenDown.png',
					color: '#EE8800',
					type: gameConstants.people.ENGINEER,
					onClick: bind(this, 'onEngineer')
				},
				{
					image: 'resources/images/ui/calloutIconGuard.png',
					up: 'resources/images/ui/buttonBoxRed.png',
					down: 'resources/images/ui/buttonBoxRedDown.png',
					color: '#0000DD',
					type: gameConstants.people.GUARD,
					onClick: bind(this, 'onGuard')
				},
				{
					image: 'resources/images/ui/calloutIconFire.png',
					up: 'resources/images/ui/buttonBoxOrange.png',
					down: 'resources/images/ui/buttonBoxOrangeDown.png',
					color: '#DD0000',
					type: gameConstants.people.FIREMAN,
					onClick: bind(this, 'onFireman')
				},
				{
					image: 'resources/images/ui/calloutIconCoin.png',
					up: 'resources/images/ui/buttonBoxYellow.png',
					down: 'resources/images/ui/buttonBoxYellowDown.png',
					color: '#EEDD00',
					type: gameConstants.people.TRADER,
					onClick: bind(this, 'onTrader')
				},
				{
					image: 'resources/images/ui/calloutIconPop.png',
					up: 'resources/images/ui/buttonBoxPurple.png',
					down: 'resources/images/ui/buttonBoxPurple.png',
					color: '#EE00DD',
					type: gameConstants.people.CITIZEN,
					onClick: bind(this, 'onCitizen')
				}
			];

		this._isometric = opts.isometric;
		this._model = null;
		this._updateDT = 100;

		opts = merge(
			opts,
			{
				x: 0,
				y: GC.app.baseHeight,
				width: GC.app.baseWidth,
				height: 70,
				visible: false
			}
		);

		supr(this, 'init', [opts]);

		this._successMessage = [];
		this._successMessage[gameConstants.people.ENGINEER] = 'Semeone is coming to repair your building.';
		this._successMessage[gameConstants.people.GUARD] = 'A guard is called.';
		this._successMessage[gameConstants.people.FIREMAN] = 'A fireman will come over.';
		this._successMessage[gameConstants.people.CITIZEN] = 'A citizen is comming.';

		this._failedMessage = [];
		this._failedMessage[gameConstants.people.ENGINEER] = 'Could not find anyone to repair your building.';
		this._failedMessage[gameConstants.people.GUARD] = 'No guards are available.';
		this._failedMessage[gameConstants.people.FIREMAN] = 'No fireman could be found.';
		this._failedMessage[gameConstants.people.CITIZEN] = 'No citizen available.';

		this._pathFailedMessage = [];
		this._pathFailedMessage[gameConstants.people.ENGINEER] = 'Could not a path to repair your building.';
		this._pathFailedMessage[gameConstants.people.GUARD] = 'Could not find a path to guard your building.';
		this._pathFailedMessage[gameConstants.people.FIREMAN] = 'Could not find a path for a fireman.';
		this._pathFailedMessage[gameConstants.people.CITIZEN] = 'Could not find a path for a citizen.';

		var width = items.length * 220 + 60;
		var x = (GC.app.baseWidth - width) * 0.5;

		this._items = [];
		for (var i = 0, j = items.length - 1; i <= j; i++) {
			this._items.push(new PropertyView(merge(items[i], {superview: this, x: x})).on('Click', items[i].onClick));
			x += 220;
		}

		this._closeBackground = new ImageView({
			superview: this,
			x: 0,
			y: 0,
			width: 80,
			height: 110,
			image: 'resources/images/ui/uiBoxCapRight.png'
		});

		new MiniButtonView({
			superview: this._closeBackground,
			x: 4 - 8,
			y: 8 - 8,
			up: 'resources/images/ui/buttonBoxRed.png',
			down: 'resources/images/ui/buttonBoxRedDown.png',
			icon: 'resources/images/ui/iconCancel.png'
		}).on('Click', bind(this, 'onClose'));
	};

	this.tick = function (dt) {
		if (!this.style.visible) {
			return;
		}

		this._updateDT -= dt;
		if (this._updateDT > 0) {
			return;
		}
		this._updateDT = 100;

		var model = this._model;
		var buildingProperties = gameConstants.buildingProperties;
		var peopleState = model.getPeopleState();
		var needsPeople = model.getNeedsPeople();
		var items = this._items;

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			needsPeople[item.type] && item.update(peopleState[item.type], buildingProperties[item.type].startValue);
		}		
	}

	this.hide = function () {
		if (!this.style.visible) {
			return;
		}

		animate(this).
			then({y: GC.app.baseHeight}, 300).
			then(bind(this, function () { this.style.visible = false; }));
	};

	this.show = function (model) {
		var buildingProperties = gameConstants.buildingProperties;
		var peopleState = model.getPeopleState();
		var needsPeople = model.getNeedsPeople();
		var width = 0;
		var items = this._items;
		var image;
		var first = true;

		this._model = model;

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (needsPeople[item.type]) {
				if (first) {
					first = false;
					image = 'resources/images/ui/uiBoxCapLeftLong.png';
				} else {
					image = 'resources/images/ui/uiBoxMidLong.png';
				}

				item.update(peopleState[item.type], buildingProperties[item.type].startValue, image);
				width += 220;
			} else {
				item.style.visible = false;
			}
		}

		width += 80;
		var x = (GC.app.baseWidth - width) * 0.5;

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (needsPeople[item.type]) {
				item.style.x = x;
				x += 220;
			}
		}

		this._closeBackground.style.x = x;

		if (this.style.visible) {
			this.style.y = GC.app.baseHeight - 70;
			return;
		}		

		this.style.y = GC.app.baseHeight;
		this.style.visible = true;

		animate(this).
			wait(150).
			then({y: GC.app.baseHeight - 70}, 300);
	};

	this.scheduleAgent = function (type) {
		var model = this._model;
		var validPathKeys = model.getValidPathKeys();

		if (validPathKeys.length) {
			var pathFailedMessage = this._pathFailedMessage[type];
			var min = Math.min;
			var max = Math.max;
			var abs = Math.abs;
			var size = this._isometric.getGridModel().getWidth();
			var half = size >> 1;
			var validPath = model.getValidPath();
			var fromTile = validPath[validPathKeys[(validPathKeys.length * Math.random) | 0]];
			var fromTileX = fromTile[1].tileX; // Index 0 is the building location!
			var fromTileY = fromTile[1].tileY; // Index 0 is the building location!
			var dynamicModels = this._isometric.getDynamicModels();
			var found = false;
			var i = dynamicModels.length;

			while (i) {
				var dynamicModel = dynamicModels[--i].model;
				var toTileX = dynamicModel.getTileX();
				var toTileY = dynamicModel.getTileY();

				var tileX1 = min(fromTileX, toTileX);
				var tileX2 = max(fromTileX, toTileX);
				if (tileX2 - tileX1 > half) {
					tileX1 += size;
				}

				var tileY1 = min(fromTileY, toTileY);
				var tileY2 = max(fromTileY, toTileY);
				if (tileX2 - tileX1 > half) {
					tileX1 += size;
				}

				if ((abs(tileX2 - tileX1) < 16) && (abs(tileY2 - tileY1) < 16) &&
					(dynamicModel.type === type) && dynamicModel.insertPath(fromTileX, fromTileY, pathFailedMessage)) {
					found = true;
					this.emit('Message', this._successMessage[type]);
					break;
				}
			}
			if (!found) {
				this.emit('Message', this._failedMessage[type]);
				return false;
			}
		} else {
			this.emit('Message', 'There is no road to this building!');
			return false;
		}

		this.hide();

		return true;
	};

	this.onClose = function () {
		this.hide();
		this.emit('Hide');
	};

	this.onEngineer = function () {
		this.scheduleAgent(gameConstants.people.ENGINEER) && this.emit('Hide');
	};

	this.onGuard = function () {
		this.scheduleAgent(gameConstants.people.GUARD) && this.emit('Hide');
	};

	this.onFireman = function () {
		this.scheduleAgent(gameConstants.people.FIREMAN) && this.emit('Hide');
	};

	this.onTrader = function () {
		this.scheduleAgent(gameConstants.people.TRADER) && this.emit('Hide');
	};

	this.onCitizen = function () {
		this.scheduleAgent(gameConstants.people.CITIZEN) && this.emit('Hide');
	};
});