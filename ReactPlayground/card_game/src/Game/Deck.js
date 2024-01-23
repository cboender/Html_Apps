import {Card, Suits, Ranks, CardUI} from './Card.js'
import './Deck.css'

class Deck {
	#cards = []
	#shuffledCards = []
	constructor() {
		let cards = []
		Suits.forEach (suit =>
			Ranks.forEach ( rank => 
				cards.push(new Card(rank, suit))
			)
		)
		this.#cards = cards;
	}
	
	shuffle() {
		let newDeck = [...this.#cards]
		for (let i = newDeck.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = newDeck[i];
			newDeck[i] = newDeck[j];
			newDeck[j] = temp;
	  }
	  this.#shuffledCards = newDeck
	}
	
	drawCard() {
		return this.#shuffledCards.pop();
	}
	
	hasCards(requested) {
		return this.#shuffledCards.length >= requested
	}
}

function DeckUI({onClick, disabled}) {
	let className = "Deck"
	if (disabled) {
		className += " disabled"
		onClick = undefined
	}
	return	<>
		<div id="Deck" className={className} onClick={onClick}>
			<div className="DeckLabel"><span>Deal</span></div>
			<CardUI faceup={false} />
			<CardUI faceup={false} style={{top:"5px", left: "5px"}} />
			<CardUI faceup={false} style={{top:"10px", left: "10px"}} />
		</div>	
	</>
}

export {DeckUI, Deck}