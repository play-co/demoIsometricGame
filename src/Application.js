import device;

import ui.View as View;

import isometric.Isometric as Isometric;
import isometric.views.minimap.gridMiniMapBuffer as gridMiniMapBuffer;

import menus.constants.menuConstants as menuConstants;
import menus.views.MenuView as MenuView;
import menus.views.TextDialogView as TextDialogView;

import src.views.ui.overlay.status.StatusView as StatusView;
import src.views.ui.overlay.build.BuildOptions as BuildOptions;
import src.views.ui.overlay.properties.PropertiesView as PropertiesView;
import src.views.ui.overlay.hint.HintView as HintView;
import src.views.ui.overlay.hint.hintTexts as hintTexts;
import src.views.ui.overlay.ButtonsView as ButtonsView;
import src.views.ui.overlay.RepairView as RepairView;

import src.views.ui.dialogs.InformationDialogView as InformationDialogView;
import src.views.ui.dialogs.MiniMapDialogView as MiniMapDialogView;
import src.views.ui.dialogs.MissionDialogView as MissionDialogView;

import src.views.LoadingView as LoadingView;

import src.settings.buildSettings as buildSettings;
import src.settings.editorSettings as editorSettings;
import src.settings.gridSettings as gridSettings;
import src.settings.tileSettings as tileSettings;
import src.settings.itemSettings as itemSettings;
import src.settings.mapSettings as mapSettings;
import src.settings.particleSettings as particleSettings;

import src.models.GameModel as GameModel;

import src.constants.gameConstants as gameConstants;
import src.constants.menuConstants as menuConstants;

var BOUNDS_WIDTH = 576;
var BOUNDS_HEIGHT = 1024;

var MINIMAP = false;

//localStorage.clear();

function displayTime (time) {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var date = new Date(time);
	return months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + date.getHours() + ':' + ('00' + date.getMinutes()).substr(-2);
}

exports = Class(GC.Application, function (supr) {
	this.initUI = function () {
		this.engine.updateOpts({
			alwaysRepaint: true,
			clearEachFrame: false,
			keyListenerEnabled: false,
			logsEnabled: true,
			noTimestep: false,
			noReflow: true,
			showFPS: false,
			resizeRootView: false,
			preload: ['resources/images', 'resources/audio']
		});

		this.scaleUI();

		this._isometric = new Isometric({
			superview: this,
			loadingViewCtor: LoadingView,
			editorSettings: editorSettings,
			gridSettings: gridSettings,
			tileSettings: tileSettings,
			mapSettings: mapSettings,
			itemSettings: itemSettings,
			particleSettings: particleSettings
		});
		this._isometric.
			on('Ready', bind(this, 'onReady')).
			on('InputStart', bind(this, 'onInputStartGrid')).
			on('InputEnd', bind(this, 'onInputEndGrid')).
			on('SelectionCount', bind(this, 'onSelectionCount')).
			on('SelectItem', bind(this, 'onSelectItem')).
			on('UnselectItem', bind(this, 'onUnselectItem')).
			on('AddStaticModel', bind(this, 'onAddStaticModel')).
			on('Edit', bind(this, 'onEdit')).
			on('AddDynamicModel', bind(this, 'onAddDynamicModel')).
			on('SleepDynamicModel', bind(this, 'onSleepDynamicModel')).
			on('WakeupDynamicModel', bind(this, 'onWakeupDynamicModel'));

		this._gridModel = this._isometric.getGridModel();

		this._gameModel = new GameModel({
			gridModel: this._gridModel,
			editorSettings: editorSettings,
		}).
			on('Message', bind(this, 'onMessage')).
			on('GameOver', bind(this, 'onGameOver')).
			on('MissionComplete', bind(this, 'onMissionComplete'));

		this._loadMenuView = null;
		this._saveMenuView = null;
		this._mainMenuView = null;
		this._gameOverView = null;

		this.initOverlay();
		this.initDialogs();
		this.initSaveGames();
		this.initMainMenu();

		LoadingView.get().style.visible = true;

		this._gameStarted = false;
		this._gameOver = false;
		this._gameMissionTimeout = false;
		this._gameFinishedTimeout = false;
		this._mainMenuView.show();
		this._dt = 0;
	};

	this.initOverlay = function () {
		this._overlayView = new View({
			superview: this,
			x: 0,
			y: 0,
			width: GC.app.baseWidth,
			height: GC.app.baseHeight,
			canHandleEvents: false
		});

		this._buildOptions = new BuildOptions({
			superview: this._overlayView,
			options: buildSettings,
			visible: false
		});
		this._buildOptions.
			on('Tool', bind(this, 'onTool')).
			on('Cursor', bind(this, 'onCursor')).
			on('Select', bind(this, 'onSelect'));

		this._buttonsView = new ButtonsView({
			superview: this._overlayView,
			options: [
				{icon: 'resources/images/ui/toolPan.png', cb: bind(this, 'onStats'), text: true},
				{icon: 'resources/images/ui/toolMessage.png', cb: bind(this, 'onMessages')},
				false,
				{icon: 'resources/images/ui/iconMenu.png', cb: bind(this, 'onMainMenu')}
			],
			visible: false
		});
		this._repairView = new RepairView({
			gameModel: this._gameModel,
			superview: this._overlayView,
			editorSettings: editorSettings
		}).
			on('Hide', bind(this, 'onHideRepairView')).
			on('Message', bind(this, 'onMessage'));

		this._propertiesView = new PropertiesView({
			superview: this._overlayView,
			gridModel: this._gridModel,
			isometric: this._isometric
		}).
			on('Hide', bind(this, 'onHidePropertiesView')).
			on('Message', bind(this, 'onMessage'));

		this._statusView = new StatusView({
			superview: this._overlayView,
			visible: false
		});

		this._gameModel.
			on('People', bind(this._statusView, 'onPeople')).
			on('TimeElapsed', bind(this._statusView, 'onTimeElapsed')).
			on('Revenue', bind(this._statusView, 'onRevenue'));

		this._hintView = new HintView({
			superview: this,
			visible: false
		});
	};

	this.initDialogs = function () {
		this._informationDialogView = new InformationDialogView({
			superview: this,
			title: 'Items',
			modal: true,
			visible: false,
			gridModel: this._gridModel,
			editorSettings: editorSettings
		}).on('Hide', bind(this, 'onCloseStats'));

		if (MINIMAP) {
			this._gridMiniMapBuffer = gridMiniMapBuffer({
				isometric: this._isometric,
				gridSettings: gridSettings,
				tileSettings: tileSettings,
				itemSettings: itemSettings
			});
			this._gridModel.on('Update', bind(this._gridMiniMapBuffer, 'onUpdate'));

			this._mapDialogView = new MiniMapDialogView({
				superview: this,
				title: 'Items',
				modal: true,
				visible: false,
				visible: false,
				gridMiniMapBuffer: this._gridMiniMapBuffer,
				closeCB: bind(this, 'onCloseStats')
			}).on('Hide', bind(this, 'onCloseStats'));
		}

		this._missionDialogView = new MissionDialogView({
			superview: this,
			gameModel: this._gameModel,
			title: 'Select a misson',
			modal: true,
			visible: false
		}).on('Close', bind(this, 'onMainMenu')).on('NewGame', bind(this, 'onNewGame'));
	};

	this.initSaveGames = function () {
		this._savedGames = [];

		var savedGames = localStorage.getItem('ROME_SWEET_ROME_SAVED');
		if (savedGames !== null) {
			try {
				this._savedGames = JSON.parse(savedGames);
			} catch (e) {
			}
		}
	};

	this.initMainMenu = function () {
		this._mainMenuView && this._mainMenuView.removeFromSuperview();

		var items = [
				{item: 'Start a new mission', action: bind(this, 'onNewMission')},
				{item: 'Instructions', action: bind(this, 'onInstructions')},
			];

		if (this._gameStarted) {
			items.push({item: 'Save game', action: bind(this, 'onSaveGame')});
		}
		if (this._savedGames.length) {
			items.push({item: 'Load game', action: bind(this, 'onLoadGame')});
		}
		if (this._gameStarted) {
			items.push({item: 'Return to game', action: bind(this, 'showOverlay')});
		}

		this._mainMenuView = new MenuView({
			superview: this,
			title: 'Main menu',
			modal: true,
			width: 740,
			items: items
		});
	};

	this.launchUI = function () {};

	this.scaleUI = function () {
		if (device.height > device.width) {
			this.baseWidth = BOUNDS_WIDTH;
			this.baseHeight = device.height * (BOUNDS_WIDTH / device.width);
			this.scale = device.width / this.baseWidth;
		} else {
			this.baseWidth = BOUNDS_HEIGHT;
			this.baseHeight = device.height * (BOUNDS_HEIGHT / device.width);
			this.scale = device.height / this.baseHeight;
		}
		this.view.style.scale = this.scale;
	};

	this.hideOverlay = function () {
		this._propertiesView.hide();
		this._repairView.hide();
		this._buildOptions.hide();
		this._buttonsView.hide();
		this._statusView.hide();
		this._hintView.hide();
	};

	this.showOverlay = function () {
		this._buildOptions.show();
		this._buttonsView.show();
		this._statusView.show();
		this._hintView.show();
	};

	this.tick = function (dt) {
		this._isometric.tick(dt);
		this._gameModel.tick(dt);

		this._dt += dt;
		var sin = Math.sin(this._dt * 0.0003);
		this._isometric.setBackgroundColor('rgb(0, ' + ((120 + sin * 10) | 0) + ',' + ((235 + sin * 20) | 0) + ')');

		particleSettings.tick(dt);
	};

	this.canFinishGame = function () {
		return !this._informationDialogView.style.visible &&
				(!this._loadMenuView || !this._loadMenuView.style.visible) &&
				(!this._saveMenuView || !this._saveMenuView.style.visible) &&
				(!this._mainMenuView || !this._mainMenuView.style.visible);
	};

	this.onInputStartGrid = function (evt) {
		this._buildOptions.onSelect(false, true);
		this._hintView.hideHistory();
		this._overlayView.getInput().blockEvents = true;
	};

	this.onInputEndGrid = function () {
		this._overlayView.getInput().blockEvents = false;
	};

	this.onMap = function () {
		this._statusView.hide();
		this._mapDialogView.show();
	};

	this.onMessages = function () {
		this._hintView.showMessages();
	};

	this.onStats = function () {
		this._statsFromMenu = false;
		this._statusView.hide();
		this._informationDialogView.showCloseButton();
		this._informationDialogView.show(this._tool);
	};

	this.onCloseStats = function () {
		if (this._statsFromMenu) {
			this.onMainMenu();
		} else {
			this._statusView.show();
		}
	};

	this.onCloseMiniMap = function () {
		this._statusView.show();
	};

	this.onNewMission = function () {
		this._missionDialogView.show();
	};

	this.onReady = function () {
		if (this._gameStarted) {
			this._hintView.hint(hintTexts.PLACE_PUMP);
			this.showOverlay();
			MINIMAP && this._gridMiniMapBuffer.updateLayer(0);

			this._gameMissionTimeout = setTimeout(
				bind(this, function () {
					switch (this._gameModel.getMission()) {
						case GameModel.missions.RESIDENTS:
							this._hintView.hint('Mission: build a town with at least ' + gameConstants.missionResisents + ' residents.');
							break;

						case GameModel.missions.HOUSES:
							this._hintView.hint('Mission: build a town with at least ' + gameConstants.missionHouses + ' houses.');
							break;

						case GameModel.missions.MONEY:
							this._hintView.hint('Make a fortune of ' + gameConstants.missionMoney + ' credits.');
							break;
					}
				}),
				1000
			);
		}
	};

	this.onAddStaticModel = function (model) {
		model.getModelInfo && this._gameModel.addPeople(model.getModelInfo());
		model.on('Changed', bind(this, 'onChanged'));
		model.on('Message', bind(this, 'onMessage'));
	};

	this.onChanged = function (model) {
		if (this._propertiesView.style.visible && (this._activeModel === model)) {
			this._propertiesView.hide();
			this._repairView.show(model);
		} else if (this._repairView.style.visible) {
			this._repairView.show(model);
		}
	};

	this.onSelectItem = function (model) {
		this._activeModel = model;

		this._buildOptions.hide();
		this._buttonsView.hide();
		this._statusView.hide();

		if (model.isBurning() || model.isBurned() || model.isBroken()) {
			this._repairView.show(model);
			this._propertiesView.hide();
		} else {
			this._repairView.hide();
			this._propertiesView.show(model);
		}
	};

	this.onUnselectItem = function () {
		this._activeModel = null;

		this._propertiesView.hide();
		this._repairView.hide();

		this.showOverlay();
	};

	this.onHideRepairView = function () {
		this._propertiesView.hide();
		this.showOverlay();
		this._isometric.hideSelectedItem();
	};

	this.onHidePropertiesView = function () {
		this._repairView.hide();

		this._buildOptions.show();
		this._buttonsView.show();
		this._statusView.show();

		this._isometric.hideSelectedItem();
	};

	this.onCursor = function (optionView, tool) {
		this._isometric.setTool(false);
		this._gameModel.setTool(null);

		var buttonView = this._buttonsView.getButtonView(0);
		buttonView.getImageView().setImage('resources/images/ui/toolPan.png');
		buttonView.text.style.visible = false;
	};

	this.onTool = function (optionView, tool) {
		this._tool = tool;

		this._isometric.setTool(tool);
		this._gameModel.setTool(tool);

		var buttonView = this._buttonsView.getButtonView(0);
		var toolInfo = editorSettings[tool];
		var price = toolInfo.price;

		buttonView.getImageView().setImage(optionView.getImage());
		if (price && (toolInfo.type === 'item')) {
			price *= (toolInfo.width || 1) * (toolInfo.height || 1);
		}

		buttonView.text.setText(price);
		buttonView.text.style.visible = true;
	};

	this.onMainMenu = function () {
		this.hideOverlay();
		if (!this._mainMenuView.style.visible) {
			this.initMainMenu();
			this._mainMenuView.show();
		}
	};

	this.onInstructions = function () {
		this._statsFromMenu = true;
		this._informationDialogView.showBackButton();
		this._informationDialogView.show('instructions');
	};

	this.onNewGame = function () {
		this._gameFinishedTimeout && clearTimeout(this._gameFinishedTimeout);
		this._gameFinishedTimeout = false;

		this._gameMissionTimeout && clearTimeout(this._gameMissionTimeout);
		this._gameMissionTimeout = false;

		this._gameOver = false;
		this._gameStarted = true;

		this._statusView.reset();
		this._gameModel.reset();
		this._buildOptions.reset();
		this._isometric.clear();

		this._isometric.show();
		this._gridModel.generate();
	};

	this.onGameOver = function () {
		if (this._gameOver) {
			return;
		}

		this._gameOver = true;
		this._gameOverView = this._gameOverView || new TextDialogView({
			superview: this,
			title: 'Game over',
			text: 'You have no more money to build anything and there are no items which create tax income.',
			width: 800,
			modal: true,
			buttons: [
				{
					title: 'Ok',
					width: 160,
					style: 'GREEN'
				}
			]
		}).on('Hide', bind(this, 'onHideGameOver'));
		this._gameOverView.show();
	};

	this.onMissionComplete = function (message) {
		if (this.canFinishGame()) {
			this.hideOverlay();
			this._finishedGameView = this._finishedGameView || new TextDialogView({
				superview: this,
				title: 'Mission completed!',
				text: message,
				width: 800,
				modal: true,
				buttons: [
					{
						title: 'Keep building',
						width: 360,
						style: 'GREEN',
						cb: bind(this, 'onContinueBuidling')
					},
					{
						title: 'Quit',
						width: 160,
						style: 'RED',
						cb: bind(this, 'onStopPlaying')
					}
				]
			}).show();
		} else {
			this._gameFinishedTimeout = setTimeout(bind(this, 'onMissionComplete', message), 50);
		}
	};

	this.onContinueBuidling = function () {
		this.showOverlay();
		this._gameModel.setMission(GameModel.missions.FREESTYLE);
	};

	this.onStopPlaying = function () {
		this._gameStarted = false;
		LoadingView.get().style.visible = true;
		this.onMainMenu();
	};

	this.onHideGameOver = function () {
		this._gameStarted = false;
		LoadingView.get().style.visible = true;
		this.onMainMenu();
	};

	this.onLoadGame = function () {
		this._loadMenuView && this._loadMenuView.removeFromSuperview();

		var items = [];
		for (var i = 0; i < this._savedGames.length; i++) {
			(bind(this, function (index) {
				items.push({item: displayTime(this._savedGames[i]), action: bind(this, 'onLoadGameSlot', index)});
			}))(i);
		}

		this._loadMenuView = new MenuView({
			superview: this,
			title: 'Load game',
			modal: true,
			width: 780,
			items: items,
			backCB: bind(this, 'onMainMenu')
		}).show();
	};

	this.onLoadGameSlot = function (index) {
		this._isometric.clear(true);

		var success;
		var str = localStorage.getItem('ROME_SWEET_ROME_SAVED_' + index);
		var data = null;
		try {
			data = JSON.parse(str);
			success = true;
		} catch (e) {
			success = false;
		}

		if (success) {
			try {
				this._buildOptions.reset();
				this._gridModel.fromJSON(data);
				this._gameModel.fromJSON(data.gameModel);
			} catch (e) {
				success = false;
			}
		}

		if (success) {
			this._isometric.show();
			this.showOverlay();
		} else {
			this._gameStarted = false;
			LoadingView.get().style.visible = true;

			this._loadErrorView = this._loadErrorView || new TextDialogView({
				superview: this,
				title: 'Error',
				text: 'Failed to load level.',
				width: 500,
				modal: true,
				buttons: [
					{
						title: 'Ok',
						width: 160,
						style: 'RED'
					}
				]
			}).on('Hide', bind(this, 'onMainMenu'));

			this._loadErrorView.show();
		}
	};

	this.onSaveGame = function () {
		this._saveMenuView && this._saveMenuView.removeFromSuperview();

		if (this._savedGames.length) {
			var items = [];
			for (var i = 0; i < this._savedGames.length; i++) {
				(bind(this, function (index) {
					items.push({item: 'replace <' + displayTime(this._savedGames[i]) + '>', action: bind(this, 'onSaveGameSlot', index)});
				}))(i);
			}
			if (items.length < 5) {
				(bind(this, function (index) {
					items.push({item: 'New slot', action: bind(this, 'onSaveGameSlot', index)});
				}))(items.length);
			}

			this._saveMenuView = new MenuView({
				superview: this,
				title: 'Save game',
				modal: true,
				width: 780,
				items: items,
				backCB: function () {}
			}).show();
		} else {
			this.onSaveGameSlot(0);
		}
	};

	this.onSaveGameSlot = function (index) {
		var data = this._gridModel.toJSON();
		data.gameModel = this._gameModel.toJSON();
		localStorage.setItem('ROME_SWEET_ROME_SAVED_' + index, JSON.stringify(data));

		this._savedGames[index] = Date.now();
		localStorage.setItem('ROME_SWEET_ROME_SAVED', JSON.stringify(this._savedGames));

		this.initMainMenu();
		this.showOverlay();
	};

	this.onSelectionCount = function (selected) {
		if (selected) {
			selected.accept = this._gameModel.acceptBuild(selected);
		}
		var buttonView = this._buttonsView.getButtonView(0);
		var tool = editorSettings[this._tool];

		switch (tool.type) {
			case 'line':
				if (selected) {
					buttonView.text.setText(tool.price * selected.changed);
				} else {
					buttonView.text.setText('0');
				}
				break;

			case 'item':
				if (selected) {
					buttonView.text.setText(tool.price * (tool.width || 1) * (tool.height || 1));
				} else {
					buttonView.text.setText('0');
				}
				break;
		}
	};

	this.onEdit = function (selected) {
		this._gameModel.build(selected);
		if (selected && (selected.total > 0)) {
			switch (this._tool) {
				case 'aquaduct':
					this._gameModel.addAquaduct(selected.changed);
					break;

				case 'roadDirt':
					this._gameModel.addRoadDirt(selected.changed);
					break;

				case 'roadPaved':
					this._gameModel.addRoadPaved(selected.changed);
					break;

				case 'buildingPump':
					this._hintView.hint(hintTexts.FIRST_PUMP);
					break;

				case 'buildingHouse':
				case 'buildingMansion':
					this._hintView.hint(hintTexts.FIRST_HOUSE);
					break;

				case 'buildingMarket':
					this._hintView.hint(hintTexts.FIRST_MARKET);
					break;

				case 'buildingFiremen':
					this._hintView.hint(hintTexts.FIRST_FIRESTATION);
					break;

				case 'buildingGuards':
					this._hintView.hint(hintTexts.FIRST_GUARDS);
					break;
			}
			MINIMAP && this._gridMiniMapBuffer.updateRect(1, selected.rect);
		}
	};

	this.onMessage = function (text, color) {
		this._hintView && this._hintView.hint(text, color);
	};

	this.onAddDynamicModel = function (model) {
		model.on('Message', bind(this, 'onMessage'));
	};

	this.onSleepDynamicModel = function (model) {
	};

	this.onWakeupDynamicModel = function (model) {
	};
});