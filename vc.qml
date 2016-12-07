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
		y: 45%;
		color: "#FFECB3";
		height: 55%;
		transform.rotateX: 20;
		transform.perspective: 1000;

	}

	Image {
		source: "res/plant.png";
		fillMode: Image.PreserveAspectFit;
		width: height / 2; height: 20%;
		x: 50%; y: 50% - height;
		z: 1;
		DragMixin { direction: DragMixin.Horizontal; }
	}

	Image {
		source: "res/comp4.png";
		fillMode: Image.PreserveAspectFit;
		width: height; height: 25%;
		x: 60%; y: 50%;
		z: 1;
		DragMixin {}
		HoverMixin { cursor: "pointer"; }
	}

	Repeater {
		id: letterView;
		width: 100%;
		height: 100%;
		delegate: Cover {
			DragMixin {}
			onClicked: { this.open = true; ltr.show(this);}
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
