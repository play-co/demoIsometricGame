import ui.View as View;
import ui.TextView as TextView;

import menus.views.components.ButtonView as ButtonView;

import isometric.views.GridView as GridView;
import isometric.views.GridControlView as GridControlView;
import isometric.views.WorldView as WorldView;

import src.settings.tileSettings as tileSettings;
import src.settings.itemSettings as itemSettings;

exports = Class(WorldView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				x: 0,
				y: 0,
				width: GC.app.baseWidth,
				height: GC.app.baseHeight,
				tileSettings: tileSettings,
				itemSettings: itemSettings
			}
		);
		supr(this, 'init', arguments);

		new ButtonView({
			superview: this,
			x: GC.app.baseWidth - 160,
			y: 20,
			width: 180,
			height: 80,
			title: 'Menu',
			style: 'BLUE',
			on: {
				up: bind(this, 'publish', 'Menu')
			}
		});
	};
});