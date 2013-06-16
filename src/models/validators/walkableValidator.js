import src.constants.gameConstants as gameConstants;

exports = function (map, tileX, tileY, x, y, w, h) {
	var tile = map.getTile(tileX, tileY)[1];

	if ((tile.group === gameConstants.tileGroups.AQUA_EMPTY) || (tile.group === gameConstants.tileGroups.AQUA_FULL)) {
		if ((tile.index >= 252) && (tile.index <= 255)) {
			return true;
		}
	}

	return false;
};