Rectangle {
	property bool open;
	property Mixin hover: HoverMixin { cursor: "pointer"; }
	color: open ? "#F5F5F5" : "#FAF";
//	visible: !open;
	border.width: 1;
	border.color: "gray";
	transform.rotate: open ? 720 : 0;
	Behavior on width, height, x, y, transform, background { Animation { duration: 750; delay: parent.open ? 0 : 600; }}
	Behavior on visible { Animation { duration: 1000; delay: parent.open ? 0 : 600; }}
}