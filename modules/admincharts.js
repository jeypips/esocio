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
					},{
						label : labels[3],
						data : datas[3]
					},{
						label : labels[4],
						data : datas[4]
					},{
						label : labels[5],
						data : datas[5]
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
					// console.log(consolidated.Agoo['2017'].macro.parameters[1].items[0].description);
					//Pie graph data
					var pielabels = [consolidated.Agoo['2017'].macro.parameters[1].items[0].description,'Aringay'];
					var datas = [consolidated.Agoo['2017'].macro.parameters[1].items[0].item_value,'1'];
					var colors = ["#5fbeaa", "#6c85bd", "#34d3eb","#FF7F50", "	#ff9999", "	#DDA0DD"];
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