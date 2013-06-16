import src.constants.gameConstants as gameConstants;

import .StaticModel;

exports = Class(StaticModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this.addNeedsPeople(gameConstants.people.GUARD);
		this.addNeedsPeople(gameConstants.people.FIREMAN);
		this.addNeedsPeople(gameConstants.people.ENGINEER);

		this._taxValue = 15;
		this._taxType = 'buildingMansion';

		this._calloutPos = {x: 35, y: 0};
		this._firePos = [{x: 5, y: -90}, {x: 34, y: -150}];
	};
});