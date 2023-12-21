import {Card, CardUI} from './Card.js'
import Game from './Game.js';
import './Table.css'
import Button from "../Components/Button.js";

let game = new Game()
game.load()
let card = game.draw()

function Table() {
	
	return <>
	<div className="Table">
		<div className="Deck">
		<div className="DeckLabel"><span>Deal</span></div>
			<CardUI faceup={false} />
			<CardUI faceup={false} style={{top:"5px", left: "5px"}} />
			<CardUI faceup={false} style={{top:"10px", left: "10px"}} />
			
		</div>
		
		<div className="Hand Dealer"> 
			<CardUI faceup={false} />
			<CardUI faceup={false} />
			<span className="HandLabel">Dealer</span>
		</div>
		
		<div className="Hand Player"> 
			<span className="HandLabel">Player</span>
			<CardUI faceup={false} />
			<CardUI faceup={false} />
		</div>
		
		<div className="Actions">
			<Button>Hit</Button>
			<Button>Stay</Button>
		</div>
	</div>
	</>
}

export default Table