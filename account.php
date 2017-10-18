<?php include_once 'authentication.php'; ?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="A fully featured admin theme which can be used to build CRM, CMS, etc.">
        <meta name="author" content="Coderthemes">

        <link rel="shortcut icon" href="images/lu_seal.png">

        <title>E-Socio | Account</title>
		 
		 <!-- DataTables -->
        <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />

        <link href="assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/core.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/components.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/icons.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/pages.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/responsive.css" rel="stylesheet" type="text/css" />
		<link href="assets/css/font-awesome-animation.css" rel="stylesheet" type="text/css" />

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

    <body class="fixed-left" ng-app="user" ng-controller="userCtrl" account-profile>

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
			                     <h5 class="portlet-title" style="color:white;">Account</h5>
			                </div>
                             <ul class="nav navbar-nav navbar-right pull-right" fetch-notifications>
                                <li class="dropdown hidden-xs" ng-show="accountProfile.groups == 'admin'">
                                    <a href="#" data-target="#" class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="true">
                                        <i class="icon-bell"></i> <span class="badge badge-xs badge-danger">{{(notifications.length>0)?notifications.length:''}}</span>
                                    </a>
									<ul class="dropdown-menu dropdown-menu-lg">
                                        <li class="notifi-title"><span class="label label-default pull-right"></span>Notification<i style="cursor: pointer; color: black;" class="faa-ring animated pull-right icon-trash"></i></li>
                                        <li class="list-group nicescroll notification-list">
                                          
                                           <!-- list item-->
                                           <a href="javascript:;" class="list-group-item" ng-repeat="notification in notifications">
                                              <div class="media">
                                                 <div class="pull-left p-r-10">
                                                    <em class="fa fa-bell-o fa-2x text-success"></em>
                                                 </div>
                                                 <div class="media-body">
                                                    <h5 class="media-heading">{{notification.description}}</h5>
                                                    <p class="m-0">
                                                        <small>There are <span class="text-primary font-600">{{(notifications.length>0)?notifications.length:''}}</span> new updates</small>
                                                    </p>
                                                 </div>
                                              </div>
                                           </a>
										   
                                        </li>
                                        <li>
                                            <a href="notifs.php" ng-click="notifs.php" class="list-group-item text-right">
                                                <small class="font-600">See all notifications</small>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="hidden-xs">
                                    <a href="#" id="btn-fullscreen" class="waves-effect waves-light"><i class="icon-size-fullscreen"></i></a>
                                </li>
                                <li class="dropdown">
                                    <a href="" class="dropdown-toggle profile" data-toggle="dropdown" aria-expanded="true"><img src="{{accountProfile.picture}}" alt="user-img" class="img-circle"> </a>
                                    <ul class="dropdown-menu">
                                        <li><a href="#" class="not-active">Signed in as <b>{{accountProfile.groups}}</b></a></li>
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
							<li><a href="profile.php"><i class="icon-screen-desktop"></i><span> Profile</span></a></li>
							<li ng-show="accountProfile.groups == 'admin'"><a href="maintenance.php"><i class="icon-settings"></i><span> Maintenance </span></a></li>
							<li ng-show="accountProfile.groups == 'admin'"><a href="account.php" class="active"><i class="icon-people"></i><span> User Account </span></a></li>
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
		
        <script src="assets/plugins/raphael/raphael-min.js"></script>
        <script src="assets/plugins/jquery-knob/jquery.knob.js"></script>
        <script src="assets/js/jquery.core.js"></script>
        <script src="assets/js/jquery.app.js"></script>
		<script src="assets/js/bootbox.min.js"></script>
		<script src="assets/js/jquery.bootstrap-growl.min.js"></script> 		
		
		<!-- Angular  -->
		<script src="angular/angular.min.js"></script>
		<script src="modules/fullscreen.js"></script>
		<script src="modules/bootstrap-modal.js"></script>
		<script src="modules/growl.js"></script>
		<script src="modules/account.js"></script>
		<script src="modules/users.js"></script>
		<script src="modules/notifications.js"></script>
		<script src="controllers/user.js"></script>

    </body>
</html>