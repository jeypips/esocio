angular.module('lineChart-module',[]).factory('lineChart',function() {
	
	function line() {
		
		var self = this;
		
		self.line = function(consolidated) {
			
			!function($) {
			"use strict";

			var ChartJs = function() {};

			ChartJs.prototype.respChart = function respChart(selector,type,data, options) {
				// get selector by context
				var ctx = selector.get(0).getContext("2d");
				// pointing parent container to make chart js inherit its width
				var container = $(selector).parent();

				// enable resizing matter
				$(window).resize( generateChart );

				// this function produce the responsive Chart JS
				function generateChart(){
					// make chart width fit with its container
					var ww = selector.attr('width', $(container).width() );
					switch(type){
						case 'Line':
							new Chart(ctx).Line(data, options);
							break;
					}
					// Initiate new chart or Redraw

				};
				// run function - render chart at first load
				generateChart();
			},
			//init
			ChartJs.prototype.init = function() {
				//creating lineChart
				var LineChart = {
					labels : ["2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025"],
					datasets : [
						{
							fillColor : "rgba(93, 156, 236, 0.5)",
							strokeColor : "rgba(93, 156, 236, 1)",
							pointColor : "rgba(93, 156, 236, 1)",
							pointStrokeColor : "#fff",
							data : [0,0,consolidated.Agoo['2017'].macro.parameters[1].items[0].item_value,92,50,53,46,55,22,44,55]
						},
						{
							fillColor : "rgba(95, 190, 170, 0.5)",
							strokeColor : "rgba(95, 190, 170, 1)",
							pointColor : "rgba(95, 190, 170, 1)",
							pointStrokeColor : "#fff",
							data : [0,0,30,60,29,25,12,22,20,30,60]
						}
						
					]
				};
				
				this.respChart($("#lineChart"),'Line',LineChart);
			},
			$.ChartJs = new ChartJs, $.ChartJs.Constructor = ChartJs

		}(window.jQuery),

		//initializing 
		function($) {
			"use strict";
			$.ChartJs.init()
		}(window.jQuery);			
					
				};
		
	};
	
	return new line();
	
});