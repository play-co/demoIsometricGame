import src.constants.gameConstants as gameConstants;

exports = function (map, tileX, tileY, x, y, w, h) {
	var tile = map.getTile(tileX, tileY)[0];

	if (((tile.group === gameConstants.tileGroups.GROUND) && (tile.index === 0)) || (tile.group === gameConstants.tileGroups.GROUND)) {
		for (var y = 0; y < 3; y++) {
			for (var x = 0; x < 3; x++) {
				if (!((x === 1) && (y === 0))) {
					tile = map.getTile(tileX + x - 1, tileY + y - 1)[0];
					if ((tile.group === gameConstants.tileGroups.WATER) && (tile.index > 0) && (tile.index < 15)) {
						return true;
					}
				}
			}
		}
	}

	return false;
};