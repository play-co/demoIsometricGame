import src.constants.gameConstants as gameConstants;

import .StaticModel;

exports = Class(StaticModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this._needsWater = false;

		this.addNeedsPeople(gameConstants.people.GUARD);
		this.addNeedsPeople(gameConstants.people.ENGINEER);
		this.addNeedsPeople(gameConstants.people.TRADER);
	};
});