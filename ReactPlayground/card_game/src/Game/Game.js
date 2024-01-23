import {Deck} from './Deck.js'

class Game {
	#hands = []
	#deck
	wins = 0
	loses = 0
	constructor() {
		this.#deck = new Deck()
	}
	
	addHand(hand) {
		this.#hands.push(hand)
	}
	
	dealCard(hand,cardDealt) {
		if (!hand) {
			return;
		}
		let game = this;
				
		function onfinish() {
			hand.addCard(game.#deck.drawCard())
			cardDealt()
		}
		
		this.#performDealAnimation(hand, onfinish)
	}
	
	#performDealAnimation(hand, onfinish) {
		let game = this
		let deckUI = document.getElementById('Deck')
		let topCard = deckUI.lastChild.cloneNode(true)
		topCard.classList.add("DeckAnimateHolder")
		deckUI.parentNode.parentNode.appendChild(topCard)
		let cardWidth = topCard.getBoundingClientRect().width
		
		
		let handPos;
		if (hand.dealer) {
			handPos = document.querySelector('.DealerSection').querySelector('.Hand').getBoundingClientRect()
		} else {
			handPos = document.querySelector('.PlayerSection').querySelector('.Hand').getBoundingClientRect()
		}
		
		let leftOffset = handPos.x
		leftOffset += (hand.cards.length * (cardWidth + 30))
		
		let frameArray = [
			{
				left: deckUI.getBoundingClientRect().x + 95 + "px", 
				top: deckUI.getBoundingClientRect().y + 10 + "px"
			},
			{
				left: leftOffset + "px", 
				top: handPos.y + "px"
			}
		]
		
		let frames = new KeyframeEffect(topCard,
			frameArray, 
			{
				duration: 300
			}
		)
		
		let anim = new Animation(frames)
		
		anim.onfinish = () => {
			deckUI.parentNode.parentNode.removeChild(topCard)
			onfinish()
		}
		
		anim.play()
	}
	
	deal(update, finish) {
		let deck = this.#deck;
		let game = this;
		
		let playerCount = game.#hands.length
		const cardsPerHand = 2
		let card = 0;
		let player = 0;
		
		function onfinish() {
			let hand = game.#hands[player]
			hand.addCard(deck.drawCard())
			update()
			player += 1;
			if (player >= playerCount) {
				player = 0
				card += 1
				if (card >= cardsPerHand) {
					game.#hands.forEach(hand => 
					{
						game.checkHand(hand)
					})
					finish()
					return true
				}
			}
			game.#performDealAnimation(game.#hands[player],onfinish)
			
			return false
		}
		
		this.#hands.forEach((hand) => {
			hand.resetHand()
		});
		update()
		deck.shuffle()
		
		game.#performDealAnimation(this.#hands[0],onfinish)
	}

	checkHand(hand) {
		if (!hand) {
			return
		}

		let total = 0;
		let aceCount = 0
		hand.cards.forEach((card, i) => {
			if (card.rank.value) {
				total += card.rank.value
			} else {
				if (card.rank.label == 'A') {
					aceCount += 1;
				}
			}
		});
		for (let i = 0; i<aceCount; i++) {
			if ((total + 11) <= 21) {
				total += 11
			} else {
				total += 1
			}
		}
		
		hand.total = total
		if (total > 21) {
			if (!hand.dealer) {
				this.loses += 1;
			}
			return true
		}
		
		return false
	}

	finishRound(updateTable, done) {
		const DEALER_THRESHOLD = 16
		
		let game = this;
		
		let dealerHand;
		this.#hands.forEach(hand => 
		{
			if(hand.dealer) {
				dealerHand = hand
			}
		})

		function calcDealerValue(hand, dealerDone) {
			let busted = false
			function dealerDealt() {
				busted = game.checkHand(hand)
				if (hand.total < DEALER_THRESHOLD) {
					game.dealCard(hand, () => {updateTable(); dealerDealt()})
				} else {
					if (busted) {
						dealerDone(0);
					} else {
						dealerDone(hand.total);
					}
				}
			}
			
			if (hand.total < DEALER_THRESHOLD) {
				game.dealCard(hand, () => {updateTable(); dealerDealt()})
			} else {
				dealerDone(hand.total)
			}
		}
		
		function determineWinner(dealerValue) {
			let playerValue = 0;
			let busted = false;
			
			game.#hands.forEach(hand => 
			{
				if(!hand.dealer) {
					if(game.checkHand(hand))
						playerValue = 0
					else 
						playerValue = hand.total
				}
			})
			// 0 = draw, 1 = lose, 2 = win
			let gameResult = 0;
			if (!busted) {
				if (playerValue > dealerValue) {
					game.wins += 1;
					gameResult = 2
				} else if (playerValue < dealerValue)  {
					game.loses += 1;
					gameResult = 1
				}
				
			}
			done(gameResult)
		}
		
		calcDealerValue(dealerHand,determineWinner)
	}
	
	reset() {
		this.#hands = []
		this.#deck.shuffle();
		this.wins = 0;
		this.loses = 0;
	}
}

export {Game}