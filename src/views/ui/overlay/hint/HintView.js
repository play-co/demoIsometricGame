import animate;

import ui.View as View;
import ui.ImageScaleView as ImageScaleView;
import ui.TextView as TextView;

import ui.widget.ListView as ListView;
import ui.widget.CellView as CellView;

import squill.models.DataSource as GCDataSource;

import ..MiniButtonView;
import .hintTexts;

var MessageCell = Class(CellView, function (supr) {
	this.init = function (opts) {
		opts.width = GC.app.baseWidth - 320;
		opts.height = 30;

		supr(this, 'init', arguments);

		this._text = new TextView({
			superview: this,
			x: 10,
			y: 0,
			width: opts.width,
			height: 40,
			visible: true,
			autoSize: false,
			autoFontSize: false,
			size: 24,
			fontFamily: 'Adonais',
			color: '#FFDD00',
			strokeColor: 'rgb(175, 70, 0)',
			strokeWidth: 6,
			horizontalAlign: 'left',
			blockEvents: true
		});
	};

	this.setData = function (data) {
		this._data = data;
		this._text.setText(data.text);
	};
});

var MessageHistory = Class(ImageScaleView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				image: 'resources/images/ui/uiBoxStandalone.png',
				scaleMethod: '9slice',
				x: 140,
				y: 0,
				width: GC.app.baseWidth - 280,
				height: 300,
				sourceSlices: {
					horizontal: {left: 45, center: 10, right: 45},
					vertical: {top: 45, middle: 10, bottom: 45}
				},
				destSlices: {
					horizontal: {left: 45, right: 45},
					vertical: {top: 0, bottom: 45}
				}
			}
		);

		supr(this, 'init', [opts]);

		var inset = new ImageScaleView({
			superview: this,
			x: 20,
			y: 10,
			width: this.style.width - 40,
			height: this.style.height - 36,
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

		this._messageListView = new ListView({
			superview: inset,
			x: 10,
			y: 4,
			width: inset.style.width - 20,
			height: inset.style.height - 10,
			dataSource: opts.messages,
			selectable: 'single',
			scrollX: false,
			getCell: bind(this, 'getCell')
		});
	};

	this.getCell = function () {
		return new MessageCell({superview: this._messageListView, height: 40});
	};

	this.onCloseHistory = function () {
		this.emit('Hide');
		this.hide();
	};

	this.show = function () {
		if (!this.style.visible) {
			this.style.y = -this.style.height;
			this.style.visible = true;
			animate(this).then({y: 0}, 300);
		}
	};

	this.hide = function () {
		if (this.style.visible) {
			animate(this).
				then({y: -this.style.height}, 300).
				then(bind(this, function () { this.style.visible = false; }));
		}
	};
});

var MessageListView = Class(View, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				x: 0,
				y: 0,
				width: GC.app.baseWidth,
				height: 120
			}
		);

		supr(this, 'init', [opts]);

		this._text = [];
		for (var i = 0; i < 4; i++) {
			this._text.push(new TextView({
				superview: this,
				x: 145,
				y: i * 30,
				width: GC.app.baseWidth - 280,
				height: 40,
				visible: true,
				autoSize: false,
				autoFontSize: false,
				size: 28,
				fontFamily: 'Adonais',
				color: '#FFDD00',
				strokeColor: 'rgb(175, 70, 0)',
				strokeWidth: 8,
				horizontalAlign: 'left',
				blockEvents: true
			}));
		}

		this._index = 0;
		this._timeout = null;
	};

	this._removeMessage = function () {
		for (var i = 0; i < this._index - 1; i++) {
			var textView = this._text[i + 1];
			this._text[i].updateOpts({text: textView.getText(), color: textView._opts.color});
		}
		if (this._index) {
			var textView = this._text[this._index - 1];
			textView.updateOpts({text: '', color: '#FFDD00'});
		} else {
			this.style.visible = false;
		}
	};

	this.addMessage = function (text, color) {
		if ((this._index > 0) && (this._text[this._index - 1].getText() === text)) {
			return false;
		}

		color = color || '#FFDD00';

		var textView;
		if (this._index < 4) {
			var textView = this._text[this._index];
			textView.updateOpts({color: color});
			textView.setText(text);
			this._index++;
		} else {
			this._removeMessage();
			var textView = this._text[3];
			textView.updateOpts({color: color});
			textView.setText(text);
		}
		this._timeout && clearTimeout(this._timeout);
		this._timeout = setTimeout(bind(this, 'onRemoveMessage'), 2500);

		this.style.visible = true;

		return true;
	};

	this.onRemoveMessage = function () {
		this._removeMessage();
		if (this._index > 0) {
			this._index--;
			this._timeout = setTimeout(bind(this, 'onRemoveMessage'), 2500);
		}
	};

	this.show = function () {
		if (!this.style.visible) {
			this.style.y = -this.style.height;
			this.style.visible = true;
			animate(this).then({y: 0}, 300);
		}
	};

	this.hide = function () {
		if (this.style.visible) {
			animate(this).
				then({y: -this.style.height}, 300).
				then(bind(this, function () { this.style.visible = false; }));
		}
	};
});

exports = Class(View, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				x: 0,
				y: 0,
				width: GC.app.baseWidth,
				height: 300,
				canHandleEvents: false
			}
		);

		supr(this, 'init', arguments);

		this._messageIndex = 0;
		this._messages = new GCDataSource({
			key: 'index',
			sorter: function (data) { return data.index; }
		});

		this._mode = 0;

		this._messageListView = new MessageListView({
			superview: this,
			blockEvents: true
		});
		this._messageHistoryView = new MessageHistory({
			superview: this,
			messages: this._messages,
			visible: false
		}).on('Hide', bind(this, 'showMessages'));
	};

	this._addMessage = function (text, color) {
		if (this._messageListView.addMessage(text, color)) {
			this._messages.add({
				index: ('00000' + this._messageIndex).substr(-5),
				text: text
			});
			this._messageIndex++;
		}
	};

	this.hint = function (text, color) {
		if (typeof text === 'string') {
			this._addMessage(text, color);
		} else {
			var hintText = hintTexts.texts[text];
			if (hintText.once) {
				if (hintText.done) {
					return;
				}
				hintText.done = true;
			}
			if (hintText.texts) {
				var texts = hintText.texts;
				for (var i = 0; i < texts.length; i++) {
					this._addMessage(texts[i], color);
				}
			} else {
				this._addMessage(hintText.text);
			}
		}
	};

	this.showMessages = function () {
		if (this._mode === 0) {
			this._messageHistoryView.show();
			this._messageListView.hide();
			this._mode = 1;
		} else {
			this._messageHistoryView.hide();
			this._messageListView.show();
			this._mode = 0;
		}
	};

	this.hideHistory = function () {
		(this._mode === 1) && this.showMessages();
	};

	this.hide = function () {
		this.style.visible = false;
	};

	this.show = function () {
		this.style.visible = true;
	};
});