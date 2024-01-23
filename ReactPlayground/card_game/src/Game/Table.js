import {Component} from 'react';
import './Table.css'
import Button from "../Components/Button.js";
import {Hand, HandUI} from './Hand.js';
import {DeckUI} from './Deck.js'


class Table extends Component {
	constructor(props) {
		super(props)
		this.game = props["game"]
		this.updateScoreboard = props["updateScoreboard"]
		this.state = {
			cardsDealt: false,
			roundOver: false,
		}
		this.deal = this.deal.bind(this)
		this.updateState = this.updateState.bind(this)
		this.hit = this.hit.bind(this)
		this.stay = this.stay.bind(this)
	}
	
	updateState(key, value) {
		let newState = {}
		newState[key] = value
		this.setState({...this.state,...newState})
	}
	
	updateRoundState(cardsDealt, roundOver) {
		let newState = { cardsDealt: cardsDealt, roundOver: roundOver}
		this.setState({...this.state,...newState})
	}
	
	componentDidMount() {
		this.hand = new Hand();
		this.dealer = new Hand(true);
		this.game.addHand(this.hand);
		this.game.addHand(this.dealer);
	}
	
	componentWillUnmount() {
		this.hand = undefined;
		this.dealer = undefined;
		this.game.reset()
	}
	
	deal() {
		this.updateRoundState(true,false)
		this.game.deal(() => { 
			this.forceUpdate()

		}, () => {
			this.updateRoundState(true,false)		
		})
		
	}
	
	triggerNotification(displayVal) {
		let resultUI = document.querySelector('.ResultNotification')
		function animEnd() {
			resultUI.removeEventListener('animationend',animEnd)
			resultUI.style['animation-name'] = ""
		}
		resultUI.addEventListener('animationend', animEnd)
		
		resultUI.querySelector('.NotificationText').innerText =displayVal
		resultUI.style['animation-name'] = "gameEnd"
	}
	
	hit() {
		let table = this
		function cardDealt() {
			if (table.game.checkHand(table.hand)) {
				table.roundOver()
				table.updateScoreboard()
				table.triggerNotification("BUST!")
			}
			table.forceUpdate()
			
		}
		
		this.game.dealCard(this.hand, cardDealt);
	}
	
	roundOver() {
		this.updateRoundState(false,true)
	}
	
	stay() {
		this.roundOver();
		this.game.finishRound(() => {
			this.forceUpdate()
		},
		(result) => {
			let resultText = "HUH?"
			switch(result) {
				case 0://Tie
					resultText = "DRAW"
					break;	
				case 1://Lose
					resultText = "YOU LOSE!"
					break;
				case 2: //Win
					resultText = "YOU WIN!"
					break;
			}
			this.triggerNotification(resultText);
			this.updateScoreboard()
		})
	}

	render() {
		let handTotal = 0;
		let dealerTotal = '?'
		if (this.hand) {
			handTotal = this.hand.total
		}
		if (this.dealer && this.state.roundOver) {
			dealerTotal = this.dealer.total
		}
		
		return <> 
			<div className="Table">
				<div className="DealerSection">
					<DeckUI onClick={this.deal} disabled={this.state.cardsDealt}/>
				
					<HandUI hand={this.dealer} showPartial={!this.state.roundOver} />
					
					<div className="HandTotal">
						<label>Dealer Total</label>
						<span>{dealerTotal}</span>
					</div>
				</div>
				<div className="PlayerSection">
				
					<HandUI hand={this.hand} />
						
					<div className="Actions">
						<div className="HandTotal">
							<label>Total</label>
							<span>{handTotal}</span>
						</div>
					
						<div >
							<Button onClick={this.hit} disabled={!this.state.cardsDealt}>Hit</Button>
							<Button onClick={this.stay} disabled={!this.state.cardsDealt}>Stay</Button>
						</div>
					</div>
				</div>
			</div>
			<div className="ResultNotification">
				<span className="NotificationText">DRAW</span>
			</div>
		</>
	}
}

export default Table