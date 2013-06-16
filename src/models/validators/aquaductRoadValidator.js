import src.constants.gameConstants as gameConstants;

var ENDCAP_TOP = 16 + 2;
var ENDCAP_BOTTOM = 16 + 128;
var ENDCAP_LEFT = 16 + 8;
var ENDCAP_RIGHT = 16 + 32;

function tileIsRoad (tile) {
	return (tile.group === gameConstants.tileGroups.ROAD_PAVED) || (tile.group === gameConstants.tileGroups.ROAD_DIRT);
}

function neighbourValid (neighbour, bits) {
	if (neighbour.index > 250) {
		return true;
	}
	return ((neighbour.index & bits) === bits);
}

exports = function (map, tileX, tileY, x, y, w, h) {
	if ((w === 1) && (h === 2)) {
		return false;
	}
	if ((w === 2) && (h === 1)) {
		return false;
	}
	if (tileIsRoad(map.getTile(x, y)[1])) {
		return false;
	}
	if (tileIsRoad(map.getTile(x + w - 1, y + h - 1)[1])) {
		return false;
	}

	var neighbour = map.getTile(tileX, tileY - 1)[1];
	if (tileIsRoad(neighbour) && neighbourValid(neighbour, ENDCAP_TOP)) {
		neighbour = map.getTile(tileX, tileY + 1)[1];
		if (tileIsRoad(neighbour) && neighbourValid(neighbour, ENDCAP_BOTTOM)) {
			return true;
		}
	}

	neighbour = map.getTile(tileX - 1, tileY)[1];
	if (tileIsRoad(neighbour) && neighbourValid(neighbour, ENDCAP_LEFT)) {
		neighbour = map.getTile(tileX + 1, tileY)[1];
		if (tileIsRoad(neighbour) && neighbourValid(neighbour, ENDCAP_RIGHT)) {
			return true;
		}
	}

	return false;
};