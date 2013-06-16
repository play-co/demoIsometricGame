import src.constants.gameConstants as gameConstants;

import .StaticModel;

exports = Class(StaticModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this.addNeedsPeople(gameConstants.people.ENGINEER);
		this.addNeedsPeople(gameConstants.people.FIREMAN);

		this._firePos = [{x: 30, y: -95}];
	};

	this.spawnModel = function () {
		var model = supr(this, 'spawnModel');

		if (model && (this._modelsAwake.length >= 1)) {
			this._addedValue.buildingColumn = false;
		}

		return model;
	};

	this.tick = function (dt) {
		var addedValue = this._addedValue;

		if (addedValue.buildingColumn) {
			this._canSpawn = true;
		} else {
			this._canSpawn = (this._modelsAwake.length < 1);
		}

		return supr(this, 'tick', arguments);
	};
});