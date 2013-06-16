import src.constants.gameConstants as gameConstants;

import .StaticModel;

exports = Class(StaticModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this._needsWater = false;

		this.addNeedsPeople(gameConstants.people.GUARD);
		this.addNeedsPeople(gameConstants.people.ENGINEER);
		this.addNeedsPeople(gameConstants.people.TRADER);

		this._taxValue = 0;

		this._particleDT = 0;
	};

	this.tick = function (dt) {
		if (this._buildingState === StaticModel.buildingStates.DEFAULT) {
			this._particleDT -= dt;
			if (this._particleDT < 0) {
				this._particleDT = 150 + Math.random() * 150;
				this._gridModel.addParticles('brazierFire', this._tileX, this._tileY, 0, -65);
			}
		}

		return supr(this, 'tick', arguments);
	};
});