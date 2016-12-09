H2 { 
	text: " <span style='color: #EEEEEE'> Income: </span>" + _globals.controls.pure.format.currency(77895415.2223, 2) + "$";
	font.weight: 300;
	color: "#B2EBF2";
	property int colorNum;
	HoverMixin { cursor: "pointer"; }
	WheelMixin{}

	onWheel(e): {
		if (e.deltaY > 0)
			this.colorNum = (this.colorNum + 1) % 18
		else
			this.colorNum = (this.colorNum + 17) % 18
	} 

	onColorNumChanged: {
		var c = ["#B2EBF2", "#B2DFDB", "#B3E5FC", "#BBDEFB", "#FFCDD2", "#FCE4EC", "#E0F7FA", "#C8E6C9", "#E8F5E9", "#DCEDC8", "#F0F4C3", "#FFF9C4", "#FFF8E1", "#FFE0B2", "#FFF3E0", "#FBE9E7", "#FFCCBC", "#A5D6A7"];
		this.color = c[this.colorNum]
	}

	onClicked: {
		this.colorNum = (this.colorNum + 1) % 18
	}
}