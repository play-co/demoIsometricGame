import src.constants.gameConstants as gameConstants;

import .PathWalkerModel;

exports = Class(PathWalkerModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this.type = gameConstants.people.TRADER;

		this._calloutType = 'calloutMoney';
	};
});