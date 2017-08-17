-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 17, 2017 at 03:28 AM
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
  `account_email` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account_info`
--

INSERT INTO `account_info` (`account_id`, `account_firstname`, `account_middlename`, `account_lastname`, `account_name_municipality`, `account_username`, `account_password`, `account_email`) VALUES
(1, 'John Paul', 'Garcia', 'Balanon', 'sample', 'admin', 'admin', 'jp@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `employments`
--

CREATE TABLE `employments` (
  `emp_id` int(11) NOT NULL,
  `emp_labor_force` varchar(50) DEFAULT NULL,
  `emp_rate` varchar(11) DEFAULT NULL,
  `emp_dist_agriculture` varchar(50) DEFAULT NULL,
  `emp_dist_industry` varchar(50) DEFAULT NULL,
  `emp_dist_services` varchar(50) DEFAULT NULL,
  `emp_pov_poor_family` varchar(50) DEFAULT NULL,
  `emp_pov_poor_population` varchar(50) DEFAULT NULL,
  `emp_pov_classification` varchar(50) DEFAULT NULL,
  `emp_pov_revenue` varchar(50) DEFAULT NULL,
  `emp_pov_expend` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `macros`
--

CREATE TABLE `macros` (
  `macros_id` int(11) NOT NULL,
  `municipal_no` int(11) DEFAULT NULL,
  `pc_land_area` varchar(100) DEFAULT NULL,
  `pc_terrain` varchar(100) DEFAULT NULL,
  `pc_climate` varchar(100) DEFAULT NULL,
  `pc_no_barangay` int(11) DEFAULT NULL,
  `md_population` varchar(11) DEFAULT NULL,
  `md_growth_rate` varchar(20) DEFAULT NULL,
  `md_population_density` varchar(11) DEFAULT NULL,
  `md_no_of_households` varchar(11) DEFAULT NULL,
  `md_no_of_families` varchar(11) DEFAULT NULL,
  `md_languages` varchar(100) DEFAULT NULL,
  `md_religion` varchar(100) DEFAULT NULL,
  `md_literacy_rate` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `macros`
--

INSERT INTO `macros` (`macros_id`, `municipal_no`, `pc_land_area`, `pc_terrain`, `pc_climate`, `pc_no_barangay`, `md_population`, `md_growth_rate`, `md_population_density`, `md_no_of_households`, `md_no_of_families`, `md_languages`, `md_religion`, `md_literacy_rate`) VALUES
(1, NULL, '76.5477', 'Moonsoon', 'Tropical', 47, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `municipality`
--

CREATE TABLE `municipality` (
  `municipal_id` int(11) NOT NULL,
  `municipal_no` int(11) NOT NULL,
  `municipal_name` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
-- Table structure for table `sector`
--

CREATE TABLE `sector` (
  `sector_id` int(11) NOT NULL,
  `sector_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sector`
--

INSERT INTO `sector` (`sector_id`, `sector_name`) VALUES
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

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_info`
--
ALTER TABLE `account_info`
  ADD PRIMARY KEY (`account_id`);

--
-- Indexes for table `employments`
--
ALTER TABLE `employments`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `macros`
--
ALTER TABLE `macros`
  ADD PRIMARY KEY (`macros_id`);

--
-- Indexes for table `municipality`
--
ALTER TABLE `municipality`
  ADD PRIMARY KEY (`municipal_id`);

--
-- Indexes for table `parameters`
--
ALTER TABLE `parameters`
  ADD PRIMARY KEY (`parameter_id`);

--
-- Indexes for table `sector`
--
ALTER TABLE `sector`
  ADD PRIMARY KEY (`sector_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_info`
--
ALTER TABLE `account_info`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `employments`
--
ALTER TABLE `employments`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `macros`
--
ALTER TABLE `macros`
  MODIFY `macros_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `municipality`
--
ALTER TABLE `municipality`
  MODIFY `municipal_id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `parameters`
--
ALTER TABLE `parameters`
  MODIFY `parameter_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `sector`
--
ALTER TABLE `sector`
  MODIFY `sector_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
