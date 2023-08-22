let ReportBuilder = {
	init : function(config) {
		this.config = config;
		
		if (config.settingsPane) {
			new DraggableContainer(config.settingsPane);
		}

	},
	
}