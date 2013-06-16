import ui.View as View;
import ui.ImageView as ImageView;
import ui.ImageScaleView as ImageScaleView;

import ..MiniButtonView;

exports = Class(ImageView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				y: 0,
				width: 220,
				height: 110
			}
		);
		supr(this, 'init', [opts]);

		this.type = opts.type;

		new MiniButtonView({
			superview: this,
			x: 20 - 8,
			y: 8 - 8,
			up: opts.up,
			down: opts.down,
			icon: opts.image
		}).on('Click', bind(this, 'emit', 'Click'));

		new ImageScaleView({
			superview: this,
			x: 84 - 2,
			y: 23 - 2,
			width: 130 + 6,
			height: 40 + 6,
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

		this._bar = new ImageScaleView({
			superview: this,
			x: 84,
			y: 23,
			width: 130,
			height: 40,
			image: opts.up,
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
	};

	this.update = function (value, maxValue, image) {
		if (value > 0) {
			this._bar.style.width = 20 + (110 * value / maxValue);
			this._bar.style.visible = true;
		} else {
			this._bar.style.visible = false;
		}
		image && this.setImage(image);
		this.style.visible = true;
	};
});