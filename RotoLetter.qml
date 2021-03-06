Rectangle {
	property bool open;
	transform.rotate: open ? 720 : 0;
	width: open ? 50% : 5%;
	height: open ? 80% : 5%;
	color: "#FFF";
	clip: true;
	property Mixin hover: HoverMixin { cursor: "pointer"; }
	Behavior on transform, width, height, x, y { Animation { duration: 600; }}

	onClicked: { this.open = !this.open	}

	Text {
		text: "Речь идет о поправках в восьмой и девятый абзацы пп.2 п.2 ст.45 Налогового кодекса. Эти параграфы определяют, что недоимка может быть взыскана через суд с аффилированных структур компании-должника, если та переводила на них выручку, денежные средства или другие активы. В новой редакции статьи слово «организациям» заменено на слово «лицам». Фактически это значит, что налоговики теперь смогут взыскать неуплаченные налоги компании не только со связанных организаций, но и с аффилированных физлиц, например учредителей или акционеров, поясняет юрист BGP Litigation Денис Савин. Норма вступила в силу немедленно, со дня опубликования закона.Норма о взыскании налоговой задолженности с аффилированных организаций была введена в 2013 году для борьбы с распространенной практикой банкротства компаний, которым были предъявлены крупные претензии по результатам налоговых проверок, рассказывает юрист. Пока лазейка не была закрыта, бизнес не прекращался, а перевоплощался в новое юридическое лицо, куда переводились активы, персонал и контрактная база.";
		wrapMode: Text.WordWrap;
		transform.scaleX: parent.open ? 1 : 0.05;
		transform.scaleY: parent.open ? 1 : 0.05;
		width: parent.width;
		height: parent.height;
		opacity: parent.open ? 1 : 0;
		Behavior on transform, opacity { Animation { duration: 600; }}
	}
}