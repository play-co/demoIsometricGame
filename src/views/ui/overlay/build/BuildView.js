import animate;

import lib.Enum as Enum;

import ui.View as View;
import ui.ImageView as ImageView;
import ui.ImageScaleView as ImageScaleView;

import menus.views.components.BoxBorderView as BoxBorderView;
import menus.views.components.ButtonView as ButtonView;

var modes = Enum(
		'UNSELECTED',
		'SELECTED',
		'OPEN',
		'ANIMATING'
	);

exports = Class(View, function (supr) {
	this.init = function (opts) {
		var options = opts.options;
		var imageSize = opts.imageSize;

		this._imageSize = imageSize;

		opts = merge(
			opts,
			{
				x: -(options.length - 1) * imageSize,
				y: 0,
				width: options.length * imageSize,
				height: imageSize
			}
		);

		supr(this, 'init', [opts]);

		this._buildOptions = opts.buildOptions;
		this._options = opts.options;
		this._optionViews = [];
		this._mode = opts.active ? modes.SELECTED : modes.UNSELECTED;
		this._lastMode = this._mode;
		this._selected = false;
		this._valueView = opts.valueView;

		this._initImages();
	};

	this._initImages = function () {
		var options = this._options;
		var imageSize = this._imageSize;

		this._background = [];
		for (var i = 0, j = options.length - 1; i <= j; i++) {
			var image;
			if (this._mode === modes.SELECTED) {
				image = 'resources/images/ui/' + ((i === j) ? 'uiBoxCapRightSelected.png' : 'uiBoxMidSelected.png');
			} else {
				image = 'resources/images/ui/' + ((i === j) ? 'uiBoxCapRight.png' : 'uiBoxMid.png');
			}
			var background = new ImageView({
					superview: this,
					x: i * imageSize,
					y: 0,
					width: imageSize,
					height: imageSize,
					image: image,
					blockEvents: true
				});
			this._background.push(background);

			(bind(this, function (option) {
				var optionView = new ImageScaleView({
					superview: this,
					x: i * imageSize + 10,
					y: 8,
					width: imageSize - 25,
					height: imageSize - 25,
					image: option.image,
					scaleMethod: 'contain',
					zIndex: 100 + i
				});
				optionView.toString = function () {
					return ('00000' + (this.style.x | 0)).substr(-5);
				};

				optionView.price = option.price;
				optionView.onInputSelect = bind(this, 'onSelectItem', optionView);
				optionView.index = i;
				optionView.icon = option.icon;

				this._optionViews.push(optionView);
			}))(options[i], i);
		}
	};

	this.updateImages = function (active) {
		var background = this._background;
		for (var i = 0, j = background.length - 1; i <= j; i++) {
			var image;
			if (active) {
				image = 'resources/images/ui/' + ((i === j) ? 'uiBoxCapRightSelected.png' : 'uiBoxMidSelected.png');
			} else {
				image = 'resources/images/ui/' + ((i === j) ? 'uiBoxCapRight.png' : 'uiBoxMid.png');
			}
			background[i].setImage(image);
		}
	};

	this.onInputStart = this.onInputMove = function (evt) {
		evt.cancel();

		var index = (evt.srcPt.x / GC.app.scale / this._imageSize) | 0;
		var style = this._valueView.style;
		if (this._optionViews[index] && this._optionViews[index].price) {
			this._valueView.setText(this._optionViews[index].price);
			style.x = this.style.x + index * this._imageSize;
			style.y = this.style.y - 30;
			style.visible = true;
		} else {
			this._valueView.style.visible = false;
		}
	};

	this.onInputSelect = this.onInputOut = function (evt) {
		evt.cancel && evt.cancel();

		this._optionViews.sort();
		this._valueView.style.visible = false;
	};

	this.onSelectItem = function (optionView, evt) {
		evt && evt.cancel && evt.cancel();

		var options = this._options;
		var imageSize = this._imageSize;
		var tool = this._options[optionView.index].tool;

		switch (tool) {
			case 'cursor':
				this._buildOptions.emit('Cursor', optionView, tool);
				break;

			default:
				this._buildOptions.emit('Tool', optionView, tool);
				break;
		}

		switch (this._mode) {
			case modes.UNSELECTED:
				this.updateImages(true);
				this._mode = modes.SELECTED;
				this.emit('Select', this);
				break;

			case modes.SELECTED:
				animate(this).
					clear().
					then({x: 0}, 300).
					then(bind(this, '_setMode', modes.OPEN));

				this._setMode(modes.ANIMATING);
				break;

			case modes.OPEN:
				i = this._optionViews.length;
				while (i) {
					var animateOptionView = this._optionViews[--i];
					if (animateOptionView.style.x > optionView.style.x) {
						animate(animateOptionView).then({x: animateOptionView.style.x - imageSize}, 200);
					}
				}
				animate(optionView).then({x: (options.length - 1) * imageSize}, 200);

				animate(this).
					clear().
					wait(200).
					then({x: -(options.length - 1) * imageSize}, 300).
					then(bind(this, '_setMode', modes.SELECTED));

				this._setMode(modes.ANIMATING);
				break;
		}
	};

	this._setMode = function (mode) {
		if (this._mode !== modes.ANIMATING) {
			this._lastMode = this._mode;
		}
		this._mode = mode;
	};

	this.close = function (active) {
		if ((this._mode !== modes.UNSELECTED) && (this._mode !== modes.ANIMATING)) {
			this.updateImages(active);
			animate(this).
				clear().
				then({x: -(this._options.length - 1) * this._imageSize}, 300).
				then(bind(this, '_setMode', active ? modes.SELECTED : modes.UNSELECTED));

			this._setMode(modes.ANIMATING);
		}
	};

	this.reset = function () {
		this.onSelectItem(this._optionViews[0]);
	};

	this.hide = function (wait) {
		animate(this).
			clear().
			wait(wait || 0).
			then({x: -this._options.length * this._imageSize}, 300).
			then(bind(this, function () { this.style.visible = false; }));

		this._setMode(modes.ANIMATING);
	};

	this.show = function (wait) {
		this.style.x = -this._options.length * this._imageSize;
		this.style.visible = true;

		animate(this).
			clear().
			wait(wait || 0).
			then({x: -(this._options.length - 1) * this._imageSize}, 300).
			then(bind(this, '_setMode', this._lastMode));

		this._setMode(modes.ANIMATING);
	};
});