const Styles = {
	addClass(elem, className) {
		let classList = elem.classList;
		
		if (className instanceof Array){
			className.forEach(name => classList.add(name));
			
			return;
		}
		classList.add(className);
	}
}