import isometric.models.item.PathWalkerModel as PathWalkerModel;
import isometric.models.item.DynamicModel as DynamicModel;

import src.constants.gameConstants as gameConstants;

exports = Class(PathWalkerModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this._mapWidth = this._map.getWidth();
		this._mapHeight = this._map.getHeight();

		this._passed = [];

		this._walkDT = 0;
		this._walkIndex = 0;

		this._speed = 0.5;

		this._checkZX = false;
		this._checkZY = false;

		this._lastNewTile = 0;
		this._lastMovedX = 1;
		this._lastMovedY = 1;

		this._dt = 0;

		this._lastBuilding = null;
		this._buildingPassed = false;
		this._buildingPassedDT = 0;

		this._opts.particles = [];

		this._insertingPath = false;
		this._pathInserted = false;

		this._speedMin = -1;
		this._speedMax = -1;

		this._roadLeft = 0.4;
		this._roadRight = 0.6;

		this._imageInfo = [
			[{index: 0, flipX: false}, {index: 0, flipX: false}, {index: 0, flipX: true}],
			[{index: 20, flipX: false}, {index: 0, flipX: false}, {index: 0, flipX: true}],
			[{index: 20, flipX: false}, {index: 20, flipX: true}, {index: 0, flipX: true}]
		];
	};

	this.onPassByBuiding = function (building) {
		if (building.isComplete() && (this._lastBuilding !== building) || (this._buildingPassedDT > 2500)) {
			this._lastBuilding = building;
			this._buildingPassed = true;
		}
	};

	this.onNewTile = function () {
		if (!this.type) {
			return;
		}

		var passed = this._passed;
		var map = this._map;
		var opts = this._opts;
		var tileX = opts.tileX;
		var tileY = opts.tileY;

		for (var j = -1; j < 2; j++) {
			for (var i = -1; i < 2; i++) {
				var tile = map.getTile(tileX + i, tileY + j);
				var model = null;
				if (tile.model) {
					model = tile.model;
				} else {
					var group = tile[1].group;
					if (group > 10000) {
						group -= 10001;

						var modelX = group % this._mapWidth;
						var modelY = (group / this._mapWidth) | 0;

						tile = map.getTile(modelX, modelY);
						model = tile.model;
					}
				}

				if (model) {
					model.onPassBy && model.onPassBy(this.type, this);
					(model !== this._spawner) && this._spawner.onAgentPassBy && this._spawner.onAgentPassBy(model);
				}
			}
		}

		this._checkZX = false;
		this._checkZY = false;

		var speed = ((this._pathIndex >= this._speedMin) && (this._pathIndex <= this._speedMax)) ? 1.5 : 1;
		var tile = map.getTile(tileX, tileY)[1];
		switch (tile.group) {
			case gameConstants.tileGroups.ROAD_DIRT:
				this._speed = 0.4 * speed;
				break;

			case gameConstants.tileGroups.ROAD_PAVED:
				this._speed = 0.6 * speed;
				break;

			case gameConstants.tileGroups.AQUA_EMPTY:
			case gameConstants.tileGroups.AQUA_FULL:
				if ((tile.index === 252) || (tile.index === 253)) {
					this._checkZX = true;
				} else if ((tile.index === 254) || (tile.index === 255)) {
					this._checkZY = true;
				}
				break;
		}

		// When the model moves from one tile to the next the x and y values can be clamped which
		// result in wrong movedX and movedY values for a single frame, this is to skip that frame...
		this._lastNewTile = 2;
	};

	this.onReachTarget = function () {
		this._speedMin = -1;
		this._speedMax = -1;
		this._pathInserted = false;
	};

	this.tick = function (dt) {
		if (this._insertingPath) {
			return DynamicModel.tickResult.CONTINUE;
		}

		var result = supr(this, 'tick', arguments);

		if (!this._onScreen) {
			this._buildingPassed = false;
			return supr(this, 'tick', arguments);
		}

		this._buildingPassedDT += dt;

		if (this._lastNewTile) {
			this._lastNewTile--;
		} else {
			this._lastMovedX = this._movedX + 1;
			this._lastMovedY = this._movedY + 1;
		}

		var opts = this._opts;
		var imageInfo = this._imageInfo[this._lastMovedX][this._lastMovedY];

		this._zIndex = 0;

		if (this._checkZX && (opts.x < 0.55)) {
			this._zIndex = 50;
		}
		if (this._checkZY && (opts.y > 0.45)) {
			this._zIndex = 50;
		}

		this._walkDT -= dt;
		if (this._walkDT < 0) {
			this._walkDT = 40;
			this._walkIndex = (this._walkIndex + 1) % 20;
		}
		opts.flipX = imageInfo.flipX;
		opts.flipY = false;
		opts.imageIndex = imageInfo.index + this._walkIndex;

		if (this._buildingPassed && this._calloutType) {
			opts.particles = [{type: this._calloutType, x: 0, y: 0}];
			this._buildingPassed = false;
			this._buildingPassedDT = 0;
		} else {
			opts.particles.length = 0;
		}

		return result;
	};

	this.insertPath = function (insertPathX, insertPathY, failedMessage) {
		if (this._insertingPath || this._pathInserted) {
			return false;
		}
		this._insertingPath = true;

		this._gridModel.findPath(
			this._opts.tileX,
			this._opts.tileY,
			insertPathX,
			insertPathY,
			this._conditions,
			bind(
				this,
				function (path) {
					if (!path.length) {
						this._insertingPath = false;
						this._pathInserted = false;
						this.emit('Message', failedMessage);
						return;
					}
					var pathIndex = this._pathIndex;
					var j = path.length;

					for (var i = j - 1; i >= 0; i--) {
						this._path.splice(pathIndex, 0, path[i]);
					}
					for (var i = 0; i < j; i++) {
						this._path.splice(pathIndex, 0, path[i]);
					}

					this._speedMin = pathIndex;
					this._speedMax = pathIndex + path.length * 2;
					this._pathIndex = this._speedMax;

					this._insertingPath = false;
					this._pathInserted = true;
				}
			)
		);

		return true;
	};
});