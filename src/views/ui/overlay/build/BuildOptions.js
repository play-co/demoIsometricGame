import device;

import event.Emitter as Emitter;

import ui.TextView as TextView;

import src.constants.characterConstants as characterConstants;

import .BuildView as BuildView;

var valueView = null;

exports = Class(Emitter, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		var options = opts.options;
		var imageSize = (GC.app.baseHeight - 60 - 3 * 40) / 4;

		this._buildViews = [];

		if (!valueView) {
			valueView = new TextView({
				superview: opts.superview,
				x: 0,
				y: 0,
				width: imageSize,
				height: 42,
				characterData: characterConstants.white,
				text: '0000',
				horizontalAlign: 'center',
				fontFamily: 'Adonais',
				size: 42,
				color: '#FFDD00',
				strokeColor: 'rgb(175, 70, 0)',
				strokeWidth: 10,
				blockEvents: true,
				autoSize: false,
				autoFontSize: false,
				zIndex: 100000,
				visible: false
			});
		}

		for (var i = 0; i < options.length; i++) {
			var buildView = new BuildView({
					buildOptions: this,
					superview: opts.superview,
					valueView: valueView,
					y: 22 + i * (imageSize + 6),
					imageSize: imageSize,
					options: options[i],
					active: i === 0,
					visible: false
				});

			buildView.on('Select', bind(this, 'onSelect'));
			this._buildViews.push(buildView);
		}

		this._selectedBuildView = this._buildViews[0];
	};

	this.onSelect = function (selectedBuildView, close) {
		if (selectedBuildView) {
			this._selectedBuildView = selectedBuildView;
		} else {
			selectedBuildView = this._selectedBuildView;
		}

		var i = this._buildViews.length;
		while (i) {
			var buildView = this._buildViews[--i];
			((buildView !== selectedBuildView) || close) && buildView.close(close);
		}
	};

	this.reset = function () {
		this._selectedBuildView = this._buildViews[0];
		this._selectedBuildView.reset();
	};

	this.hide = function () {
		for (var i = 0, j = this._buildViews.length; i < j; i++) {
			this._buildViews[i].hide((j - i) * 50);
		}
	};

	this.show = function () {
		for (var i = 0, j = this._buildViews.length; i < j; i++) {
			this._buildViews[i].show(i * 50);
		}
	};
});