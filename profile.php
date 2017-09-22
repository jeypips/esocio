<?php include_once 'authentication.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="A fully featured admin theme which can be used to build CRM, CMS, etc.">
        <meta name="author" content="Coderthemes">

        <link rel="shortcut icon" href="images/lu_seal.png">

        <title>E-Socio | Profile</title>

        <!--Morris Chart CSS -->
		 <link rel="stylesheet" href="assets/plugins/morris/morris.css">
		 
		 <!-- DataTables -->
        <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />

        <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/core.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/components.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/icons.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/pages.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/responsive.css" rel="stylesheet" type="text/css" />

        <!-- HTML5 Shiv and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
        <![endif]-->

        <script src="assets/js/modernizr.min.js"></script>
		<style type="text/css">
        .img-circle {
			width: 50px;			
		}
		.not-active {
			pointer-events: none;
			cursor: default;
		}
		
		</style>
    </head>

    <body class="fixed-left" ng-app="profile" ng-controller="profileCtrl" account-profile>

        <!-- Begin page -->
        <div id="wrapper">

            <!-- Top Bar Start -->
            <div class="topbar">

                <!-- LOGO -->
                <div class="topbar-left">
                    <div class="text-center">
                        <a href="index.php" class="logo"><img class="img-circle" src="images/lu_seal.png" alt="PLGU Logo"><span> E-Socio</span></a>
                    </div>
                </div>

                <!-- Button mobile view to collapse sidebar menu -->
                <div class="navbar navbar-default" role="navigation">
                    <div class="container">
                        <div class="">
                            <div class="pull-left">
                                <button class="button-menu-mobile open-left">
                                    <i class="ion-navicon"></i>
                                </button>
                                <span class="clearfix"></span>
                            </div>
							<div class="navbar-left app-search pull-left hidden-xs">
			                     <h5 class="portlet-title" style="color:white;">Profile</h5>
			                </div>
                            <ul class="nav navbar-nav navbar-right pull-right">
                                <li class="dropdown hidden-xs">
                                    <a href="#" data-target="#" class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="true">
                                        <i class="icon-bell"></i> <span class="badge badge-xs badge-danger">3</span>
                                    </a>
                                </li>
                                <li class="hidden-xs">
                                    <a href="#" id="btn-fullscreen" class="waves-effect waves-light"><i class="icon-size-fullscreen"></i></a>
                                </li>
                                <li class="dropdown">
                                    <a href="" class="dropdown-toggle profile" data-toggle="dropdown" aria-expanded="true"><img src="{{accountProfile.picture}}" alt="user-img" class="img-circle"> </a>
                                     <ul class="dropdown-menu">
                                        <li><a href="#" class="not-active">Signed in as <b>{{accountProfile.account_username}}</b></a></li>
										<hr>
                                        <li><a href="#"><i class="ti-settings m-r-5"></i> Setting</a></li>
                                        <li><a href="javascript:;" logout-account><i class="ti-power-off m-r-5"></i> Sign out</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <!--/.nav-collapse -->
                    </div>
                </div>
            </div>
            <!-- Top Bar End -->


            <!-- ========== Left Sidebar Start ========== -->

            <div class="left side-menu">
                <div class="sidebar-inner slimscrollleft">
                    <!--- Divider -->
					
                    <div id="sidebar-menu">
					<ul>
					<li class="text-muted menu-title">Navigation</li>
						<li class="has_sub">
							<li><a href="index.php"><i class="icon-home"></i><span> Dashboard</span></a></li>
							<li><a href="profile.php" class="active"><i class="icon-screen-desktop"></i><span> Profile</span></a></li>
							<li><a href="maintenance.php"><i class="icon-settings"></i><span> Maintenance </span></a></li>
                            </li>
						</li>
					</ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
            <!-- Left Sidebar End -->


<div class="content-page">
	<!-- Start content -->
	<div class="content">
		<div class="container">
		
			<div class="row">
				<div class="col-lg-12">
					<div id="x_content" class="x_content"></div>
				</div>
			</div>
			
		</div> <!-- container -->
	</div> <!-- content -->

			<footer class="footer text-right">
			   <strong>Copyright &copy; <?php echo date("Y"); ?> PGLU, E-Socio Economic Profiling in La Union.</strong> All rights reserved.
			</footer>
		</div>
	
	<div ng-show="views.menu">
		<div id="sub-menu" style="position: fixed; top: 180px; right: {{views.subMenu}};" ng-click="form.subMenu(this)">
			<button href="javascript:;" class="btn btn-youtube right-bar-toggle waves-effect waves-light"><i class="glyphicon glyphicon-th"></i></button>
		</div>	
		<div class="side-bar right-bar nicescroll">

		 				
		<h4 class="text-center">Sector</h4>
			<div class="contact-list nicescroll">
				<ul class="list-group contacts-list">

					<li class="list-group-item" ng-class="{'active': subMenuList.profile}" ng-click="form.activateForm(this,'profile')">
						<a href="javascript:;">Basic Info</a>
						<span class="clearfix"></span>
					</li>
					<li class="list-group-item" ng-class="{'active': subMenuList[s.sector_shortname]}" ng-repeat="s in sectors" ng-click="form.activateForm(this,s.sector_shortname)">
						<a href="javascript:;">{{s.sector_description}}</a>
						<span class="clearfix"></span>
					</li>					

				</ul>
				
			</div>
		</div>
	</div>
	</div>
	<!-- END wrapper -->
	
        <script>
            var resizefunc = [];
        </script>

        <!-- jQuery  -->
        <script src="assets/js/jquery.min.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/js/detect.js"></script>
        <script src="assets/js/fastclick.js"></script>
        <script src="assets/js/jquery.slimscroll.js"></script>
        <script src="assets/js/jquery.blockUI.js"></script>
        <script src="assets/js/waves.js"></script>
        <script src="assets/js/wow.min.js"></script>
        <script src="assets/js/jquery.nicescroll.js"></script>
        <script src="assets/js/jquery.scrollTo.min.js"></script>
        <script src="assets/plugins/peity/jquery.peity.min.js"></script>
		<script src="assets/plugins/datatables/jquery.dataTables.min.js"></script>
        <script src="assets/plugins/datatables/dataTables.bootstrap.js"></script>

        <!-- jQuery  -->
        <script src="assets/plugins/waypoints/lib/jquery.waypoints.js"></script>
        <script src="assets/plugins/counterup/jquery.counterup.min.js"></script>

        <script src="assets/plugins/morris/morris.min.js"></script>
        <script src="assets/plugins/raphael/raphael-min.js"></script>
        <script src="assets/plugins/jquery-knob/jquery.knob.js"></script>
        <script src="assets/pages/jquery.dashboard.js"></script>
        <script src="assets/js/jquery.core.js"></script>
        <script src="assets/js/jquery.app.js"></script>
		<script src="assets/js/bootbox.min.js"></script>
		
		<!-- Angular  -->
		<script src="angular/angular.min.js"></script>
		<script src="modules/fullscreen.js"></script>
		<script src="modules/bootstrap-modal.js"></script>
		<script src="modules/account.js"></script>
		<script src="modules/profile.js"></script>
		<script src="controllers/profile.js"></script>

    </body>
</html>