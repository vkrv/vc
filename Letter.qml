Item {
	id: letter;
	width: 50%;
	height: 80%;
	visible: open;
	property bool open;
	property Mixin hover: HoverMixin {}
	Behavior on visible { Animation { delay: letter.open ? 750 : 600; duration: 0; }}
	z: 1;

	show(inst): {
		this._coverInst = inst;
		this.open = true;
	}

	close: {
		this._coverInst.open = false;
		this.open = false;
	}

	remove: {
//		this._coverInst.open = false;
		this.open = false;
		this._coverInst.remove();
	}

	Item {
		transform.rotateX: letter.open ? 0 : -180;
		transform.perspective: 1000;
		width: 100%;
		height: 66%;
//		y: parent.open ? 0 : 33%;
		z: 2;
		Behavior on transform, y, z { Animation { duration: 400; delay: letter.open ? 1000 : 400; easing: "linear";}}

		Rectangle {
			width: 100%;
			height: 50%;
			border.width: 1; border.color: "gray";
			border.bottom.width: 1; border.bottom.color: "white";
			color: letter.open ? "#FFF" : "#F5F5F5";
			Behavior on background { Animation { duration: 0; delay: letter.open ? 1200 : 600; }}
			Text {
				width: 90%; height: 90%;
				x: 5%; y: 5%;
				clip: true;
				text: "Iranian President Hassan Rouhani has met with former Cuban leader Fidel Castro and his brother President Raul Castro during a one-day state visit in Havana. <br>Monday’s sit-down with Fidel Castro was an unusual encounter since Cuba’s 90-year-old retired president receives only a few people.";
				wrapMode: Text.WordWrap;
				opacity: letter.open ? 1 : 0;
				Behavior on opacity { Animation { duration: 0; delay: letter.open ? 1200 : 600; }}
			}
		}
	}

	Rectangle {
		width: 100%;
		height: 33%;
		y: 33%;
		color: "#FFF";
		border.width: 1; border.color: "gray";
		Text {
			width: 90%; height: 90%;
			x: 5%; y: 5%;
			clip: true;
			text: "Officials did not say where they talked, but photos appeared to show them inside Castro’s home. A government statement said the two leaders discussed the importance of food production and threats to world peace. <br>Rouhani met separately with Raul Castro, who took over leadership of Cuba’s government in 2006 after his brother fell ill. Officials did not comment on their discussions";
			wrapMode: Text.WordWrap;
		}
	}

	Item {
		transform.rotateX: letter.open ? 0 : 180;
		transform.perspective: 1000;
		width: 100%;
		height: 66%;
		y: 33%;
		z: letter.open ? 3 : 1;
		Behavior on transform, y, z { Animation { duration: 400; delay: letter.open ? 1400 : 0; easing: "linear"; }}

		Rectangle {
			y: 50%;
			width: 100%;
			height: 50%;
			border.width: 1; border.color: "gray";
			border.top.width: 1; border.top.color: "white";
			color: letter.open ? "#FFF" : "#F5F5F5";
			Behavior on background { Animation { duration: 0; delay: letter.open ? 1600 : 200; }}
			Text {
				width: 90%; height: 90%;
				x: 5%; y: 5%;
				clip: true;
				text: "Iran’s president came to Cuba after attending the Non-Aligned Movement summit in Venezuela, which is the island’s main commercial and political partner.";
				wrapMode: Text.WordWrap;
				opacity: letter.open ? 1 : 0;
				Behavior on opacity { Animation { duration: 0; delay: letter.open ? 1600 : 200; }}
			}

			Text {
				verticalAlignment: Text.AlignBottom;
				horizontalAlignment: Text.AlignRight;
				width: 90%; height: 90%;
				x: 5%; y: 5%;
				HoverMixin { cursor: "pointer"; }
				color: "red";
				text: "DELETE";

				onClicked: {
					log("DELETE onClicked")
					letter.remove();
				}
			}
		}
	}
}