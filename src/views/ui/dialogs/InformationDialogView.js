import animate;

import ui.View as View;
import ui.ImageView as ImageView;
import ui.ScrollView as ScrollView;
import ui.ImageScaleView as ImageScaleView;
import ui.TextView as TextView;

import src.constants.gameConstants as gameConstants;

import menus.views.TextDialogView as TextDialogView;
import menus.views.components.ButtonView as ButtonView;
import menus.constants.menuConstants as menuConstants;

import isometric.views.minimap.GridMiniMapView as GridMiniMapView;

import .itemsData;

var itemCtor = {};

var ItemView = Class(View, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', [opts]);

		var map = GC.resources.getMap()[opts.icon];
		var top = 0;
		if (map) {
			top = map.marginTop * (100 / (map.marginLeft + map.w + map.marginRight)) * GC.app.scale;
		}

		new ImageScaleView({
			superview: this,
			x: 20,
			y: 5 - top,
			width: 100,
			height: 100,
			scaleMethod: 'contain',
			image: opts.icon
		});
		new TextView({
			superview: this,
			x: 140,
			y: 24,
			width: 300,
			height: 30,
			text: opts.title,
			size: 36,
			fontFamily: 'Adonais',
			color: '#000000',
			strokeWidth: 2,
			strokeColor: '#D0D0D0',
			horizontalAlign: 'left',
			autoSize: false,
			autoFontSize: false
		});

		new View({
			superview: this,
			x: 140,
			y: 60,
			width: opts.width - 160,
			height: 3,
			backgroundColor: '#E0E0E0'
		});

		if (opts.items) {
			new ButtonView({
				superview: this,
				x: opts.width - 70,
				y: 0,
				width: 55,
				height: 55,
				title: '',
				style: 'BLUE',
				icon: {
					x: 0,
					y: 0,
					width: 55,
					height: 55,
					image: 'resources/images/ui/buttonForward.png'
				},
				on: {
					up: bind(this, 'emit', 'ShowItems', opts)
				}
			});
		}
	};

	this.update = function () {
	};
});

var ItemDetailView = Class(View, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', arguments);

		var map = GC.resources.getMap()[opts.icon];
		var top = 0;
		if (map) {
			top = map.marginTop * (100 / (map.marginLeft + map.w + map.marginRight)) * GC.app.scale;
		}

		new ImageScaleView({
			superview: this,
			x: 20,
			y: 5 - top,
			width: 150,
			height: 150,
			scaleMethod: 'contain',
			verticalAlign: 'top',
			image: opts.icon
		});
		this._text = new TextView({
			superview: this,
			x: 190,
			y: 5,
			width: this.style.width - 210,
			height: 210,
			text: opts.title,
			autoSize: false,
			autoFontSize: false,
			wrap: true,
			size: opts.fontSize || 36,
			fontFamily: 'Adonais',
			color: opts.fontColor || '#000000',
			horizontalAlign: 'left',
			verticalAlign: 'top'
		});

		var y = 230;

		if (opts.taxValue && opts.states) {
			y = this._initTaxValue(y, opts.taxValue, opts.states);
		}

		if (opts.residents && opts.residents) {
			this._initResidents(y, opts.residents);
		}
		if (opts.needs && opts.needs.length) {
			y = this._initNeeds(y, opts.needs);
		}

		this.style.height = y + 20;
	};

	this._initTaxValue = function (y, taxValue, states) {
		y = this._addTitle(25, y, 'Tax value');

		for (var i = 0; i < states.length; i++) {
			var state = states[i];
			new ImageScaleView({
				superview: this,
				x: 25,
				y: y,
				width: 70,
				height: 70,
				image: state.image,
				scaleMethod: 'contain'
			});
			new TextView({
				superview: this,
				x: 120,
				y: y,
				width: this.style.width - 200,
				height: 70,
				text: state.name,
				autoSize: false,
				autoFontSize: false,
				wrap: true,
				size: 30,
				fontFamily: 'Adonais',
				color: '#000000',
				horizontalAlign: 'left',
				verticalAlign: 'middle'
			});
			new ImageView({
				superview: this,
				x: 380,
				y: y,
				width: 70,
				height: 70,
				image: 'resources/images/ui/calloutIconCoin.png'
			});
			new TextView({
				superview: this,
				x: 450,
				y: y,
				width: 40,
				height: 70,
				text: ((taxValue * state.value) | 0),
				autoSize: false,
				autoFontSize: false,
				wrap: true,
				size: 30,
				fontFamily: 'Adonais',
				color: '#000000',
				horizontalAlign: 'right',
				verticalAlign: 'middle'
			});
			y += 70;
		}

		return y + 40;
	};

	this._initNeeds = function (y, needs) {
		y = this._addTitle(25, y, 'Requirements');

		for (var i = 0; i < needs.length; i++) {
			var needsDetail = itemsData.needsDetails[needs[i]];
			new ImageView({
				superview: this,
				x: 25,
				y: y,
				width: 70,
				height: 70,
				image: needsDetail.image
			});
			new TextView({
				superview: this,
				x: 120,
				y: y,
				width: this.style.width - 200,
				height: 70,
				text: needsDetail.description,
				autoSize: false,
				autoFontSize: false,
				wrap: true,
				size: 30,
				fontFamily: 'Adonais',
				color: '#000000',
				horizontalAlign: 'left',
				verticalAlign: 'middle'
			});
			y += 70;
		}

		return y;
	};

	this._initResidents = function (y, residents) {
		var count = 0;
		for (var i = 0; i < residents.length; i++) {
			count += residents[i].count;
		}
		y = this._addTitle(350, y, 'Resident' + (count > 1 ? 's' : ''));

		for (var i = 0; i < residents.length; i++) {
			var resident = residents[i];
			var residentsDetail = itemsData.residentsDetails[resident.type];
			new ImageView({
				superview: this,
				x: 350,
				y: y,
				width: 36,
				height: 72,
				image: residentsDetail.image
			});
			new ImageView({
				superview: this,
				x: 380,
				y: y,
				width: 70,
				height: 70,
				image: residentsDetail.icon
			});
			new TextView({
				superview: this,
				x: 450,
				y: y,
				width: this.style.width - 200,
				height: 70,
				text: resident.count + ' ' + ((resident.count === 1) ? residentsDetail.one : residentsDetail.more),
				autoSize: false,
				autoFontSize: false,
				wrap: true,
				size: 30,
				fontFamily: 'Adonais',
				color: '#000000',
				horizontalAlign: 'left',
				verticalAlign: 'middle'
			});
			y += 70;
		}

		return y;
	};

	this._addTitle = function (x, y, title) {
		new TextView({
			superview: this,
			x: x,
			y: y,
			width: this.style.width - 210,
			height: 36,
			text: title,
			autoSize: false,
			autoFontSize: false,
			wrap: true,
			size: 36,
			fontFamily: 'Adonais',
			color: '#000000',
			strokeWidth: 2,
			strokeColor: '#D0D0D0',
			horizontalAlign: 'left'
		});
		y += 40;

		if (x === 25) {
			new View({
				superview: this,
				x: 25,
				y: y,
				width: this._opts.width - 45,
				height: 3,
				backgroundColor: '#E0E0E0'
			});
		}
		y += 6;

		return y;
	};

	this.update = function () {
		var opts =this._opts;

		this._text.setText(opts.description);
	};
});

var ItemsView = Class(ScrollView, function (supr) {
	this.init = function (opts) {
		opts = merge(
			opts,
			{
				scrollX: false,
				scrollY: true,
				bounce: false,
				visible: false
			}
		);

		supr(this, 'init', [opts]);

		var y = 20;

		if (opts.parentItems) {
			new ButtonView({
				superview: this,
				x: 20,
				y: y,
				width: 55,
				height: 55,
				title: '',
				style: 'BLUE',
				icon: {
					x: 0,
					y: 0,
					width: 55,
					height: 55,
					image: 'resources/images/ui/buttonBack.png'
				},
				on: {
					up: bind(this, 'onBack')
				}
			});
			this.title = new TextView({
				superview: this,
				x: 90,
				y: y,
				width: 300,
				height: 45,
				text: 'Title',
				size: 40,
				fontFamily: 'Adonais',
				color: '#000000',
				strokeWidth: 2,
				strokeColor: '#D0D0D0',
				horizontalAlign: 'left',
				autoSize: false,
				autoFontSize: false
			});

			new View({
				superview: this,
				x: 25,
				y: 80,
				width: opts.width - 45,
				height: 3,
				backgroundColor: '#E0E0E0'
			});

			y += 85;
		}

		var items = opts.items;
		this._items = [];
		for (var i = 0; i < items.length; i++) {
			var ctor = itemCtor[items[i].ctor];
			var item = new ctor(
				merge(
					items[i],
					{
						superview: this,
						x: 0,
						y: y,
						width: opts.width,
						height: 110
					}
				)
			).on('ShowItems', bind(this, 'onShowItems'));
			this._items.push(item);
			y += item.style.height;
		}

		this.setScrollBounds({minX: 0, minY: 0, maxX: 0, maxY: 20 + y});

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.items) {
				item.view = new ItemsView(
					merge(
						{
							superview: this._superview,
							parentItems: this,
							x: this.style.width,
							y: this.style.y,
							width: this.style.width,
							height: this.style.height,
						},
						item
					)
				);
			}
		}
	};

	this.onBack = function () {
		var parentItems = this._opts.parentItems;

		parentItems.style.visible = true;

		animate(this).
			then({x: this.style.width}, 300).
			then(bind(this, function () { this.style.visible = false; }));

		parentItems.update();
		parentItems.style.x = -this.style.width;
		parentItems.style.visible = true;
		animate(parentItems).
			then({x: 0}, 300);
	};

	this.onShowItems = function (item) {
		animate(this).
			then({x: -this.style.width}, 300).
			then(bind(this, function () { this.style.visible = false; }));

		item.view.update();
		item.view.style.x = this.style.width;
		item.view.style.visible = true;
		animate(item.view).
			then({x: 0}, 300);
	};

	this.update = function () {
		var items = this._items;
		var i = items.length;

		this.title && this.title.setText(this._opts.title);

		while (i) {
			items[--i].update();
		}
	};
});

exports = Class(TextDialogView, function (supr) {
	this.init = function (opts) {
		delete opts.text; // Clear the text

		opts = merge(
			opts,
			{
				width: 740,
				height: GC.app.baseHeight - 44,
				closeCB: bind(this, 'hide'),
				backCB: bind(this, 'hide')
			}
		);

		supr(this, 'init', [opts]);

		this._gridModel = opts.gridModel;
		this._editorSettings = opts.editorSettings;

		// Get the content from the superview and use it as a parent for a new view...
		var content = this._dialogView.content;
		var style = content.style;
		content.canHandleEvents(false);
		content.setImage('resources/images/ui/contentBorder.png');

		this._background = new View({
			superview: this._dialogView,
			x: style.x + 1,
			y: style.y + 1,
			width: style.width - 2,
			height: style.height - 2,
			backgroundColor: '#FFFFFF',
			clip: true
		});
		this._background.setMaxListeners(30);

		itemCtor['ItemView'] = ItemView;
		itemCtor['ItemDetailView'] = ItemDetailView;

		this._items = new ItemsView({
			superview: this._background,
			x: 0,
			y: 0,
			width: style.width - 2,
			height: style.height - 2,
			items: itemsData
		});

        style.zIndex = 10;
	};

	this.reset = function () {
	};

	this.findType = function (items, type, ctor) {
		var i = items.length;
		while (i) {
			var item = items[--i];
			if ((item.type === type) && (item.ctor === ctor)) {
				return item;
			}
			if (item.items) {
				var result = this.findType(item.items, type, ctor);
				if (result) {
					return result;
				}
			}
		}

		return null;
	}

	this.show = function (type) {
		supr(this, 'show', arguments);

		var subviews = this._background.getSubviews();
		var i = subviews.length;
		while (i) {
			var subview = subviews[--i];
			if (subview instanceof ItemsView) {
				subview.style.visible = false;
			}
		}

		var modelsByType = this._gridModel.getStaticModels().getModelsByType();
		for (var i in modelsByType) {
			var models = modelsByType[i];
			var count = models.length;
		}

		var item = this.findType(itemsData, type, 'ItemDetailView');
		if (item) {
			if (item.view) {
				item.view.update();
				item.view.style.x = 0;
				item.view.style.visible = true;
			} else if (item.superview) {
				item.superview.update();
				item.superview.style.x = 0;
				item.superview.style.visible = true;
			}
		} else {
			this._items.style.x = 0;
			this._items.style.visible = true;
		}
	};

	this.showBackButton = function () {
		var titleSubviews = this._dialogView.title.getSubviews();
		if (titleSubviews[1]) {
			titleSubviews[1].style.visible = true;
		}
		if (titleSubviews[2]) {
			titleSubviews[2].style.visible = false;
		}
	};

	this.showCloseButton = function () {
		var titleSubviews = this._dialogView.title.getSubviews();
		if (titleSubviews[1]) {
			titleSubviews[1].style.visible = false;
		}
		if (titleSubviews[2]) {
			titleSubviews[2].style.visible = true;
		}
	};
});