import {Card, Suits, Ranks} from './Card.js'

function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
	  }
}

let deck = []

class Game {
	load() {
		
		Suits.forEach (suit =>
			Ranks.forEach ( rank => 
				deck.push(new Card(rank, suit))
			)
		)
		
		shuffleArray(deck)
	}
	
	draw() {
		return deck.pop()
	}
	
}

export default Game