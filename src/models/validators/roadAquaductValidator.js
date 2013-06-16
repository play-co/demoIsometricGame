import src.constants.gameConstants as gameConstants;

var ENDCAP_TOP = 16 + 2;
var ENDCAP_BOTTOM = 16 + 128;
var ENDCAP_LEFT = 16 + 8;
var ENDCAP_RIGHT = 16 + 32;

function tileIsAquaduct (tile) {
	return (tile.group === gameConstants.tileGroups.AQUA_EMPTY) || (tile.group === gameConstants.tileGroups.AQUA_FULL);
};

function neighbourValid (neighbour, bits) {
	return (neighbour.index & bits) === bits;
}

exports = function (map, tileX, tileY, x, y, w, h) {
	if ((w === 1) && (h === 2)) {
		return false;
	}
	if ((w === 2) && (h === 1)) {
		return false;
	}
	if (tileIsAquaduct(map.getTile(x, y)[1])) {
		return false;
	}
	if (tileIsAquaduct(map.getTile(x + w - 1, y + h - 1)[1])) {
		return false;
	}

	var check = [{x: 0, y: -1}, {x: 0, y: 1}, {x: 0, y: 0}, {x: -1, y: 0}, {x: 1, y: 0}];
	var i = check.length;
	while (i) {
		i--;
		var tile = map.getTile(tileX + check[i].x, tileY + check[i].y)[1];
		if (tileIsAquaduct(tile) && (tile.index === 186)) {
			return false;
		}
	}

	var neighbour = map.getTile(tileX, tileY - 1)[1];
	if (tileIsAquaduct(neighbour) && neighbourValid(neighbour, ENDCAP_TOP)) {
		neighbour = map.getTile(tileX, tileY + 1)[1];
		if (tileIsAquaduct(neighbour) && neighbourValid(neighbour, ENDCAP_BOTTOM)) {
			return true;
		}
	}

	neighbour = map.getTile(tileX - 1, tileY)[1];
	if (tileIsAquaduct(neighbour) && neighbourValid(neighbour, ENDCAP_LEFT)) {
		neighbour = map.getTile(tileX + 1, tileY)[1];
		if (tileIsAquaduct(neighbour) && neighbourValid(neighbour, ENDCAP_RIGHT)) {
			return true;
		}
	}

	return false;
};