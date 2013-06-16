import src.constants.gameConstants as gameConstants;

import isometric.models.map.updaters.lineUpdater as lineUpdater;

exports = function (map, tool, rect) {
	var tileX = rect.x;
	var tileY = rect.y;
	var width = rect.w;
	var height = rect.h;
	var fromGroup = gameConstants.tileGroups.AQUA_EMPTY;
	var toGroup = gameConstants.tileGroups.AQUA_FULL;
	var found = false;
	var layer = tool.layer || 1;
	var neighbour;
	var tile;

	lineUpdater(map, tool, rect, fromGroup);

	if (width > height) {
		neighbour = map.getTile(tileX - 1, tileY)[layer];
		if (neighbour.group === toGroup) {
			found = true;
		}
		neighbour = map.getTile(tileX + width, tileY)[layer];
		if (neighbour.group === toGroup) {
			found = true;
		}

		for (var i = 0; i < width && !found; i++) {
			neighbour = map.getTile(tileX + i, tileY - 1)[layer];
			if (neighbour.group === toGroup) {
				found = true;
			}

			neighbour = map.getTile(tileX + i, tileY + 1)[layer];
			if (neighbour.group === toGroup) {
				found = true;
			}
		}
	} else {
		neighbour = map.getTile(tileX, tileY - 1)[layer];
		if (neighbour.group === toGroup) {
			found = true;
		}
		neighbour = map.getTile(tileX, tileY + height)[layer];
		if (neighbour.group === toGroup) {
			found = true;
		}

		for (var i = 0; i < height && !found; i++) {
			neighbour = map.getTile(tileX - 1, tileY + i)[layer];
			if (neighbour.group === toGroup) {
				found = true;
			}
			neighbour = map.getTile(tileX + 1, tileY + i)[layer];
			if (neighbour.group === toGroup) {
				found = true;
			}
		}
	}

	if (found) {
		map.floodFill(layer, fromGroup, toGroup, tileX, tileY);
	}

	lineUpdater(map, tool, rect, toGroup);
};