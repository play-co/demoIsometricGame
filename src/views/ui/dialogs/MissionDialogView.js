import animate;

import ui.View as View;
import ui.ImageView as ImageView;
import ui.ScrollView as ScrollView;
import ui.ImageScaleView as ImageScaleView;
import ui.TextView as TextView;

import src.constants.gameConstants as gameConstants;

import menus.views.TextDialogView as TextDialogView;
import menus.views.components.ButtonView as ButtonView;
import menus.constants.menuConstants as menuConstants;

import src.models.GameModel as GameModel;

exports = Class(TextDialogView, function (supr) {
	this.init = function (opts) {
		delete opts.text; // Clear the text

		opts = merge(
			opts,
			{
				width: 740,
				height: 502,
				backCB: bind(this, 'emit', 'Close')
			}
		);

		supr(this, 'init', [opts]);

		this._gameModel = opts.gameModel;

		// Get the content from the superview and use it as a parent for a new view...
		this._dialogView.content.style.visible = false;

		var missions = [
				{
					description: 'Build a town with ' + gameConstants.missionResisents + ' residents',
					color: '#DD0000',
					mission: GameModel.missions.RESIDENTS
				},
				{
					description: 'Build a town with ' + gameConstants.missionHouses + ' houses',
					color: '#00CC00',
					mission: GameModel.missions.HOUSES
				},				
				{
					description: 'Make money, ' + gameConstants.missionMoney + ' credits',
					color: '#FFDD00',
					mission: GameModel.missions.MONEY
				},
				{
					description: 'Freestyle building',
					color: '#0000DD',
					mission: GameModel.missions.FREESTYLE
				}				
			];

		var i = 0;
		for (var y = 0; y < 2; y++) {
			for (var x = 0; x < 2; x++) {
				new TextView({
					superview: this._dialogView,
					x: 32 + x * 340,
					y: 114 + y * 180,
					width: 326,
					height: 166,
					autoSize: false,
					autoFontSize: false,
					wrap: true,
					color: '#000000',
					size: 36,
					fontFamily: 'Adonais',
					strokeColor: '#FFFFFF',
					strokeWidth: 8,
					backgroundColor: missions[i].color,
					text: missions[i].description,
					padding: 0
				}).on('InputSelect', bind(this, 'onSelectMission', missions[i].mission));

				new ImageScaleView({
					superview: this._dialogView,
					x: 30 + x * 340,
					y: 112 + y * 180,
					width: 330,
					height: 170,
					image: 'resources/images/ui/contentBorder.png',
					blockEvents: true,
					scaleMethod: '9slice',
					sourceSlices: {
						horizontal: {left: 30, center: 10, right: 30},
						vertical: {top: 30, middle: 10, bottom: 30}
					}
				});
				i++;
			}
		}
	};

	this.onSelectMission = function (mission) {
		this._gameModel.setMission(mission);
		this.hide();
		this.emit('NewGame');
	};
});