angular.module('flots-module',[]).factory('flots',function() {
	
	function flots() {
		
		var self = this;
		
		self.pie = function(consolidated) {
			
			! function($) {
				"use strict";

				var FlotChart = function() {
					this.$body = $("body")
					this.$realData = []
				};

				//creates Pie Chart
				FlotChart.prototype.createPieGraph = function(selector, labels, datas, colors) {
					var data = [{
						label : labels[0],
						data : datas[0]
					}, {
						label : labels[1],
						data : datas[1]
					}, {
						label : labels[2],
						data : datas[2]
					}, {
						label : labels[3],
						data : datas[3]
					}, {
						label : labels[4],
						data : datas[4]							
					}, {
						label : labels[5],
						data : datas[5]
					}, {
						label : labels[6],
						data : datas[6]
					}, {
						label : labels[7],
						data : datas[7]
					}, {
						label : labels[8],
						data : datas[8]
					}, {
						label : labels[9],
						data : datas[9]							
					}, {
						label : labels[10],
						data : datas[10]
					}, {
						label : labels[11],
						data : datas[11]
					}, {
						label : labels[12],
						data : datas[12]
					}, {
						label : labels[13],
						data : datas[13]
					}, {
						label : labels[14],
						data : datas[14]							
					}, {
						label : labels[15],
						data : datas[16]
					}, {
						label : labels[16],
						data : datas[16]
					}, {
						label : labels[17],
						data : datas[17]
					}, {
						label : labels[18],
						data : datas[18]
					}, {
						label : labels[19],
						data : datas[19]							
					}];
					var options = {
						series : {
							pie : {
								show : true
							}
						},
						legend : {
							show : false
						},
						grid : {
							hoverable : true,
							clickable : true
							
						},
						colors : colors,
						tooltip : true,
						tooltipOpts : {

							content : "<span style='color: #000!important;'>%s, %p.0%</span>"

						}
					};

					$.plot($(selector), data, options);
				}

				//initializing various charts and components
				FlotChart.prototype.init = function() {

					//Pie graph data
					var pielabels = ['Agoo', 'Aringay', 'Bacnotan','Bagulin','Balaoan','Bangar', 'Bauang', 'Burgos','Caba','Luna','Naguilian','Pugo','Rosario','San Fernando','San Gabriel','San Juan','Santo Tomas','Santol','Sudipen','Tubao'];
					var datas = [consolidated.Agoo['2017'].macro.parameters[1].items[0].item_value,consolidated.Aringay['2017'].macro.parameters[1].items[0].item_value,consolidated.Bacnotan['2017'].macro.parameters[1].items[0].item_value,consolidated.Bagulin['2017'].macro.parameters[1].items[0].item_value,consolidated.Balaoan['2017'].macro.parameters[1].items[0].item_value,consolidated.Bangar['2017'].macro.parameters[1].items[0].item_value,consolidated.Bauang['2017'].macro.parameters[1].items[0].item_value,consolidated.Burgos['2017'].macro.parameters[1].items[0].item_value,consolidated.Caba['2017'].macro.parameters[1].items[0].item_value,consolidated.Luna['2017'].macro.parameters[1].items[0].item_value,consolidated.Naguilian['2017'].macro.parameters[1].items[0].item_value,consolidated.Pugo['2017'].macro.parameters[1].items[0].item_value,consolidated.Rosario['2017'].macro.parameters[1].items[0].item_value,consolidated['San Fernando']['2017'].macro.parameters[1].items[0].item_value,consolidated['San Gabriel']['2017'].macro.parameters[1].items[0].item_value,consolidated['San Juan']['2017'].macro.parameters[1].items[0].item_value,consolidated['Santo Tomas']['2017'].macro.parameters[1].items[0].item_value,consolidated.Santol['2017'].macro.parameters[1].items[0].item_value,consolidated.Sudipen['2017'].macro.parameters[1].items[0].item_value,consolidated.Tubao['2017'].macro.parameters[1].items[0].item_value];  
					var colors = ["#5fbeaa","#6c85bd","#34d3eb","#FF7F50", "#ff9999","#DDA0DD","#5fbeaa","#6c85bd","#34d3eb","#FF7F50", "#ff9999", "#DDA0DD","#5fbeaa","#6c85bd","#34d3eb","#FF7F50","#ff9999", "#DDA0DD","#5fbeaa", "#6c85bd"];
					this.createPieGraph("#pie-chart #pie-chart-container", pielabels, datas, colors);

				}

				//init flotchart
				$.FlotChart = new FlotChart, $.FlotChart.Constructor =
				FlotChart

			}(window.jQuery),

			//initializing flotchart
			function($) {
				"use strict";
				$.FlotChart.init()
			}(window.jQuery);			
			
		};
		
	};
	
	return new flots();
	
});