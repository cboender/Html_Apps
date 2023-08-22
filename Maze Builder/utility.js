const Util = {
	addClass(elem, className) {
		let classList = elem.classList;
		
		if (className instanceof Array){
			className.forEach(name => classList.add(name));
			
			return;
		}
		classList.add(className);
	},
	removeClass(elem, className) {
		let classList = elem.classList;
		
		if (className instanceof Array){
			className.forEach(name => classList.remove(name));
			
			return;
		}
		classList.remove(className);
	},
	
	randomInt(max) {
		return Math.floor(Math.random() * max);
	},
	
	addCellStyle(cell, style,value) {
		cell.cell.style[style] = value;
		//cell.cell.style = style;
		//cell.cell.style = elemStyle + style;
	},
	removeCellStyle(cell, style) {
		cell.cell.style[style] = '';
	},
	
	addCellStyleClass(cell, className) {
		this.addClass(cell.cell, className);

	}
}