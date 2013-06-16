import ui.ScrollView as ScrollView;

import menus.views.TextDialogView as TextDialogView;

import isometric.views.minimap.GridMiniMapView as GridMiniMapView;

exports = Class(TextDialogView, function (supr) {
    this.init = function (opts) {
        delete opts.text; // Clear the text
 
        opts = merge(
            opts,
            {
                width: 740,
                height: GC.app.baseHeight - 44
            }
        );

        supr(this, 'init', [opts]);
 
        // Get the content from the superview and use it as a parent for a new view...
        var content = this._dialogView.content;
        var style = content.style;
        content.canHandleEvents(false);
        content.setImage('resources/images/ui/contentBorder.png');

        this._mapContent = new ScrollView({
            superview: content.getSuperview(),
            x: style.x + 1,
            y: style.y + 1,
            width: style.width - 2,
            height: style.height - 2,
            scrollX: true,
            scrollY: true,
            bounce: false,
            scrollBounds: {
                minX: 0,
                minY: 0,
                maxX: style.width * 4,
                maxY: style.width * 2
            }
        });

        this._gridMiniMapView = new GridMiniMapView({
            superview: this._mapContent,
            gridMiniMapBuffer: opts.gridMiniMapBuffer,
            x: 0,
            y: 0,
            width: style.width * 4,
            height: style.width * 2
        });

        style.zIndex = 10;
    };
});