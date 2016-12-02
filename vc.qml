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
			x: 70%; y: -50%;
		}
	}

	Letter {
		x: open ? 25% : 0%; 
		y: open ? 10% : 35%;
	}
}
