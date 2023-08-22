class Table {
	constructor(element) {
		this.columns = [];
		this.columnId = 0;
		Styles.addClass(element,'table');	
		
		new ResizableBox(element);

		this.tableBox = element;
	}

	addColumn(headerText) {
		let col = new Column(headerText, this.tableBox, this.columnId++)
		this.columns.push(col);

		//Render Column
		let colElem = document.createElement('div');
		Styles.addClass(colElem, ['column','fill']);
		let header = document.createElement('div');
		Styles.addClass(header, 'TableColumnHeader');
		header.innerHTML = headerText;

		colElem.appendChild(header);
		this.tableBox.appendChild(colElem);

		return col;
	}

	removeColumn(index) {
		console.log('TODO Remove Column');
	}
}

class Column {
	constructor(headerText, parentElem, columnId) {
		this.headerText = headerText;
		this.parentElem = parentElem;
		this.columnId = columnId;
	}
}