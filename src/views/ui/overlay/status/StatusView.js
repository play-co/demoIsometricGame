import animate;

import ui.View as View;
import ui.ImageView as ImageView;
import ui.ImageScaleView as ImageScaleView;
import ui.ScoreView as ScoreView;

import src.settings.editorSettings as editorSettings;

import .StatusTextView;
import .StatusTimeView;

var items = [
		{
			icon: 'resources/images/ui/calloutIconCoin.png',
			text: '',
			width: 226,
			ctor: StatusTextView
		},
		{
			icon: 'resources/images/ui/calloutIconTime.png',
			text: 0,
			width: 312,
			ctor: StatusTimeView
		},
		{
			icon: 'resources/images/ui/calloutIconPop.png',
			text: 0,
			width: 221,
			ctor: StatusTextView
		}
	];

exports = Class(View, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				x: 0,
				y: GC.app.baseHeight - 70,
				width: GC.app.baseWidth,
				height: 70,
				blockEvents: true
			}
		);

		supr(this, 'init', [opts]);


		this._items = [];

		var width = 0;
		for (var i = 0, j = items.length - 1; i <= j; i++) {
			width += items[i].width;
		}

		var x = (GC.app.baseWidth - width) * 0.5;
		for (var i = 0, j = items.length - 1; i <= j; i++) {
			var item = items[i];
			this._items.push(new item.ctor({
				superview: this,
				textVisible: item.textVisible,
				text: item.text,
				icon: item.icon,
				x: x,
				width: item.width,
				side: (i === 0) ? 0 : ((i === j) ? 2 : 1),
			}));
			x += item.width;
		}

		this._price = 0;
	};

	this.reset = function () {
		var i = this._items.length;
		while (i) {
			var item = this._items[--i];
			item.setText ? item.setText(item.text) : item.setTime(0);
		}
	};

	this.hide = function () {
		animate(this).
			then({y: GC.app.baseHeight}, 300).
			then(bind(this, function () { this.style.visible = false; }));

		this.emit('Hide');
	};

	this.show = function (view, gridTile, info) {
		if (this.style.visible) {
			return;
		}
		this.style.y = GC.app.baseHeight;
		this.style.visible = true;

		animate(this).
			wait(150).
			then({y: GC.app.baseHeight - 70}, 300);
	};

	this.onRevenue = function (revenue) {
		this._items[0].setText(revenue);
	};

	this.onTimeElapsed = function (timeElapsed) {
		this._items[1].setTime(timeElapsed);
	};

	this.onPeople = function (people) {
		this._items[2].setText(people);
	};
});