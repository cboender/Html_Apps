var TabComp = function(data) {
	if (!data || !data.parentId) {
		//Nothing to init
		return;
	}		
	var component = getElement(data.parentId);
	var $this = this;
	this.selectTab = function(tabname) {
		if (this.tabHead) {
			removeClass(this.tabHead,'selected');
			removeClass(this.tabPanel,'selected');		
		}
		this.tabHead = getElementByAttribute("targetTab",tabname,component);
		this.tabPanel = getElementByAttribute("tabName",tabname,component);
		addClass(this.tabHead,'selected');
		addClass(this.tabPanel,'selected');
	}
	this.selectTab(data.startingTab);
	var tabClick = function(){
		var targetTab = this.getAttribute("targettab");
		$this.selectTab(targetTab);
	}
	var tabs = component.getElementsByClassName("tabHead");
	for (tab of tabs) {
		tab.addEventListener("click", tabClick)
	}
}