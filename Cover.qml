Rectangle {
	width: open ? context.width * 0.5 : context.width * 0.1;
	height: open ? context.height * 0.8 * 0.33 : context.height * 0.08;
	property bool open;
	property int idx: model.index;
	property Mixin hover: HoverMixin { cursor: "pointer"; }
	color: open ? "#F5F5F5" : coverColor;
	property Color coverColor: model.color;
	border.width: 1;
	border.color: "gray";
	transform.rotate: open ? 720 : (hover.value ? 20 : 0);
	z: open ? 5 : 0;
	transform.translateY: hover.value && !open ? -20 : 0;
	Behavior on width, height, x, y, transform, background { 
		Animation { 
			duration: 750; 
			delay: parent.open || parent.hover.value ? 0 : 600; 
			}
	}

	onXChanged: {
		log("onXChanged", this.idx, this.x)
	}

	remove: {
		this.parent.model.remove(this.idx);
	}
	Behavior on visible { Animation { duration: 1000; delay: parent.open ? 0 : 600; }}
}