-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 23, 2017 at 04:55 AM
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
-- Table structure for table `accomodation_establishments`
--

CREATE TABLE `accomodation_establishments` (
  `accomodation_id` int(11) NOT NULL,
  `accomodation_no` int(11) NOT NULL,
  `accomodation_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accomodation_establishments`
--

INSERT INTO `accomodation_establishments` (`accomodation_id`, `accomodation_no`, `accomodation_item`) VALUES
(1, 13, 'Name of Establishments'),
(2, 13, 'Address'),
(3, 13, 'Type'),
(4, 13, 'No of Rooms'),
(5, 13, 'Classification'),
(6, 13, 'Dot Accredited');

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
  `account_email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account_info`
--

INSERT INTO `account_info` (`account_id`, `account_firstname`, `account_middlename`, `account_lastname`, `account_name_municipality`, `account_username`, `account_password`, `account_email`) VALUES
(1, 'John Paul', 'Garcia', 'Balanon', 'sample', 'admin', 'admin', 'jp@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `agriculture_animals`
--

CREATE TABLE `agriculture_animals` (
  `animal_id` int(11) NOT NULL,
  `animal_no` int(11) NOT NULL,
  `animal_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `agriculture_animals`
--

INSERT INTO `agriculture_animals` (`animal_id`, `animal_no`, `animal_item`) VALUES
(1, 4, 'Commodity '),
(2, 4, 'Production'),
(3, 4, 'Sufficiency Level');

-- --------------------------------------------------------

--
-- Table structure for table `agriculture_plants`
--

CREATE TABLE `agriculture_plants` (
  `plant_id` int(11) NOT NULL,
  `plant_no` int(11) NOT NULL,
  `plant_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `agriculture_plants`
--

INSERT INTO `agriculture_plants` (`plant_id`, `plant_no`, `plant_item`) VALUES
(1, 4, 'Commodity'),
(2, 4, 'Area'),
(3, 4, 'Production'),
(4, 4, 'Sufficiency Level');

-- --------------------------------------------------------

--
-- Table structure for table `agri_tourism_sites`
--

CREATE TABLE `agri_tourism_sites` (
  `agri_tourism_id` int(11) NOT NULL,
  `agri_tourism_no` int(11) NOT NULL,
  `agri_tourism_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `agri_tourism_sites`
--

INSERT INTO `agri_tourism_sites` (`agri_tourism_id`, `agri_tourism_no`, `agri_tourism_item`) VALUES
(1, 13, 'Name of Site'),
(2, 13, 'Description'),
(3, 13, 'Location');

-- --------------------------------------------------------

--
-- Table structure for table `convention_facilities`
--

CREATE TABLE `convention_facilities` (
  `convention_id` int(11) NOT NULL,
  `convention_no` int(11) NOT NULL,
  `convention_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `convention_facilities`
--

INSERT INTO `convention_facilities` (`convention_id`, `convention_no`, `convention_item`) VALUES
(1, 13, 'Name of Establishment'),
(2, 13, 'Type'),
(3, 13, 'Category'),
(4, 13, 'Address'),
(5, 13, 'Contact Person'),
(6, 13, 'Tel No'),
(7, 13, 'Fax No'),
(8, 13, 'Email Address'),
(9, 13, 'No of Rooms'),
(10, 13, 'Meeting Facilities'),
(11, 13, 'Maximum Capacity'),
(12, 13, 'Name of Establishment'),
(13, 13, 'Type'),
(14, 13, 'Category'),
(15, 13, 'Address'),
(16, 13, 'Contact Person'),
(17, 13, 'Tel No'),
(18, 13, 'Fax No'),
(19, 13, 'Email Address'),
(20, 13, 'No of Rooms'),
(21, 13, 'Meeting Facilities'),
(22, 13, 'Maximum Capacity');

-- --------------------------------------------------------

--
-- Table structure for table `employment_income`
--

CREATE TABLE `employment_income` (
  `ei_id` int(11) NOT NULL,
  `ei_no` int(11) NOT NULL,
  `ei_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employment_income`
--

INSERT INTO `employment_income` (`ei_id`, `ei_no`, `ei_item`) VALUES
(1, 4, 'Commodity'),
(2, 4, 'Employment Generated'),
(3, 4, 'Income Generated');

-- --------------------------------------------------------

--
-- Table structure for table `enterprises`
--

CREATE TABLE `enterprises` (
  `enterprise_id` int(11) NOT NULL,
  `enterprise_no` int(11) NOT NULL,
  `enterprise_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `enterprises`
--

INSERT INTO `enterprises` (`enterprise_id`, `enterprise_no`, `enterprise_item`) VALUES
(1, 13, 'Name of Enterprise'),
(2, 13, 'Product'),
(3, 13, 'Classification'),
(4, 13, 'Volume'),
(5, 13, 'Address'),
(6, 13, 'Name of Owner'),
(7, 13, 'Ownernership');

-- --------------------------------------------------------

--
-- Table structure for table `existing_potential_industries`
--

CREATE TABLE `existing_potential_industries` (
  `epi_id` int(11) NOT NULL,
  `epi_no` int(11) NOT NULL,
  `epi_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `existing_potential_industries`
--

INSERT INTO `existing_potential_industries` (`epi_id`, `epi_no`, `epi_item`) VALUES
(1, 13, 'Location'),
(2, 13, 'Major Resources'),
(3, 13, 'Potential industry');

-- --------------------------------------------------------

--
-- Table structure for table `investible_areas`
--

CREATE TABLE `investible_areas` (
  `ia_id` int(11) NOT NULL,
  `ia_no` int(11) NOT NULL,
  `ia_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `investible_areas`
--

INSERT INTO `investible_areas` (`ia_id`, `ia_no`, `ia_item`) VALUES
(1, 13, 'Location'),
(2, 13, 'Projects'),
(3, 13, 'Location');

-- --------------------------------------------------------

--
-- Table structure for table `parameters`
--

CREATE TABLE `parameters` (
  `parameter_id` int(11) NOT NULL,
  `parameter_no` int(11) DEFAULT NULL,
  `parameter_name` varchar(50) DEFAULT NULL,
  `parameter_short_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parameters`
--

INSERT INTO `parameters` (`parameter_id`, `parameter_no`, `parameter_name`, `parameter_short_name`) VALUES
(1, 1, 'Physical Characteristics', 'PC'),
(2, 1, 'Demographics', 'DEMO'),
(3, 2, 'Employment and Development Finance', 'EDF'),
(4, 3, 'Existing Land User Distribution', 'ELUD'),
(5, 3, 'Land Classication', 'LC'),
(6, 4, 'Food Sufficiency', 'FS'),
(7, 5, 'Road Network', 'RN'),
(8, 5, 'Bridges', 'BR'),
(9, 6, 'Social Welfare', 'SW'),
(10, 7, 'Health Sector', 'HS'),
(11, 8, 'Education Sector', 'ES'),
(12, 9, 'Development Administration Sector', 'DAS'),
(13, 10, 'Trade, Industry and Tourism Sector', 'TITS');

-- --------------------------------------------------------

--
-- Table structure for table `parameter_items`
--

CREATE TABLE `parameter_items` (
  `item_id` int(11) NOT NULL,
  `item_parameter` int(11) NOT NULL,
  `item_attribute` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parameter_items`
--

INSERT INTO `parameter_items` (`item_id`, `item_parameter`, `item_attribute`) VALUES
(1, 1, 'Land Area'),
(2, 1, 'Terrain'),
(3, 1, 'Climate'),
(4, 1, 'Number of Barangays'),
(5, 2, 'Population'),
(6, 2, 'Growth Rate'),
(7, 2, 'Population Density'),
(8, 2, 'Number of Households'),
(9, 2, 'Number of Families'),
(10, 2, 'Major Dialects'),
(11, 2, 'Religion'),
(12, 2, 'Literacy Rate'),
(13, 3, 'Labor Force No'),
(14, 3, 'Employment Rate'),
(15, 3, 'ED Agriculture'),
(16, 3, 'ED Industry'),
(17, 3, 'ED Services'),
(18, 3, 'Poverty Incidence'),
(19, 3, 'Magnitude of Poor Families'),
(20, 3, 'Magnitude of Poor Population'),
(21, 3, 'Classification'),
(22, 3, 'Municipal Govt Revenue'),
(23, 3, 'Municipal Govt Expenditures'),
(24, 4, 'Agricultural Areas'),
(25, 4, 'Grassland Areas'),
(26, 4, 'Wooded Areas'),
(27, 4, 'Bareland Areas'),
(28, 4, 'Wetland Areas'),
(29, 4, 'Builtup Areas'),
(30, 5, 'Certified A&D'),
(31, 5, 'Public Forest Land'),
(32, 5, 'Number of Barangays '),
(33, 5, 'Upland'),
(34, 5, 'Lowland'),
(35, 5, 'Coastal'),
(36, 5, 'Riverside'),
(37, 5, 'Number of Sawmills'),
(38, 5, 'Number of Lumberdealers'),
(39, 7, 'Brgy Road Concrete'),
(40, 7, 'Brgy Road Asphalt'),
(41, 7, 'Brgy Road Gravel'),
(42, 7, 'Brgy Rad Earthfill'),
(43, 7, 'Municipal Road Concrete'),
(44, 7, 'Municipal Road Asphalt'),
(45, 7, 'Municipal Road Gravel'),
(46, 7, 'Municipal Road Earthfill'),
(47, 7, 'Provincial Road Concrete'),
(48, 7, 'Provincial Road Asphalt'),
(49, 7, 'Provincial Road Gravel'),
(50, 7, 'Provincial Road Earthfill'),
(51, 7, 'National Road Concrete'),
(52, 7, 'National Road Asphalt'),
(53, 7, 'National Road Gravel'),
(54, 7, 'National Road Earthfill'),
(55, 8, 'Brgy span steel'),
(56, 8, 'Brgy span concrete'),
(57, 8, 'Brgy span Composite'),
(58, 8, 'Brgy span Jumbo'),
(59, 8, 'Brgy span Bailey'),
(60, 8, 'Brgy span Footbridge'),
(61, 8, 'Brgy Length Steel'),
(62, 8, 'Brgy Length Concrete'),
(63, 8, 'Brgy Length Composite'),
(64, 8, 'Brgy Length Jumbo'),
(65, 8, 'Brgy Length Bailey'),
(66, 8, 'Brgy Length Footbridge'),
(67, 8, 'Municipal span Steel'),
(68, 8, 'Municipal span Concrete'),
(69, 8, 'Municipal span Composite'),
(70, 8, 'Municipal span Jumbo'),
(71, 8, 'Municipal span Bailey'),
(72, 8, 'Municipal span Footbridge'),
(73, 8, 'Municipal length Steel'),
(74, 8, 'Municipal length Concrete'),
(75, 8, 'Municipal length Composite'),
(76, 8, 'Municipal length Jumbo'),
(77, 8, 'Municipal length Bailey'),
(78, 8, 'Municipal length Footbridge'),
(79, 8, 'Provincial span Steel'),
(80, 8, 'Provincial span Concrete'),
(81, 8, 'Provincial span Composite'),
(82, 8, 'Provincial span Jumbo'),
(83, 8, 'Provincial span Bailey'),
(84, 8, 'Provincial span Footbridge'),
(85, 8, 'Provincial length Steel'),
(86, 8, 'Provincial length Concrete'),
(87, 8, 'Provincial length Composite'),
(88, 8, 'Provincial length Jumbo'),
(89, 8, 'Provincial length Bailey'),
(90, 8, 'Provincial length Footbridge'),
(91, 8, 'National span Steel'),
(92, 8, 'National span Concrete'),
(93, 8, 'National span Composite'),
(94, 8, 'National span Jumbo'),
(95, 8, 'National span Bailey'),
(96, 8, 'National span Footbridge'),
(97, 8, 'National length Steel'),
(98, 8, 'National length Concrete'),
(99, 8, 'National length Composite'),
(100, 8, 'National length Jumbo'),
(101, 8, 'National length Bailey'),
(102, 8, 'National length Footbridge'),
(103, 9, 'No of Daycare Center'),
(104, 9, 'No of Daycare Worker'),
(105, 9, 'No of Daycare Children'),
(106, 10, 'Crude Birth Rate'),
(107, 10, 'Crude Death Rate'),
(108, 10, 'Maternal Mortality Rate'),
(109, 10, 'Infant Mortality Rate'),
(110, 10, 'Morbidity Rate'),
(111, 10, 'Mortality Rate'),
(112, 10, 'Contraceptive Prevalence Rate'),
(113, 10, 'Malnutrition Rate Pre School'),
(114, 10, 'Malnutrition Rate In School'),
(115, 10, 'No of Hospital'),
(116, 10, 'No of Clinics'),
(117, 11, 'No of Tertiary College'),
(118, 11, 'No of Tertiary University'),
(119, 11, 'No of Secondary Public'),
(120, 11, 'No of Secondary Private'),
(121, 11, 'No of Elem Public'),
(122, 11, 'No of Elem Private'),
(123, 12, 'Crime Rate Index'),
(124, 12, 'Crime Rate Non-Index'),
(125, 12, 'No of Cooperatives'),
(126, 12, 'No of Banks'),
(127, 12, 'No of Lending Institutions'),
(128, 12, 'No of Messengerial Offices'),
(129, 12, 'No of Fire trucks'),
(130, 12, 'No of Radio Stations'),
(131, 13, 'Parocial Fiesta Date'),
(132, 13, 'Town Fiesta Date'),
(133, 13, 'Name of Patron'),
(134, 13, 'Market Days'),
(135, 13, 'No of Business Trading'),
(136, 13, 'No of Business Services'),
(137, 13, 'No of Business Manufacturing'),
(138, 13, 'No of Beauty Parlor'),
(139, 13, 'No of Barber Shops'),
(140, 13, 'No of Photo studios'),
(141, 13, 'No of Tailoring shop'),
(142, 13, 'No of Restaurants'),
(143, 13, 'No of Eateries'),
(144, 13, 'No of Canteen'),
(145, 13, 'No of Funeral Parlor'),
(146, 13, 'No of Gasoline Stations'),
(147, 13, 'No of Water Stations'),
(148, 13, 'No of Resorts'),
(149, 13, 'Others');

-- --------------------------------------------------------

--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `profile_id` int(11) NOT NULL,
  `profile_year` date NOT NULL,
  `municipality` varchar(50) NOT NULL,
  `location` varchar(50) NOT NULL,
  `pb_north` varchar(50) NOT NULL,
  `pb_south` varchar(50) NOT NULL,
  `pb_east` varchar(50) NOT NULL,
  `pb_west` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `recreation_centre`
--

CREATE TABLE `recreation_centre` (
  `recreation_id` int(11) NOT NULL,
  `recreation_no` int(11) NOT NULL,
  `recreation_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `recreation_centre`
--

INSERT INTO `recreation_centre` (`recreation_id`, `recreation_no`, `recreation_item`) VALUES
(1, 13, 'Recreation Center'),
(2, 13, 'Telephone Number'),
(3, 13, 'Equipment/Facilities'),
(4, 13, 'Rates');

-- --------------------------------------------------------

--
-- Table structure for table `rest_areas`
--

CREATE TABLE `rest_areas` (
  `area_id` int(11) NOT NULL,
  `area_no` int(11) NOT NULL,
  `area_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rest_areas`
--

INSERT INTO `rest_areas` (`area_id`, `area_no`, `area_item`) VALUES
(1, 13, 'Name of Establishment'),
(2, 13, 'Contact Person'),
(3, 13, 'Type of Establishment'),
(4, 13, 'Type of Food');

-- --------------------------------------------------------

--
-- Table structure for table `sectors`
--

CREATE TABLE `sectors` (
  `sector_id` int(11) NOT NULL,
  `sector_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sectors`
--

INSERT INTO `sectors` (`sector_id`, `sector_name`) VALUES
(1, 'Macro Sector'),
(2, 'Employment and Development Finance Sector'),
(3, 'Environmental Sector'),
(4, 'Agriculture and Utilities Sector'),
(5, 'Infrastructure and Utilities Sector'),
(6, 'Social Welfare Sector'),
(7, 'Health Sector'),
(8, 'Education Sector'),
(9, 'Development Administration Sector'),
(10, 'Trade, Industry and Tourism Sector');

-- --------------------------------------------------------

--
-- Table structure for table `shopping_centers`
--

CREATE TABLE `shopping_centers` (
  `shopping_id` int(11) NOT NULL,
  `shopping_no` int(11) NOT NULL,
  `shopping_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shopping_centers`
--

INSERT INTO `shopping_centers` (`shopping_id`, `shopping_no`, `shopping_item`) VALUES
(1, 13, 'Name of Establishment'),
(2, 13, 'Type of Merchandize'),
(3, 13, 'Facilities');

-- --------------------------------------------------------

--
-- Table structure for table `tourist_destination`
--

CREATE TABLE `tourist_destination` (
  `destination_id` int(11) NOT NULL,
  `destination_no` int(11) NOT NULL,
  `destination_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tourist_destination`
--

INSERT INTO `tourist_destination` (`destination_id`, `destination_no`, `destination_item`) VALUES
(1, 13, 'Name of Site'),
(2, 13, 'Description'),
(3, 13, 'Status'),
(4, 13, 'Type');

-- --------------------------------------------------------

--
-- Table structure for table `tour_guides`
--

CREATE TABLE `tour_guides` (
  `tour_id` int(11) NOT NULL,
  `tour_no` int(11) NOT NULL,
  `tour_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tour_guides`
--

INSERT INTO `tour_guides` (`tour_id`, `tour_no`, `tour_item`) VALUES
(1, 13, 'Name'),
(2, 13, 'Dot Accreditation'),
(3, 13, 'Address'),
(4, 13, 'Contact Number');

-- --------------------------------------------------------

--
-- Table structure for table `transport_groups`
--

CREATE TABLE `transport_groups` (
  `transport_id` int(11) NOT NULL,
  `transport_no` int(11) NOT NULL,
  `transport_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transport_groups`
--

INSERT INTO `transport_groups` (`transport_id`, `transport_no`, `transport_item`) VALUES
(1, 13, 'Name'),
(2, 13, 'Dot Accreditation'),
(3, 13, 'Address'),
(4, 13, 'Contact Number');

-- --------------------------------------------------------

--
-- Table structure for table `travel_operator`
--

CREATE TABLE `travel_operator` (
  `travel_id` int(11) NOT NULL,
  `travel_no` int(11) NOT NULL,
  `travel_item` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `travel_operator`
--

INSERT INTO `travel_operator` (`travel_id`, `travel_no`, `travel_item`) VALUES
(1, 13, 'Name'),
(2, 13, 'Dot Accreditation'),
(3, 13, 'Address'),
(4, 13, 'Contact');

-- --------------------------------------------------------

--
-- Table structure for table `water_bodies`
--

CREATE TABLE `water_bodies` (
  `water_id` int(11) NOT NULL,
  `water_no` int(11) NOT NULL,
  `water_item` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `water_bodies`
--

INSERT INTO `water_bodies` (`water_id`, `water_no`, `water_item`) VALUES
(1, 3, 'Rivers'),
(2, 3, 'Esteros/Creeks'),
(3, 3, 'Canals');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accomodation_establishments`
--
ALTER TABLE `accomodation_establishments`
  ADD PRIMARY KEY (`accomodation_id`);

--
-- Indexes for table `account_info`
--
ALTER TABLE `account_info`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `agriculture_animals`
--
ALTER TABLE `agriculture_animals`
  ADD PRIMARY KEY (`animal_id`);

--
-- Indexes for table `agriculture_plants`
--
ALTER TABLE `agriculture_plants`
  ADD PRIMARY KEY (`plant_id`);

--
-- Indexes for table `agri_tourism_sites`
--
ALTER TABLE `agri_tourism_sites`
  ADD PRIMARY KEY (`agri_tourism_id`);

--
-- Indexes for table `convention_facilities`
--
ALTER TABLE `convention_facilities`
  ADD PRIMARY KEY (`convention_id`);

--
-- Indexes for table `employment_income`
--
ALTER TABLE `employment_income`
  ADD PRIMARY KEY (`ei_id`);

--
-- Indexes for table `enterprises`
--
ALTER TABLE `enterprises`
  ADD PRIMARY KEY (`enterprise_id`);

--
-- Indexes for table `existing_potential_industries`
--
ALTER TABLE `existing_potential_industries`
  ADD PRIMARY KEY (`epi_id`);

--
-- Indexes for table `investible_areas`
--
ALTER TABLE `investible_areas`
  ADD PRIMARY KEY (`ia_id`);

--
-- Indexes for table `parameters`
--
ALTER TABLE `parameters`
  ADD PRIMARY KEY (`parameter_id`);

--
-- Indexes for table `parameter_items`
--
ALTER TABLE `parameter_items`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `item_parameter` (`item_parameter`);

--
-- Indexes for table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`profile_id`);

--
-- Indexes for table `recreation_centre`
--
ALTER TABLE `recreation_centre`
  ADD PRIMARY KEY (`recreation_id`);

--
-- Indexes for table `rest_areas`
--
ALTER TABLE `rest_areas`
  ADD PRIMARY KEY (`area_id`);

--
-- Indexes for table `sectors`
--
ALTER TABLE `sectors`
  ADD PRIMARY KEY (`sector_id`);

--
-- Indexes for table `shopping_centers`
--
ALTER TABLE `shopping_centers`
  ADD PRIMARY KEY (`shopping_id`);

--
-- Indexes for table `tourist_destination`
--
ALTER TABLE `tourist_destination`
  ADD PRIMARY KEY (`destination_id`);

--
-- Indexes for table `tour_guides`
--
ALTER TABLE `tour_guides`
  ADD PRIMARY KEY (`tour_id`);

--
-- Indexes for table `transport_groups`
--
ALTER TABLE `transport_groups`
  ADD PRIMARY KEY (`transport_id`);

--
-- Indexes for table `travel_operator`
--
ALTER TABLE `travel_operator`
  ADD PRIMARY KEY (`travel_id`);

--
-- Indexes for table `water_bodies`
--
ALTER TABLE `water_bodies`
  ADD PRIMARY KEY (`water_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accomodation_establishments`
--
ALTER TABLE `accomodation_establishments`
  MODIFY `accomodation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `account_info`
--
ALTER TABLE `account_info`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `agriculture_animals`
--
ALTER TABLE `agriculture_animals`
  MODIFY `animal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `agriculture_plants`
--
ALTER TABLE `agriculture_plants`
  MODIFY `plant_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `agri_tourism_sites`
--
ALTER TABLE `agri_tourism_sites`
  MODIFY `agri_tourism_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `convention_facilities`
--
ALTER TABLE `convention_facilities`
  MODIFY `convention_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `employment_income`
--
ALTER TABLE `employment_income`
  MODIFY `ei_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `enterprises`
--
ALTER TABLE `enterprises`
  MODIFY `enterprise_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `existing_potential_industries`
--
ALTER TABLE `existing_potential_industries`
  MODIFY `epi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `investible_areas`
--
ALTER TABLE `investible_areas`
  MODIFY `ia_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `parameters`
--
ALTER TABLE `parameters`
  MODIFY `parameter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `parameter_items`
--
ALTER TABLE `parameter_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;
--
-- AUTO_INCREMENT for table `profile`
--
ALTER TABLE `profile`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `recreation_centre`
--
ALTER TABLE `recreation_centre`
  MODIFY `recreation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `rest_areas`
--
ALTER TABLE `rest_areas`
  MODIFY `area_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `sectors`
--
ALTER TABLE `sectors`
  MODIFY `sector_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `shopping_centers`
--
ALTER TABLE `shopping_centers`
  MODIFY `shopping_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `tourist_destination`
--
ALTER TABLE `tourist_destination`
  MODIFY `destination_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tour_guides`
--
ALTER TABLE `tour_guides`
  MODIFY `tour_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `transport_groups`
--
ALTER TABLE `transport_groups`
  MODIFY `transport_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `travel_operator`
--
ALTER TABLE `travel_operator`
  MODIFY `travel_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `water_bodies`
--
ALTER TABLE `water_bodies`
  MODIFY `water_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `parameter_items`
--
ALTER TABLE `parameter_items`
  ADD CONSTRAINT `parameter_items_ibfk_1` FOREIGN KEY (`item_parameter`) REFERENCES `parameters` (`parameter_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
