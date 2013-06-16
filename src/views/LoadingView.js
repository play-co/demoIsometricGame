import ui.View as View;
import ui.TextView as TextView;
import ui.ImageScaleView as ImageScaleView;

var instance = null;

var ProgressBarView = Class(View, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		this.style.x = this._superview.style.width * 0.5 - 150;
		this.style.y = this._superview.style.height - 70;
		this.style.width = 300;
		this.style.height = 50;
		this.style.visible = false;

		this._progress = 0;
	};

	this.render = function (ctx) {
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, 300, 50);

		ctx.fillStyle = 'rgb(255, 34, 160)';
		ctx.fillRect(8, 8, 284, 34);

		var x = this._progress * 284 / 100;

		ctx.fillStyle = 'rgb(65, 237, 91)';
		ctx.fillRect(8, 8, x, 34);

		ctx.fillStyle = 'rgb(236, 236, 236)';
		ctx.fillRect(x - 2, 8, 4, 34);
	};

	this.setProgress = function (progress) {
		this._progress = progress;
		this.style.visible = (progress > 0) && (progress < 100);
	};
});

exports = Class(ImageScaleView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				image: 'resources/images/splash.png',
				scaleMethod: 'cover'
			}
		);
		supr(this, 'init', [opts]);

		this._progressBarView = new ProgressBarView({superview: this});

		instance = this;
	};

	this.start = function () {
		this.style.visible = true;
	};

	this.setProgress = function (progress) {
		this._progressBarView.setProgress(progress);
	};
});

exports.get = function () {
	return instance;
};
