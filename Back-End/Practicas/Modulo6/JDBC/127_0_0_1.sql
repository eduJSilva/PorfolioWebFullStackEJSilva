-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-01-2022 a las 13:46:03
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bijouterie`
--
CREATE DATABASE IF NOT EXISTS `bijouterie` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bijouterie`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `edad` int(11) NOT NULL,
  `compartio` varchar(11) NOT NULL,
  `comento` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `apellido`, `edad`, `compartio`, `comento`) VALUES
(2, 'Mariela', 'Rozadas', 47, 'si', 'si'),
(3, 'Marcela', 'Diaz', 25, 'si', 'si'),
(6, 'Fernanda', 'Suarez', 62, 'si', 'si'),
(7, 'Gloria', 'Carra', 51, 'si', 'si'),
(10, 'Rita', 'Galarzo', 63, 'si', 'si'),
(11, 'Gilda', 'Rodriguez', 40, 'si', 'si');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Base de datos: `despensa`
--
CREATE DATABASE IF NOT EXISTS `despensa` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `despensa`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `codigo` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `marca` varchar(250) NOT NULL,
  `precio` int(11) NOT NULL,
  `cantidad_stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`codigo`, `nombre`, `marca`, `precio`, `cantidad_stock`) VALUES
(1, 'Jabon', 'Lux', 80, 120),
(2, 'Yogurt', 'Ser', 65, 54),
(3, 'Yerba', 'Playadito', 200, 30),
(19, 'Cafe', 'Dolca', 410, 87),
(20, 'Te', 'Cachamay', 45, 65),
(21, 'Chocolate', 'Aguila', 124, 47),
(22, 'Arroz', 'Molinos', 23, 58);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`codigo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- Base de datos: `empresa`
--
CREATE DATABASE IF NOT EXISTS `empresa` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `empresa`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleados`
--

CREATE TABLE `empleados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `cargo` varchar(20) NOT NULL,
  `sueldo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `empleados`
--

INSERT INTO `empleados` (`id`, `nombre`, `apellido`, `cargo`, `sueldo`) VALUES
(1, 'Carlos', 'Gimenez', 'programador', 80000),
(2, 'Gustavo', 'Perez', 'contador', 90000),
(3, 'Carla', 'Gomez', 'programador', 80000),
(4, 'Horacio', 'Quiroga', 'cadete', 45000),
(5, 'Fernando', 'Estevez', 'administrativo', 68000),
(6, 'Valeria', 'Gonzaga', 'programador', 80000),
(7, 'Diego', 'Perez', 'programador', 80000),
(8, 'Silvio', 'Rodriguez', 'administrativo', 76500),
(9, 'Javier', 'Dominguez', 'programador', 80000),
(10, 'Tomas', 'Robles', 'gerente', 120000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `empleados`
--
ALTER TABLE `empleados`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `empleados`
--
ALTER TABLE `empleados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- Base de datos: `youtuber`
--
CREATE DATABASE IF NOT EXISTS `youtuber` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `youtuber`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `link` varchar(250) NOT NULL,
  `fecha_publicacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `videos`
--

INSERT INTO `videos` (`id`, `nombre`, `link`, `fecha_publicacion`) VALUES
(1, 'Mar del Plata', 'https://www.youtube.com/watch?v=DPTSeXaVU8Q&ab_channel=EpicMedia', '2021-01-06'),
(2, 'Cordoba', 'https://www.youtube.com/watch?v=NvHtHj-zgiM&ab_channel=EpicMedia', '2019-03-14'),
(3, 'Ciudad de Buenos Aires', 'https://www.youtube.com/watch?v=PIqawM36dTc&ab_channel=EpicMedia', '2018-04-11'),
(4, 'Rosario', 'https://www.youtube.com/watch?v=NTD5e5X4qfA&ab_channel=EpicMedia', '2022-01-03'),
(5, 'Tucumán', 'https://www.youtube.com/watch?v=FgZwXX67y8k&ab_channel=EpicMedia', '2017-01-18');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
