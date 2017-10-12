-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 11, 2017 at 05:36 PM
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
(1, 'John Paul', 'Garcia', 'Balanon', 'San Fernando', 'admin', 'admin', 'jp@gmail.com', 'admin'),
(2, 'Dexter', 'Rivera', 'Florendo', 'Bauang', 'user', 'user', 'dex@gmail.com', 'user');

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
  `municipality` varchar(255) DEFAULT NULL,
  `year` year(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `municipal`
--

INSERT INTO `municipal` (`id`, `municipality`, `year`) VALUES
(1, 'Agoo', 2017),
(2, 'Aringay', 2017),
(3, 'Bacnotan', 2017),
(4, 'Bagulin', 2017),
(5, 'Balaoan', 2017),
(6, 'Bangar', 2017),
(7, 'Bauang', 2017),
(8, 'Burgos', 2017),
(9, 'Caba', 2017),
(10, 'Damortis', 2017),
(11, 'Luna', 2017),
(12, 'Naguilian', 2017),
(13, 'Pugo', 2017),
(14, 'Rosario', 2017),
(15, 'San Fernando', 2017),
(16, 'San Gabriel', 2017),
(17, 'san Juan', 2017),
(18, 'Santol', 2017),
(19, 'Sto. Tomas', 2017),
(20, 'Sudipen', 2017),
(21, 'Tubao', 2017);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `sector_no` int(11) NOT NULL,
  `account_no` int(11) NOT NULL,
  `description` varchar(50) NOT NULL,
  `system_date` date NOT NULL,
  `is_hidden` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `sector_no`, `account_no`, `description`, `system_date`, `is_hidden`) VALUES
(1, 1, 21, 'Tubao has added Macro Sector', '2017-10-11', 0);

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
(1, '2017', 'Agoo', 'Agoo', 'Thomas', 'Bauang', 'San Fernando', 'Caba'),
(2, '2017', 'Aringay', NULL, NULL, NULL, NULL, NULL),
(3, '2017', 'Bacnotan', NULL, NULL, NULL, NULL, NULL),
(4, '2017', 'Bagulin', NULL, NULL, NULL, NULL, NULL),
(5, '2017', 'Balaoan ', NULL, NULL, NULL, NULL, NULL),
(6, '2017', 'Bangar', NULL, NULL, NULL, NULL, NULL),
(7, '2017', 'Bauang', NULL, NULL, NULL, NULL, NULL),
(8, '2017', 'Burgos', NULL, NULL, NULL, NULL, NULL),
(9, '2017', 'Caba', NULL, NULL, NULL, NULL, NULL),
(10, '2017', 'Damortis', NULL, NULL, NULL, NULL, NULL),
(11, '2017', 'Luna', NULL, NULL, NULL, NULL, NULL),
(12, '2017', 'Naguilian ', NULL, NULL, NULL, NULL, NULL),
(13, '2017', 'Pugo', NULL, NULL, NULL, NULL, NULL),
(14, '2017', 'Rosario', NULL, NULL, NULL, NULL, NULL),
(15, '2017', 'San Fernando', NULL, NULL, NULL, NULL, NULL),
(16, '2017', 'San Gabriel', NULL, NULL, NULL, NULL, NULL),
(17, '2017', 'San Juan', NULL, NULL, NULL, NULL, NULL),
(18, '2017', 'Santol', NULL, NULL, NULL, NULL, NULL),
(19, '2017', 'Sto. Tomas', NULL, NULL, NULL, NULL, NULL),
(20, '2017', 'Sudipen', NULL, NULL, NULL, NULL, NULL),
(21, '2017', 'Tubao', NULL, NULL, NULL, NULL, NULL);

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
(1, 21, 1);

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
(2, 1, 2);

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
(1, 1, 1, 0, ''),
(2, 1, 2, 0, ''),
(3, 1, 3, 0, ''),
(4, 1, 4, 0, ''),
(5, 2, 5, 0, ''),
(6, 2, 6, 0, ''),
(7, 2, 7, 0, ''),
(8, 2, 8, 0, ''),
(9, 2, 9, 0, ''),
(10, 2, 10, 0, ''),
(11, 2, 11, 0, ''),
(12, 2, 12, 0, '');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
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
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `profile_item_groups`
--
ALTER TABLE `profile_item_groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `profile_sectors`
--
ALTER TABLE `profile_sectors`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `profile_sector_parameters`
--
ALTER TABLE `profile_sector_parameters`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `profile_sector_parameter_items`
--
ALTER TABLE `profile_sector_parameter_items`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
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
