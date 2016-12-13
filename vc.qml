Item {
	anchors.fill: context;
	clip: true;

	Rectangle {
		width: 100%;
		height: 30%;
		y: 70%;
		color: "#424242";
	}

	Rectangle {
		width: 100%; height: 70%;
		color: "#81C784";

	}

	Repeater {
		id: letterView;
		width: 100%;
		height: 100%;
		delegate: Cover {
			onClicked: {
				if (this.drag.moved)
					this.drag.moved = false;
				else {
					this.open = true; 
					ltr.show(this);
				}
			}
		}

		model: ListModel {
			update: {
				for ( var i = 0; i < 7; ++i) {
					this.append({
						x: i * 100,
						y: i * 0
					});
				}
			}

			onCompleted: {
				this.update();
			}
		}
	}


	Rectangle {
		width: 45%;
		height: 45%;
		border.width: 8;
		border.color: "#FAFAFA";
		radius: 5;
		x: 55%;
		property Mixin hover: HoverMixin {}

		ImageMixin {
			source: "res/sf.jpg";
			fillMode: Image.PreserveAspectCrop;
		}

		MaterialIcon {
			x: 100% - width - 10; 
			y: 10;
			icon: context.fullscreen ? "fullscreen_exit" : "fullscreen";
			size: 80;
			color: hover.value ? "#FFCDD2" : "white";
			visible: parent.hover.value;
			opacity: visible ? 1 : 0;
			Behavior on visible, opacity, color, font, x, y { Animation { duration: 400; }}

			property Mixin hover: HoverMixin { cursor: "pointer"; }
			onClicked: { context.fullscreen = !context.fullscreen }
		}
	}

	Image {
		source: "res/seat.svg";
		height: 40%; width: height;
		x: 80%;	y: 35%;
	}

	Rectangle { // Table
		width: 80%;
		x: 10%;
		y: 45%;
		color: "#FFECB3";
		height: 55%;
		transform.rotateX: 20;
		transform.perspective: 1000;
	}

	Rectangle {
		x: 5%; y: 5%;
		width: 40%; height: 40%;
		border.width: 12;
		radius: 2;
		border.color: "#8D6E63";
		ImageMixin { source: "res/chalkboard.jpg"; }

		ChalkText { x: 5; y: 5;	font.family: "Shadows Into Light"; }
		ChalkText { x: 5; y: 45;	font.family: "Reenie Beanie"; }
		ChalkText { x: 5; y: 85;	font.family: "Cabin Sketch"; }
		ChalkText { x: 5; y: 125;	font.family: "Chelsea Market"; }
		ChalkText { x: 5; y: 165;	font.family: "Coming Soon"; }
		ChalkText { x: 5; y: 205;	font.family: "Gloria Hallelujah"; }
		ChalkText { x: 5; y: 245;	font.family: "Kalam"; }
	}

	Image {
		source: "res/plant.png";
		fillMode: Image.PreserveAspectFit;
		width: height / 2; height: 20%;
		x: 50%; y: 50% - height;
		DragMixin { direction: DragMixin.Horizontal; }
	}

	Image {
		source: "res/comp4.png";
		fillMode: Image.PreserveAspectFit;
		width: height; height: 40%;
		x: 85% - width; y: 40%;
		DragMixin {}
		HoverMixin { cursor: "pointer"; }
	}

	Rectangle {
		id: dimmer;
		width: parent.width;
		height: parent.height;
		opacity: visible ? 0.3 : 0;
		color: "black";
		visible: ltr.open;
		z: 2;
		Behavior on opacity, visible { Animation { duration: 500; }}
	}

	Letter {
		id: ltr;
		x: 25%; 
		y: 10%;
		z: 10;
		onClicked: { this.close();}
	}
}
