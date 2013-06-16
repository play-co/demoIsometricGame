import ui.View as View;
import ui.ImageView as ImageView;
import ui.ImageScaleView as ImageScaleView;
import ui.ScoreView as ScoreView;

import src.constants.characterConstants as characterConstants;

exports = Class(ImageView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				image: [
					'resources/images/ui/uiBoxCapLeftLong.png',
					'resources/images/ui/uiBoxMidLong.png',
					'resources/images/ui/uiBoxCapRightLong.png'
				][opts.side],
				y: 0,
				height: 110
			}
		);
		supr(this, 'init', [opts]);

		var padding = (opts.side === 2) ? 20 : 0;

		new ImageScaleView({
			superview: this,
			x: 35,
			y: 18,
			width: this.style.width - 41 - padding,
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
			image: opts.icon
		});
		this._month = new ScoreView({
			superview: this,
			x: 65,
			y: 22,
			width: 70,
			height: 44,
			characterData: characterConstants.white,
			text: 'a',
			textAlign: 'left'
		});
		this._day = new ScoreView({
			superview: this,
			x: 65 + 70,
			y: 22,
			width: 75,
			height: 44,
			characterData: characterConstants.white,
			text: '1,',
			textAlign: 'right'
		});
		this._year = new ScoreView({
			superview: this,
			x: 65 + 70 + 80,
			y: 22,
			width: 80,
			height: 44,
			characterData: characterConstants.white,
			text: '00',
			textAlign: 'right'
		});
	};

	this.setTime = function (time) {
		this._day.setText((1 + (time % 30)) + ',');
		this._month.setText(String.fromCharCode(97 + ((time / 30) | 0) % 12));
		this._year.setText((time / 360) | 0);
	};

	this.setIcon = function (icon) {
		this._icon.setImage(icon);
	};
});