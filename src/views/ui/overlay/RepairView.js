import animate;

import ui.View as View;
import ui.ImageView as ImageView;
import ui.ImageScaleView as ImageScaleView;
import ui.ScoreView as ScoreView;

import src.constants.characterConstants as characterConstants;

import menus.views.components.ButtonView as ButtonView;

import .MiniButtonView;

exports = Class(View, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				x: (GC.app.baseWidth - 386) * 0.5,
				y: GC.app.baseHeight,
				width: 600,
				height: 70,
				visible: false
			}
		);

		supr(this, 'init', [opts]);

		this._price = 0;
		this._gameModel = opts.gameModel;
		this._editorSettings = opts.editorSettings;

		var images = [
				{width: 150, image: 'resources/images/ui/uiBoxCapLeftLong.png'},
				{width: 86, image: 'resources/images/ui/uiBoxMidLong.png'},
				{width: 150, image: 'resources/images/ui/uiBoxCapRightLong.png'},
			];
		var x = 0;
		for (var i = 0; i < 3; i++) {
			new ImageView({
				superview: this,
				x: x,
				y: 0,
				width: images[i].width + 1,
				height: 110,
				image: images[i].image
			});
			x += images[i].width;
		}

		new ImageScaleView({
			superview: this,
			x: 35,
			y: 18,
			width: 226 - 41,
			height: 50,
			image: 'resources/images/ui/buttonBoxInset.png',
			scaleMethod: '9slice',
			sourceSlices: {
				horizontal: {left: 46, center: 16, right: 46},
				vertical: {top: 47, middle: 2, bottom: 47}
			},
			destSlices: {
				horizontal: {left: 20, right: 20},
				vertical: {top: 20, bottom: 20}
			}
		});

		this._icon = new ImageView({
			superview: this,
			x: 0,
			y: 4,
			width: 70,
			height: 70,
			image: 'resources/images/ui/calloutIconCoin.png'
		});
		this._text = new ScoreView({
			superview: this,
			x: 65,
			y: 22,
			width: 226 - 78,
			height: 44,
			characterData: characterConstants.white,
			text: '0',
			textAlign: 'right',
		});

		new MiniButtonView({
			superview: this,
			x: 220 + 20 - 8,
			y: 8 - 8,
			up: 'resources/images/ui/buttonBoxGreen.png',
			down: 'resources/images/ui/buttonBoxGreenDown.png',
			icon: 'resources/images/ui/iconConfirm.png'
		}).on('Click', bind(this, 'onOk'));
		new MiniButtonView({
			superview: this,
			x: 290 + 20 - 8,
			y: 8 - 8,
			up: 'resources/images/ui/buttonBoxRed.png',
			down: 'resources/images/ui/buttonBoxRedDown.png',
			icon: 'resources/images/ui/iconCancel.png'
		}).on('Click', bind(this, 'onCancel'));
	};

	this.onOk = function () {
		if (this._gameModel.getRevenue() >= this._price) {
			this._model.repair();
			this.hide();
			this.emit('Hide');
		} else {
			this.emit('Message', 'Insufficient funds.');
		}
	};

	this.onCancel = function () {
		this.hide();
		this.emit('Hide');
	};

	this.show = function (model) {
		this._model = model;
		var price = this._editorSettings[model.getModelType()].price;
		if (model.isBurned() || model.isBurning()) {
			price = (price * 0.8);
		} else {
			price = (price * 0.6);			
		}

		this._price = price;
		this._text.setText(price);

		if (!this.style.visible) {
			this.style.visible = true;
			animate(this).then({y: GC.app.baseHeight - 70}, 300);
		}
	};

	this.hide = function () {
		if (!this.style.visible) {
			return;
		}
		animate(this).
			then({y: GC.app.baseHeight}, 300).
			then(bind(this, function () { this.style.visible = false; }));
	};
});