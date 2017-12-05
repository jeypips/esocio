angular.module('profile-module',['bootstrap-modal','bootstrap-growl','sector-data','bootstrap-growl']).factory('form', function($compile,$timeout,$http,bootstrapModal,growl,sectors,growl) {
	
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
			
			scope.municipalities = [];
			/*
			** municipalities
			*/
			$http({
				method: 'POST',
				url: 'handlers/municipalities.php'
			}).then(function mySucces(response) {
				
				scope.municipalities = angular.copy(response.data);
				
			}, function myError(response) {
				
			});	
			
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
			console.log(scope);
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
			
			mode(scope,row);
			
			$('#x_content').html(loading);
			$('#x_content').load('forms/'+form+'.html',function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },200);
			});
			
			if (row == null) { // add
				
				switch (form) {
					
					case "profile":
					
						$http({
						  method: 'POST',
						  url: 'handlers/profile-boundaries.php'
						}).then(function mySucces(response) {
							
							scope.profile.municipality = response.data.municipality;
							scope.profile.pb_north = response.data.pb_north;
							scope.profile.pb_east = response.data.pb_east;
							scope.profile.pb_south = response.data.pb_south;
							scope.profile.pb_west = response.data.pb_west;
							scope.profile.land_area = response.data.land_area;
							
						}, function myError(response) {
							 
						  // error
							
						});
					
					break;

				};
				
			};
			
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
					
					case "trade":
					
						$http({
						  method: 'POST',
						  url: 'handlers/'+form+'-view.php',
						  data: {profile_id: row.profile_id, sector: form}
						}).then(function mySucces(response) {
							response.data.trade.parameters[0].items[0].item_value = new Date(response.data.trade.parameters[0].items[0].item_value);
							response.data.trade.parameters[0].items[1].item_value = new Date(response.data.trade.parameters[0].items[1].item_value);
							scope.profile.sectors = angular.copy(response.data);
							
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
				
				var onOk = function (){
					
					$http({
					  method: 'POST',
					  url: 'handlers/profile-save.php',
					  data: {profile: scope.profile}
					}).then(function mySucces(response) {
												
						if (scope.profile.profile_id == 0) {
							scope.profile.profile_id = response.data.profile_id;
							scope.profile.sectors = {};
							growl.show('btn btn-success',{from: 'top', amount: 55},'New profile added');
						} else{
							growl.show('btn btn-success',{from: 'top', amount: 55},'Profile updated successfully');
						}
						
						mode(scope,scope.profile.sectors);
						
					}, function myError(response) {
						 
					  // error
						
					});
				
				};
				
				bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to save this record?',onOk,function() {});
				
				break;
				
				default:
					
				var onOk = function() {	
				
					$http({
					  method: 'POST',
					  url: 'handlers/'+form+'-save.php',
					  data: scope.profile
					}).then(function mySucces(response) {
						mode(scope,scope.profile);
						growl.show('btn btn-success',{from: 'top', amount: 55},' '+form+' successfully updated');
					}, function myError(response) {
						 
					  // error
						
					});	
				};
				
				bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to save this record?',onOk,function() {});
				
				break;		
				
			}
			
		};		
		
		self.delete = function(scope,row) {
			
			var onOk = function() {							
				
				$http({
				  method: 'POST',
				  url: 'handlers/profile-delete.php',
				  data: {profile_id: [row.profile_id]}
				}).then(function mySucces(response) {

					self.list(scope);
					growl.show('btn btn-danger',{from: 'top', amount: 55},'Profile deleted successfully');
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
				response.data.trade.parameters[0].items[0].item_value = new Date(response.data.trade.parameters[0].items[0].item_value);
				response.data.trade.parameters[0].items[1].item_value = new Date(response.data.trade.parameters[0].items[1].item_value);
			}, function myError(response) {
				 
			  // error
				
			});			
			
		};
			
		function print(scope,profile_sectors) {
		console.log(profile_sectors.profile.profile_year);						

		
			
			
			var columns = 
			// ["", "EMPLOYMENT AND INCOME GENERATED BY COMMODITY", ""],
			[profile_sectors.employment.parameters[1].items[0].description,profile_sectors.employment.parameters[1].items[1].description , profile_sectors.employment.parameters[1].items[2].description ]		   	
			
			var rows = [
			
            [profile_sectors.employment.parameters[1].items[0].item_value,profile_sectors.employment.parameters[1].items[1].item_value , profile_sectors.employment.parameters[1].items[2].item_value ]		   
			];	
			
			var WaterColumns = 
			// ["", "LIST OF WATER BODIES", ""],
			
			[profile_sectors.environmental.parameters[2].items[0].description,profile_sectors.environmental.parameters[2].items[1].description , profile_sectors.environmental.parameters[2].items[2].description ]		   
		
			var WaterRows = [
			
            [profile_sectors.environmental.parameters[2].items[0].item_value,profile_sectors.environmental.parameters[2].items[1].item_value , profile_sectors.environmental.parameters[2].items[2].item_value ]		   
			];
			

				var PlantColumns = 
			// ["", "Plants Food Sufficiency", ""],
			
			[profile_sectors.agriculture.parameters[0].items[0].description,profile_sectors.agriculture.parameters[0].items[1].description , profile_sectors.agriculture.parameters[0].items[2].description,profile_sectors.agriculture.parameters[0].items[3].description ]		   
		
			var PlantRows = [
           [profile_sectors.agriculture.parameters[0].rows[0].description,profile_sectors.agriculture.parameters[0].items[4].item_value,profile_sectors.agriculture.parameters[0].items[12].item_value , profile_sectors.agriculture.parameters[0].items[20].item_value ],		   
           [profile_sectors.agriculture.parameters[0].rows[1].description,profile_sectors.agriculture.parameters[0].items[5].item_value,profile_sectors.agriculture.parameters[0].items[13].item_value , profile_sectors.agriculture.parameters[0].items[21].item_value ],		   
           [profile_sectors.agriculture.parameters[0].rows[2].description,profile_sectors.agriculture.parameters[0].items[6].item_value,profile_sectors.agriculture.parameters[0].items[14].item_value , profile_sectors.agriculture.parameters[0].items[22].item_value ],		   
           [profile_sectors.agriculture.parameters[0].rows[3].description,profile_sectors.agriculture.parameters[0].items[7].item_value,profile_sectors.agriculture.parameters[0].items[15].item_value , profile_sectors.agriculture.parameters[0].items[23].item_value ],		   
           [profile_sectors.agriculture.parameters[0].rows[4].description,profile_sectors.agriculture.parameters[0].items[8].item_value,profile_sectors.agriculture.parameters[0].items[16].item_value , profile_sectors.agriculture.parameters[0].items[24].item_value ],		   
           [profile_sectors.agriculture.parameters[0].rows[5].description,profile_sectors.agriculture.parameters[0].items[9].item_value,profile_sectors.agriculture.parameters[0].items[17].item_value , profile_sectors.agriculture.parameters[0].items[25].item_value ],		   
           [profile_sectors.agriculture.parameters[0].rows[6].description,profile_sectors.agriculture.parameters[0].items[10].item_value,profile_sectors.agriculture.parameters[0].items[18].item_value , profile_sectors.agriculture.parameters[0].items[26].item_value ],		   
           [profile_sectors.agriculture.parameters[0].rows[7].description,profile_sectors.agriculture.parameters[0].items[11].item_value,profile_sectors.agriculture.parameters[0].items[19].item_value , profile_sectors.agriculture.parameters[0].items[27].item_value ]		   

			];
			
			var AnimalColumns = 
			// ["", "Plants Food Sufficiency", ""],
			
			[profile_sectors.agriculture.parameters[1].items[0].description,profile_sectors.agriculture.parameters[1].items[1].description , profile_sectors.agriculture.parameters[1].items[2].description]		   
		
			var AnimalRows = [
			
           [profile_sectors.agriculture.parameters[1].rows[0].description,profile_sectors.agriculture.parameters[1].items[3].item_value,profile_sectors.agriculture.parameters[1].items[8].item_value ],		   
           [profile_sectors.agriculture.parameters[1].rows[1].description,profile_sectors.agriculture.parameters[1].items[4].item_value,profile_sectors.agriculture.parameters[1].items[9].item_value ],		   
           [profile_sectors.agriculture.parameters[1].rows[2].description,profile_sectors.agriculture.parameters[1].items[5].item_value,profile_sectors.agriculture.parameters[1].items[10].item_value ],		   
           [profile_sectors.agriculture.parameters[1].rows[3].description,profile_sectors.agriculture.parameters[1].items[6].item_value,profile_sectors.agriculture.parameters[1].items[11].item_value ],		   
           [profile_sectors.agriculture.parameters[1].rows[4].description,profile_sectors.agriculture.parameters[1].items[7].item_value,profile_sectors.agriculture.parameters[1].items[12].item_value ]	   
           ];
			
			
			// You'll need to make your image into a Data URL
			// Use http://dataurl.net/#dataurlmaker
			var imgData = 'data:image/jpeg;base64,/9j/4Q2DRXhpZgAATU0AKgAAAAgABwESAAMAAAABAAEAAAEaAAUAAAABAAAAYgEbAAUAAAABAAAAagEoAAMAAAABAAIAAAExAAIAAAAeAAAAcgEyAAIAAAAUAAAAkIdpAAQAAAABAAAApAAAANAACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykAMjAxNzoxMDowNiAwOTowOTo0NAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAACZKADAAQAAAABAAAA2AAAAAAAAAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAEeARsABQAAAAEAAAEmASgAAwAAAAEAAgAAAgEABAAAAAEAAAEuAgIABAAAAAEAAAxNAAAAAAAAAEgAAAABAAAASAAAAAH/2P/tAAxBZG9iZV9DTQAB/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAOACgAwEiAAIRAQMRAf/dAAQACv/EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A9VSSQMrNxcOsWZNgraTDZ1JMbtrGNl73bRu9iSk6Sxz9ZsIemRTaW3ODKnTUN7i51LWNa64Wb32V2tZW5nqforf9FYtDGz8bKO2t0Wbd3puBa7af8I1rv5yr/h699L/zLE4xkNwpsJJJJqlJJJJKUkkkkpSSSSSlJJJJKUkkkkpSSqv6lhV1X3W2iurFdsue8FoDoa7b7wN+71GbPT+msmr68/V++4U02WWO9Rtbi2t21gdsa3ItefbXj+tazH3u/wAP9D6CdGE5gmMTIDqEEgbvQJJgQ4BzTIOoI4ITpqX/0PU3vaxjnvMNaCXHwAXDZfUBmPPUsiyyuhrmm22ouPo1OtbTS0CGtstrvbX+iZ6ldmR62Rb9p+xfs5dn1Cp92Bk1ViX2VPa0ebmlrV551NmXm4FmD05jrGuDHvpc1wudUy2/JqqqqLXevXjt6jjb7/Uf6+z18f16f0qeCY45ziLkNv4smGEZ5YRkaiT6u9R9XDH5fXL9D+u1L+qdWx+pV1VYrKnyPsuP69l77W3Nf61tWdVZT7s6xtVuM+p+D6n82ym79J6urgdRvDWnFY1tTL62kNsF72XFgYaKcqaW3/Z8PHbVTd6f2e9leXifrP6HMvwMTNxqMayi6wZWFjF1V+eHNe6h10epV03bttvw/wDyyey79f8AVv8AsX+EvzNTCpyan37xi0YHUbGNrexwNR9JpIysUh1LHYj/AFa8W3fZjeplZ9WHvpyVPnyZhLADy3tRyAnLL1HgyRj/ADVccuD9X7eaXu/rvc42aODB7fMfrhPJi/mqNQkOOHqH+dlLiyR/V/q/R/rMb3WTlZWT0G7IwJGW+h/obNSLYLW7PUa7/C/v1f8AW1jP6r9aMBtotxmvqpGTa992+yG1Nc+mqvKoqpqe3YyvJ9XIrp9b7R9g9mTiXWq8Me4/Vh9FDvsznDbWXOLAwb9n06rWu2OaP8Fl/wDB15X+GVX9h9VZlVvrzfVprdQ/c19jS0G7IsubjCzIvYyhjH4/qV5P2r7Vj+tiVWUfq/2etIUSB3aqSzqv1ifQ6tmM5tsb2ZDKHgFjTfus+zXvc6t7/Txf1N9v2h9dv0/+46/aH1kDDZ6B/SPAFhoc8MYWU+m5uCy2nI/Wbt36O3J/yf8AaLPtN/2fDsUK8XrONScjGaRkYzGuezIynOqybhNd2Ru3W+liNpfdYzeyl9tvoepjU/Y6k46f1Wt+QKMt9hqbVSGvyHOO02F92RY3f+iyWV7L2f6ev1cT6HpWUBTY6lldefmuw8Rhoqc+kC9tReRUX1HJyftLn/Z/zrsP7F6X2mv/AJQ9b0v0aa7K+sdedlOorGTRS53pYxq9P1A5uP8AZ2VZbrNnssfkOtu2bP8ABelX/OspXYnUjQxrarPVZcPtrzleoL3MryGvfTj/AGzDrrq3vrv2evh2eytn2X08WlWsurJvGOcdznh2MxmKK8j0/QvGr8m8Nvs+1V7bMdv087Z6fp/pqsy5JSn2/WTN6bhljRRlWXWC41l2O30hXf6Fj/teLmX436X7P+idj2e//Cel+jseu/6zNaabm+ofVhuQysMdsFmQx+5pfbU9ttdNFlfs/RU5H+Gt/Tp6+n9Qx+m5w9b1OoXS9ga97H62WPpZ6luRbW11m706/T+zV/4JFaOqv6q3qLnCjFraKbMGx/vbU5rrH5dnpXvw/V+0NZ/g3v8AstL/ANY/SvoSU0Hdf660urbQ0EPbSP0Ftrm2Cn13V/o7mfbXW2NsZ+h9D7B6P6x63qq1d1D6y11WWsxGEAlvpFr3uYd8vyN9b2uyaaKPoYtGP9oyf8FZ/gkLHxur5LsOl1z6fsba/Uubfv8AWLRYWZfp12b7sW2yuptjMj07LvVt/wBF6yFXidVvobbfvyPWDvSpozCBXa5te277SHs9TGqfXaz2Nstp/n6sO717PSSnT6RndZvyraeo4raWNqqeyytrtge5rfVqdbea32u9Tfs9LH/RV+zIs9ZBzOr9XtuLei4zcplZItL4aJaXte1r3XVN9/s9P/rnqqPTsTqdeYyrIyTdX+tOvPqy5r7LGfZ/0Mu/Q2UO9emv/tD/ADP81ZV6VHodl31ets6blt3Vud+hFddbXuHvH2r9C7bc26uh+2j9P1H9Hs9L+ZUeQkEDUA7yHRucnjjKOWdRyZMfCYYcl8OSJ/nJen9xsY+Lk9Tdk2ZNDqceux9rsWw7zZkt2sr120fqtLKK/wBF7/tXr/z3p1+nbnY+Pk9WysnD6zS1+A0OFb3NaNjCHVuOPe072t9He/Is9PF9Gx/2X30W7F0Ft3U7LnX9NNeRi2issebAWRWXnIbXtDvfkN20bv8AB/zirvPVcq/KxqLqb6q3uqyGvLHAB83Nq2srD2XV4ttNf6X1P/BPVU0MpAAAOg+aI+X1erJ/em1pgcUvSI2flPF6P6n+D/Xb3QQ0dD6eGN2M+zU7GEQWt2N2Mj+Q32q+sVzfrPsit1QeWkS6IHtOzbsb/Ob/AOd3b6/5n0/0frLaTTLiJNEWb1WVVP8A/9H1Vcv1joeXRkfbumjcGvbY1jd3qVkF+70Njtvu9e33ejk/9wLaLOm2W1s6hJOjMxOn1U+X3fVbo1L349WJi5A1Lb7jaywybtrXsozsZjH/AKGv1G1UYjK/tNX6D/BroukfVt1VlX2W24UV0sqGVa30rW1hu23CrqA9K3Gs9tu/0v6V+tfbMy5dckpsnN5cgqU5S/vyM0AAdETsah1LaCweizbtZ2GwtdX/AJrmNVLK6VgNx3bMYPAbsFbdwAa6KrHNZWd3tr9+xn856Vf+F9NaSSrpcP7HTdVaLumOaQ8Wekyxwa4udDXDb6bd/wCgrtsZ/N1/ov0n896ccnFtsdj+r0823NsqvHp2ubXXa8zkPl3s2sf9P06/fX6tn88/01vJJKcP7I6l4FXTJY4w2LiIDqmssdZ9L/S20+3/AEX/ABSDbhHbZVX0t7BTq17btHOcLGWNY0t/m7Wt9J9uz1NmVv8A0VnrfZ+iSSU4eZjVZjiLcG31LvTquLXETW8+lkMdY5uz0mY+1/6P9J+ls9L0r/VsTPxQH7x0t9oBcS71nT6lldzcj2WfTb7vszbv+7H+g/TV7qSSnIFLsakWYuK5mSH+m+rfY6sNAdZ/ObH76th9myr+c/Vf0X+CFi9KouPo2YTsSkS8gPnc4trZ+kPvdvr2/wCDt/nKPX97Lq1uJJKRMx6mWuuaCHv+lqY4a36E7G/QalfjY+TWasitttZ5a8Bw8PzkVJJIJBsGiOocXJ6fkdNxrX9Mssd61jn3McS902htfq1O+lupe31bPz7Gev8A4ZX+k4FfTem4+FWIbSwA+bj7rHH97c9zvcraSQ0jwj5buvFdkmZkSlrLbi6yHipJJJJY/wD/0vVUl8qpJKfqpJfKqSSn6qSXyqkkp+qkl8qpJKfqpJfKqSSn6qSXyqkkp+qkl8qpJKfqpJfKqSSn6qSXyqkkp+qkl8qpJKf/2f/tFY5QaG90b3Nob3AgMy4wADhCSU0EJQAAAAAAEAAAAAAAAAAAAAAAAAAAAAA4QklNBDoAAAAAAOUAAAAQAAAAAQAAAAAAC3ByaW50T3V0cHV0AAAABQAAAABQc3RTYm9vbAEAAAAASW50ZWVudW0AAAAASW50ZQAAAABDbHJtAAAAD3ByaW50U2l4dGVlbkJpdGJvb2wAAAAAC3ByaW50ZXJOYW1lVEVYVAAAAAEAAAAAAA9wcmludFByb29mU2V0dXBPYmpjAAAADABQAHIAbwBvAGYAIABTAGUAdAB1AHAAAAAAAApwcm9vZlNldHVwAAAAAQAAAABCbHRuZW51bQAAAAxidWlsdGluUHJvb2YAAAAJcHJvb2ZDTVlLADhCSU0EOwAAAAACLQAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAFwAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQABAEgAAAABAAE4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAHg4QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAE4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQAAAAAAAACAAM4QklNBAIAAAAAAA4AAAAAAAAAAAAAAAAAADhCSU0EMAAAAAAABwEBAQEBAQEAOEJJTQQtAAAAAAAGAAEAAAAFOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAA0kAAAAGAAAAAAAAAAAAAADYAAACZAAAAAoAVQBuAHQAaQB0AGwAZQBkAC0AMQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAACZAAAANgAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAANgAAAAAUmdodGxvbmcAAAJkAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAADYAAAAAFJnaHRsb25nAAACZAAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRhZ1RFWFQAAAABAAAAAAAOY2VsbFRleHRJc0hUTUxib29sAQAAAAhjZWxsVGV4dFRFWFQAAAAB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YmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE3LTEwLTA2VDA5OjA5OjQ0LTA3OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE3LTEwLTA2VDA5OjA5OjQ0LTA3OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxNy0xMC0wNlQwOTowOTo0NC0wNzowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpEOUNGMTkwQUFGQUFFNzExODQ1M0REMUNEN0UwMkZBOCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpEOENGMTkwQUFGQUFFNzExODQ1M0REMUNEN0UwMkZBOCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOkQ4Q0YxOTBBQUZBQUU3MTE4NDUzREQxQ0Q3RTAyRkE4IiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6RDhDRjE5MEFBRkFBRTcxMTg0NTNERDFDRDdFMDJGQTgiIHN0RXZ0OndoZW49IjIwMTctMTAtMDZUMDk6MDk6NDQtMDc6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpEOUNGMTkwQUFGQUFFNzExODQ1M0REMUNEN0UwMkZBOCIgc3RFdnQ6d2hlbj0iMjAxNy0xMC0wNlQwOTowOTo0NC0wNzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPC9yZGY6U2VxPiA8L3htcE1NOkhpc3Rvcnk+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDw/eHBhY2tldCBlbmQ9InciPz7/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCIFhZWiAHzgACAAkABgAxAABhY3NwTVNGVAAAAABJRUMgc1JHQgAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLUhQICAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABFjcHJ0AAABUAAAADNkZXNjAAABhAAAAGx3dHB0AAAB8AAAABRia3B0AAACBAAAABRyWFlaAAACGAAAABRnWFlaAAACLAAAABRiWFlaAAACQAAAABRkbW5kAAACVAAAAHBkbWRkAAACxAAAAIh2dWVkAAADTAAAAIZ2aWV3AAAD1AAAACRsdW1pAAAD+AAAABRtZWFzAAAEDAAAACR0ZWNoAAAEMAAAAAxyVFJDAAAEPAAACAxnVFJDAAAEPAAACAxiVFJDAAAEPAAACAx0ZXh0AAAAAENvcHlyaWdodCAoYykgMTk5OCBIZXdsZXR0LVBhY2thcmQgQ29tcGFueQAAZGVzYwAAAAAAAAASc1JHQiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAABJzUkdCIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFlaIAAAAAAAAPNRAAEAAAABFsxYWVogAAAAAAAAAAAAAAAAAAAAAFhZWiAAAAAAAABvogAAOPUAAAOQWFlaIAAAAAAAAGKZAAC3hQAAGNpYWVogAAAAAAAAJKAAAA+EAAC2z2Rlc2MAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAFklFQyBodHRwOi8vd3d3LmllYy5jaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZXNjAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAC5JRUMgNjE5NjYtMi4xIERlZmF1bHQgUkdCIGNvbG91ciBzcGFjZSAtIHNSR0IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZGVzYwAAAAAAAAAsUmVmZXJlbmNlIFZpZXdpbmcgQ29uZGl0aW9uIGluIElFQzYxOTY2LTIuMQAAAAAAAAAAAAAALFJlZmVyZW5jZSBWaWV3aW5nIENvbmRpdGlvbiBpbiBJRUM2MTk2Ni0yLjEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHZpZXcAAAAAABOk/gAUXy4AEM8UAAPtzAAEEwsAA1yeAAAAAVhZWiAAAAAAAEwJVgBQAAAAVx/nbWVhcwAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAo8AAAACc2lnIAAAAABDUlQgY3VydgAAAAAAAAQAAAAABQAKAA8AFAAZAB4AIwAoAC0AMgA3ADsAQABFAEoATwBUAFkAXgBjAGgAbQByAHcAfACBAIYAiwCQAJUAmgCfAKQAqQCuALIAtwC8AMEAxgDLANAA1QDbAOAA5QDrAPAA9gD7AQEBBwENARMBGQEfASUBKwEyATgBPgFFAUwBUgFZAWABZwFuAXUBfAGDAYsBkgGaAaEBqQGxAbkBwQHJAdEB2QHhAekB8gH6AgMCDAIUAh0CJgIvAjgCQQJLAlQCXQJnAnECegKEAo4CmAKiAqwCtgLBAssC1QLgAusC9QMAAwsDFgMhAy0DOANDA08DWgNmA3IDfgOKA5YDogOuA7oDxwPTA+AD7AP5BAYEEwQgBC0EOwRIBFUEYwRxBH4EjASaBKgEtgTEBNME4QTwBP4FDQUcBSsFOgVJBVgFZwV3BYYFlgWmBbUFxQXVBeUF9gYGBhYGJwY3BkgGWQZqBnsGjAadBq8GwAbRBuMG9QcHBxkHKwc9B08HYQd0B4YHmQesB78H0gflB/gICwgfCDIIRghaCG4IggiWCKoIvgjSCOcI+wkQCSUJOglPCWQJeQmPCaQJugnPCeUJ+woRCicKPQpUCmoKgQqYCq4KxQrcCvMLCwsiCzkLUQtpC4ALmAuwC8gL4Qv5DBIMKgxDDFwMdQyODKcMwAzZDPMNDQ0mDUANWg10DY4NqQ3DDd4N+A4TDi4OSQ5kDn8Omw62DtIO7g8JDyUPQQ9eD3oPlg+zD88P7BAJECYQQxBhEH4QmxC5ENcQ9RETETERTxFtEYwRqhHJEegSBxImEkUSZBKEEqMSwxLjEwMTIxNDE2MTgxOkE8UT5RQGFCcUSRRqFIsUrRTOFPAVEhU0FVYVeBWbFb0V4BYDFiYWSRZsFo8WshbWFvoXHRdBF2UXiReuF9IX9xgbGEAYZRiKGK8Y1Rj6GSAZRRlrGZEZtxndGgQaKhpRGncanhrFGuwbFBs7G2MbihuyG9ocAhwqHFIcexyjHMwc9R0eHUcdcB2ZHcMd7B4WHkAeah6UHr4e6R8THz4faR+UH78f6iAVIEEgbCCYIMQg8CEcIUghdSGhIc4h+yInIlUigiKvIt0jCiM4I2YjlCPCI/AkHyRNJHwkqyTaJQklOCVoJZclxyX3JicmVyaHJrcm6CcYJ0kneierJ9woDSg/KHEooijUKQYpOClrKZ0p0CoCKjUqaCqbKs8rAis2K2krnSvRLAUsOSxuLKIs1y0MLUEtdi2rLeEuFi5MLoIuty7uLyQvWi+RL8cv/jA1MGwwpDDbMRIxSjGCMbox8jIqMmMymzLUMw0zRjN/M7gz8TQrNGU0njTYNRM1TTWHNcI1/TY3NnI2rjbpNyQ3YDecN9c4FDhQOIw4yDkFOUI5fzm8Ofk6Njp0OrI67zstO2s7qjvoPCc8ZTykPOM9Ij1hPaE94D4gPmA+oD7gPyE/YT+iP+JAI0BkQKZA50EpQWpBrEHuQjBCckK1QvdDOkN9Q8BEA0RHRIpEzkUSRVVFmkXeRiJGZ0arRvBHNUd7R8BIBUhLSJFI10kdSWNJqUnwSjdKfUrESwxLU0uaS+JMKkxyTLpNAk1KTZNN3E4lTm5Ot08AT0lPk0/dUCdQcVC7UQZRUFGbUeZSMVJ8UsdTE1NfU6pT9lRCVI9U21UoVXVVwlYPVlxWqVb3V0RXklfgWC9YfVjLWRpZaVm4WgdaVlqmWvVbRVuVW+VcNVyGXNZdJ114XcleGl5sXr1fD19hX7NgBWBXYKpg/GFPYaJh9WJJYpxi8GNDY5dj62RAZJRk6WU9ZZJl52Y9ZpJm6Gc9Z5Nn6Wg/aJZo7GlDaZpp8WpIap9q92tPa6dr/2xXbK9tCG1gbbluEm5rbsRvHm94b9FwK3CGcOBxOnGVcfByS3KmcwFzXXO4dBR0cHTMdSh1hXXhdj52m3b4d1Z3s3gReG54zHkqeYl553pGeqV7BHtje8J8IXyBfOF9QX2hfgF+Yn7CfyN/hH/lgEeAqIEKgWuBzYIwgpKC9INXg7qEHYSAhOOFR4Wrhg6GcobXhzuHn4gEiGmIzokziZmJ/opkisqLMIuWi/yMY4zKjTGNmI3/jmaOzo82j56QBpBukNaRP5GokhGSepLjk02TtpQglIqU9JVflcmWNJaflwqXdZfgmEyYuJkkmZCZ/JpomtWbQpuvnByciZz3nWSd0p5Anq6fHZ+Ln/qgaaDYoUehtqImopajBqN2o+akVqTHpTilqaYapoum/adup+CoUqjEqTepqaocqo+rAqt1q+msXKzQrUStuK4trqGvFq+LsACwdbDqsWCx1rJLssKzOLOutCW0nLUTtYq2AbZ5tvC3aLfguFm40blKucK6O7q1uy67p7whvJu9Fb2Pvgq+hL7/v3q/9cBwwOzBZ8Hjwl/C28NYw9TEUcTOxUvFyMZGxsPHQce/yD3IvMk6ybnKOMq3yzbLtsw1zLXNNc21zjbOts83z7jQOdC60TzRvtI/0sHTRNPG1EnUy9VO1dHWVdbY11zX4Nhk2OjZbNnx2nba+9uA3AXcit0Q3ZbeHN6i3ynfr+A24L3hROHM4lPi2+Nj4+vkc+T85YTmDeaW5x/nqegy6LzpRunQ6lvq5etw6/vshu0R7ZzuKO6070DvzPBY8OXxcvH/8ozzGfOn9DT0wvVQ9d72bfb794r4Gfio+Tj5x/pX+uf7d/wH/Jj9Kf26/kv+3P9t////7gAOQWRvYmUAZEAAAAAB/9sAhAABAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAgICAgICAgICAgIDAwMDAwMDAwMDAQEBAQEBAQEBAQECAgECAgMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP/wAARCADYAmQDAREAAhEBAxEB/90ABABN/8QBogAAAAYCAwEAAAAAAAAAAAAABwgGBQQJAwoCAQALAQAABgMBAQEAAAAAAAAAAAAGBQQDBwIIAQkACgsQAAIBAwQBAwMCAwMDAgYJdQECAwQRBRIGIQcTIgAIMRRBMiMVCVFCFmEkMxdScYEYYpElQ6Gx8CY0cgoZwdE1J+FTNoLxkqJEVHNFRjdHYyhVVlcassLS4vJkg3SThGWjs8PT4yk4ZvN1Kjk6SElKWFlaZ2hpanZ3eHl6hYaHiImKlJWWl5iZmqSlpqeoqaq0tba3uLm6xMXGx8jJytTV1tfY2drk5ebn6Onq9PX29/j5+hEAAgEDAgQEAwUEBAQGBgVtAQIDEQQhEgUxBgAiE0FRBzJhFHEIQoEjkRVSoWIWMwmxJMHRQ3LwF+GCNCWSUxhjRPGisiY1GVQ2RWQnCnODk0Z0wtLi8lVldVY3hIWjs8PT4/MpGpSktMTU5PSVpbXF1eX1KEdXZjh2hpamtsbW5vZnd4eXp7fH1+f3SFhoeIiYqLjI2Oj4OUlZaXmJmam5ydnp+So6SlpqeoqaqrrK2ur6/9oADAMBAAIRAxEAPwDf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//Q3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//0d/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/9Lf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//T3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//1N/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/9Xf49+691737r3Xvfuvde9+691737r3Xvfuvde+nJ4A9+691XR8hP5qXw1+PGcqNj5HsOq7T7UieSnTqjo7DVnaW9hXRusRochBtwT4nCVazyKrxVtXBKnJKcH2O9t9u+Yby0G57j4G2bPQHx72QQKQRUFENZpKipUxxsD5Hr2AWBORxGSRUVFaV01HAtQH16K5N88P5lvdMck/xo/lyPsbbtSGXF7y+T2/xgZqmKUFYK47Q2pSyzwFD6miaulP9kn8+zBNt9qNsZF3Lm+/3S4qAyWFusaKaV/t7hiCKf8ACwflXq6mMFGdWKEZFaMM8ODKfWur9nQLdodvfzh+vI8bmO5/lh/LB+KFHuuqno9rYvs+OXARZOqoRRmqocFkN/73x0udq4BWRCfxeUK0y8IGUezzaE5C3ZZ15c9ouZt2W3FZnSfXoDE6WcW8QCA0IBODTzIJ6TzTpFo/UjStaahx+z9Rcj86/LzET++387nrvIYWnzm+/wCXT2zV7jjSp27teun3H1dm9z00H2zTybbnl3Q0eThkiqU1SQxToGkSxUEAo4Jfa/dI7hzyFzNaxw18V4Jop1QmtARJFgihwXBwenkeIFROwqa8BSvpxdqU8+PQoJ/Mb+V/TL+H5ffy6e4Nu4ajAkzPZHxvzWK742jjaRVPlr6zBY00W5aOljtrJvLZDxcjkvXlfkTeio5b9wY4bp/hh3KB7U/Z46+JDXyo2g18s9b/AEzSjUNTXzApwqaAmvyU9Hj+N/zd+LfyyoZJujO39r7rzNIrfxfZNTUPgOwsBLGpM0Ob2NnEoNy0JgKkNIadoSQdLm3sO8wcl8y8saJN32t1s3pomQiSB65GmaMtGSRnTq1DzA6rirLUahSo8xXIqOIqMitK9Gs9hbr3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+690gO0+0NjdK9d7v7X7LzT7c2DsPC1O4d152PE5vOtisNR6fuq3+EbcxuXzlcsIcEpTU00lrnTYEhRaWlxfXEdraRF7hq0UUqaAk0qRmgNBxJwKkgdaJC0qaVIH5k0H8zx4DicdAH1x87/in232HtDqnr7tQbg39v3B5nc2z8CNk9iYz+O7dwFAmSymdpcpmNpY/CpiIqSQGOokqUiqX/bhaSQFQGOV+bOVudl31uT+ZLDdBtZRbz6WeKY2jyOUSK5CMTBOWVh9PIFmAVi0YVSQZ7ls28bMlrJu+1z2qTn9IyoU8Sg1Fo6/GlM61qhqKMajo3fs/6Lekjv8A39srqvZG6+yeyN04TZOwdi4DKbp3hu7cmQgxeB25t7C0ktdlMvlchUukFLR0dLCzsxP4sASQCt23bb/eNws9q2qzkuNyuJFjijQFnd2NFVQMkknpuWWOCN5pnCxKKkngB1UBtT+dT0x211jS9tdY7b/ub1zuj5Y7s+I+xOw/kdmx1BicruTaPx6y3f8AW9h5XalVj8huvbuzsti8S1FiafLJiq6td45KoY4T06yzdc+w2/bRur7Pu9wZtzh2aPcZYLJDcOEkvVshCr1VHkVm1SNH4iqAdHihWIDb8zWzw+PbafC8cw63aiqwj8SrEAilKAZpqIUlWx0TT+XD/OJpPkJl+1u3O6fmFhaXoX48/FDpvu7uV90dS7F612ptLdfdG4t7Y7P7C3XmMSmbzqdgdY5LadDSYJMTl6qn3FTZ+HHvjpcxA87jn3S9kW5bt9m2fYeQ5RzDue73FtbabmWeWSO2SNklRG0oIpld2n8SNTA0TSCUQMFCHZN9ku3nnud2R7eJe4CMBQ1Q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iGFSCsKAj0UD/AB0cPa2ytm7Hx6YjZW09tbQxUaqkeN2xgsXgKBFQWRVo8VS0lOAo+np49hqWWWd2kmlZ5DxLEkn7Sanp0kk1JqelN7b611737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691HkpKWaamqZqanlqKNpHpJ5IY5JqV5omgmamlZS8DSwuUYqQWUkHj3UqpKsVBYcPl9nTqXE8cU0MczrDIAHUEhWAOoBgDRqEAitaEVGepHu3TXXvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691/9Pf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//U3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//1d/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/9bf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//X3+Pfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691//0N/j37r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvdf/9Hf49+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3Xvfuvde9+691737r3X//Z';
			var doc = new jsPDF();
			
			doc.setFontType('normal');
			doc.addImage(imgData, 'JPEG', 50, 3, 120, 40);
			doc.setFontSize(50)
			doc.text(105, 65,'SOCIO-ECONOMIC', null, null, 'center');
			doc.text(105, 95,'PROFILE', null, null, 'center');
			doc.text(105, 125,'OF', null, null, 'center');
			doc.text(105, 150,profile_sectors.profile.municipality_name, null, null, 'center');
			doc.text(105, 180,'LA UNION', null, null, 'center');
			doc.setFontSize(60)
			doc.text(105, 210,profile_sectors.profile.profile_year, null, null, 'center');
			doc.addPage();
			doc.addImage(imgData, 'JPEG', 50, 3, 120, 40);
			doc.setFontSize(11)

			doc.setFontType('bold');
			doc.text(105, 40,'MUNICIPALITY:' +profile_sectors.profile.municipality_name, null, null, 'center');
			doc.setFontSize(11)
			doc.setFontSize(9)		
			doc.text(20, 45, 'Location:' + profile_sectors.profile.location);
			doc.setFontType('bold');
			doc.text(20, 50, 'POLITICAL BOUNDARIES:');
			doc.setFontType('normal');
			doc.text(30, 55, 'North:'+"  "+ profile_sectors.profile.pb_north);
			doc.text(30, 60, 'South:'+"  "+ profile_sectors.profile.pb_south);
			doc.text(110, 55, 'East:'+"  "+ profile_sectors.profile.pb_east);
			doc.text(110, 60, 'West:'+"  "+ profile_sectors.profile.pb_west);

			doc.setFontType('bold');
			doc.text(20, 70, 'A. MACRO SECTOR:');
			doc.text(30, 75, 'PHYSICAL CHARACTERISTICS');
			doc.setFontType('normal');

			doc.text(40, 80, 'Land Area:'+"  " +profile_sectors.macro.parameters[0].items[0].item_value);
			doc.text(110, 80, 'Climate:'+"  " +profile_sectors.macro.parameters[0].items[2].item_value);
			doc.text(40, 85, 'Terrain:'+"  " +profile_sectors.macro.parameters[0].items[1].item_value);
			doc.text(110, 85, 'Number of Barangays:'+"  " +profile_sectors.macro.parameters[0].items[3].item_value);

			doc.setFontType('bold');
			doc.text(30, 93, 'DEMOGRAPHICS');
			doc.setFontType('normal');

			doc.text(40, 98, 'Population:'+"  " +profile_sectors.macro.parameters[1].items[0].item_value);
			doc.text(40, 103, 'Growth Rate:'+"  " +profile_sectors.macro.parameters[1].items[1].item_value);
			doc.text(40, 108, 'Population Density:'+"  " +profile_sectors.macro.parameters[1].items[2].item_value);
			doc.text(40, 113, 'Number of Households:'+"  " +profile_sectors.macro.parameters[1].items[3].item_value);
			doc.text(110, 98, 'Number of Families:'+"  " +profile_sectors.macro.parameters[1].items[4].item_value);
			doc.text(110, 103, 'Major Dialects/Languages:'+"  " +profile_sectors.macro.parameters[1].items[5].item_value);
			doc.text(110, 108, 'Religion:'+"  " +profile_sectors.macro.parameters[1].items[6].item_value);
			doc.text(110, 113, 'Literacy Rate:'+"  " +profile_sectors.macro.parameters[1].items[7].item_value);
			doc.setFontType('bold');
			doc.text(20, 123, 'B. EMPLOYMENT AND DEVELOPMENT FINANCE:');
			doc.setFontType('normal');
			doc.text(40, 128, 'Labor Force (No.):'+"  " +profile_sectors.employment.parameters[0].items[0].item_value);
			doc.text(40, 133, 'Employment Rate:'+"  " +profile_sectors.employment.parameters[0].items[1].item_value);
			doc.text(40, 138, 'Employment Distribution:');
			doc.text(50, 143, 'Agriculture:'+"  " +profile_sectors.employment.parameters[0].items[2].group_items[0].item_group_value);
			doc.text(50, 148, 'Industry:'+"  " +profile_sectors.employment.parameters[0].items[2].group_items[1].item_group_value);
			doc.text(50, 153, 'Services:'+"  " +profile_sectors.employment.parameters[0].items[2].group_items[2].item_group_value);
			doc.text(110, 128, 'Poverty Incidence:'+"  " +profile_sectors.employment.parameters[0].items[3].item_value);
			doc.text(110, 133, 'Magnitude of Poor Families:'+"  " +profile_sectors.employment.parameters[0].items[4].item_value);
			doc.text(110, 138, 'Magnitude of Poor Population:'+"  " +profile_sectors.employment.parameters[0].items[5].item_value);
			doc.text(110, 143, 'Classification:'+"  " +profile_sectors.employment.parameters[0].items[6].item_value);
			doc.text(110, 148, "Municipal Gov't Revenue:"+"  "+"Php." +profile_sectors.employment.parameters[0].items[7].item_value);
			doc.text(110, 153, "Municipal Gov't Expenditures:"+"  "+"Php." +profile_sectors.employment.parameters[0].items[8].item_value);
			doc.setFontType('bold');
			doc.text(105, 165,'EMPLOYMENT AND INCOME GENERATED BY COMMODITY', null, null, 'center');
			doc.autoTable(columns, rows, {
			margin: {top: 168},
			addPageContent: function(data) {
			startY: 150
			}
			});

			doc.setFontType('bold');
			doc.text(20, 195, 'C.ENVIRONMENT SECTOR');
			doc.text(20, 200, 'Existing Land Use Distribution');
			doc.setFontType('normal');
			doc.text(40, 205, 'Agricultural Areas:'+"  " +profile_sectors.environmental.parameters[0].items[0].item_value+' has');
			doc.text(40, 210, 'Grassland/Shrubland Areas:'+"  " +profile_sectors.environmental.parameters[0].items[1].item_value+' has');
			doc.text(40, 215, 'Forest/Wooded Areas:'+"  " +profile_sectors.environmental.parameters[0].items[2].item_value+' has');
			doc.text(120, 205, 'Bareland Areas:'+"  " +profile_sectors.environmental.parameters[0].items[3].item_value+' has');
			doc.text(120, 210, 'Wetland Areas:'+"  " +profile_sectors.environmental.parameters[0].items[4].item_value+' has');
			doc.text(120, 215, 'Built-up Areas:'+"  " +profile_sectors.environmental.parameters[0].items[5].item_value+' has');
			doc.setFontType('bold');
			doc.text(20, 225, 'Land Classification');
			doc.setFontType('normal');
			doc.text(40, 230, 'Certified A & D:'+"  " +profile_sectors.environmental.parameters[1].items[0].item_value+' has');
			doc.text(40, 235, 'Public Forest Land:'+"  " +profile_sectors.environmental.parameters[1].items[1].item_value+' has');
			doc.text(20, 240, 'Number of Barangays:'+"  " +profile_sectors.environmental.parameters[1].items[2].item_value);
			doc.text(60, 240, 'UPLAND:'+"  " +profile_sectors.environmental.parameters[1].items[3].item_value);
			doc.text(90, 240, 'LOWLAND:'+"  "+profile_sectors.environmental.parameters[1].items[4].item_value);
			doc.text(130, 240, 'COASTAL:'+"  " +profile_sectors.environmental.parameters[1].items[5].item_value);
			doc.text(160, 240, 'RIVERSIDE:'+"  " +profile_sectors.environmental.parameters[1].items[6].item_value);
			doc.text(20, 245, 'Length of RIVERBANKS:'+"  " +profile_sectors.environmental.parameters[1].items[9].item_value+" (meters)");
			doc.text(130, 245, 'SEASHORES:'+"  " +profile_sectors.environmental.parameters[1].items[10].item_value+" (meters)");
			doc.text(20, 250, 'Number of Sawmills:'+"  " +profile_sectors.environmental.parameters[1].items[7].item_value);
			doc.text(130, 250, 'Number of Lumber Dealers:'+"  " +profile_sectors.environmental.parameters[1].items[8].item_value);
			doc.setFontType('bold');
			doc.text(105, 262,'LIST OF WATER BODIES', null, null, 'center');
			doc.autoTable(WaterColumns, WaterRows, {
			margin: {top: 265},
			addPageContent: function(data) {
			startY: 150
			}
			});
			
			
			doc.addPage();
			doc.addImage(imgData, 'JPEG', 50, 3, 120, 40);
			doc.setFontType('bold');
			doc.text(20, 40, 'D. AGRICULTURE SECTOR');
			doc.text(20, 45, 'Food Sufficiency');
			doc.autoTable(PlantColumns, PlantRows, {
			styles: {fontSize: 7},
			margin: {top: 48, left: 20},
			tableWidth: 95, 
			addPageContent: function(data) {
			startY: 150
			}
			});	
			doc.autoTable(AnimalColumns, AnimalRows, {
			styles: {fontSize: 7},
			margin: {top: 53, left: 120},
			tableWidth: 70, 
			addPageContent: function(data) {
			startY: 150
			}
			});
			doc.setFontType('bold');
			doc.text(20, 115, 'E. INFRASTRUCTURE AND UTILITIES SECTOR');
			doc.text(30, 123, 'Road Network (total lineal meters');
			doc.text(40, 128, 'Barangay Road');
			doc.setFontType('normal');
			doc.text(50, 133, 'Concrete:'+" "+profile_sectors.infra.parameters[0].items[0].group_items[0].item_group_value);
			doc.text(80, 133, 'Asphalt:'+" "+profile_sectors.infra.parameters[0].items[0].group_items[1].item_group_value);
			doc.text(110, 133, 'Gravel:'+" "+profile_sectors.infra.parameters[0].items[0].group_items[2].item_group_value);
			doc.text(140, 133, 'Earthfill:'+" "+profile_sectors.infra.parameters[0].items[0].group_items[3].item_group_value);
			doc.setFontType('bold');
			doc.text(40, 138, 'Municipal Road');
			doc.setFontType('normal');
			doc.text(50, 143, 'Concrete:'+" "+profile_sectors.infra.parameters[0].items[1].group_items[0].item_group_value);
			doc.text(80, 143, 'Asphalt:'+" "+profile_sectors.infra.parameters[0].items[1].group_items[1].item_group_value);
			doc.text(110, 143, 'Gravel:'+" "+profile_sectors.infra.parameters[0].items[1].group_items[2].item_group_value);
			doc.text(140, 143, 'Earthfill:'+" "+profile_sectors.infra.parameters[0].items[1].group_items[3].item_group_value);
			doc.setFontType('bold');
			doc.text(40, 148, 'Provincial Road');
			doc.setFontType('normal');
			doc.text(50, 153, 'Concrete:'+" "+profile_sectors.infra.parameters[0].items[2].group_items[0].item_group_value);
			doc.text(80, 153, 'Asphalt:'+" "+profile_sectors.infra.parameters[0].items[2].group_items[1].item_group_value);
			doc.text(110, 153, 'Gravel:'+" "+profile_sectors.infra.parameters[0].items[2].group_items[2].item_group_value);
			doc.text(140, 153, 'Earthfill:'+" "+profile_sectors.infra.parameters[0].items[2].group_items[3].item_group_value);
			doc.setFontType('bold');
			doc.text(40, 158, 'National Road');
			doc.setFontType('normal');
			doc.text(50, 163, 'Concrete:'+" "+profile_sectors.infra.parameters[0].items[3].group_items[0].item_group_value);
			doc.text(80, 163, 'Asphalt:'+" "+profile_sectors.infra.parameters[0].items[3].group_items[1].item_group_value);
			doc.text(110, 163, 'Gravel:'+" "+profile_sectors.infra.parameters[0].items[3].group_items[2].item_group_value);
			doc.text(140, 163, 'Earthfill:'+" "+profile_sectors.infra.parameters[0].items[3].group_items[3].item_group_value);
			doc.setFontType('bold');
			doc.text(30, 171, 'Bridges');
			doc.text(40, 176, 'Barangay Bridges');
			doc.text(50, 181, '(Total Number of Span)');
			doc.setFontType('normal');
			doc.text(50, 186, 'Steel:'+profile_sectors.infra.parameters[1].items[0].group_items[0].item_group_value);
			doc.text(70, 186, 'Concrete:'+profile_sectors.infra.parameters[1].items[0].group_items[1].item_group_value);
			doc.text(90, 186, 'Composite:'+profile_sectors.infra.parameters[1].items[0].group_items[2].item_group_value);
			doc.text(113, 186, 'Jumbo:'+profile_sectors.infra.parameters[1].items[0].group_items[3].item_group_value);
			doc.text(130, 186, 'Bailey:'+profile_sectors.infra.parameters[1].items[0].group_items[4].item_group_value);
			doc.text(150, 186, 'Footbridge:'+profile_sectors.infra.parameters[1].items[0].group_items[5].item_group_value);
			doc.setFontType('bold');
			doc.text(50, 191, '(Total Length)');
			doc.setFontType('normal');
			doc.text(50, 196, 'Steel:'+profile_sectors.infra.parameters[1].items[1].group_items[0].item_group_value);
			doc.text(70, 196, 'Concrete:'+profile_sectors.infra.parameters[1].items[1].group_items[1].item_group_value);
			doc.text(90, 196, 'Composite:'+profile_sectors.infra.parameters[1].items[1].group_items[2].item_group_value);
			doc.text(113, 196, 'Jumbo:'+profile_sectors.infra.parameters[1].items[1].group_items[3].item_group_value);
			doc.text(130, 196, 'Bailey:'+profile_sectors.infra.parameters[1].items[1].group_items[4].item_group_value);
			doc.text(150, 196, 'Footbridge:'+profile_sectors.infra.parameters[1].items[1].group_items[5].item_group_value);
			doc.setFontType('bold');
			doc.text(40, 204, 'Municipal Bridges');
			doc.text(50, 209, '(Total Number of Span)');
			doc.setFontType('normal');
			doc.text(50, 214, 'Steel:'+profile_sectors.infra.parameters[1].items[2].group_items[0].item_group_value);
			doc.text(70, 214, 'Concrete:'+profile_sectors.infra.parameters[1].items[2].group_items[1].item_group_value);
			doc.text(90, 214, 'Composite:'+profile_sectors.infra.parameters[1].items[2].group_items[2].item_group_value);
			doc.text(113, 214, 'Jumbo:'+profile_sectors.infra.parameters[1].items[2].group_items[3].item_group_value);
			doc.text(130, 214, 'Bailey:'+profile_sectors.infra.parameters[1].items[2].group_items[4].item_group_value);
			doc.text(150, 214, 'Footbridge:'+profile_sectors.infra.parameters[1].items[2].group_items[5].item_group_value);
			doc.setFontType('bold');
			doc.text(50, 219, '(Total Length)');
			doc.setFontType('normal');
			doc.text(50, 224, 'Steel:'+profile_sectors.infra.parameters[1].items[3].group_items[0].item_group_value);
			doc.text(70, 224, 'Concrete:'+profile_sectors.infra.parameters[1].items[3].group_items[1].item_group_value);
			doc.text(90, 224, 'Composite:'+profile_sectors.infra.parameters[1].items[3].group_items[2].item_group_value);
			doc.text(113, 224, 'Jumbo:'+profile_sectors.infra.parameters[1].items[3].group_items[3].item_group_value);
			doc.text(130, 224, 'Bailey:'+profile_sectors.infra.parameters[1].items[3].group_items[4].item_group_value);
			doc.text(150, 224, 'Footbridge:'+profile_sectors.infra.parameters[1].items[3].group_items[5].item_group_value);
			doc.setFontType('bold');
			doc.text(40, 232, 'Provincial Bridges');
			doc.text(50, 237, '(Total Number of Span)');
			doc.setFontType('normal');
			doc.text(50, 242, 'Steel:'+profile_sectors.infra.parameters[1].items[4].group_items[0].item_group_value);
			doc.text(70, 242, 'Concrete:'+profile_sectors.infra.parameters[1].items[4].group_items[1].item_group_value);
			doc.text(90, 242, 'Composite:'+profile_sectors.infra.parameters[1].items[4].group_items[2].item_group_value);
			doc.text(113, 242, 'Jumbo:'+profile_sectors.infra.parameters[1].items[4].group_items[3].item_group_value);
			doc.text(130, 242, 'Bailey:'+profile_sectors.infra.parameters[1].items[4].group_items[4].item_group_value);
			doc.text(150, 242, 'Footbridge:'+profile_sectors.infra.parameters[1].items[4].group_items[5].item_group_value);
			doc.setFontType('bold');
			doc.text(50, 247, '(Total Length)');
			doc.setFontType('normal');
			doc.text(50, 252, 'Steel:'+profile_sectors.infra.parameters[1].items[5].group_items[0].item_group_value);
			doc.text(70, 252, 'Concrete:'+profile_sectors.infra.parameters[1].items[5].group_items[1].item_group_value);
			doc.text(90, 252, 'Composite:'+profile_sectors.infra.parameters[1].items[5].group_items[2].item_group_value);
			doc.text(113, 252, 'Jumbo:'+profile_sectors.infra.parameters[1].items[5].group_items[3].item_group_value);
			doc.text(130, 252, 'Bailey:'+profile_sectors.infra.parameters[1].items[5].group_items[4].item_group_value);
			doc.text(150, 252, 'Footbridge:'+profile_sectors.infra.parameters[1].items[5].group_items[5].item_group_value);
			doc.setFontType('bold');
			doc.text(40, 260, 'National Bridges');
			doc.text(50, 265, '(Total Number of Span)');
			doc.setFontType('normal');
			doc.text(50, 270, 'Steel:'+profile_sectors.infra.parameters[1].items[6].group_items[0].item_group_value);
			doc.text(70, 270, 'Concrete:'+profile_sectors.infra.parameters[1].items[6].group_items[1].item_group_value);
			doc.text(90, 270, 'Composite:'+profile_sectors.infra.parameters[1].items[6].group_items[2].item_group_value);
			doc.text(113, 270, 'Jumbo:'+profile_sectors.infra.parameters[1].items[6].group_items[3].item_group_value);
			doc.text(130, 270, 'Bailey:'+profile_sectors.infra.parameters[1].items[6].group_items[4].item_group_value);
			doc.text(150, 270, 'Footbridge:'+profile_sectors.infra.parameters[1].items[6].group_items[5].item_group_value);
			doc.setFontType('bold');
			doc.text(50, 275, '(Total Length)');
			doc.setFontType('normal');
			doc.text(50, 280, 'Steel:'+profile_sectors.infra.parameters[1].items[7].group_items[0].item_group_value);
			doc.text(70, 280, 'Concrete:'+profile_sectors.infra.parameters[1].items[7].group_items[1].item_group_value);
			doc.text(90, 280, 'Composite:'+profile_sectors.infra.parameters[1].items[7].group_items[2].item_group_value);
			doc.text(113, 280, 'Jumbo:'+profile_sectors.infra.parameters[1].items[7].group_items[3].item_group_value);
			doc.text(130, 280, 'Bailey:'+profile_sectors.infra.parameters[1].items[7].group_items[4].item_group_value);
			doc.text(150, 280, 'Footbridge:'+profile_sectors.infra.parameters[1].items[7].group_items[5].item_group_value);
			
			doc.addPage();
			doc.addImage(imgData, 'JPEG', 50, 3, 120, 40);
			doc.setFontType('bold');
			doc.text(20, 40, 'F. SOCIAL WELFARE ');
			doc.setFontType('normal');
			doc.text(30, 45, 'Number of Day Care Center:  ' + profile_sectors.social.parameters[0].items[0].item_value);
			doc.text(30, 50, 'Number of Day Care Worker:  ' + profile_sectors.social.parameters[0].items[1].item_value);
			doc.text(30, 55, 'Number of Day Care Children:  ' + profile_sectors.social.parameters[0].items[2].item_value);
			doc.setFontType('bold');
			doc.text(20, 63, 'G. HEALTH SECTOR' );
			doc.setFontType('normal');
			doc.text(30, 68, 'Crude Birth Rate:  '+profile_sectors.health.parameters[0].items[0].item_value+"%");
			doc.text(30, 73, 'Crude Death Rate:  '+profile_sectors.health.parameters[0].items[1].item_value+"%");
			doc.text(30, 78, 'Maternal Mortality Rate:  '+profile_sectors.health.parameters[0].items[2].item_value+"%");
			doc.text(30, 83, 'Infant Mortality Rate:  '+profile_sectors.health.parameters[0].items[3].item_value+"%");
			doc.text(30, 88, 'Morbidity Rate:  '+profile_sectors.health.parameters[0].items[4].item_value+"%");
			doc.text(30, 93, 'Mortality Rate:  '+profile_sectors.health.parameters[0].items[5].item_value+"%");
			doc.text(110, 68, 'Contraceptive Prevalence Rate:  '+profile_sectors.health.parameters[0].items[6].item_value+"%");
			doc.text(110, 73, 'Malnutrition Rate - Pre School:  '+profile_sectors.health.parameters[0].items[7].item_value+"%");
			doc.text(139, 78, 'In-School:  '+profile_sectors.health.parameters[0].items[8].item_value+"%");
			doc.text(110,88, 'Number of Hospitals:  '+profile_sectors.health.parameters[0].items[9].item_value);
			doc.text(110, 93, 'Number of Clinic:  '+profile_sectors.health.parameters[0].items[10].item_value);
			doc.setFontType('bold');
			doc.text(20, 101, 'H. EDUCATION SECTOR' );	
			
			doc.setFontType('normal');
			doc.text(25, 107, 'Number of Tertiary Schools');	
			doc.text(100, 107, 'College: '+profile_sectors.education.parameters[0].items[0].group_items[0].item_group_value);	
			doc.text(140, 107, 'University:  '+profile_sectors.education.parameters[0].items[0].group_items[1].item_group_value);	
			doc.text(25, 111, 'Number of Secondary Schools');	
			doc.text(100, 111, 'Public:  '+profile_sectors.education.parameters[0].items[1].group_items[0].item_group_value);	
			doc.text(140, 111, 'Private:  '+profile_sectors.education.parameters[0].items[1].group_items[1].item_group_value);
			doc.text(25, 115, 'Number of Elementary Schools');	
			doc.text(100, 115, 'Public:  '+profile_sectors.education.parameters[0].items[2].group_items[0].item_group_value);	
			doc.text(140, 115, 'Private:  '+profile_sectors.education.parameters[0].items[2].group_items[1].item_group_value);
			doc.setFontType('bold');
			doc.text(20, 123, 'I. DEVELOPMENT ADMINISTRATION CENTER');
			doc.setFontType('normal');
			doc.text(25, 128, 'Crime Rate-');
			doc.text(50, 128, 'Index:  '+profile_sectors.development.parameters[0].items[0].group_items[0].item_group_value);
			doc.text(100, 128, 'Non-Index:  '+profile_sectors.development.parameters[0].items[0].group_items[1].item_group_value);
			doc.text(25, 133, 'Number of Cooperatives:  '+profile_sectors.development.parameters[0].items[1].item_value);
			doc.text(25, 138, 'Number of Banks:  '+profile_sectors.development.parameters[0].items[2].item_value);
			doc.text(25, 143, 'Number of Lending Institution:  '+profile_sectors.development.parameters[0].items[3].item_value);
			doc.text(110, 133, 'Number of Messengerial Office:  '+profile_sectors.development.parameters[0].items[4].item_value);
			doc.text(110, 138, 'Number of Fire Trucks:  '+profile_sectors.development.parameters[0].items[5].item_value);
			doc.text(110, 143, 'Number of Radio Stations:  '+profile_sectors.development.parameters[0].items[6].item_value);
			doc.text(110, 148, 'Number of Postal Services:  '+profile_sectors.development.parameters[0].items[7].item_value);
			doc.setFontType('bold');
			doc.text(20, 156, 'J. TRADE, INDUSTRY AND TOURISM SECTOR');
			doc.setFontType('normal');
			doc.text(20, 160, 'Date of Parochial Fiesta:  '+profile_sectors.trade.parameters[0].items[0].item_value);
			doc.text(20, 164, 'Date of Town Fiesta:  '+profile_sectors.trade.parameters[0].items[1].item_value);
			doc.text(90, 160, 'Name of Patron:  '+profile_sectors.trade.parameters[0].items[2].item_value);
			doc.text(90, 164, 'Market Days:  '+profile_sectors.trade.parameters[0].items[3].item_value);
			doc.text(20, 174, 'Trade and Industry:  ');
			doc.text(30, 178, 'Number of Bussiness Establishments:  '+profile_sectors.trade.parameters[0].items[4].item_value);
			doc.text(40, 182, 'Trading:  ');
			doc.text(40, 186, 'Services:  ');
			doc.text(40, 190, 'Manufacturing:  ');
			doc.text(30, 194, 'Number of Beauty Parlor:  '+profile_sectors.trade.parameters[0].items[5].item_value);
			doc.text(30, 198, 'Number of Barber Shops:  '+profile_sectors.trade.parameters[0].items[6].item_value);
			doc.text(30, 202, 'Number of Photo Studio/Video Shops:  '+profile_sectors.trade.parameters[0].items[7].item_value);
			doc.text(30, 206, 'Number of Tailoring/Dress Shops:  '+profile_sectors.trade.parameters[0].items[8].item_value);
			doc.text(120, 182, 'Number of Restaurants:  '+profile_sectors.trade.parameters[0].items[9].item_value);
			doc.text(120, 186, 'Number of Eateries/Canteen:  '+profile_sectors.trade.parameters[0].items[10].item_value);
			doc.text(120, 190, 'Number of Funeral Parlor:  '+profile_sectors.trade.parameters[0].items[11].item_value);
			doc.text(120, 194, 'Number of Gasoline Stations:  '+profile_sectors.trade.parameters[0].items[12].item_value);
			doc.text(120, 198, 'Number of Water Stations:  '+profile_sectors.trade.parameters[0].items[13].item_value);
			doc.text(120, 202, 'Number of Resorts:  '+profile_sectors.trade.parameters[0].items[14].item_value);
			doc.text(120, 206, 'Others:  '+profile_sectors.trade.parameters[0].items[14].item_value);
			var blob = doc.output('blob');
			window.open(URL.createObjectURL(blob));
			
		};
		
		
	};
	
	return new form();
	
});