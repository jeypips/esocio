-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 25, 2017 at 10:16 AM
-- Server version: 5.7.11
-- PHP Version: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `esocio`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_info`
--

CREATE TABLE `account_info` (
  `account_id` int(11) NOT NULL,
  `account_firstname` varchar(50) DEFAULT NULL,
  `account_middlename` varchar(50) DEFAULT NULL,
  `account_lastname` varchar(50) DEFAULT NULL,
  `account_name_municipality` varchar(150) DEFAULT NULL,
  `account_username` varchar(50) DEFAULT NULL,
  `account_password` varchar(50) DEFAULT NULL,
  `account_email` varchar(50) DEFAULT NULL,
  `groups` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account_info`
--

INSERT INTO `account_info` (`account_id`, `account_firstname`, `account_middlename`, `account_lastname`, `account_name_municipality`, `account_username`, `account_password`, `account_email`, `groups`) VALUES
(1, 'Rachelle Ann', 'M.', 'Salundaguit', '14', 'admin', 'admin', 'jp@gmail.com', 'admin'),
(2, 'Kim', 'R.', 'Bayani', '2', 'user', 'user', 'dex@gmail.com', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `items_groups`
--

CREATE TABLE `items_groups` (
  `item_group_id` int(11) NOT NULL,
  `item_group_item` int(11) NOT NULL,
  `item_group_description` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items_groups`
--

INSERT INTO `items_groups` (`item_group_id`, `item_group_item`, `item_group_description`) VALUES
(1, 15, 'Agriculture'),
(2, 15, 'Industry'),
(3, 15, 'Services'),
(6, 168, 'Proprietorship'),
(7, 168, 'Corporate'),
(8, 170, 'YES'),
(9, 170, 'NO'),
(10, 174, 'YES'),
(11, 174, 'NO'),
(12, 178, 'YES'),
(13, 178, 'NO'),
(14, 206, 'YES'),
(15, 206, 'NO'),
(16, 229, 'Domestic'),
(17, 229, 'Foreign'),
(18, 233, 'Private'),
(19, 233, 'Government'),
(20, 234, 'Agriculture'),
(21, 234, 'Industry'),
(22, 234, 'Services'),
(23, 235, 'No. of Employed'),
(24, 235, 'No. of Unemployed'),
(25, 235, 'No. of Underemployment'),
(26, 39, 'Concrete'),
(27, 39, 'Asphalt'),
(28, 39, 'Gravel'),
(29, 39, 'Earthfill'),
(30, 43, 'Concrete'),
(31, 43, 'Asphalt'),
(32, 43, 'Gravel'),
(33, 43, 'Earthfill'),
(34, 47, 'Concrete'),
(35, 47, 'Asphalt'),
(36, 47, 'Gravel'),
(37, 47, 'Earthfill'),
(38, 51, 'Concrete'),
(39, 51, 'Asphalt'),
(40, 51, 'Gravel'),
(41, 51, 'Earthfill'),
(42, 55, 'Steel'),
(43, 55, 'Concrete'),
(44, 55, 'Composite'),
(45, 55, 'Jumbo'),
(46, 55, 'Bailey'),
(47, 55, 'Footbridge'),
(48, 61, 'Steel'),
(49, 61, 'Concrete'),
(50, 61, 'Composite'),
(51, 61, 'Jumbo'),
(52, 61, 'Bailey'),
(53, 61, 'Footbridge'),
(54, 67, 'Steel'),
(55, 67, 'Concrete'),
(56, 67, 'Composite'),
(57, 67, 'Jumbo'),
(58, 67, 'Bailey'),
(59, 67, 'Footbridge'),
(60, 73, 'Steel'),
(61, 73, 'Concrete'),
(62, 73, 'Composite'),
(63, 73, 'Jumbo'),
(64, 73, 'Bailey'),
(65, 73, 'Footbridge'),
(66, 79, 'Steel'),
(67, 79, 'Concrete'),
(68, 79, 'Composite'),
(69, 79, 'Jumbo'),
(70, 79, 'Bailey'),
(71, 79, 'Footbridge'),
(72, 85, 'Steel'),
(73, 85, 'Concrete'),
(74, 85, 'Composite'),
(75, 85, 'Jumbo'),
(76, 85, 'Bailey'),
(77, 85, 'Footbridge'),
(78, 91, 'Steel'),
(79, 91, 'Concrete'),
(80, 91, 'Composite'),
(81, 91, 'Jumbo'),
(82, 91, 'Bailey'),
(83, 91, 'Footbridge'),
(84, 97, 'Steel'),
(85, 97, 'Concrete'),
(86, 97, 'Composite'),
(87, 97, 'Jumbo'),
(88, 97, 'Bailey'),
(89, 97, 'Footbridge'),
(90, 117, 'College'),
(91, 117, 'University'),
(92, 119, 'Public'),
(93, 119, 'Private'),
(94, 121, 'Public'),
(95, 121, 'Private'),
(96, 123, 'Index'),
(97, 123, 'Non-index'),
(98, 135, 'Trading'),
(99, 135, 'Services'),
(100, 135, 'Manufacturing');

-- --------------------------------------------------------

--
-- Table structure for table `municipal`
--

CREATE TABLE `municipal` (
  `id` int(11) NOT NULL,
  `municipality` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `municipal`
--

INSERT INTO `municipal` (`id`, `municipality`) VALUES
(1, 'Agoo'),
(2, 'Aringay'),
(3, 'Bacnotan'),
(4, 'Bagulin'),
(5, 'Balaoan'),
(6, 'Bangar'),
(7, 'Bauang'),
(8, 'Burgos'),
(9, 'Caba'),
(10, 'Luna'),
(11, 'Naguilian'),
(12, 'Pugo'),
(13, 'Rosario'),
(14, 'San Fernando'),
(15, 'San Gabriel'),
(16, 'San Juan'),
(17, 'Santo Tomas'),
(18, 'Santol'),
(19, 'Sudipen'),
(20, 'Tubao');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `sector_no` int(11) NOT NULL,
  `account_no` int(11) NOT NULL,
  `description` varchar(500) NOT NULL,
  `system_date` date NOT NULL,
  `is_hidden` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `sector_no`, `account_no`, `description`, `system_date`, `is_hidden`) VALUES
(1, 1, 1, 'Agoo has updated Macro Sector Info', '2017-10-25', 0),
(2, 1, 11, 'Naguilian has added Macro Sector', '2017-10-25', 0),
(3, 1, 12, 'Pugo has added Macro Sector', '2017-10-25', 0),
(4, 1, 20, 'Tubao has added Macro Sector', '2017-10-25', 0),
(5, 1, 19, 'Sudipen has added Macro Sector', '2017-10-25', 0),
(6, 1, 17, 'Santo Tomas has added Macro Sector', '2017-10-25', 0),
(7, 1, 16, 'San Juan has added Macro Sector', '2017-10-25', 0),
(8, 1, 13, 'Rosario has added Macro Sector', '2017-10-25', 0),
(9, 1, 14, 'San Fernando has added Macro Sector', '2017-10-25', 0),
(10, 1, 15, 'San Gabriel has added Macro Sector', '2017-10-25', 0);

-- --------------------------------------------------------

--
-- Table structure for table `parameters`
--

CREATE TABLE `parameters` (
  `parameter_id` int(11) NOT NULL,
  `parameter_no` int(11) DEFAULT NULL,
  `parameter_name` varchar(50) DEFAULT NULL,
  `is_tabular` tinyint(4) NOT NULL DEFAULT '0',
  `is_tabular_multiple` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parameters`
--

INSERT INTO `parameters` (`parameter_id`, `parameter_no`, `parameter_name`, `is_tabular`, `is_tabular_multiple`) VALUES
(1, 1, 'Physical Characteristics', 0, 0),
(2, 1, 'Demographics', 0, 0),
(3, 2, 'Employment and Development Finance', 0, 0),
(4, 3, 'Existing Land User Distribution', 0, 0),
(5, 3, 'Land Classification', 0, 0),
(6, 4, 'Food Sufficiency - Plants', 0, 1),
(7, 5, 'Road Network', 0, 0),
(8, 5, 'Bridges', 0, 0),
(9, 6, 'Social Welfare', 0, 0),
(10, 7, 'Health Sector', 0, 0),
(11, 8, 'Education Sector', 0, 0),
(12, 9, 'Development Administration Sector', 0, 0),
(13, 10, 'Trade, Industry and Tourism Sector', 0, 0),
(14, 3, 'LIST OF WATER BODIES', 1, 0),
(15, 2, 'Employment And Income Generated By Commodity', 1, 0),
(16, 10, 'Investible Areas', 0, 0),
(17, 10, 'Existing and Potential Industries', 0, 0),
(18, 10, 'Enterprises', 0, 0),
(19, 10, 'Tour Guides', 0, 0),
(20, 10, 'Transport Groups', 0, 0),
(21, 10, 'Travel Operator', 0, 0),
(22, 10, 'Tourist Destinations', 0, 0),
(23, 10, 'Convention Facilities', 0, 0),
(24, 10, 'Shopping Centers', 0, 0),
(25, 10, 'Accommodation Establishments', 0, 0),
(26, 10, 'Agri-Tourism Sites', 0, 0),
(27, 10, 'Dining, Entertainment and Rest Areas', 0, 0),
(28, 10, 'Recreation Centre', 0, 0),
(29, 10, 'Convention Facilities', 0, 0),
(31, 10, 'Industry and Tourism', 0, 0),
(32, 4, 'Food Sufficiency - Animals', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `parameter_items`
--

CREATE TABLE `parameter_items` (
  `item_id` int(11) NOT NULL,
  `item_parameter` int(11) DEFAULT NULL,
  `item_attribute` varchar(500) DEFAULT NULL,
  `is_group_item` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parameter_items`
--

INSERT INTO `parameter_items` (`item_id`, `item_parameter`, `item_attribute`, `is_group_item`) VALUES
(1, 1, 'Land Area', 0),
(2, 1, 'Terrain', 0),
(3, 1, 'Climate', 0),
(4, 1, 'Number of Barangays', 0),
(5, 2, 'Population', 0),
(6, 2, 'Growth Rate', 0),
(7, 2, 'Population Density', 0),
(8, 2, 'Number of Households', 0),
(9, 2, 'Number of Families', 0),
(10, 2, 'Major Dialects/Languages', 0),
(11, 2, 'Religion', 0),
(12, 2, 'Literacy Rate', 0),
(13, 3, 'Labor Force No', 0),
(14, 3, 'Employment Rate', 0),
(15, 3, 'Employment Distribution', 1),
(18, 3, 'Poverty Incidence', 0),
(19, 3, 'Magnitude of Poor Families', 0),
(20, 3, 'Magnitude of Poor Population', 0),
(21, 3, 'Classification', 0),
(22, 3, 'Municipal Gov\'t Revenue', 0),
(23, 3, 'Municipal Gov\'t Expenditures', 0),
(24, 4, 'Agricultural Areas', 0),
(30, 5, 'Certified A&D', 0),
(31, 5, 'Public Forest Land', 0),
(32, 5, 'Number of Barangays ', 0),
(33, 5, 'Upland', 0),
(34, 5, 'Lowland', 0),
(35, 5, 'Coastal', 0),
(36, 5, 'Riverside', 0),
(37, 5, 'Number of Sawmills', 0),
(38, 5, 'Number of Lumber Dealers', 0),
(39, 7, 'Barangay Road', 1),
(43, 7, 'Municipal Road', 1),
(47, 7, 'Provincial Road', 1),
(51, 7, 'National Road', 1),
(55, 8, 'Barangay Bridges (Total Number of Span)', 1),
(61, 8, 'Barangay Bridges (Total Length)', 1),
(67, 8, 'Municipal Bridges (Total Number of Span)', 1),
(73, 8, 'Municipal Bridges (Total Length)', 1),
(79, 8, 'Provincial Bridges (Total Number of Span)', 1),
(85, 8, 'Provincial Bridges (Total Length)', 1),
(91, 8, 'National Bridges (Total Number of Span)', 1),
(97, 8, 'National Bridges (Total Length)', 1),
(103, 9, 'Number of Day Care Center', 0),
(104, 9, 'Number of Day Care Worker', 0),
(105, 9, 'Number of Day Care Children', 0),
(106, 10, 'Crude Birth Rate', 0),
(107, 10, 'Crude Death Rate', 0),
(108, 10, 'Maternal Mortality Rate', 0),
(109, 10, 'Infant Mortality Rate', 0),
(110, 10, 'Morbidity Rate', 0),
(111, 10, 'Mortality Rate', 0),
(112, 10, 'Contraceptive Prevalence Rate', 0),
(113, 10, 'Malnutrition Rate Pre School', 0),
(114, 10, 'Malnutrition Rate In School', 0),
(115, 10, 'Number of Hospital', 0),
(116, 10, 'Number of Clinics', 0),
(117, 11, 'Number of Tertiary Schools', 1),
(119, 11, 'Number of Secondary Schools', 1),
(121, 11, 'Number of Elementary Schools', 1),
(123, 12, 'Crime Rate', 1),
(125, 12, 'Number of Cooperatives', 0),
(126, 12, 'Number of Banks', 0),
(127, 12, 'Number of Lending Institutions', 0),
(128, 12, 'Number of Messengerial Office', 0),
(129, 12, 'Number of Fire Trucks', 0),
(130, 12, 'Number of Radio Stations', 0),
(131, 13, 'Date of Parochial Fiesta', 0),
(132, 13, 'Date of Town Fiesta', 0),
(133, 13, 'Name of Patron', 0),
(134, 13, 'Market Days', 0),
(135, 13, 'Number of Business Establishments', 1),
(138, 13, 'Number of Beauty Parlor', 0),
(139, 13, 'Number of Barber Shops', 0),
(140, 13, 'Number of Photo Studios/Video Shops', 0),
(141, 13, 'Number of Tailoring/Dress Shop', 0),
(142, 13, 'Number of Restaurants', 0),
(143, 13, 'Number of Eateries/Canteen', 0),
(145, 13, 'Number of Funeral Parlor', 0),
(146, 13, 'Number of Gasoline Stations', 0),
(147, 13, 'Number of Water Stations', 0),
(148, 13, 'Number of Resorts', 0),
(149, 13, 'Others', 0),
(151, 14, 'RIVERS', 0),
(152, 14, 'ESTEROS/CREEKS', 0),
(153, 14, 'CANALS', 0),
(154, 15, 'Commodity', 0),
(155, 15, 'Employment Generated', 0),
(156, 15, 'Income Generated (PhP.)', 0),
(157, 16, 'Location', 0),
(158, 16, 'Projects', 0),
(159, 17, 'Location', 0),
(160, 17, 'Major Resources', 0),
(161, 17, 'Potential Industry', 0),
(162, 18, 'Name of Enterprise', 0),
(163, 18, 'Product', 0),
(164, 18, 'Classification', 0),
(165, 18, 'Volume', 0),
(166, 18, 'Address', 0),
(167, 18, 'Name of Owner', 0),
(168, 18, 'Ownership', 1),
(169, 19, 'Name', 0),
(170, 19, 'Dot Accreditation', 1),
(171, 19, 'Address', 0),
(172, 19, 'Contact Number', 0),
(173, 20, 'Name', 0),
(174, 20, 'Dot Accreditation', 1),
(175, 20, 'Address', 0),
(176, 20, 'Contact Number', 0),
(177, 21, 'Name', 0),
(178, 21, 'Dot Accreditation', 1),
(179, 21, 'Address', 0),
(180, 20, 'Contact Number', 0),
(181, 22, 'Name of Site', 0),
(182, 22, 'Description', 0),
(183, 22, 'Status', 0),
(184, 22, 'Type', 0),
(185, 23, 'Name of Establishment', 0),
(186, 23, 'Type', 0),
(187, 23, 'Category', 0),
(188, 23, 'Address', 0),
(189, 23, 'Contact Person', 0),
(190, 23, 'Telephone Number', 0),
(191, 23, 'FAX Number', 0),
(192, 23, 'E-mail Address', 0),
(193, 23, 'No. of Rooms', 0),
(194, 23, 'Meeting Facilities', 0),
(195, 23, 'Maximum Capacity', 0),
(196, 24, 'Name of Establishment', 0),
(197, 24, 'Address', 0),
(198, 24, 'Telephone Number', 0),
(199, 24, 'Type of Merchandize', 0),
(200, 24, 'Facilities', 0),
(201, 25, 'Name of Establishment', 0),
(202, 25, 'Address', 0),
(203, 25, 'Type', 0),
(204, 25, 'No. of Rooms', 0),
(205, 25, 'Classification', 0),
(206, 25, 'Dot Accredited', 1),
(207, 26, 'Name of Site', 0),
(208, 26, 'Description', 0),
(209, 26, 'Location', 0),
(210, 27, 'Name of Establishment', 0),
(211, 27, 'Contact Person', 0),
(212, 27, 'Type of Establishment', 0),
(213, 27, 'Type of Food/Specialty', 0),
(214, 28, 'Recreation Centre', 0),
(215, 28, 'Telephone Number', 0),
(216, 28, 'Equipment/Facilities', 0),
(217, 28, 'Rates', 0),
(218, 29, 'Name of Establishment', 0),
(219, 29, 'Type', 0),
(220, 29, 'Category', 0),
(221, 29, 'Address', 0),
(222, 29, 'Contact Person', 0),
(223, 29, 'Telephone Number', 0),
(224, 29, 'FAX Number', 0),
(225, 29, 'E-mail Address', 0),
(226, 29, 'No. of Rooms', 0),
(227, 29, 'Meeting Facilities', 0),
(228, 29, 'Maximum Capacity', 0),
(229, 31, 'Number of Tourist Arrivals', 1),
(230, 31, 'Average Occupancy rate', 0),
(231, 31, 'Average Length of stay', 0),
(232, 31, 'No. of Tourist Destination', 0),
(233, 31, 'Job Generated', 1),
(234, 31, 'No. of Establishments', 1),
(235, 31, 'Employment', 1),
(236, 6, 'Commodity', 0),
(237, 6, 'Area (has.)', 0),
(238, 6, 'Production (tons)', 0),
(239, 6, 'Sufficiency Level (%)', 0),
(240, 4, 'Grassland/Shrubland Areas', 0),
(241, 4, 'Forest/Wooded Areas', 0),
(242, 4, 'Bareland Areas', 0),
(243, 4, 'Wetland Areas', 0),
(244, 4, 'Built-up Areas', 0),
(245, 5, 'Length of RIVERBANKS', 0),
(246, 5, 'SEASHORES', 0),
(247, 32, 'Commodity', 0),
(248, 32, 'Production (tons)', 0),
(249, 32, 'Sufficiency Level (%)', 0),
(250, 12, 'Number of Postal Services', 0);

-- --------------------------------------------------------

--
-- Table structure for table `parameter_table_row`
--

CREATE TABLE `parameter_table_row` (
  `table_row_id` int(11) NOT NULL,
  `table_row_item` int(11) NOT NULL,
  `table_row_description` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parameter_table_row`
--

INSERT INTO `parameter_table_row` (`table_row_id`, `table_row_item`, `table_row_description`) VALUES
(1, 6, 'Palay/Rice'),
(2, 6, 'Corn'),
(3, 6, 'Fruit Vegetable'),
(4, 6, 'Leafy Vegetable'),
(5, 6, 'Fruits'),
(6, 6, 'Legumes'),
(7, 6, 'Rootcrops'),
(8, 6, 'Fish'),
(9, 32, 'Pork'),
(10, 32, 'Chevon'),
(11, 32, 'Carabeef'),
(12, 32, 'Beef'),
(13, 32, 'Poultry');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `profile_id` int(11) NOT NULL,
  `profile_year` varchar(4) DEFAULT NULL,
  `municipality` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `pb_north` varchar(50) DEFAULT NULL,
  `pb_south` varchar(50) DEFAULT NULL,
  `pb_east` varchar(50) DEFAULT NULL,
  `pb_west` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` (`profile_id`, `profile_year`, `municipality`, `location`, `pb_north`, `pb_south`, `pb_east`, `pb_west`) VALUES
(1, '2017', '1', 'Agoo', 'Thomas', 'Bauang', 'San Fernandos', 'Caba'),
(2, '2017', '2', NULL, NULL, NULL, NULL, NULL),
(3, '2017', '3', NULL, NULL, NULL, NULL, NULL),
(4, '2017', '4', NULL, NULL, NULL, NULL, NULL),
(5, '2017', '5', NULL, NULL, NULL, NULL, NULL),
(6, '2017', '6', NULL, NULL, NULL, NULL, NULL),
(7, '2017', '7', NULL, NULL, NULL, NULL, NULL),
(8, '2017', '8', NULL, NULL, NULL, NULL, NULL),
(9, '2017', '9', NULL, NULL, NULL, NULL, NULL),
(10, '2017', '10', NULL, NULL, NULL, NULL, NULL),
(11, '2017', '11', NULL, NULL, NULL, NULL, NULL),
(12, '2017', '12', NULL, NULL, NULL, NULL, NULL),
(13, '2017', '13', NULL, NULL, NULL, NULL, NULL),
(14, '2017', '14', NULL, NULL, NULL, NULL, NULL),
(15, '2017', '15', NULL, NULL, NULL, NULL, NULL),
(16, '2017', '16', NULL, NULL, NULL, NULL, NULL),
(17, '2017', '17', NULL, NULL, NULL, NULL, NULL),
(18, '2017', '18', NULL, NULL, NULL, NULL, NULL),
(19, '2017', '19', NULL, NULL, NULL, NULL, NULL),
(20, '2017', '20', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `profile_item_groups`
--

CREATE TABLE `profile_item_groups` (
  `id` int(11) NOT NULL,
  `profile_parameter_item_id` int(11) NOT NULL,
  `item_group_id` int(11) NOT NULL,
  `item_group_value` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile_item_groups`
--

INSERT INTO `profile_item_groups` (`id`, `profile_parameter_item_id`, `item_group_id`, `item_group_value`) VALUES
(1, 15, 1, '1'),
(2, 15, 2, '1'),
(3, 15, 3, '1'),
(4, 103, 1, ''),
(5, 103, 2, ''),
(6, 103, 3, ''),
(7, 117, 98, ''),
(8, 117, 99, ''),
(9, 117, 100, ''),
(10, 140, 6, ''),
(11, 140, 7, ''),
(12, 142, 8, ''),
(13, 142, 9, ''),
(14, 146, 10, ''),
(15, 146, 11, ''),
(16, 151, 12, ''),
(17, 151, 13, ''),
(18, 178, 14, ''),
(19, 178, 15, ''),
(20, 201, 16, ''),
(21, 201, 17, ''),
(22, 205, 18, ''),
(23, 205, 19, ''),
(24, 206, 20, ''),
(25, 206, 21, ''),
(26, 206, 22, ''),
(27, 207, 23, ''),
(28, 207, 24, ''),
(29, 207, 25, '');

-- --------------------------------------------------------

--
-- Table structure for table `profile_sectors`
--

CREATE TABLE `profile_sectors` (
  `id` int(10) NOT NULL,
  `profile_id` int(10) NOT NULL,
  `sector_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile_sectors`
--

INSERT INTO `profile_sectors` (`id`, `profile_id`, `sector_id`) VALUES
(1, 2, 1),
(2, 2, 2),
(3, 2, 3),
(4, 2, 4),
(5, 2, 6),
(6, 1, 1),
(7, 1, 2),
(8, 2, 10),
(9, 3, 1),
(10, 4, 1),
(11, 5, 1),
(12, 6, 1),
(13, 7, 1),
(14, 8, 1),
(15, 9, 1),
(16, 10, 1),
(17, 11, 1),
(18, 12, 1),
(19, 20, 1),
(20, 19, 1),
(21, 17, 1),
(22, 16, 1),
(23, 13, 1),
(24, 14, 1),
(25, 15, 1);

-- --------------------------------------------------------

--
-- Table structure for table `profile_sector_parameters`
--

CREATE TABLE `profile_sector_parameters` (
  `id` int(10) NOT NULL,
  `profile_sector_id` int(10) NOT NULL,
  `parameter_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile_sector_parameters`
--

INSERT INTO `profile_sector_parameters` (`id`, `profile_sector_id`, `parameter_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 2, 15),
(5, 3, 4),
(6, 3, 5),
(7, 3, 14),
(8, 4, 6),
(9, 4, 32),
(10, 5, 9),
(11, 6, 1),
(12, 6, 2),
(13, 7, 3),
(14, 7, 15),
(15, 8, 13),
(16, 8, 16),
(17, 8, 17),
(18, 8, 18),
(19, 8, 19),
(20, 8, 20),
(21, 8, 21),
(22, 8, 22),
(23, 8, 23),
(24, 8, 24),
(25, 8, 25),
(26, 8, 26),
(27, 8, 27),
(28, 8, 28),
(29, 8, 29),
(30, 8, 31),
(31, 9, 1),
(32, 9, 2),
(33, 10, 1),
(34, 10, 2),
(35, 11, 1),
(36, 11, 2),
(37, 12, 1),
(38, 12, 2),
(39, 13, 1),
(40, 13, 2),
(41, 14, 1),
(42, 14, 2),
(43, 15, 1),
(44, 15, 2),
(45, 16, 1),
(46, 16, 2),
(47, 17, 1),
(48, 17, 2),
(49, 18, 1),
(50, 18, 2),
(51, 19, 1),
(52, 19, 2),
(53, 20, 1),
(54, 20, 2),
(55, 21, 1),
(56, 21, 2),
(57, 22, 1),
(58, 22, 2),
(59, 23, 1),
(60, 23, 2),
(61, 24, 1),
(62, 24, 2),
(63, 25, 1),
(64, 25, 2);

-- --------------------------------------------------------

--
-- Table structure for table `profile_sector_parameter_items`
--

CREATE TABLE `profile_sector_parameter_items` (
  `id` int(10) NOT NULL,
  `profile_sector_parameter_id` int(10) NOT NULL,
  `item_id` int(10) NOT NULL,
  `item_table_row` int(10) NOT NULL DEFAULT '0',
  `item_value` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `profile_sector_parameter_items`
--

INSERT INTO `profile_sector_parameter_items` (`id`, `profile_sector_parameter_id`, `item_id`, `item_table_row`, `item_value`) VALUES
(1, 1, 1, 0, '1'),
(2, 1, 2, 0, '2'),
(3, 1, 3, 0, '2'),
(4, 1, 4, 0, '2'),
(5, 2, 5, 0, '2'),
(6, 2, 6, 0, '24'),
(7, 2, 7, 0, '4'),
(8, 2, 8, 0, '4'),
(9, 2, 9, 0, '3'),
(10, 2, 10, 0, '4'),
(11, 2, 11, 0, '4'),
(12, 2, 12, 0, '3'),
(13, 3, 13, 0, '1'),
(14, 3, 14, 0, '1'),
(15, 3, 15, 0, ''),
(16, 3, 18, 0, '1'),
(17, 3, 19, 0, '1'),
(18, 3, 20, 0, '1'),
(19, 3, 21, 0, '1'),
(20, 3, 22, 0, '1'),
(21, 3, 23, 0, '1'),
(22, 4, 154, 0, '1'),
(23, 4, 155, 0, '1'),
(24, 4, 156, 0, '1'),
(25, 5, 24, 0, '1'),
(26, 5, 240, 0, '1'),
(27, 5, 241, 0, '1'),
(28, 5, 242, 0, '1'),
(29, 5, 243, 0, '1'),
(30, 5, 244, 0, '1'),
(31, 6, 30, 0, '1'),
(32, 6, 31, 0, '1'),
(33, 6, 32, 0, '1'),
(34, 6, 33, 0, '1'),
(35, 6, 34, 0, '1'),
(36, 6, 35, 0, '1'),
(37, 6, 36, 0, '1'),
(38, 6, 37, 0, '1'),
(39, 6, 38, 0, '1'),
(40, 6, 245, 0, '1'),
(41, 6, 246, 0, '1'),
(42, 7, 151, 0, '1'),
(43, 7, 152, 0, '1'),
(44, 7, 153, 0, '1'),
(45, 8, 236, 0, ''),
(46, 8, 237, 0, ''),
(47, 8, 238, 0, ''),
(48, 8, 239, 0, ''),
(49, 8, 237, 1, '1'),
(50, 8, 237, 2, '1'),
(51, 8, 237, 3, '1'),
(52, 8, 237, 4, '1'),
(53, 8, 237, 5, '1'),
(54, 8, 237, 6, '1'),
(55, 8, 237, 7, '1'),
(56, 8, 237, 8, '1'),
(57, 8, 238, 1, '1'),
(58, 8, 238, 2, '1'),
(59, 8, 238, 3, '1'),
(60, 8, 238, 4, '1'),
(61, 8, 238, 5, '1'),
(62, 8, 238, 6, '1'),
(63, 8, 238, 7, '1'),
(64, 8, 238, 8, '1'),
(65, 8, 239, 1, '1'),
(66, 8, 239, 2, '1'),
(67, 8, 239, 3, '1'),
(68, 8, 239, 4, '1'),
(69, 8, 239, 5, '1'),
(70, 8, 239, 6, '1'),
(71, 8, 239, 7, '1'),
(72, 8, 239, 8, '1'),
(73, 9, 247, 0, ''),
(74, 9, 248, 0, ''),
(75, 9, 249, 0, ''),
(76, 9, 248, 9, '1'),
(77, 9, 248, 10, '1'),
(78, 9, 248, 11, '1'),
(79, 9, 248, 12, '1'),
(80, 9, 248, 13, '1'),
(81, 9, 249, 9, '1'),
(82, 9, 249, 10, '1'),
(83, 9, 249, 11, '1'),
(84, 9, 249, 12, '11'),
(85, 9, 249, 13, '1'),
(86, 10, 103, 0, '55'),
(87, 10, 104, 0, '56'),
(88, 10, 105, 0, '666'),
(89, 11, 1, 0, '2'),
(90, 11, 2, 0, ''),
(91, 11, 3, 0, '2'),
(92, 11, 4, 0, ''),
(93, 12, 5, 0, '5'),
(94, 12, 6, 0, '3'),
(95, 12, 7, 0, '3'),
(96, 12, 8, 0, '3'),
(97, 12, 9, 0, '3'),
(98, 12, 10, 0, '3'),
(99, 12, 11, 0, '3'),
(100, 12, 12, 0, '3'),
(101, 13, 13, 0, '2'),
(102, 13, 14, 0, '1'),
(103, 13, 15, 0, ''),
(104, 13, 18, 0, ''),
(105, 13, 19, 0, ''),
(106, 13, 20, 0, ''),
(107, 13, 21, 0, ''),
(108, 13, 22, 0, ''),
(109, 13, 23, 0, ''),
(110, 14, 154, 0, ''),
(111, 14, 155, 0, ''),
(112, 14, 156, 0, ''),
(113, 15, 131, 0, '2017-10-05T16:00:00.000Z'),
(114, 15, 132, 0, '2017-10-06T16:00:00.000Z'),
(115, 15, 133, 0, ''),
(116, 15, 134, 0, ''),
(117, 15, 135, 0, ''),
(118, 15, 138, 0, ''),
(119, 15, 139, 0, ''),
(120, 15, 140, 0, ''),
(121, 15, 141, 0, ''),
(122, 15, 142, 0, ''),
(123, 15, 143, 0, ''),
(124, 15, 145, 0, ''),
(125, 15, 146, 0, ''),
(126, 15, 147, 0, ''),
(127, 15, 148, 0, ''),
(128, 15, 149, 0, ''),
(129, 16, 157, 0, ''),
(130, 16, 158, 0, ''),
(131, 17, 159, 0, ''),
(132, 17, 160, 0, ''),
(133, 17, 161, 0, ''),
(134, 18, 162, 0, ''),
(135, 18, 163, 0, ''),
(136, 18, 164, 0, ''),
(137, 18, 165, 0, ''),
(138, 18, 166, 0, ''),
(139, 18, 167, 0, ''),
(140, 18, 168, 0, ''),
(141, 19, 169, 0, ''),
(142, 19, 170, 0, ''),
(143, 19, 171, 0, ''),
(144, 19, 172, 0, ''),
(145, 20, 173, 0, ''),
(146, 20, 174, 0, ''),
(147, 20, 175, 0, ''),
(148, 20, 176, 0, ''),
(149, 20, 180, 0, ''),
(150, 21, 177, 0, ''),
(151, 21, 178, 0, ''),
(152, 21, 179, 0, ''),
(153, 22, 181, 0, ''),
(154, 22, 182, 0, ''),
(155, 22, 183, 0, ''),
(156, 22, 184, 0, ''),
(157, 23, 185, 0, ''),
(158, 23, 186, 0, ''),
(159, 23, 187, 0, ''),
(160, 23, 188, 0, ''),
(161, 23, 189, 0, ''),
(162, 23, 190, 0, ''),
(163, 23, 191, 0, ''),
(164, 23, 192, 0, ''),
(165, 23, 193, 0, ''),
(166, 23, 194, 0, ''),
(167, 23, 195, 0, ''),
(168, 24, 196, 0, ''),
(169, 24, 197, 0, ''),
(170, 24, 198, 0, ''),
(171, 24, 199, 0, ''),
(172, 24, 200, 0, ''),
(173, 25, 201, 0, ''),
(174, 25, 202, 0, ''),
(175, 25, 203, 0, ''),
(176, 25, 204, 0, ''),
(177, 25, 205, 0, ''),
(178, 25, 206, 0, ''),
(179, 26, 207, 0, ''),
(180, 26, 208, 0, ''),
(181, 26, 209, 0, ''),
(182, 27, 210, 0, ''),
(183, 27, 211, 0, ''),
(184, 27, 212, 0, ''),
(185, 27, 213, 0, ''),
(186, 28, 214, 0, ''),
(187, 28, 215, 0, ''),
(188, 28, 216, 0, ''),
(189, 28, 217, 0, ''),
(190, 29, 218, 0, ''),
(191, 29, 219, 0, ''),
(192, 29, 220, 0, ''),
(193, 29, 221, 0, ''),
(194, 29, 222, 0, ''),
(195, 29, 223, 0, ''),
(196, 29, 224, 0, ''),
(197, 29, 225, 0, ''),
(198, 29, 226, 0, ''),
(199, 29, 227, 0, ''),
(200, 29, 228, 0, ''),
(201, 30, 229, 0, ''),
(202, 30, 230, 0, ''),
(203, 30, 231, 0, ''),
(204, 30, 232, 0, ''),
(205, 30, 233, 0, ''),
(206, 30, 234, 0, ''),
(207, 30, 235, 0, ''),
(208, 31, 1, 0, ''),
(209, 31, 2, 0, ''),
(210, 31, 3, 0, ''),
(211, 31, 4, 0, ''),
(212, 32, 5, 0, '5'),
(213, 32, 6, 0, ''),
(214, 32, 7, 0, ''),
(215, 32, 8, 0, ''),
(216, 32, 9, 0, ''),
(217, 32, 10, 0, ''),
(218, 32, 11, 0, ''),
(219, 32, 12, 0, ''),
(220, 33, 1, 0, ''),
(221, 33, 2, 0, ''),
(222, 33, 3, 0, ''),
(223, 33, 4, 0, ''),
(224, 34, 5, 0, '7'),
(225, 34, 6, 0, ''),
(226, 34, 7, 0, ''),
(227, 34, 8, 0, ''),
(228, 34, 9, 0, ''),
(229, 34, 10, 0, ''),
(230, 34, 11, 0, ''),
(231, 34, 12, 0, ''),
(232, 35, 1, 0, ''),
(233, 35, 2, 0, ''),
(234, 35, 3, 0, ''),
(235, 35, 4, 0, ''),
(236, 36, 5, 0, '4'),
(237, 36, 6, 0, ''),
(238, 36, 7, 0, ''),
(239, 36, 8, 0, ''),
(240, 36, 9, 0, ''),
(241, 36, 10, 0, ''),
(242, 36, 11, 0, ''),
(243, 36, 12, 0, ''),
(244, 37, 1, 0, ''),
(245, 37, 2, 0, ''),
(246, 37, 3, 0, ''),
(247, 37, 4, 0, ''),
(248, 38, 5, 0, '12'),
(249, 38, 6, 0, ''),
(250, 38, 7, 0, ''),
(251, 38, 8, 0, ''),
(252, 38, 9, 0, ''),
(253, 38, 10, 0, ''),
(254, 38, 11, 0, ''),
(255, 38, 12, 0, ''),
(256, 39, 1, 0, ''),
(257, 39, 2, 0, ''),
(258, 39, 3, 0, ''),
(259, 39, 4, 0, ''),
(260, 40, 5, 0, '2'),
(261, 40, 6, 0, ''),
(262, 40, 7, 0, ''),
(263, 40, 8, 0, ''),
(264, 40, 9, 0, ''),
(265, 40, 10, 0, ''),
(266, 40, 11, 0, ''),
(267, 40, 12, 0, ''),
(268, 41, 1, 0, ''),
(269, 41, 2, 0, ''),
(270, 41, 3, 0, ''),
(271, 41, 4, 0, ''),
(272, 42, 5, 0, '5'),
(273, 42, 6, 0, ''),
(274, 42, 7, 0, ''),
(275, 42, 8, 0, ''),
(276, 42, 9, 0, ''),
(277, 42, 10, 0, ''),
(278, 42, 11, 0, ''),
(279, 42, 12, 0, ''),
(280, 43, 1, 0, ''),
(281, 43, 2, 0, ''),
(282, 43, 3, 0, ''),
(283, 43, 4, 0, ''),
(284, 44, 5, 0, '5'),
(285, 44, 6, 0, ''),
(286, 44, 7, 0, ''),
(287, 44, 8, 0, ''),
(288, 44, 9, 0, ''),
(289, 44, 10, 0, ''),
(290, 44, 11, 0, ''),
(291, 44, 12, 0, ''),
(292, 45, 1, 0, ''),
(293, 45, 2, 0, ''),
(294, 45, 3, 0, ''),
(295, 45, 4, 0, ''),
(296, 46, 5, 0, '6'),
(297, 46, 6, 0, ''),
(298, 46, 7, 0, ''),
(299, 46, 8, 0, ''),
(300, 46, 9, 0, ''),
(301, 46, 10, 0, ''),
(302, 46, 11, 0, ''),
(303, 46, 12, 0, ''),
(304, 47, 1, 0, ''),
(305, 47, 2, 0, ''),
(306, 47, 3, 0, ''),
(307, 47, 4, 0, ''),
(308, 48, 5, 0, '8'),
(309, 48, 6, 0, ''),
(310, 48, 7, 0, ''),
(311, 48, 8, 0, ''),
(312, 48, 9, 0, ''),
(313, 48, 10, 0, ''),
(314, 48, 11, 0, ''),
(315, 48, 12, 0, ''),
(316, 49, 1, 0, ''),
(317, 49, 2, 0, ''),
(318, 49, 3, 0, ''),
(319, 49, 4, 0, ''),
(320, 50, 5, 0, '9'),
(321, 50, 6, 0, ''),
(322, 50, 7, 0, ''),
(323, 50, 8, 0, ''),
(324, 50, 9, 0, ''),
(325, 50, 10, 0, ''),
(326, 50, 11, 0, ''),
(327, 50, 12, 0, ''),
(328, 51, 1, 0, ''),
(329, 51, 2, 0, ''),
(330, 51, 3, 0, ''),
(331, 51, 4, 0, ''),
(332, 52, 5, 0, '7'),
(333, 52, 6, 0, ''),
(334, 52, 7, 0, ''),
(335, 52, 8, 0, ''),
(336, 52, 9, 0, ''),
(337, 52, 10, 0, ''),
(338, 52, 11, 0, ''),
(339, 52, 12, 0, ''),
(340, 53, 1, 0, ''),
(341, 53, 2, 0, ''),
(342, 53, 3, 0, ''),
(343, 53, 4, 0, ''),
(344, 54, 5, 0, '12'),
(345, 54, 6, 0, ''),
(346, 54, 7, 0, ''),
(347, 54, 8, 0, ''),
(348, 54, 9, 0, ''),
(349, 54, 10, 0, ''),
(350, 54, 11, 0, ''),
(351, 54, 12, 0, ''),
(352, 55, 1, 0, ''),
(353, 55, 2, 0, ''),
(354, 55, 3, 0, ''),
(355, 55, 4, 0, ''),
(356, 56, 5, 0, '13'),
(357, 56, 6, 0, ''),
(358, 56, 7, 0, ''),
(359, 56, 8, 0, ''),
(360, 56, 9, 0, ''),
(361, 56, 10, 0, ''),
(362, 56, 11, 0, ''),
(363, 56, 12, 0, ''),
(364, 57, 1, 0, ''),
(365, 57, 2, 0, ''),
(366, 57, 3, 0, ''),
(367, 57, 4, 0, ''),
(368, 58, 5, 0, '30'),
(369, 58, 6, 0, ''),
(370, 58, 7, 0, ''),
(371, 58, 8, 0, ''),
(372, 58, 9, 0, ''),
(373, 58, 10, 0, ''),
(374, 58, 11, 0, ''),
(375, 58, 12, 0, ''),
(376, 59, 1, 0, ''),
(377, 59, 2, 0, ''),
(378, 59, 3, 0, ''),
(379, 59, 4, 0, ''),
(380, 60, 5, 0, '12'),
(381, 60, 6, 0, ''),
(382, 60, 7, 0, ''),
(383, 60, 8, 0, ''),
(384, 60, 9, 0, ''),
(385, 60, 10, 0, ''),
(386, 60, 11, 0, ''),
(387, 60, 12, 0, ''),
(388, 61, 1, 0, ''),
(389, 61, 2, 0, ''),
(390, 61, 3, 0, ''),
(391, 61, 4, 0, ''),
(392, 62, 5, 0, '35'),
(393, 62, 6, 0, ''),
(394, 62, 7, 0, ''),
(395, 62, 8, 0, ''),
(396, 62, 9, 0, ''),
(397, 62, 10, 0, ''),
(398, 62, 11, 0, ''),
(399, 62, 12, 0, ''),
(400, 63, 1, 0, ''),
(401, 63, 2, 0, ''),
(402, 63, 3, 0, ''),
(403, 63, 4, 0, ''),
(404, 64, 5, 0, '14'),
(405, 64, 6, 0, ''),
(406, 64, 7, 0, ''),
(407, 64, 8, 0, ''),
(408, 64, 9, 0, ''),
(409, 64, 10, 0, ''),
(410, 64, 11, 0, ''),
(411, 64, 12, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `sectors`
--

CREATE TABLE `sectors` (
  `sector_id` int(11) NOT NULL,
  `sector_shortname` varchar(50) DEFAULT NULL,
  `sector_description` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sectors`
--

INSERT INTO `sectors` (`sector_id`, `sector_shortname`, `sector_description`) VALUES
(1, 'macro', 'Macro Sector'),
(2, 'employment', 'Employment and Development Finance Sector'),
(3, 'environmental', 'Environmental Sector'),
(4, 'agriculture', 'Agriculture and Utilities Sector'),
(5, 'infra', 'Infrastructure and Utilities Sector'),
(6, 'social', 'Social Welfare Sector'),
(7, 'health', 'Health Sector'),
(8, 'education', 'Education Sector'),
(9, 'development', 'Development Administration Sector'),
(10, 'trade', 'Trade, Industry and Tourism Sector');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_info`
--
ALTER TABLE `account_info`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `items_groups`
--
ALTER TABLE `items_groups`
  ADD PRIMARY KEY (`item_group_id`),
  ADD KEY `item_group_item` (`item_group_item`);

--
-- Indexes for table `municipal`
--
ALTER TABLE `municipal`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sector_no` (`sector_no`),
  ADD KEY `account_no` (`account_no`);

--
-- Indexes for table `parameters`
--
ALTER TABLE `parameters`
  ADD PRIMARY KEY (`parameter_id`),
  ADD KEY `parameter_no` (`parameter_no`);

--
-- Indexes for table `parameter_items`
--
ALTER TABLE `parameter_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `item_parameter` (`item_parameter`);

--
-- Indexes for table `parameter_table_row`
--
ALTER TABLE `parameter_table_row`
  ADD PRIMARY KEY (`table_row_id`),
  ADD KEY `table_row_item` (`table_row_item`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`profile_id`);

--
-- Indexes for table `profile_item_groups`
--
ALTER TABLE `profile_item_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profile_parameter_item_id` (`profile_parameter_item_id`),
  ADD KEY `item_group_id` (`item_group_id`);

--
-- Indexes for table `profile_sectors`
--
ALTER TABLE `profile_sectors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profile_id` (`profile_id`),
  ADD KEY `sector_id` (`sector_id`);

--
-- Indexes for table `profile_sector_parameters`
--
ALTER TABLE `profile_sector_parameters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profile_sector_id` (`profile_sector_id`),
  ADD KEY `parameter_id` (`parameter_id`);

--
-- Indexes for table `profile_sector_parameter_items`
--
ALTER TABLE `profile_sector_parameter_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profile_sector_parameter_id` (`profile_sector_parameter_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `sectors`
--
ALTER TABLE `sectors`
  ADD PRIMARY KEY (`sector_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_info`
--
ALTER TABLE `account_info`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `items_groups`
--
ALTER TABLE `items_groups`
  MODIFY `item_group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT for table `municipal`
--
ALTER TABLE `municipal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `parameters`
--
ALTER TABLE `parameters`
  MODIFY `parameter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT for table `parameter_items`
--
ALTER TABLE `parameter_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=251;
--
-- AUTO_INCREMENT for table `parameter_table_row`
--
ALTER TABLE `parameter_table_row`
  MODIFY `table_row_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `profile_item_groups`
--
ALTER TABLE `profile_item_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `profile_sectors`
--
ALTER TABLE `profile_sectors`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- AUTO_INCREMENT for table `profile_sector_parameters`
--
ALTER TABLE `profile_sector_parameters`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;
--
-- AUTO_INCREMENT for table `profile_sector_parameter_items`
--
ALTER TABLE `profile_sector_parameter_items`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=412;
--
-- AUTO_INCREMENT for table `sectors`
--
ALTER TABLE `sectors`
  MODIFY `sector_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `items_groups`
--
ALTER TABLE `items_groups`
  ADD CONSTRAINT `items_groups_ibfk_1` FOREIGN KEY (`item_group_item`) REFERENCES `parameter_items` (`item_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `parameters`
--
ALTER TABLE `parameters`
  ADD CONSTRAINT `parameters_ibfk_1` FOREIGN KEY (`parameter_no`) REFERENCES `sectors` (`sector_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `parameter_items`
--
ALTER TABLE `parameter_items`
  ADD CONSTRAINT `parameter_items_ibfk_1` FOREIGN KEY (`item_parameter`) REFERENCES `parameters` (`parameter_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `parameter_table_row`
--
ALTER TABLE `parameter_table_row`
  ADD CONSTRAINT `parameter_table_row_ibfk_1` FOREIGN KEY (`table_row_item`) REFERENCES `parameters` (`parameter_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `profile_item_groups`
--
ALTER TABLE `profile_item_groups`
  ADD CONSTRAINT `profile_item_groups_ibfk_1` FOREIGN KEY (`profile_parameter_item_id`) REFERENCES `profile_sector_parameter_items` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `profile_sectors`
--
ALTER TABLE `profile_sectors`
  ADD CONSTRAINT `profile_sectors_ibfk_1` FOREIGN KEY (`profile_id`) REFERENCES `profile` (`profile_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `profile_sector_parameters`
--
ALTER TABLE `profile_sector_parameters`
  ADD CONSTRAINT `profile_sector_parameters_ibfk_1` FOREIGN KEY (`profile_sector_id`) REFERENCES `profile_sectors` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `profile_sector_parameter_items`
--
ALTER TABLE `profile_sector_parameter_items`
  ADD CONSTRAINT `profile_sector_parameter_items_ibfk_1` FOREIGN KEY (`profile_sector_parameter_id`) REFERENCES `profile_sector_parameters` (`id`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
