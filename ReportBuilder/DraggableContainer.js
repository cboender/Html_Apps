class DraggableContainer {
	constructor(component) {
		let draggables = component.getElementsByClassName('DragBar');

		if (draggables.length > 0) {
			Array.from(draggables).forEach((elem) => {elem.onmousedown = mouseDown});
		} else {
			component.onmousedown = mouseDown;
		}
		
		function mouseDown(e) {
			e = e || window.event;
			e.preventDefault();
			component.dragPosData = {
				x : e.clientX,
				y : e.clientY
			}
			document.addEventListener('mousemove', dragElement);
			document.addEventListener('mouseup', mouseUp);
		}
		
		function dragElement(e) {
			e = e || window.event;
			e.preventDefault();
			let x = component.dragPosData.x - e.clientX;
			let y = component.dragPosData.y - e.clientY;
			component.dragPosData.x = e.clientX;
			component.dragPosData.y = e.clientY;
			component.style.top = (component.offsetTop - y) + 'px';
			component.style.left = (component.offsetLeft - x) + 'px';
		}
		function mouseUp(e) {
			document.removeEventListener('mousemove', dragElement);
			document.removeEventListener('mouseup', mouseUp);
		}
	}
}
