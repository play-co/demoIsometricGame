import ui.ImageView as ImageView;

exports = Class(ImageView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				width: 60 + 8 * 2,
				height: 60 + 8 * 2,
				image: opts.up
			}
		);
		supr(this, 'init', [opts]);

		new ImageView({
			superview: this,
			x: 8,
			y: 8,
			width: 60,
			height: 60,
			image: opts.icon
		});		
	};

	this.onInputStart = function () {
		this.setImage(this._opts.down);
	};

	this.onInputSelect = function () {
		this.setImage(this._opts.image);
		this.emit('Click');
	};

	this.onInputOut = function () {
		this.setImage(this._opts.image);
	};
});