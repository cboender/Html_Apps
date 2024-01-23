import {CardUI} from './Card.js'
import './Hand.css'

class Hand {
	cards = []
	total = 0
	constructor(dealer = false) {
		this.dealer = dealer
	}
	addCard (card) {
		this.cards.push(card)
	}
	card(index = 0) {
		return this.cards[index];
	}
	
	hasCards() {
		return this.cards.length > 0;
	}
	resetHand() {
		this.cards = []
		this.total = 0
	}
}

function HandUI({hand, showPartial}) {
		let phCards = <> 
			<CardUI faceup={false} />
			<CardUI faceup={false} />
		</>
		if (hand) {
			if (hand.hasCards()) {
				phCards = hand.cards.map((card,i) => <CardUI card={card} faceup={!showPartial || i==0} key={i} 	/> )
				if (hand.cards.length == 1) {
					phCards.push(<CardUI faceup={false} key="1" />)
				}
			}
		}
		
		return <>
			<div className="Hand"> 
				{phCards}
			</div>
		</>
}


export {Hand, HandUI}