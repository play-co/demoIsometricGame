import src.constants.gameConstants as gameConstants;

import .StaticModel;

exports = Class(StaticModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this._needsRoad = false;
		this._needsWater = false;

		this._left = null;
		this._right = null;
	};

	this.onUpdateMap = function () {
		var fromGroup = gameConstants.tileGroups.AQUA_EMPTY;
		var toGroup = gameConstants.tileGroups.AQUA_FULL;
		var refresh = false;
		var refreshAll = false;
		var map = this._map;
		var layer = this._layer;
		var tile;
		var tileX = this._tileX;
		var tileY = this._tileY;
		var left = 0;
		var right = 0;

		if (this._surrounding) {
			map.drawSurrounding(layer, tileX, tileY, this._surrounding);
		}

		tile = map.getTile(tileX - 1, tileY)[layer];
		if (((tile.group === fromGroup) || (tile.group === toGroup)) && (tile.index !== 0)) {
			left = 1;
		}
		tile = map.getTile(tileX, tileY + 1)[layer];
		if (((tile.group === fromGroup) || (tile.group === toGroup)) && (tile.index !== 0)) {
			right = 1;
		}

		if ((this._left !== left) || (this._right !== right)) {
			this._left = left;
			this._right = right;

			this._index = (this._left << 1) + this._right;
			map.getTile(tileX, tileY)[layer].index = this._index;

			refresh = true;
		}

		tile = map.getTile(tileX - 1, tileY);
		if (tile[layer].group === gameConstants.tileGroups.AQUA_EMPTY) {
			map.floodFill(layer, fromGroup, toGroup, tileX - 1, tileY);
			refreshAll = true;
		}
		tile = map.getTile(tileX + 1, tileY);
		if (tile[layer].group === gameConstants.tileGroups.AQUA_EMPTY) {
			map.floodFill(layer, fromGroup, toGroup, tileX + 1, tileY);
			refreshAll = true;
		}

		tile = map.getTile(tileX, tileY - 1);
		if (tile[layer].group === gameConstants.tileGroups.AQUA_EMPTY) {
			map.floodFill(layer, fromGroup, toGroup, tileX, tileY - 1);
			refreshAll = true;
		}
		tile = map.getTile(tileX, tileY + 1);
		if (tile[layer].group === gameConstants.tileGroups.AQUA_EMPTY) {
			map.floodFill(layer, fromGroup, toGroup, tileX, tileY + 1);
			refreshAll = true;
		}

		if (refreshAll) {
			this._refreshMapCB && this._refreshMapCB();
		} else if (this.refresh) {
			this._refreshMapCB && this._refreshMapCB(tileX, tileY);
		}
	};

	this.canSelect = function () {
		return false;
	};

	this.tick = function (dt) {
	};
});