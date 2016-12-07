Rectangle {
	property int shiftX;
	property int shiftY;
	x: open ? 25% : 15% + shiftX; 
	y: open ? 36.4% : 55% + shiftY;
	width: open ? context.width * 0.5 : context.width * 0.1;
	height: open ? context.height * 0.8 * 0.33 : context.height * 0.08;
	property bool open;
	property int idx: model.index;
	property Mixin hover: HoverMixin { cursor: "pointer"; }
	color: open ? "#F5F5F5" : coverColor;
	property Color coverColor;
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

	onCompleted: {
		log("onCompleted", this.idx)
		var c = ["#0091EA", "#689F38", "#00E676", "#00BFA5", "#00E5FF", "#0277BD", "#03A9F4", "#82B1FF", "#D1C4E9", "#FF5252", "#FF5722", "#FFD600", "#FF6D00", "#795548", "#FFEB3B", "#FFC107", "#2E7D32", "#CDDC39", "#84FFFF", "#01579B", "#C8E6C9", "#FFEB3B", "#FFECB3", "#D7CCC8", "#DD2C00", "#DD2C00", "#80DEEA", "#B39DDB", "#880E4F", "#FCE4EC", "#FF1744", "#B388FF", "#006064", "#B2FF59", "#E65100", "#FF7043", "#FF6F00"];

		this.shiftX = this.idx * 80;
		this.shiftY = this.idx * 20;
		this.coverColor = c[this.idx]

	}

	Text {
		anchors.centerIn: parent;
		text: parent.idx;
	}

	remove: {
		log ("going to remove", this.idx)
		this.parent.model.remove(this.idx);
	}
	Behavior on visible { Animation { duration: 1000; delay: parent.open ? 0 : 600; }}
}