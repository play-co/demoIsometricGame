import src.constants.gameConstants as gameConstants;

import .StaticModel;

exports = Class(StaticModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this.addNeedsPeople(gameConstants.people.GUARD);
		this.addNeedsPeople(gameConstants.people.FIREMAN);
		this.addNeedsPeople(gameConstants.people.ENGINEER);
		this.addNeedsPeople(gameConstants.people.CITIZEN);

		this._taxValue = 35;
		this._taxType = 'buildingMarket';

		this._calloutPos = {x: 035, y: 0};
		this._firePos = [{x: 8, y: -20}, {x: 40, y: -105}, {x: 95, y: -90}];
	};
});