import './Card.css';


class Card {
	constructor(rank, suit) {
		this.rank = rank;
		this.suit = suit;
	}
}

class Suit {
	constructor(name, label, color) {
		this.name = name;
		this.label = label;
		this.color = color;
	}
	
}
class Rank {
	constructor(label, value) {
		this.label = label
		this.value = value
	}
}

const Suits = [new Suit('Spade', '♠','Black'), new Suit('Club', '♣','Black'), new Suit('Diamond', '♦','Red'), new Suit('Heart', '♥','Red')]
const Ranks = [new Rank('2',2),new Rank('3',3),new Rank('4',4),new Rank('5',5),new Rank('6',6),new Rank('7',7),new Rank('8',8),new Rank('9',9),new Rank('10',10),new Rank('J',10), new Rank('Q',10), new Rank('K',10), new Rank('A',undefined)]

function CardUI({card, faceup=true, style}) {
	let cardContent;
	let cardClass = "Card"
	if (faceup) {
		cardContent = <>
			<div className="Rank tl">
				{card.rank.label}
			</div>
			<div className="Rank br">
				{card.rank.label}
			</div>
			<div className="Suit">
				{card.suit.label}
			</div>
		</>
		cardClass += " Color" + card.suit.color
	} else {
		cardContent = <>
			<div className="CardBack">
				
			</div>
		</>
	}
	
	return <>
	<div className="Card-Wrapper" style={style}>
		<div className={cardClass}>
			{cardContent}
		</div>
	</div>
	</>
}

export {Card, Suits, CardUI, Ranks};