import src.constants.gameConstants as gameConstants;

import .StaticModel;

exports = Class(StaticModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this.addNeedsPeople(gameConstants.people.TRADER);
		this.addNeedsPeople(gameConstants.people.GUARD);
		this.addNeedsPeople(gameConstants.people.FIREMAN);
		this.addNeedsPeople(gameConstants.people.ENGINEER);

		this._needsWater = false;

		this._calloutPos = {x: 0, y: -160};
		this._firePos = [{x: -45, y: -230}, {x: 80, y: -200}, {x: -45, y: -45}, {x: 65, y: -55}];
		this._fireTileX = 0;
		this._fireTileY = 1;
	};
});