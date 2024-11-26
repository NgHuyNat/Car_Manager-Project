-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 23, 2024 lúc 09:09 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `carmanager`
--
CREATE DATABASE IF NOT EXISTS `carmanager` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `carmanager`;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `car`
--

DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `id` int(11) NOT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `releaseyear` int(11) DEFAULT NULL,
  `price` varchar(255) DEFAULT NULL,
  `sold` int(11) DEFAULT 0,
  `battery_capacity` int(11) DEFAULT NULL,
  `range_per_charge` int(11) DEFAULT NULL,
  `fuel_tank_capacity` int(11) DEFAULT NULL,
  `fuel_efficiency` int(11) DEFAULT NULL,
  `enginetype` varchar(31) NOT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Cắt ngắn bảng trước khi chèn `car`
--

TRUNCATE TABLE `car`;
--
-- Đang đổ dữ liệu cho bảng `car`
--

INSERT INTO `car` (`id`, `brand`, `name`, `type`, `releaseyear`, `price`, `sold`, `battery_capacity`, `range_per_charge`, `fuel_tank_capacity`, `fuel_efficiency`, `enginetype`, `image`) VALUES
(1, '1', '1', '1', 1, '1', 0, 1, 1, 1, 1, 'GASOLINE', 'https://i.pinimg.com/474x/5a/bc/0b/5abc0b587280d33cc7222ee5404406a2.jpg'),
(2, '2', '2', '2', 2, '2', 0, 2, 2, 2, 2, 'ELECTRIC', 'https://i.pinimg.com/474x/5a/bc/0b/5abc0b587280d33cc7222ee5404406a2.jpg'),
(35, 'Cầm cao máy thoáng', 'DuyDZBeo', 'Monter Truck', 2005, '100000000000000000', 0, 10000, 10000000, NULL, NULL, 'ELECTRIC', 'https://i.pinimg.com/474x/5a/bc/0b/5abc0b587280d33cc7222ee5404406a2.jpg'),
(36, 'Cầm cao máy thoáng', 'qưe', 'Monter Truck', 2005, '100000000000000000', 0, NULL, NULL, 1, 1, 'GASOLINE', 'https://i.pinimg.com/474x/5a/bc/0b/5abc0b587280d33cc7222ee5404406a2.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `carid` int(11) DEFAULT NULL,
  `employeeid` int(11) DEFAULT NULL,
  `customerid` int(11) DEFAULT NULL,
  `detail` varchar(500) NOT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Cắt ngắn bảng trước khi chèn `contact`
--

TRUNCATE TABLE `contact`;
-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `customer`
--

DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Cắt ngắn bảng trước khi chèn `customer`
--

TRUNCATE TABLE `customer`;
--
-- Đang đổ dữ liệu cho bảng `customer`
--

INSERT INTO `customer` (`id`, `name`, `email`, `phonenumber`, `address`) VALUES
(11, 'Nguyễn Tân', 'tanruoidomino220805@gmail.com', '0834682262', 'Thôn Phụ Long 22');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `employee`
--

DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `salary` varchar(255) DEFAULT NULL,
  `bonussalary` varchar(255) DEFAULT NULL,
  `defaultsalary` varchar(255) DEFAULT NULL,
  `carssoldtotal` int(11) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `carsoldtotal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Cắt ngắn bảng trước khi chèn `employee`
--

TRUNCATE TABLE `employee`;
--
-- Đang đổ dữ liệu cho bảng `employee`
--

INSERT INTO `employee` (`id`, `username`, `password`, `role`, `name`, `phonenumber`, `email`, `address`, `salary`, `bonussalary`, `defaultsalary`, `carssoldtotal`, `manager_id`, `carsoldtotal`) VALUES
(1, 'employee1', '1', 'employee', 'Jane Smithhhhhh', '987654321', 'employee1@example.com', '456 Elm St', '3000', '500', '2500', 0, NULL, NULL),
(6, 'duycan123', '$2a$10$UcxZyH/aw9RY8Xia8p.wJeqpVi7qqDldueiujEvBGASgfUtY.22mq', 'ROLE_EMPLOYEE', 'Duy', NULL, 'duy@gmail.com', 'Hải Phòng City', '1', 'null', 'null', 0, 12, NULL),
(7, 'cuong1234', '$2a$10$efPomQhjqHH0pKkxdLIp1eL9w0sUrSy35SyNmCCov.aiwM6QknNoG', 'ROLE_EMPLOYEE', 'Cuong', NULL, 'cuong@gmail.com', 'Hn', '1', 'null', 'null', 0, 12, NULL),
(8, 'truong123', '$2a$10$c7nbG3yrdMplgP6HdjjQPe/zO7NGShoOELmG0XrQGwflByc/7pkBa', 'ROLE_EMPLOYEE', 'Truong', NULL, 'truongbeo@gmail.com', 'Park Nink', '1', 'null', 'null', 0, 12, NULL),
(21, 'david', '$2a$10$tK4T3ADd6Zvas/h6IrTJmeK4m.NssNzl6r/2uwT..5P4cE0W58eO2', 'ROLE_EMPLOYEE', 'David', NULL, 'tanruoidomino220805@gmail.com', 'Thôn Phụ Long 2', '1', 'null', 'null', 0, 12, NULL),
(22, 'tan123', '$2a$10$0CPhTKHmLzxIxm7tgmwEP.GMlAu2LVtDx2JlAI95D6PCD3tvUgRau', 'ROLE_EMPLOYEE', 'Nguyễn Tân', NULL, 'tanruoidomino220805@gmail.com', 'Thôn Phụ Long 2', '1', 'null', 'null', 0, 12, NULL),
(24, 'tan1234', '$2a$10$cybFZ2f8WMhTROo0rUc/euOGpWw3hLGFFpqs9HzMjhzNpuxO/F6ka', 'ROLE_EMPLOYEE', 'Nguyễn Tân', NULL, 'tanruoidomino220805@gmail.com', 'Thôn Phụ Long 2', '1', 'null', 'null', 0, 12, NULL),
(25, 'manager11', '$2a$10$JXOcuOixNaCpCIf/CzD5TuRo7OTE4a6NZXlPFjjb6ALUcH05CQn0G', 'ROLE_EMPLOYEE', 'Nguyễn Tân', NULL, 'tanruoidomino220805@gmail.com', 'Thôn Phụ Long 2', '1', 'null', 'null', 0, 12, NULL),
(27, 'david1', '$2a$10$GouqYexuN.qrmo0nWt72GuqkDSkV6a4.ZY6FtBXabquzX/4a2XkhG', 'ROLE_EMPLOYEE', 'David', NULL, 'tanruoidomino220805@gmail.com', 'Thôn Phụ Long 2', '1', 'null', 'null', 0, 12, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `manager`
--

DROP TABLE IF EXISTS `manager`;
CREATE TABLE `manager` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `salary` varchar(255) DEFAULT NULL,
  `bonussalary` varchar(255) DEFAULT NULL,
  `defaultsalary` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Cắt ngắn bảng trước khi chèn `manager`
--

TRUNCATE TABLE `manager`;
--
-- Đang đổ dữ liệu cho bảng `manager`
--

INSERT INTO `manager` (`id`, `username`, `password`, `role`, `name`, `email`, `address`, `salary`, `bonussalary`, `defaultsalary`, `phonenumber`) VALUES
(2, 'manager1', '$2a$10$EqDvccovJ0.XtgV9e59pPuENoWzGF/ySXbqBv3sM0u4SNbVdBpJpa', 'ROLE_MANAGER', 'John Doe', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'manager2', '$2a$10$75c692G2XoOniV5HYqWNk.3wpriVXUZOCFiKUvJGwUNjPSJ/jfgqC', 'ROLE_MANAGER', '1111', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'manager22', '$2a$10$fE6C11jd4RboTrzXTQyrpORBr/Cp43EaZ2nwztMe054KhJ6h94gQa', 'ROLE_MANAGER', '222', NULL, NULL, NULL, NULL, NULL, NULL),
(5, '', '$2a$10$Ku/6Yo16r.sVhBix9lsIZeSyaSX4QrC97lZgWKdKKx3RIBdUxrOqy', 'ROLE_MANAGER', '', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'cuong123', '$2a$10$vrndumBDmoNfBbRIQIkrT.y6Zon.26SBCAfn0QB8v3.IKWObSgDI6', 'ROLE_MANAGER', '111', NULL, NULL, NULL, NULL, NULL, NULL),
(7, '1', '$2a$10$yVTLY3YBI.mmgpoJWRbjJOzikUifqIZLd.UgkUXF3/w2fCCntdRea', 'ROLE_MANAGER', '1', NULL, NULL, NULL, NULL, NULL, NULL),
(8, '2', '$2a$10$zPmV/FX60xiZGMeu4gHcD.s/sowJ.MwMT59wwoxFxEt3IbWmq90vq', 'ROLE_MANAGER', '2', NULL, NULL, NULL, NULL, NULL, NULL),
(9, '3', '$2a$10$SyNCBljG9HfyOL2Aa1WEy.TrzQXwzC0I8yuf8Zq9a0AQS8lFBwUWW', 'ROLE_MANAGER', '3', NULL, NULL, NULL, NULL, NULL, NULL),
(10, '4', '$2a$10$oEYMgKjEtQKVjsLMcKaLMuNa47Y70qOsxFpPgmupGv34LqjK3ev22', 'ROLE_MANAGER', '4', NULL, NULL, NULL, NULL, NULL, NULL),
(11, '5', '$2a$10$WQmaDZM7YGRdo52/aIn9IubXDuIJSGAd8WcScLrSaNddk1GDA6g6.', 'ROLE_MANAGER', '5', NULL, NULL, NULL, NULL, NULL, NULL),
(12, '6', '$2a$10$D.5SgaLWwxTEQKzZj1S66uvuJ8i8QOPvazLax3lKds/AM0IlL51WK', 'ROLE_MANAGER', '6', NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`),
  ADD KEY `contact_ibfk` (`carid`),
  ADD KEY `contact_ibfk_2` (`employeeid`),
  ADD KEY `contact_ibfk_3` (`customerid`);

--
-- Chỉ mục cho bảng `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `fk_manager_id` (`manager_id`);

--
-- Chỉ mục cho bảng `manager`
--
ALTER TABLE `manager`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `car`
--
ALTER TABLE `car`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT cho bảng `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT cho bảng `manager`
--
ALTER TABLE `manager`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `contact`
--
ALTER TABLE `contact`
  ADD CONSTRAINT `contact_ibfk_1` FOREIGN KEY (`carid`) REFERENCES `car` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `contact_ibfk_2` FOREIGN KEY (`employeeid`) REFERENCES `employee` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `contact_ibfk_3` FOREIGN KEY (`customerid`) REFERENCES `customer` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_manager_id` FOREIGN KEY (`manager_id`) REFERENCES `manager` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
