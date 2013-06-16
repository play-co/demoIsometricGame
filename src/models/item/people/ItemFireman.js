import .PathWalkerModel;

import src.constants.gameConstants as gameConstants;

exports = Class(PathWalkerModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this.type = gameConstants.people.FIREMAN;

		this._calloutType = 'calloutFire';
	};
});