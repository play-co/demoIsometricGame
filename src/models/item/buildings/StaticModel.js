import lib.Enum as Enum;

import isometric.models.item.SpawnerModel as SpawnerModel;

import src.constants.gameConstants as gameConstants;

var needsPeopleParticle = [];
needsPeopleParticle[gameConstants.people.ENGINEER] = 'warningRepair';
needsPeopleParticle[gameConstants.people.FIREMAN] = 'warningFire';
needsPeopleParticle[gameConstants.people.GUARD] = 'warningGuard';
needsPeopleParticle[gameConstants.people.CITIZEN] = 'warningPopulation';
needsPeopleParticle[gameConstants.people.TRADER] = 'warningMoney';

var buildingStates = Enum(
		'DEFAULT',
		'NEEDS_REPAIR',
		'BURNING',
		'BURNED'
	);

var serializeKeys = [
		'needsPeople',
		'buildingState',
		'peopleState',
		'peopleStateIndex',
		'addedValue',
		'updateStateDT',
		'waterFound',
		'waterIndex',
		'waterCount',
		'waterTime',
		'warningFireDT',
		'burningCount'
	];

var id = 0;

exports = Class(SpawnerModel, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		var fromOpts = function (key, defaultValue) {
				return (key in opts) ? opts[key] : defaultValue;
			};

		this._needsWater = true;
		this._needsRoad = true;
		this._needsPeople = fromOpts('needsPeople', {});
		this._needsPeopleList = [];

		for (var people in this._needsPeople) {
			if (this._needsPeople[people] === null) {
				delete this._needsPeople[people];
			}
		}

		this._buildingState = fromOpts('buildingState', buildingStates.DEFAULT);

		this._taxValue = 0;
		this._taxType = false;
		this._taxResult = {value: 0, type: '', robbed: false};

		// People state, people types which passed by this building: engineer, guard, fire fighter.
		this._peopleState = fromOpts('peopleState', []);
		this._peopleStateIndex = fromOpts('peopleStateIndex', 0);

		// The models spawned from this building passed by...
		this._addedValue = fromOpts('addedValue', {
			buildingColumn: false,
			buildingBrazier: false,
			buildingTemple: false,
			buildingGarden: false
		});

		this._updateInterval = 500;
		this._updateStateDT = fromOpts('updateStateDT', this._updateInterval);

		this._waterFound = fromOpts('waterFound', false);
		this._waterIndex = fromOpts('waterIndex', 0);
		this._waterCount = fromOpts('waterCount', 0);
		this._waterTime = fromOpts('waterTime', 0);

		this._fireTileX = 0;
		this._fireTileY = 0;
		this._firePos = [{x: 0, y: -160}];

		this._smokeTileX = 0;
		this._smokeTileY = 0;
		this._smokePos = [{x: 0, y: -20}];

		this._robbed = false;

		this._calloutPos = {x: 0, y: 0};

		this._modelInfo = opts.modelInfo;

		this._warningFireDT = fromOpts('warningFireDT', 0);
		this._burningCount = fromOpts('burningCount', 20);

		this._lastWarningLength = false;

		this._tickFunctions = [];
		this._tickFunctions[buildingStates.DEFAULT] = bind(this, 'tickStateDefault');
		this._tickFunctions[buildingStates.NEEDS_REPAIR] = bind(this, 'tickStateNeedsRepair');
		this._tickFunctions[buildingStates.BURNING] = bind(this, 'tickBurning');
		this._tickFunctions[buildingStates.BURNED] = bind(this, 'tickBurned');

		this.id = ++id;
	};

	/**
	 * An agent passes by this model...
	 */
	this.onPassBy = function (people, model) {
		var peopleState = this._peopleState;
		if (people in peopleState) {
			var buildingProperties = gameConstants.buildingProperties[people];
			peopleState[people] = Math.min(peopleState[people] + buildingProperties.passByValue, buildingProperties.startValue);
			model.onPassByBuiding && model.onPassByBuiding(this);
		}
	};

	/**
	 * An agent spawned by this model passes by another model...
	 */
	this.onAgentPassBy = function (model) {
		var modelType = model.getModelType();
		if (modelType in this._addedValue && !this._addedValue[modelType]) {
			this._addedValue[modelType] = true;
			this._gridModel.addParticles('calloutLandValue', this._tileX, this._tileY, this._calloutPos.x - 10, this._calloutPos.y - 100);
		}
	};

	this.addNeedsPeople = function (people) {
		if (this._needsPeople[people]) {
			return;
		}

		this._needsPeopleList.push(people);
		this.setNeedsPeople(this._needsPeopleList);

		if (!(people in this._peopleState)) {
			this._peopleState[people] = gameConstants.buildingProperties[people].startValue;
		}
	};

	this.getNeedsPeople = function () {
		return this._needsPeople;
	};

	this.setNeedsPeople = function (needsPeopleList) {
		this._needsPeopleList = needsPeopleList;

		var i = needsPeopleList.length;
		while (i) {
			this._needsPeople[needsPeopleList[--i]] = true;
		}
	};

	this.getPeopleState = function () {
		return this._peopleState;
	};

	this.getModelInfo = function () {
		return this._modelInfo;
	};

	this.setIndex = function (index) {
		var tileX = this._tileX;
		var tileY = this._tileY + this._height - 1;
		this._map.getTile(tileX, tileY)[1].index = index;

		this._refreshMapCB && this._refreshMapCB(tileX, tileY);
	};

	this.getTax = function () {
		if (!this._taxValue) {
			return this._taxResult;
		}

		this._taxResult.value = 0;
		this._taxResult.type = this._taxType;
		this._taxResult.robbed = this._robbed;

		this._robbed = false;

		switch (this._buildingState) {
			case buildingStates.DEFAULT:
				this._taxResult.value = this._taxValue;
				break;

			case buildingStates.NEEDS_REPAIR:
				this._taxResult.value = (this._taxValue * 0.5) | 0;
				break;

			case buildingStates.BURNING:
				this._taxResult.value = (this._taxValue * 0.2) | 0;
				break;
		}

		if (this._taxResult.value) {
			var addedValue = this._addedValue;

			if (addedValue.buildingBrazier) {
				addedValue.buildingBrazier = false;
				this._taxResult.value = (this._taxResult.value * 1.5) | 0;
			}
			if (addedValue.buildingTemple) {
				addedValue.buildingTemple = false;
				this._taxResult.value = (this._taxResult.value * 2) | 0;
			}
			if (addedValue.buildingGarden) {
				addedValue.buildingGarden = false;
				this._taxResult.value = (this._taxResult.value * 1.6) | 0;
			}
		}

		return this._taxResult;
	};

	this.isComplete = function () {
		return this._buildingState === buildingStates.DEFAULT;
	};

	this.isBroken = function () {
		return this._buildingState === buildingStates.NEEDS_REPAIR;
	};

	this.isBurning = function () {
		return this._buildingState === buildingStates.BURNING;
	};

	this.isBurned = function () {
		return this._buildingState === buildingStates.BURNED;
	};

	this._updateWater = function () {
		if (!this._needsWater) {
			this._waterFound = true;
			return;
		}

		this._waterIndex = (this._waterIndex + 1) % 100;
		this._waterCount++;

		var tileX = this._waterIndex % 10;
		var tileY = (this._waterIndex / 10) | 0;

		if (this._map.getTile(this._tileX + tileX - 4, this._tileY + tileY - 4)[1].group === gameConstants.tileGroups.AQUA_FULL) {
			this._waterFound = true;
		} else if (this._waterCount > 2000) {
			if (Math.random() < gameConstants.noWaterCrumbleChance) {
				this._collapse();
			}
		}
	};

	this._updateIcons = function () {
		var needsPeopleList = this._needsPeopleList;
		var people = needsPeopleList[this._peopleStateIndex];
		var peopleState = this._peopleState;
		var buildingProperties = gameConstants.buildingProperties[people];

		peopleState[people] = Math.max(peopleState[people] - buildingProperties.decreaseValue, 0);
		this._peopleStateIndex = (this._peopleStateIndex + 1) % needsPeopleList.length;

		var particles = [];

		!this._waterFound && (this._waterCount > 100) && particles.push('warningWater');
		this._needsRoad && !this._validPathKeys.length && particles.push('warningRoad');

		for (var people in peopleState) {
			if ((peopleState[people] <= 0) && needsPeopleParticle[people]) {
				particles.push(needsPeopleParticle[people]);
			}
		}

		var tileX = this._tileX;
		var tileY = this._tileY;
		var i = particles.length;
		if ((i === 0) && (this._lastWarningLength !== 0)) {
			this._gridModel.clearParticles(tileX, tileY);
			this._lastWarningLength = 0;
		} else if (this._lastWarningLength !== i) {
			var clear = true;

			this._lastWarningLength = i;

			if ((this._width === 2) && (this._height === 2)) {
				tileY++;
			}

			if (i < 3) {
				var x = i * 70 * -0.5 + 35;
				for (var j = 0; j < i; j++) {
					if (!this._gridModel.addParticles(particles[j], tileX, tileY, this._calloutPos.x + x, this._calloutPos.y - 160, clear)) {
						break;
					}
					x += 70;
					clear = false;
				}
			} else if ((i & 1) === 0) {
				var cols = i >> 1;
				for (var j = 0; j < i; j++) {
					if (!this._gridModel.addParticles(particles[j], tileX, tileY, this._calloutPos.x + (j % cols) * 70 - 35, this._calloutPos.y - 160 - ((j / cols) | 0) * 75, clear)) {
						break;
					}
					clear = false;
				}
			} else {
				var a = 35;
				var cols = Math.ceil(i / 2);
				for (var j = 0; j < i; j++) {
					if (!this._gridModel.addParticles(particles[j], tileX, tileY, this._calloutPos.x + (j % cols) * 70 - (cols - 2) * 35 - a, this._calloutPos.y - 235 + ((j / cols) | 0) * 75, clear)) {
						break;
					}
					if (j === i >> 1) {
						a = 0;
					}
					clear = false;
				}				
			}
		}
	};

	this._removeIcons = function () {
		if (this._lastWarningLength !== 0) {
			this._gridModel.clearParticles(this._tileX, this._tileY);
			this._lastWarningLength = 0;
		}
	};

	this._removePeople = function () {
		var modelsAwake = this._modelsAwake;
		var i = modelsAwake.length;

		while (i) {
			modelsAwake[--i].needsSleep();
		}
		this._canSpawn = false;
	};

	this._collapse = function () {
		if (this._buildingState === buildingStates.BURNED) {
			return;
		}

		this._removeIcons();
		this._removePeople();
		this._buildingState = buildingStates.BURNED;
		this.setIndex(2);
		this.emit('Changed', this);
		this.emit('Message', 'Warning: A building collapsed!');

		var tileX = this._tileX + this._smokeTileX;
		var tileY = this._tileY + this._smokeTileY;
		var i = this._smokePos.length;

		while (i) {
			i--;
			this._gridModel.addParticles('collapseSmoke', tileX, tileY, this._smokePos[i].x, this._smokePos[i].y, false);
		}
	};

	this._burn = function () {
		if (this._buildingState === buildingStates.BURNING) {
			return;
		}

		this._removeIcons();
		this._removePeople();
		this._buildingState = buildingStates.BURNING;
		this.setIndex(1);
		this.emit('Changed', this);
	};

	this.tickStateDefault = function (dt) {
		this._needsPeopleList.length && this._updateIcons();

		var random = Math.random();
		var people = gameConstants.people;
		var peopleState = this._peopleState;

		if ((people.FIREMAN in peopleState) && (peopleState[people.FIREMAN] <= 0)) {
			if (random < gameConstants.buildingProperties[people.FIREMAN].chance) {
				this.emit('Message', 'Warning: A building is burning!');
				this._burn();
				return;
			}
		}

		var peopleRepairList = [people.ENGINEER, people.CITIZEN, people.TRADER];
		for (var i = 0; i < 3; i++) {
			var peopleRepair = peopleRepairList[i];
			if ((peopleRepair in peopleState) && (peopleState[peopleRepair] <= 0)) {
				if (random < gameConstants.buildingProperties[peopleRepair].chance) {
					switch (peopleRepair) {
						case people.ENGINEER:
							this.emit('Message', 'A building was not maintained and needs repair.');
							break;

						case people.CITIZEN:
							this.emit('Message', 'A business is run-down and needs repair.');
							break;

						case people.TRADER:
							this.emit('Message', 'A building did not receive enough donations and needs repair.');
							break;
					}
					this._buildingState = buildingStates.NEEDS_REPAIR;
					this._removeIcons();
					this._removePeople();
					this.setIndex(1);
					this.emit('Changed', this);
					return;
				}
			}
		}

		if ((people.GUARD in peopleState) && (peopleState[people.GUARD] <= 0)) {
			if (random < gameConstants.buildingProperties[people.GUARD].chance) {
				this._robbed = true;
			}
		}
	};

	this.tickStateNeedsRepair = function (dt) {
		var random = Math.random();
		var people = gameConstants.people;
		var peopleState = this._peopleState;

		if ((people.FIREMAN in peopleState) && (peopleState[people.FIREMAN] <= 0)) {
			if (random < gameConstants.buildingProperties[people.FIREMAN].chance) {
				this._burn();
				return;
			}
		}
		if ((people.GUARD in peopleState) && (peopleState[people.GUARD] <= 0)) {
			if (random < gameConstants.buildingProperties[people.GUARD].chance) {
				this._robbed = true;
				return;
			}
		}
		if (random < gameConstants.buildingProperties[people.ENGINEER].chanceCollapse) {
			this._collapse();
		}
	};

	this.tickBurning = function (dt) {
		var tileX = this._tileX + this._fireTileX;
		var tileY = this._tileY + this._fireTileY;

		var firePos = this._firePos[(Math.random() * this._firePos.length) | 0];
		this._gridModel.addParticles('fire', tileX, tileY, firePos.x, firePos.y, false);

		this._burningCount--;
		if (this._burningCount < 0) {
			this._collapse();
		}
	};

	this.tickBurned = function (dt) {
	};

	this.tick = function (dt) {
		supr(this, 'tick', arguments);

		!this._waterFound && this._updateWater();

		this._updateStateDT -= dt;
		if (this._updateStateDT > 0) {
			return;
		}
		this._updateStateDT = this._updateInterval;

		if (!this._waterFound) {
			this._waterTime += this._updateInterval;
		}

		this._tickFunctions[this._buildingState](dt);
	};

	this.repair = function () {
		var peopleState = this._peopleState;
		for (people in peopleState) {
			var buildingProperties = gameConstants.buildingProperties[people];
			if (buildingProperties) {
				peopleState[people] = buildingProperties.startValue;
			}
		}

		this._canSpawn = true;
		this._buildingState = buildingStates.DEFAULT;

		this._waterFound = false;
		this._waterIndex = 0;
		this._waterCount = 0;
		this._waterTime = 0;

		this._warningFireDT = 0;
		this._burningCount = 20;

		this.setIndex(0);
	};

	this.toJSON = function () {
		var data = supr(this, 'toJSON', arguments);
		var i = serializeKeys.length;
		while (i) {
			data[serializeKeys[--i]] = this['_' + serializeKeys[i]];
		}

		return data;
	};
});

exports.buildingStates = buildingStates;