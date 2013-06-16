import lib.Enum as Enum;

import event.Emitter as Emitter;

import src.constants.gameConstants as gameConstants;

var missions = Enum(
		'RESIDENTS',
		'HOUSES',
		'MONEY',
		'FREESTYLE'
	);

exports = Class(Emitter, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this._gridModel = opts.gridModel;

		this._staticModels = opts.gridModel.getStaticModels();
		this._staticInterval = gameConstants.startFunds;

		this._timeInterval = opts.timeInterval || 5000; // Duration of a day...

		this._editorSettings = opts.editorSettings;
		this.initData();

		this.reset();
	};

	this.initData = function () {
		var minPrice = 10000;
		var editorSettings = this._editorSettings;

		for (var i in editorSettings) {
			var editorSetting = editorSettings[i];
			if (editorSetting.price && (editorSetting.price < minPrice)) {
				minPrice = editorSetting.price;
			}
		}

		this._minPrice = minPrice;
	};

	this.reset = function () {
		this._data = {
			revenue: gameConstants.startFunds,
			startRevenue: gameConstants.startFunds,
			count: 0,
			roadPaved: 0,
			roadDirt: 0,
			aquaduct: 0,
			year: 0,
			month: 0,
			costAquaduct: 0,
			costRoadDirt: 0,
			costRoadPaved: 0,
			statement: {
				buildCosts: {
				},
				repairCosts: {
				},
				costs: {
					roadPaved: 0,
					roadDirt: 0,
					aquaduct: 0
				},
				benefits: {
					buildingHouse: 0,
					buildingMansion: 0,
					buildingMarket: 0
				}				
			},
			people: [],
			peopleTotal: 0
		};

		this._statements = [];

		this._staticIndex = 0;
		this._staticDT = this._staticInterval;
		this._timeDT = this._timeInterval;
		this._timeElapsed = 0;
		this._updateDT = 0;

		this._tool = null;
		this._toolSetting = null;

		this._missionCheck = false;
		this._missionCheckTime = 0;

		this._totalHouses = 0;
	};

	this._createStatement = function () {
		var data = this._data;
		var costs = data.statement.costs;
		var buildCosts = data.statement.buildCosts;
		var repairCosts = data.statement.repairCosts;
		var foundBuildCosts = false;
		var foundRepairCosts = false;
		var benefits = data.statement.benefits;
		var statement = {
				costs: {
					roadPaved: costs.roadPaved,
					roadDirt: costs.roadDirt,
					aquaduct: costs.aquaduct
				},
				buildCosts: {
				},
				repairCosts: {
				},
				benefits: {
					buildingHouse: benefits.buildingHouse,
					buildingMansion: benefits.buildingMansion,
					buildingMarket: benefits.buildingMarket
				},
				revenue: data.revenue,
				startRevenue: data.startRevenue,
				year: this._data.year,
				month: this._data.month
			};

		for (var i in buildCosts) {
			if (buildCosts[i]) {
				statement.buildCosts[i] = buildCosts[i];
				buildCosts[i] = 0;
				foundBuildCosts = true;
			}
		}
		for (var i in repairCosts) {
			if (repairCosts[i]) {
				statement.repairCosts[i] = repairCosts[i];
				repairCosts[i] = 0;
				foundRepairCosts = true;
			}
		}

		data.startRevenue = data.revenue;

		this._statements.push(statement);
	};

	this._log = function () {
		console.log('========== Year: ' + this._data.year + ', Month: ' + this._data.month + ' ==========');
		console.log('revenue:');
		console.log('    start: ' + statement.startRevenue);
		console.log('    current: ' + statement.revenue);
		console.log('costs:');
		console.log('    roadPaved: ' + costs.roadPaved);
		console.log('    roadDirt: ' + costs.roadDirt);
		console.log('    aquaduct: ' + costs.aquaduct);

		if (foundBuildCosts) {
			console.log('buildCosts:');
			buildCosts = statement.buildCosts;
			for (var i in buildCosts) {
				console.log('    ' + i + ': ' + buildCosts[i]);
			}
		}
		if (foundRepairCosts) {
			console.log('repairCosts:');
			buildCosts = statement.repairCosts;
			for (var i in repairCosts) {
				console.log('    ' + i + ': ' + repairCosts[i]);
			}
		}

		console.log('benefits:');
		console.log('    house: ' + benefits.buildingHouse);
		console.log('    mansion: ' + benefits.buildingMansion);
		console.log('    market: ' + benefits.buildingMarket);
	};

	this._updateTax = function (taxResult, dt) {
		if (!taxResult.value) {
			return;
		}

		var data = this._data;
		var value = taxResult.value;

		if (taxResult.robbed) {
			this.emit('Message', 'A robbery took place, no taxes collected.');
			return;
		}

		if (this._coatAquaduct > 0) {
			var cost = Math.min((value * 0.25) | 0, this._coatAquaduct);
			value -= cost;
			statement.costs.aquaduct += cost;
		} else if (this._coatRoadDirt > 0) {
			var cost = Math.min((value * 0.25) | 0, this._coatRoadDirt);
			value -= cost;
			statement.costs.roadDirt += cost;
		} else if (this._coatRoadPaved > 0) {
			var cost = Math.min((value * 0.25) | 0, this._coatRoadPaved);
			value -= cost;
			statement.costs.roadPaved += cost;
		}

		if (!(taxResult.type in data.statement.benefits)) {
			data.statement.benefits[taxResult.type] = 0;
		}
		data.statement.benefits[taxResult.type] += value;

		data.revenue += value;
		data.count++;

		this._updateDT -= dt;
		if (this._updateDT < 0) {
			this._updateDT = 1000;
			this.emit('Revenue', data.revenue);
		}
	};

	this._updateInfrastructure = function () {
		var data = this._data;
		var statement = data.statement;

		if (data.aquaduct > 15) {
			data.costAquaduct = (data.aquaduct * 0.1) | 0;
		}
		if (data.roadDirt > 30) {
			data.costRoadDirt = (data.roadDirt * 0.05) | 0;
		}
		if (data.roadPaved > 20) {
			data.costRoadPaved = (data.roadPaved * 0.1) | 0;
		}
	};

	this._updateMission = function () {
		var data = this._data;

		switch (this._mission) {
			case missions.RESIDENTS:
				if (data.peopleTotal >= gameConstants.missionResisents) {
					this.emit('Message', 'Mission finished! Your town has ' + data.peopleTotal + ' residents!');
					this.emit('MissionComplete', 'Your town has a population of ' + data.peopleTotal);
				}
				break;

			case missions.HOUSES:
				if (this._totalHouses >= gameConstants.missionHouses) {
					if (!this._missionCheck) {
						this._missionCheck = true;
						this._missionCheckTime = 0;
						this.emit('Message', 'Your town has ' + this._totalHouses + ' houses!');
						this.emit('Message', 'Keep it up for two minutes');
						this.emit('Message', 'to complete your mission...');
					} else if (this._missionCheckTime >= 10000) {
						this.emit('MissionComplete', 'Your town has ' + this._totalHouses + ' houses!');
					}
				} else if (this._missionCheck) {
					this.emit('Message', 'Your town lost a couple of houses,');
					this.emit('Message', 'try rebuilding to finish your mission...');
					this._missionCheck = false;
				}
				break;

			case missions.MONEY:
				if (data.revenue >= gameConstants.missionMoney) {
					this.emit('Message', 'Mission finished! You have collected ' + data.revenue + ' credits!');
					this.emit('MissionComplete', 'You have collected ' + data.revenue + ' credits!');
				}
				break;
		}
	};

	this._updateModel = function (dt) {
		var staticModelsList = this._staticModels.getList();
		var staticModel = staticModelsList[this._staticIndex];

		this._updateTax(staticModel.getTax(), dt);
		this._staticIndex++;

		if (staticModel.isComplete()) {
			var modelType = staticModel.getModelType();
			if ((modelType === 'buildingHouse') || (modelType === 'buildingMansion')) {
				this._totalHouses++;
			}
		}
	}

	this.tick = function (dt) {
		var staticModelsList = this._staticModels.getList();

		this._missionCheckTime += dt;

		// Update the static models (buldings).
		// Static interval is the time of a day (_staticInterval) divided by the number of models.
		this._staticDT -= dt;
		if (this._staticDT < 0) {
			this._staticDT = this._staticInterval;
			if (this._staticIndex < staticModelsList.length) {
			}
		}

		this._timeDT -= dt;
		if (this._timeDT < 0) {
			if (staticModelsList.length) {
				this._staticInterval = this._timeInterval / staticModelsList.length;
			} else {
				this._staticInterval = this._timeInterval / 2;
			}

			while (this._staticIndex < staticModelsList.length) {
				this._updateModel(dt);
			}

			this._updateInfrastructure();
			this._updateMission();

			var data = this._data;

			this.emit('Revenue', data.revenue);

			if ((data.count === 0) && (data.revenue < this._minPrice)) {
				this.emit('GameOver');
			}

			var month = (this._timeElapsed / 30) | 0;
			if (month !== this._month) {
				this._createStatement();

				this._data.year = (this._timeElapsed / 360) | 0;
				this._data.month = month;
			}

			this._data.count = 0;
			this._staticIndex = 0;
			this._timeDT = this._timeInterval;
			this._timeElapsed++;

			this._totalHouses = 0;

			this.emit('TimeElapsed', this._timeElapsed);
		}
	};

	this.addPeople = function (modelInfo) {
		if (!modelInfo) {
			return;
		}

		var i = modelInfo.length;
		while (i) {
			var info = modelInfo[--i];
			if (!this._data.people[info.type]) {
				this._data.people[info.type] = 0;
			}
			this._data.people[info.type] += info.count;
			this._data.peopleTotal += info.count;
		}

		this.emit('People', this._data.peopleTotal);
	};

	this.addRoadPaved = function (count) {
		this._data.roadPaved += count;
	};

	this.addRoadDirt = function (count) {
		this._data.roadDirt += count;
	};

	this.addAquaduct = function (count) {
		this._data.aquaduct += count;
	};

	this.getRevenue = function () {
		return this._data.revenue;
	};

	this.setTool = function (tool) {
		this._tool = tool;
		this._toolSetting = this._editorSettings[tool];
	};

	this.setMission = function (mission) {
		this._mission = mission;
	};

	this.getMission = function () {
		return this._mission;
	};

	this.useRevenue = function (price, modelType) {
		var data = this._data;

		if (data.revenue >= price) {
			data.revenue -= price;
			if (!(modelType in data.statement.repairCosts)) {
				data.statement.repairCosts[modelType] = 0;
			}
			data.statement.repairCosts[modelType] += price;

			return true;
		}
		return false;
	};

	this.acceptBuild = function (selected) {
		if (this._toolSetting && selected) {
			var accept = (selected.changed * this._toolSetting.price <= this._data.revenue);
			!accept && this.emit('Message', 'Insufficient funds.');
			return accept;
		}
		return false;
	};

	this.build = function (selected) {
		if (this._toolSetting && selected) {
			var cost = selected.changed * this._toolSetting.price;
			var buildCosts = this._data.statement.buildCosts;

			if (!(this._tool in buildCosts)) {
				buildCosts[this._tool] = 0;
			}

			buildCosts[this._tool] += cost;
			this._data.revenue -= cost;
			this.emit('Revenue', this._data.revenue);
		}
	};

	this.toJSON = function () {
		return {
			statements: this._statements,
			data: this._data,
			staticDT: this._staticDT,
			timeDT: this._timeDT,
			timeElapsed: this._timeElapsed,
			updateDT: this._updateDT
		};
	};

	this.fromJSON = function (data) {
		this._statements = data.statements;
		this._data = data.data;
		this._staticDT = data.staticDT;
		this._timeDT = data.timeDT;
		this._timeElapsed = data.timeElapsed;
		this._updateDT = data.updateDT;
		this._staticIndex = 0;
	};
});

exports.missions = missions;