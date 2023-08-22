var Game = function(config) {
	config = config || {};
	config.containerId = config.containerId || 'TicTacContainer';
	config.infoPanelId = config.infoPanelId || 'header';
	var container = document.getElementById(config.containerId);
	var infoPanel = document.getElementById(config.infoPanelId);

	var squares = [];
	var players = [];
	var turn = 0;

	var checkGame = function() {
		
	}
	
	var sConfig = {
		click : function(event) {
			if (this.setState(players[turn])) {
				checkGame();
				turn = (turn + 1) % 2;
			}

		}
	};
	// Initialize Game board
	for (var x = 0; x < 3; x++) {
		var row = [];
		var rowDiv = document.createElement('div');
		rowDiv.setAttribute('class', 'row');
		for (var y = 0; y < 3; y++) {
			sConfig.parent = rowDiv;
			sConfig.x = x;
			sConfig.y = y;
			var s = new Square(sConfig);
			row.push(s);
		}
		container.appendChild(rowDiv);
		squares.push(row);
	}

	// Initialize players
	var player1 = new Player({
		character : 'X'
	});
	var player2 = new Player({
		character : 'O'
	});
	players.push(player1);
	players.push(player2);
	return {
		getPlayer : function(index) {
			return players[index];
		}
	}
};

var Square = function(config) {
	var x = config.x || 0;
	var y = config.y || 0;
	config.parent = config.parent || document;

	var div = document.createElement('div');
	var styleClass = 'square ';
	if ((x + y) % 2 == 0) {
		styleClass += "even";
	} else {
		styleClass += "odd";
	}
	div.setAttribute('class', styleClass);
	var _state = {
		x : x,
		y : y,
		state : 0
	};
	div.state = function() {
		return {
			x : _state.x,
			y : _state.y,
			state : _state.state,
		}
	}

	if (config.click) {
		div.addEventListener('click', config.click);
	}
	config.parent.appendChild(div);

	div.setState = function(player) {
		if (_state.state == 0) {
			div.classList.add('disabled', player.state().character);
			_state.state = player.value();
			return true;
		}
		return false;
	};
	// this.X = function() {
	// return x;
	// }
	// this.Y = function() {
	// return y;
	// }
	// this.html = function() {
	// return div;
	// }
	return this;
}

var Player = function(config) {
	if (!config || !config.character) {
		throw 'character is required in player config';
	} else if (config.character.toUpperCase() != 'X'
			&& config.character.toUpperCase() != 'O') {
		throw 'character must be an "X" or an "O"';
	}
	var character = config.character;
	var value = character == 'X' ? 1 : -1;

	var state = {
		name : config.name || character.toUpperCase(),
		value : value,
		character : character.toUpperCase()
	};

	this.value = function() {
		return value;
	}

	this.state = function() {
		return {
			name : state.name,
			value : state.value,
			character : state.character
		}
	}
}
