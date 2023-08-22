class ResizableBox {
	constructor(element) {
		this.element = element;
		
		createSizingBar('left');
		createSizingBar('right');
		createSizingBar('top');
		createSizingBar('bottom');
		createSizingCorner('nw');
		createSizingCorner('ne');
		createSizingCorner('sw');
		createSizingCorner('se');
		
		function createSizingBar(position) {
			let resizer = document.createElement('div');
			Styles.addClass(resizer,['resizer-bar',position]);
			element.appendChild(resizer);
			return resizer;
		}
		
		function createSizingCorner(position) {
			let resizer = document.createElement('div');
			position = 'corner-' + position;
			Styles.addClass(resizer,['resize-corner',position]);
			element.appendChild(resizer);
			return resizer;
		}
	}
}