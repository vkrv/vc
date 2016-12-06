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

		Image {
			source: "res/seat.svg";
			height: 70%;
			width: height;
			y: 42%;
		}
	}

	Rectangle {
		width: 45%;
		height: 45%;
		border.width: 8;
		border.color: "#FAFAFA";
		radius: 5;
		x: 55%;

		ImageMixin {
			source: "res/sf.jpg";
			fillMode: Image.PreserveAspectCrop;
		}
	}

	Rectangle { // Table
		width: 80%;
		x: 10%;
		y: 50%;
		color: "#FFECB3";
		height: 50%;


		Image {
			source: "res/plant.png";
			fillMode: Image.PreserveAspectFit;
			width: height / 2; height: 30%;
			x: parent.width - width - 20; y: 20 - height;
			z: 1;
			DragMixin { direction: DragMixin.Horizontal; }
		}

		Image {
			source: "res/comp4.png";
			fillMode: Image.PreserveAspectFit;
			width: height; height: 50%;
			x: 50%;
			z: 1;
			DragMixin {}
			HoverMixin { cursor: "pointer"; }
		}
	}

	Repeater {
		id: letterView;
		width: 100%;
		height: 100%;
		delegate: Cover {
			x: open ? 25% : 15% + model.x; 
			y: open ? 36.4% : 55% + model.y;
			DragMixin {}
			onClicked: { this.remove();}
//			onClicked: { this.open = true; ltr.show(this);}
		}

		model: ListModel {
			update: {
				var c = ["#0091EA", "#689F38", "#00E676", "#00BFA5", "#00E5FF", "#0277BD", "#03A9F4", "#82B1FF", "#D1C4E9", "#FF5252", "#FF5722", "#FFD600", "#FF6D00", "#795548", "#FFEB3B", "#FFC107", "#2E7D32", "#CDDC39", "#84FFFF", "#01579B", "#C8E6C9", "#FFEB3B", "#FFECB3", "#D7CCC8", "#DD2C00", "#DD2C00", "#80DEEA", "#B39DDB", "#880E4F", "#FCE4EC", "#FF1744", "#B388FF", "#006064", "#B2FF59", "#E65100", "#FF7043", "#FF6F00"];

				for ( var i = 0; i < 7; ++i) {
					this.append({
						x: i * 100,
						y: i * 0,
						color: c[i]
					});
				}
			}

			onCompleted: {
				this.update();
			}
		}
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
