import src.constants.gameConstants as gameConstants;

import .StaticModel;

exports = Class(StaticModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this.addNeedsPeople(gameConstants.people.FIREMAN);

		this._calloutPos = {x: 35, y: 0};
		this._firePos = [{x: 5, y: -80}];

		this._particleDT = 0;
	};

	this.tick = function (dt) {
		if ((this._buildingState === StaticModel.buildingStates.DEFAULT) || (this._buildingState === StaticModel.buildingStates.NEEDS_REPAIR)) {
			this._particleDT -= dt;
			if (this._particleDT < 0) {
				this._particleDT = 150 + Math.random() * 150;
				this._gridModel.addParticles('smoke', this._tileX, this._tileY, -40, -90);
			}
		}

		return supr(this, 'tick', arguments);
	};
});