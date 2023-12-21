import './Card.css';


class Card {
	constructor(rank, suit) {
		this.rank = rank;
		this.suit = suit;
	}
}

class Suit {
	constructor(name, displayValue, color) {
		this.name = name;
		this.displayValue = displayValue;
		this.color = color;
	}
	
}
const Suits = [new Suit('Spade', '♠','Black'), new Suit('Club', '♣','Black'), new Suit('Diamond', '♦','Red'), new Suit('Heart', '♥','Red')]
const Ranks = ['2','3','4','5','6','7','8','9','10','J', 'Q', 'K', 'A']

function CardUI({card, faceup=true, style}) {
	let cardContent;
	let cardClass = "Card"
	if (faceup) {
		cardContent = <>
			<div className="Rank tl">
				{card.rank}
			</div>
			<div className="Rank br">
				{card.rank}
			</div>
			<div className="Suit">
				{card.suit.displayValue}
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