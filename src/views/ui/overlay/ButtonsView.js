import animate;

import ui.View as View;
import ui.ImageView as ImageView;

import menus.views.components.ButtonView as ButtonView;

import ui.ScoreView as ScoreView;

import src.constants.characterConstants as characterConstants;

var IconButtonView = Class(ButtonView, function (supr) {
	this.getIcon = function () {
		return this._icon;
	};
});

var ImageButtonView = Class(ImageView, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this._x = (opts.text ? 20 : 0);

		this._imageView = new ImageView({
			superview: this,
			x: 20 + this._x,
			y: 12,
			width: this.style.width - 25,
			height: this.style.height - 25,
			image: opts.icon
		});
		if (opts.text) {
			this.text = new ScoreView({
				superview: this,
				x: 20,
				y: 70,
				width: 70,
				height: 35,
				characterData: characterConstants.white,
				text: '',
				textAlign: 'left',
				blockEvents: true
			});
		}
	};

	this.onInputStart = function (evt) {
		this.setImage('resources/images/ui/uiBoxCapLeftSelected.png');
	};

	this.onInputOut = function (evt) {
		this.setImage('resources/images/ui/uiBoxCapLeft.png');
	};

	this.onInputSelect = function (evt) {
		this.setImage('resources/images/ui/uiBoxCapLeft.png');
		this.emit('Click');
	};

	this.getImageView = function () {
		return this._imageView;
	};
});

exports = Class(function () {
	this.init = function (opts) {
		var options = opts.options;
		var imageSize = (GC.app.baseHeight - 60 - (options.length - 1) * 40) / options.length;

		this._buttonViews = [];
		this._imageViews = [];
		this._imageSize = imageSize;

		for (var i = 0; i < options.length; i++) {
			var option = options[i];
			if (option) {
				var buttonView = new ImageButtonView({
					superview: opts.superview,
					x: GC.app.baseWidth - imageSize,
					y: 22 + i * (imageSize + 6),
					width: imageSize,
					height: imageSize,
					icon: option.icon,
					image: 'resources/images/ui/uiBoxCapLeft.png',
					visible: false,
					text: option.text
				}).on('Click', option.cb);

				this._buttonViews.push(buttonView);
			}
		}
	};

	this.hide = function () {
		var i = this._buttonViews.length;
		while (i) {
			(function (buttonView) {
				animate(buttonView).
					clear().
					wait((4 - i) * 50).
					then({x: GC.app.baseWidth}, 300).
					then(function () { buttonView.style.visible = false; });
			})(this._buttonViews[--i]);
		}
	};

	this.show = function () {
		var i = this._buttonViews.length;
		while (i) {
			var buttonView = this._buttonViews[--i];
			buttonView.style.x = GC.app.baseWidth;
			buttonView.style.visible = true;
			animate(buttonView).
				clear().
				wait((4 - i) * 50).
				then({x: GC.app.baseWidth - this._imageSize}, 300);
		}
	};

	this.getButtonView = function (index) {
		return this._buttonViews[index];
	};

	this.getImageView = function (index) {
		return this._buttonViews[index].getImageView();
	};
});