angular.module('profile-module',['bootstrap-modal','bootstrap-growl','sector-data']).factory('form', function($compile,$timeout,$http,bootstrapModal,growl,sectors) {
	
	function form() {
		
		var self = this;
		
		var loading = '<div class="col-sm-offset-4 col-sm-8"><button type="button" class="btn btn-inverse" title="Loading" disabled><i class="fa fa-spin fa-refresh"></i>&nbsp; Please wait...</button></div>';
		
		self.data = function(scope) { // initialize data	
		
			scope.views.menu = false;			
			
			scope.controls = {
				ok: {
					btn: false,
					label: 'Save'
				},
				cancel: {
					btn: false,
					label: 'Cancel'
				},
			};

			scope.profile = {};
			scope.profile.profile_id = 0;
			scope.profile.sectors = {};			
			
			scope.profiles = []; // list

			scope.views.subMenu = 0;
			
			scope.subMenuList = {
				profile: false
			};	
			
			$http({
				method: 'POST',
				url: 'handlers/sector-list.php'
			}).then(function mySucces(response) {
				
				scope.sectors = response.data;
				
				angular.forEach(response.data, function(item,i) {
					scope.subMenuList[item.short_name] = false;
				});
				
			}, function myError(response) {
				
			});

			sectors.load(scope);
			
			$timeout(function() {
				console.log(scope.data.sectors);
			},1000);
			
		};

		function validate(scope,form) {
			
			var controls = scope.formHolder[form]['$$controls'];
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});

			return scope.formHolder[form]['$invalid'];
			
		};			
		
		function mode(scope,row) {
			
			if (row == null) {
				scope.controls.ok.label = 'Save';
				scope.controls.ok.btn = false;
				scope.controls.cancel.label = 'Cancel';
				scope.controls.cancel.btn = false;
			} else {
				scope.controls.ok.label = 'Update';
				scope.controls.ok.btn = true;
				scope.controls.cancel.label = 'Close';
				scope.controls.cancel.btn = false;				
			}
			
		};
		
		function sector(scope,form) {
			
			var sector = null;
			
			angular.forEach(scope.data.sectors, function(item,i) {
				
				if (form == item.shortname) sector = item;
				
			});
			
			return sector;
			
		};
		
		self.activateForm = function(scope,form,row) {

			if (scope.$id > 2) scope = scope.$parent;
		
			if (form != 'profile') {
				if (scope.profile.profile_id == 0) {
					growl.show('btn btn-danger',{from: 'top', amount: 55},'Please finish Basic Profile form before proceeding to other forms');
					return;
				};
			};
			
			angular.forEach(scope.subMenuList, function(item,i) {
				scope.subMenuList[i] = false;
			});
			
			scope.subMenuList[form] = true;

			scope.views.menu = true;			
			
			$('#x_content').html(loading);
			$('#x_content').load('forms/'+form+'.html',function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },200);
			});
			
			if (row != null) {

				if (scope.$id> 2) scope = scope.$parent;				
				
				switch (form) {
				
					case "profile":
					
						$http({
						  method: 'POST',
						  url: 'handlers/'+form+'-view.php',
						  data: {profile_id: row.profile_id, sector: form}
						}).then(function mySucces(response) {
							
							scope.profile = angular.copy(response.data);
							scope.profile.sectors = {};							
							
						}, function myError(response) {
							 
						  // error
							
						});					
					
					break;
					
					default:
					
						$http({
						  method: 'POST',
						  url: 'handlers/'+form+'-view.php',
						  data: {profile_id: row.profile_id, sector: form}
						}).then(function mySucces(response) {

							scope.profile.sectors = angular.copy(response.data);
							console.log(scope.profile.sectors);
							
						}, function myError(response) {
							 
						  // error
							
						});						
					
					break;
					
				}
				
			};
			
			$timeout(function() {
				mode(scope,row);
			}, 500);
			
			/* if (form != 'profile') {
				console.log(sector(scope,form));
				scope.profile.sectors[form] = angular.copy(sector(scope,form));
				console.log(scope.profile.sectors);
			}; */
			
		};
		
		self.edit = function(scope) {
			
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
		};
		
		self.save = function(scope,form) {
			
			if (validate(scope,form)) return;
			
			var url = null;
			
			switch (form) {
				
				case "profile":
				
					$http({
					  method: 'POST',
					  url: 'handlers/profile-save.php',
					  data: {profile: scope.profile}
					}).then(function mySucces(response) {
						
						if (scope.profile.profile_id == 0) {
							scope.profile = angular.copy(response.data);
							scope.profile.sectors = {};							
						};
						
					}, function myError(response) {
						 
					  // error
						
					});					
				
				break;
				
				default:
					
					$http({
					  method: 'POST',
					  url: 'handlers/'+form+'-save.php',
					  data: scope.profile
					}).then(function mySucces(response) {
						
					}, function myError(response) {
						 
					  // error
						
					});	
					
				break;		
				
			}
			
			mode(scope,scope.profile);			
			
		};		
		
		self.delete = function(scope,row) {
			
			var onOk = function() {							
				
				$http({
				  method: 'POST',
				  url: 'handlers/profile-delete.php',
				  data: {profile_id: [row.profile_id]}
				}).then(function mySucces(response) {

					self.list(scope);
					
				}, function myError(response) {
					 
				  // error
					
				});

			};

			bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};	
		
		self.list = function(scope) {
			
			scope.views.menu = false;			
			
			// load list
			scope.mode = 'list';
			scope.profile = {};
			scope.profile.profile_id = 0;
			scope.profile.sectors = {};		
			$http({
			  method: 'POST',
			  url: 'handlers/profile-list.php',
			}).then(function mySucces(response) {
				
				scope.profiles = response.data;
				
			}, function myError(response) {
				 
			  // error
				
			});
			//

			$('#x_content').html(loading);
			$('#x_content').load('lists/profiles.html', function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#profile').DataTable({
						"ordering": false
					});	
				},200);
				
			});		
			
		};
		
		self.subMenu = function(scope) {			
				
			var off = '0px';
			var on = '240px';
			
			var tog = (scope.views.subMenu == 0)?on:off;
			scope.views.subMenu = (scope.views.subMenu == 0)?240:0;

			$("#sub-menu").animate({right: tog}, "fast");
			
		};
		
		self.print = function(scope,profile) {
			
			$http({
			  method: 'POST',
			  url: 'handlers/profile-sectors.php',
			  data: {profile_id: profile.profile_id}
			}).then(function mySucces(response) {
				
				print(scope,response.data);
				console.log(response.data);
				
			}, function myError(response) {
				 
			  // error
				
			});			
			
		};
		
		function print(scope,profile_sectors) {
			
			console.log(profile_sectors.profile.profile_year);
			
			var doc = new jsPDF();

			doc.setFontType('normal');
			doc.text(70, 50, 'SOCIO-ECONOMIC');
			doc.text(80, 60, 'PROFILE');
			doc.text(90, 70, 'OF');
			doc.text(80, 80, profile_sectors.profile.municipality);
			doc.text(80, 90, '');
			doc.text(90, 100, '');
			doc.addPage();
			doc.setFontSize(11)
		
			doc.text(75, 20, 'MUNICIPALITY:' + profile_sectors.profile.municipality);
			doc.setFontSize(11)
			doc.setFontSize(9)
			doc.text(20, 30, 'Location:' + profile_sectors.profile.location);			
			doc.text(20, 35, 'POLITICAL BOUNDARIES:');
			doc.text(30, 39, 'North:' + profile_sectors.profile.pb_north);
			doc.text(30, 44, 'South:' + profile_sectors.profile.pb_south);
			doc.text(110, 39, 'East:' + profile_sectors.profile.pb_east);
			doc.text(110, 44, 'West:' + profile_sectors.profile.pb_west);
			
			doc.text(20, 50, 'A. MACRO SECTOR:');
			doc.text(30, 55, 'PHYSICAL CHARACTERISTICS');
			doc.text(40, 59, 'Land Area:' +profile_sectors.macro.parameters[0].items[0].item_value);
			doc.text(110, 59, 'Climate:' +profile_sectors.macro.parameters[0].items[2].item_value);
			doc.text(40, 63, 'Terrain:' +profile_sectors.macro.parameters[0].items[1].item_value);
			doc.text(110, 63, 'Number of Barangays:' +profile_sectors.macro.parameters[0].items[3].item_value);
			doc.text(30, 68, 'DEMOGRAPHICS');
			doc.text(40, 72, 'Population:' +profile_sectors.macro.parameters[1].items[0].item_value);
			doc.text(40, 76, 'Growth Rate:' +profile_sectors.macro.parameters[1].items[1].item_value);
			doc.text(40, 80, 'Population Density:' +profile_sectors.macro.parameters[1].items[2].item_value);
			doc.text(40, 84, 'Number of Households:' +profile_sectors.macro.parameters[1].items[3].item_value);
			doc.text(110, 72, 'Number of Families:' +profile_sectors.macro.parameters[1].items[4].item_value);
			doc.text(110, 76, 'Major Dialects/Languages:' +profile_sectors.macro.parameters[1].items[5].item_value);
			doc.text(110, 80, 'Religion:' +profile_sectors.macro.parameters[1].items[6].item_value);
			doc.text(110, 84, 'Literacy Rate:' +profile_sectors.macro.parameters[1].items[7].item_value);
			doc.text(20, 92, 'B. EMPLOYMENT AND DEVELOPMENT FINANCE:');
			doc.text(40, 96, 'Labor Force (No.):' +profile_sectors.employment.parameters[0].items[0].item_value);
			doc.text(40, 100, 'Employment Rate:' +profile_sectors.employment.parameters[0].items[1].item_value);
			doc.text(40, 104, 'Employment Distribution:');
			doc.text(50, 108, 'Agriculture:' +profile_sectors.employment.parameters[0].items[2].group_items[0].item_group_value);
			doc.text(50, 112, 'Industry:' +profile_sectors.employment.parameters[0].items[2].group_items[1].item_group_value);
			doc.text(50, 116, 'Services:' +profile_sectors.employment.parameters[0].items[2].group_items[2].item_group_value);
			doc.text(110, 96, 'Poverty Incidence:' +profile_sectors.employment.parameters[0].items[3].item_value);
			doc.text(110, 100, 'Magnitude of Poor Families:' +profile_sectors.employment.parameters[0].items[4].item_value);
			doc.text(110, 104, 'Magnitude of Poor Population:' +profile_sectors.employment.parameters[0].items[5].item_value);
			doc.text(110, 108, 'Classification:' +profile_sectors.employment.parameters[0].items[6].item_value);
			doc.text(110, 112, "Municipal Gov't Revenue:" +profile_sectors.employment.parameters[0].items[7].item_value);
			doc.text(110, 116, "Municipal Gov't Expenditures:" +profile_sectors.employment.parameters[0].items[8].item_value);
			doc.text(40, 121, 'EMPLOYMENT AND INCOME GENERATED BY COMMODITY');
			doc.text(20, 160, 'C.ENVIRONMENT SECTOR');
			doc.text(20, 164, 'Existing Land Use Distribution');
			doc.text(40, 168, 'Agricultural Areas:' +profile_sectors.environmental.parameters[0].items[0].item_value);
			doc.text(40, 172, 'Grassland/Shrubland Areas:' +profile_sectors.environmental.parameters[0].items[1].item_value);
			doc.text(40, 176, 'Forest/Wooded Areas:' +profile_sectors.environmental.parameters[0].items[2].item_value);
			doc.text(120, 168, 'Bareland Areas:' +profile_sectors.environmental.parameters[0].items[3].item_value);
			doc.text(120, 172, 'Wetland Areas:' +profile_sectors.environmental.parameters[0].items[4].item_value);
			doc.text(120, 176, 'Built-up Areas:' +profile_sectors.environmental.parameters[0].items[5].item_value);
			doc.text(20, 182, 'Land Classification');
			doc.text(40, 186, 'Certified A & D:' +profile_sectors.environmental.parameters[1].items[0].item_value);
			doc.text(40, 190, 'Public Forest Land:' +profile_sectors.environmental.parameters[1].items[1].item_value);
			doc.text(20, 194, 'Number of Barangays:' +profile_sectors.environmental.parameters[1].items[2].item_value);
			doc.text(60, 194, 'UPLAND:' +profile_sectors.environmental.parameters[1].items[3].item_value);
			doc.text(90, 194, 'LOWLAND:' +profile_sectors.environmental.parameters[1].items[4].item_value);
			doc.text(130, 194, 'COASTAL:' +profile_sectors.environmental.parameters[1].items[5].item_value);
			doc.text(160, 194, 'RIVERSIDE:' +profile_sectors.environmental.parameters[1].items[6].item_value);
			doc.text(20, 198, 'Length of RIVERBANKS:' +profile_sectors.environmental.parameters[1].items[9].item_value);
			doc.text(130, 198, 'SEASHORES:' +profile_sectors.environmental.parameters[1].items[10].item_value);
			doc.text(20, 202, 'Number of Sawmills:' +profile_sectors.environmental.parameters[1].items[7].item_value);
			doc.text(20, 206, 'Number of Lumber Dealers:' +profile_sectors.environmental.parameters[1].items[8].item_value);
			doc.text(40, 211, 'LIST OF WATER BODIES');
			doc.text(20, 250, 'D. AGRICULTURE SECTOR');
			doc.addPage();
			doc.text(20, 100, 'E. INFRASTRUCTURE AND UTILITIES SECTOR');
			doc.text(30, 105, 'Road Network (total lineal meters');
			doc.text(40, 110, 'Barangay Road');
			doc.text(50, 115, 'Concrete:');
			doc.text(80, 115, 'Asphalt:');
			doc.text(110, 115, 'Gravel:');
			doc.text(140, 115, 'Earthfill:');
			doc.text(40, 120, 'Municipal Road');
			doc.text(50, 125, 'Concrete:');
			doc.text(80, 125, 'Asphalt:');
			doc.text(110, 125, 'Gravel:');
			doc.text(140, 125, 'Earthfill:');
			doc.text(40, 130, 'Provincial Road');
			doc.text(50, 135, 'Concrete:');
			doc.text(80, 135, 'Asphalt:');
			doc.text(110, 135, 'Gravel:');
			doc.text(140, 135, 'Earthfill:');
			doc.text(40, 140, 'National Road');
			doc.text(50, 145, 'Concrete:');
			doc.text(80, 145, 'Asphalt:');
			doc.text(110, 145, 'Gravel:');
			doc.text(140, 145, 'Earthfill:');
			doc.text(30, 157, 'Bridges');
			
			doc.text(40, 162, 'Barangay Bridges');
			doc.text(50, 167, '(Total Number of Span)');
			doc.text(50, 172, 'Steel:');
			doc.text(70, 172, 'Concrete:');
			doc.text(90, 172, 'Composite:');
			doc.text(110, 172, 'Jumbo:');
			doc.text(130, 172, 'Bailey:');
			doc.text(150, 172, 'Footbridge:');
			doc.text(50, 177, '(Total Length)');
			doc.text(50, 182, 'Steel:');
			doc.text(70, 182, 'Concrete:');
			doc.text(90, 182, 'Composite:');
			doc.text(110, 182, 'Jumbo:');
			doc.text(130, 182, 'Bailey:');
			doc.text(150, 182, 'Footbridge:');
			
			doc.text(40, 187, 'Municipal Bridges');
			doc.text(50, 192, '(Total Number of Span)');
			doc.text(50, 196, 'Steel:');
			doc.text(70, 196, 'Concrete:');
			doc.text(90, 196, 'Composite:');
			doc.text(110, 196, 'Jumbo:');
			doc.text(130, 196, 'Bailey:');
			doc.text(150, 196, 'Footbridge:');
			doc.text(50, 200, '(Total Length)');
			doc.text(50, 204, 'Steel:');
			doc.text(70, 204, 'Concrete:');
			doc.text(90, 204, 'Composite:');
			doc.text(110, 204, 'Jumbo:');
			doc.text(130, 204, 'Bailey:');
			doc.text(150, 204, 'Footbridge:');
			
			doc.text(40, 209, 'Provincial Bridges');
			doc.text(50, 214, '(Total Number of Span)');
			doc.text(50, 218, 'Steel:');
			doc.text(70, 218, 'Concrete:');
			doc.text(90, 218, 'Composite:');
			doc.text(110, 218, 'Jumbo:');
			doc.text(130, 218, 'Bailey:');
			doc.text(150, 218, 'Footbridge:');
			doc.text(50, 222, '(Total Length)');
			doc.text(50, 226, 'Steel:');
			doc.text(70, 226, 'Concrete:');
			doc.text(90, 226, 'Composite:');
			doc.text(110, 226, 'Jumbo:');
			doc.text(130, 226, 'Bailey:');
			doc.text(150, 226, 'Footbridge:');
			
			doc.text(40, 231, 'National Bridges');
			doc.text(50, 236, '(Total Number of Span)');
			doc.text(50, 240, 'Steel:');
			doc.text(70, 240, 'Concrete:');
			doc.text(90, 240, 'Composite:');
			doc.text(110, 240, 'Jumbo:');
			doc.text(130, 240, 'Bailey:');
			doc.text(150, 240, 'Footbridge:');
			doc.text(50, 244, '(Total Length)');
			doc.text(50, 248, 'Steel:');
			doc.text(70, 248, 'Concrete:');
			doc.text(90, 248, 'Composite:');
			doc.text(110, 248, 'Jumbo:');
			doc.text(130, 248, 'Bailey:');
			doc.text(150, 248, 'Footbridge:');
			
			doc.addPage();
			doc.output('dataurlnewwindow');
			// doc.save('p.pdf');
			
		};
		
	};
	
	return new form();
	
});