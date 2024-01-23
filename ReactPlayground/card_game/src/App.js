import {Component} from 'react';
import './App.css';
import Table from './Game/Table.js'
import {Game} from './Game/Game.js'

class Scoreboard extends Component {
	constructor(props) {
		super(props)
		this.game = props.game
	}
	
	render() {
		return (
		<div className="Scoreboard">
			<label>Wins</label>
			<span>{this.game.wins}</span>
			
			<label>Loses</label>
			<span>{this.game.loses}</span>
		</div>
		)
	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			game: new Game(),
		}
		this.updateScoreboard = this.updateScoreboard.bind(this)
	}
	
	updateScoreboard() {
		this.scoreboard.forceUpdate()		
	}
	
	render() {
		return  <>
			<div className="App-header">
				<Scoreboard game={this.state.game} ref={node => {
					this.scoreboard = node
				}} />
				<h1>21 - The Card Game</h1>	
			</div>
			<div className="App-body">
				<Table game={this.state.game} updateScoreboard={this.updateScoreboard} />
			</div>
		</>
	}
}

export default App;
