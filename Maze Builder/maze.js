class Maze {
	constructor(container, width, height, branchWeight) {
		this.width = width;
		this.height= height;
		this.container = container;
		
		this.defaultBranchWeight =branchWeight ?? .1;
		this.mazeData.branchWeight = this.defaultBranchWeight;
		container.style = `grid-template-columns: repeat(${this.width}, 1fr);`
	}
	
	createMaze() {
		this.createGrid();
		let startX = Util.randomInt(this.width);
		let startY = Util.randomInt(this.height);
		let cell = this.getCell(startX,startY);
		Util.addCellStyleClass(cell, 'startCell');
		this.mazeData.unexploredBranches.push(cell);
		let branches = [];
		let end = this.#pathFind(branches);
		if (branches.length > 0) {
			//Randomly select a branch
			let index = Util.randomInt(branches.length);
			//end = branches[index];
		}
		
		Util.addCellStyleClass(end, 'endCell');
		this.draw();
	}
	
	mazeData = {
		branchWeight: .1,
		branchCount: 1,
		unexploredBranches: [],
	}
	
	#pathFind(branches) {
		//Return the end as the first path
		let cell = this.mazeData.unexploredBranches.shift();

		let end = this.#exploreBranch(cell, undefined,false);
		branches.push(end);
		
		if (this.mazeData.unexploredBranches.length > 0) {
			let pe = this.#pathFind(branches);
			if (pe.position > end.position) {
				end = pe;
			}
		}
		return end;
	}
	
	#exploreBranch(cell, previousCell, explored) {
		cell.path = true;
		cell.visited = true;
	
		if (explored) {
			this.#startBranch(cell);
		}
		this.#removeEdges(cell);

		let next = this.#nextTile(cell.x,cell.y);
		if (!next) {
			return cell; // nothing left?
		}
		next.position = cell.position + 1;
		next.prevIndex = cell.index;
		
		this.#stylePathway(cell,next, previousCell, explored);
		
		return this.#exploreBranch(next, cell,true);
	}
	
	#stylePathway(cell, next, prevCell, explored) {				
		if (cell.x == next.x) {
			// The next cell is above or below the current one.
			if (cell.y > next.y) {
				//above
				Util.addCellStyleClass(cell,'pathTop');
				Util.addCellStyleClass(next,'pathBottom');
			} else {
				//Below
				Util.addCellStyleClass(next,'pathTop');
				Util.addCellStyleClass(cell,'pathBottom');
			}
		} else {
			// The next cell is left or right of the current one.
			if (cell.x > next.x) {
				//right
				Util.addCellStyleClass(cell,'pathLeft');
				Util.addCellStyleClass(next,'pathRight');
			} else {
				//left
				Util.addCellStyleClass(next,'pathLeft');
				Util.addCellStyleClass(cell,'pathRight');
			}
		}
	}

	#startBranch(cell) {
		//Should there be a branch?
		if (cell.position != 0) {
			//Never branch off starting position
			if ((Math.random()) <= this.mazeData.branchWeight) {
				this.mazeData.branchWeight = (this.defaultBranchWeight / this.mazeData.branchCount);
				this.mazeData.unexploredBranches.push(cell);
			} else {
				this.mazeData.branchWeight += (Math.random() * .25);
			}
		}
	}
	
	#removeEdges(cell) {
		if (cell.x == 0) {
			Util.addClass(cell.cell, 'leftEdge');
		} else if (cell.x == this.width - 1) {
			Util.addClass(cell.cell, 'rightEdge');
		}
		if (cell.y == 0) {
			Util.addClass(cell.cell, 'topEdge');
		} else if (cell.y == this.height - 1) {
			Util.addClass(cell.cell, 'bottomEdge');
		}
	}
	
	#nextTile(x,y) {
		let tileList = this.#createTileList(x,y, (cell) => {return !cell.visited;});

		if (tileList.length == 0) {
			return false;
		}
		return tileList[Util.randomInt(tileList.length)];
	}
	
	#createTileList(x,y, filter) {
		let tileList = [];
		
		function addCell(maze,x,y) {
			if (x >=0 && x < maze.width && y >= 0 && y < maze.height) {
				let cell = maze.getCell(x,y);
				if (filter(cell)) {
					tileList.push(cell);
				}
			}
		}
		addCell(this,x+1,y);
		addCell(this,x-1,y);
		addCell(this,x,y+1);
		addCell(this,x,y-1);
		
		return tileList;
	}

	createGrid() {
		let cells = [];
		let i = 0;
		for (let y =0; y < this.height; y++) {
			for (let x =0; x < this.width; x++) {
				cells.push(new Cell(container,x,y, i++));
			}
		}
		this.cells = cells;	
	}
	
	draw() {
		this.container.replaceChildren();
		this.cells.forEach(cell => cell.draw());
	}

	getCell(x,y) {
		let index = (y * this.height) + x;
		return this.cells[index];
	}
}

class Cell {
	constructor(container, x, y, index) {
		this.container = container;
		//this.type = 'empty';
		//this.direction = 'up';
		this.x = x;
		this.y = y;
		this.index = index;
		this.visited=false;
		this.path=false;
		this.prevIndex = -1;
		this.position = 0;
		this.cell = document.createElement("div");
	}
	
	draw() {
		this.container.appendChild(this.cell);
		Util.addClass(this.cell,'cell');
		let pathClass = 'empty';
		if (this.path) {
			pathClass= 'path';
		}
		Util.addClass(this.cell, pathClass);

		return;
	}
}