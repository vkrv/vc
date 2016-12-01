Item {
	anchors.fill: context;

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
			width: 22%; height: 70%;
			x: 1%; y: 42%;
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

	Rectangle {
		width: 80%;
		x: 10%;
		y: 50%;
		color: "#FFECB3";
		height: 50%;

		Image {
			source: "res/plant.png";
			fillMode: Image.PreserveAspectFit;
			width: 30%; height: 70%;
			x: parent.width - width - 30; y: -height/2;
		}
	}
}
