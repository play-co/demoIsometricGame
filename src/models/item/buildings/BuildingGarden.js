import src.constants.gameConstants as gameConstants;

import .StaticModel;

exports = Class(StaticModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this.addNeedsPeople(gameConstants.people.ENGINEER);
	};
});