import src.constants.gameConstants as gameConstants;

import .StaticModel;

exports = Class(StaticModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this.addNeedsPeople(gameConstants.people.GUARD);
		this.addNeedsPeople(gameConstants.people.FIREMAN);
		this.addNeedsPeople(gameConstants.people.ENGINEER);

		this._taxValue = 10;
		this._taxType = 'buildingHouse';

		this._firePos = [{x: -40, y: -60}, {x: 40, y: -60}];
	};
});