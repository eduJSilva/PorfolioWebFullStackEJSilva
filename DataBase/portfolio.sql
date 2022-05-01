-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 30, 2022 at 06:46 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `portfolio`
--

-- --------------------------------------------------------

--
-- Table structure for table `educacion`
--

CREATE TABLE `educacion` (
  `id_educacion` bigint(20) NOT NULL,
  `carrera` varchar(255) DEFAULT NULL,
  `escuela` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fin` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `inicio` varchar(255) DEFAULT NULL,
  `nivel` varchar(255) DEFAULT NULL,
  `puntaje` bigint(20) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `fk_persona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `educacion`
--

INSERT INTO `educacion` (`id_educacion`, `carrera`, `escuela`, `estado`, `fin`, `imagen`, `inicio`, `nivel`, `puntaje`, `titulo`, `fk_persona`) VALUES
(2, '#YoProgramo-2da.Etapa Argentina Programa', 'Ministerio de Desarrollo Productivo + Cessi', 'Incompleto', '2022', 'assets/instituciones/APLogo-20-20.png', '2021', 'Curso', 9, 'Full Stack Developer Jr.', 1),
(3, '#SéProgramar-1ra.Etapa Argentina Programa', 'Ministerio de Desarrollo Productivo + Cessi', 'Graduado', '2021', 'assets/instituciones/APLogo-20-20.png', '2021', 'Curso', 9, '#SéProgramar', 1),
(4, 'Martillero, corredor público y corredor inmobiliario', 'Universidad Blás Pascal', 'Graduado', '2020', 'https://www.ubp.edu.ar/wp-content/uploads/2017/02/logo-ubp-vertical.png', '2018', 'Universitario', 8, 'Martillero, corredor público y corredor inmobiliario', 1),
(5, 'Ciencias Antropológicas', 'UBA, Universidad de Buenos Aires', 'Incompleto', '2001', 'https://museodeladeuda.econ.uba.ar/wp-content/uploads/2014/10/Logo-UBA-nuevo-blanco.png', '1998', 'Universitario', 7, 'Antropólogo Social(no obtenido)', 1),
(17, 'Secundario', 'Colegio Pio XII', 'Graduado', '1996', 'https://pbs.twimg.com/profile_images/663823635522695168/yCUNf7iT_400x400.jpg', '1992', 'Secundario', 7, 'Perito Mercantil con especialización contable e impositiva', 1);

-- --------------------------------------------------------

--
-- Table structure for table `email_token_seq`
--

CREATE TABLE `email_token_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `email_token_seq`
--

INSERT INTO `email_token_seq` (`next_val`) VALUES
(33);

-- --------------------------------------------------------

--
-- Table structure for table `email_verification_token`
--

CREATE TABLE `email_verification_token` (
  `token_id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `expiry_dt` datetime(6) NOT NULL,
  `token` varchar(255) NOT NULL,
  `token_status` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `email_verification_token`
--

INSERT INTO `email_verification_token` (`token_id`, `created_at`, `updated_at`, `expiry_dt`, `token`, `token_status`, `user_id`) VALUES
(1, '2022-04-10 20:41:50.729000', '2022-04-10 20:43:16.936000', '2022-04-10 21:41:50.724000', '47073e34-55d6-4780-8e9d-e6eafd794325', 'STATUS_CONFIRMED', 1),
(31, '2022-04-14 00:27:52.150000', '2022-04-14 00:28:25.437000', '2022-04-14 01:27:52.149000', 'cb9c2f67-644e-4a2d-82e1-b57563e0c3b2', 'STATUS_CONFIRMED', 32);

-- --------------------------------------------------------

--
-- Table structure for table `experiencia`
--

CREATE TABLE `experiencia` (
  `id_experiencia` bigint(20) NOT NULL,
  `descripcion` text,
  `empresa` varchar(255) DEFAULT NULL,
  `fin` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `inicio` varchar(255) DEFAULT NULL,
  `puesto` varchar(255) DEFAULT NULL,
  `fk_persona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `experiencia`
--

INSERT INTO `experiencia` (`id_experiencia`, `descripcion`, `empresa`, `fin`, `imagen`, `inicio`, `puesto`, `fk_persona`) VALUES
(7, 'Administración de Inmuebles; Servicios de intermediación, asesoramiento y gestión en transacciones inmobiliarias relacionadas con la compraventa, locación, permuta y cesión de bienes inmuebles; Tasaciones; Planificación de Marketing; Diseño y evaluación de proyectos; CRM.', 'Profesional Independiente', 'presente', 'assets/experiencia_logos/logo_realestate.png', '2017', 'Corredor Inmobiliario', 1),
(8, 'Coordinación de equipos de trabajo; Relevamiento de información; Seguimiento del trabajo de campo: control y cumplimiento de cuotas y cronogramas; Revisión de cuestionarios; Generación de reportes del avance de campo; Monitoreo de la calidad del trabajo, evaluaciones periódicas y devoluciones para mejorar los procesos; Reclutamiento y selección de encuestadores; Administración de bases de datos.', 'Quid Research S.R.L.', '2016', 'assets/experiencia_logos/logo_quid.png', '2015', 'Coordinador de Campo Cuantitativo', 1),
(9, 'Control de almacenes; Gestión de inventarios; Planificación de la producción y distribución; Optimización de costos; Control de facturación; Administración de compras; Desarrollo de proveedores y negociación de tarifas.', 'Warhol', '2014', 'assets/experiencia_logos/logo_warhol.png', '2009', 'Encargado de producción, compras, almacén y distribución', 1),
(10, 'Control, administración y seguimiento de cueros y derivados transportados desde frigoríficos a las respectiva plantas, y de las plantas a los clientes (mercado local, exportaciones); optimización de costos de carga, transporte y servicios a clientes; programación de distribución; control de facturación; desarrollo de proveedores y negociación de tarifas. Gestión de inventarios, auditorias internas, planificación de embarques de mercado exterior.', 'Curtiembre Arlei S.A', '2008', 'assets/experiencia_logos/logo_ARLEI.png', '2000', 'Analista Senior en logística y almacenes', 1);

-- --------------------------------------------------------

--
-- Table structure for table `foto`
--

CREATE TABLE `foto` (
  `id` int(11) NOT NULL,
  `imagen_id` varchar(255) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `foto`
--

INSERT INTO `foto` (`id`, `imagen_id`, `imagen_url`, `name`) VALUES
(18, 'flozsqgs7s9kfqh3ubpf', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1650757616/flozsqgs7s9kfqh3ubpf.png', 'Foto_2021'),
(19, 're0f25xhwtxnn4ykv9bt', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651114055/re0f25xhwtxnn4ykv9bt.png', 'Foto_2021'),
(20, 'jjbn5dhu28lujr0bohey', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651186729/jjbn5dhu28lujr0bohey.jpg', '20140917_080245_Android'),
(21, 'wb3jxbsrgubgu1amreih', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651186764/wb3jxbsrgubgu1amreih.jpg', '20140920_165848_Android'),
(22, 'qe1begjkdj9czuioimnz', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651186797/qe1begjkdj9czuioimnz.png', 'Foto_2021');

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(179);

-- --------------------------------------------------------

--
-- Table structure for table `imagen`
--

CREATE TABLE `imagen` (
  `id` int(11) NOT NULL,
  `imagen_id` varchar(255) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `imagen`
--

INSERT INTO `imagen` (`id`, `imagen_id`, `imagen_url`, `name`) VALUES
(1, 'y7lv6tmqnxrvisik8l1p', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1649011070/y7lv6tmqnxrvisik8l1p.jpg', 'Eduardo_Silva_Cursando'),
(2, 'pjtrzunmcet5uwwmrpn7', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1649011070/y7lv6tmqnxrvisik8l1p.jpg', 'Eduardo_Silva_Cursando'),
(3, 'efcwnz0dviy4ll4thd03', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1649011070/y7lv6tmqnxrvisik8l1p.jpg', 'Eduardo_Silva_Cursando'),
(4, 'mdisubwunuzxdmppd5fy', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651098246/mdisubwunuzxdmppd5fy.png', 'dfconfecciones'),
(5, 't42cfaeywygzvthj4szt', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651099113/t42cfaeywygzvthj4szt.png', 'dfconfecciones'),
(6, 'nek6u9ykfdjs5bmcxqhl', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651099490/nek6u9ykfdjs5bmcxqhl.png', 'dfconfecciones'),
(7, 'nskybysgjpuhw3nojdav', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651099651/nskybysgjpuhw3nojdav.png', 'dfconfecciones'),
(8, 'xabd6d19tbx7epso1cck', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651110189/xabd6d19tbx7epso1cck.jpg', 'porfolio'),
(9, 'lownal149fjqbmowrt8a', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651110190/lownal149fjqbmowrt8a.png', 'dfconfecciones'),
(10, 'avdn9fxbr7rvrnekipik', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651110190/avdn9fxbr7rvrnekipik.png', 'dfconfecciones'),
(11, 'ftz0mkg2jrepbtosrjhx', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651110261/ftz0mkg2jrepbtosrjhx.png', 'dfconfecciones'),
(12, 'w1fobmkhy7xzgg0symdv', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651110262/w1fobmkhy7xzgg0symdv.png', 'dfconfecciones'),
(13, 'umzbbbcfbrn1fp6k8fec', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651110264/umzbbbcfbrn1fp6k8fec.png', 'dfconfecciones'),
(14, 'emkian8bnng0lfpqxgwu', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651110340/emkian8bnng0lfpqxgwu.png', 'dfconfecciones'),
(15, 'h7q4xb05v4matmaxub7h', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651110341/h7q4xb05v4matmaxub7h.png', 'dfconfecciones'),
(16, 'hnwp3kwmu1aauvxg3o8a', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651110344/hnwp3kwmu1aauvxg3o8a.png', 'dfconfecciones'),
(17, 't0nvhcdgrzwvk8lqq4nd', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651110424/t0nvhcdgrzwvk8lqq4nd.jpg', '20140917_080245_Android'),
(18, 'urxb6e7fikx7ygnxl2lk', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651110432/urxb6e7fikx7ygnxl2lk.jpg', '20140920_165848_Android'),
(19, 'hckmauju4vryatakdx3x', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651113184/hckmauju4vryatakdx3x.jpg', 'Eduardo_Silva_Cursando400'),
(20, 'ue9epk9t73yl9emn9urj', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651113187/ue9epk9t73yl9emn9urj.jpg', 'Eduardo_Silva_Cursando400'),
(21, 'nlmc9krd6scubxzjlfix', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651113187/nlmc9krd6scubxzjlfix.jpg', 'Eduardo_Silva_Cursando400'),
(22, 'ubcru4jddhpvrhf8g44a', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651113555/ubcru4jddhpvrhf8g44a.jpg', 'Eduardo_Silva_Cursando400'),
(23, 'jyfw2vuhncjaedpokq7j', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651113556/jyfw2vuhncjaedpokq7j.jpg', 'Eduardo_Silva_Cursando400'),
(24, 'oanv0tgkcwfcagwautk4', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651113556/oanv0tgkcwfcagwautk4.jpg', 'Eduardo_Silva_Cursando400'),
(25, 'o1ni4uycmnrgsiwypa7l', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651113627/o1ni4uycmnrgsiwypa7l.jpg', 'Eduardo_Silva_Cursando400'),
(26, 'le1d3yaxbavcsdus3qgo', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651113687/le1d3yaxbavcsdus3qgo.jpg', 'Eduardo_Silva_Cursando400'),
(27, 'k7uc1pnaf5utyjhvnury', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651113688/k7uc1pnaf5utyjhvnury.jpg', 'Eduardo_Silva_Cursando400'),
(28, 'nhgsrpfsdjmfgf7thxhx', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651113688/nhgsrpfsdjmfgf7thxhx.jpg', 'Eduardo_Silva_Cursando400'),
(29, 'k9owypiwxg2zpsu6h2kg', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651113985/k9owypiwxg2zpsu6h2kg.jpg', 'Eduardo_Silva_Cursando400'),
(30, 'oemhbjnzwssembictggq', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651113986/oemhbjnzwssembictggq.jpg', 'Eduardo_Silva_Cursando400'),
(31, 'dthacudcbiejtjinoddf', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651113986/dthacudcbiejtjinoddf.jpg', 'Eduardo_Silva_Cursando400'),
(32, 'mnql8rhc5lelh0ejgg05', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651114429/mnql8rhc5lelh0ejgg05.jpg', '20140922_173634_Android'),
(33, 'gwllj9x3fsud47axvnpx', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651114466/gwllj9x3fsud47axvnpx.jpg', '20140917_080245_Android'),
(34, 'xrk8onftc8qwbuinix30', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651114532/xrk8onftc8qwbuinix30.jpg', 'porfolio'),
(35, 'b9qj9v0z6eahc1gl1ocn', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651115449/b9qj9v0z6eahc1gl1ocn.jpg', 'Eduardo_Silva_Cursando400'),
(36, 'ileh0qlb9ft7xbqcco73', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651115450/ileh0qlb9ft7xbqcco73.jpg', 'Eduardo_Silva_Cursando400'),
(37, 'bdaovuf1maggojquzxrj', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651115450/bdaovuf1maggojquzxrj.jpg', 'Eduardo_Silva_Cursando400'),
(38, 'lljhwhabcggdvfia9c1o', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651115553/lljhwhabcggdvfia9c1o.jpg', 'Eduardo_Silva_Cursando400'),
(39, 'rmhgooaszmbluibwxfac', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651115553/rmhgooaszmbluibwxfac.jpg', 'Eduardo_Silva_Cursando400'),
(40, 'obba9mhds1s8d0dcv6zc', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651115556/obba9mhds1s8d0dcv6zc.jpg', 'Eduardo_Silva_Cursando400'),
(41, 'upcwjz1m3sq0wa8trn0y', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651115631/upcwjz1m3sq0wa8trn0y.jpg', 'Eduardo_Silva_Cursando400'),
(42, 'ixes9wlv73qq37bmvenb', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651115631/ixes9wlv73qq37bmvenb.jpg', 'Eduardo_Silva_Cursando400'),
(43, 'f0xmymq7rtzfbvairzvu', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651115632/f0xmymq7rtzfbvairzvu.jpg', 'Eduardo_Silva_Cursando400'),
(44, 'dxvrsemyhwcda3dyz0i0', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651115706/dxvrsemyhwcda3dyz0i0.jpg', 'Eduardo_Silva_Cursando400'),
(45, 'vxqlhnpqdo07ahsdro6c', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651115706/vxqlhnpqdo07ahsdro6c.jpg', 'Eduardo_Silva_Cursando400'),
(46, 'j4ts5lmytpcdpf3rshib', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651115710/j4ts5lmytpcdpf3rshib.jpg', 'Eduardo_Silva_Cursando400'),
(47, 'vko1vg9uxn77mh6malan', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651185131/vko1vg9uxn77mh6malan.jpg', 'Eduardo_Silva_Cursando400'),
(48, 'he5yqlrzclpfxaflpyxl', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651185133/he5yqlrzclpfxaflpyxl.png', 'dfconfecciones'),
(49, 'hru7emgcho5dtfcpmt7p', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651185904/hru7emgcho5dtfcpmt7p.jpg', '20140917_080245_Android'),
(50, 'kz79ruvkcssfiikfsnt9', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651185916/kz79ruvkcssfiikfsnt9.jpg', '20140831_145945_Android'),
(51, 'ld15qvmkevaaqefmnq1u', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651186016/ld15qvmkevaaqefmnq1u.jpg', '20140917_080245_Android'),
(52, 'cxbkzga302iukdfxavej', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651186019/cxbkzga302iukdfxavej.jpg', '20140831_144737_Android'),
(53, 'awtvqfamegdtvqk43qhe', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651186020/awtvqfamegdtvqk43qhe.jpg', '20140920_165848_Android'),
(54, 'hej399jvnryw3qbrfmaj', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651186137/hej399jvnryw3qbrfmaj.jpg', 'Eduardo_Silva_Cursando400'),
(55, 'zivn3wfd9fvh5ylfeclf', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651186138/zivn3wfd9fvh5ylfeclf.jpg', 'Eduardo_Silva_Cursando400'),
(56, 'cxzqfm83tlwx5vhcixej', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651186141/cxzqfm83tlwx5vhcixej.jpg', 'Eduardo_Silva_Cursando400');

-- --------------------------------------------------------

--
-- Table structure for table `imagen_proyecto`
--

CREATE TABLE `imagen_proyecto` (
  `id` int(11) NOT NULL,
  `imagen_id` varchar(255) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `fk_proyecto` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `imagen_proyecto`
--

INSERT INTO `imagen_proyecto` (`id`, `imagen_id`, `imagen_url`, `name`, `fk_proyecto`) VALUES
(1, 'qsuzbx0o24tndfnivwod', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651327749/qsuzbx0o24tndfnivwod.jpg', 'Eduardo_Silva_Cursando400', 148),
(37, 'hbb8frre63wahejmsc4c', 'http://res.cloudinary.com/dmfuwxcez/image/upload/v1651112145/hbb8frre63wahejmsc4c.jpg', 'dfconfecciones', 149);

-- --------------------------------------------------------

--
-- Table structure for table `institucion`
--

CREATE TABLE `institucion` (
  `id_institucion` bigint(20) NOT NULL,
  `institucion` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `fk_persona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `institucion`
--

INSERT INTO `institucion` (`id_institucion`, `institucion`, `logo`, `fk_persona`) VALUES
(11, 'Argentina Programa', 'assets/instituciones/APLogo-20-20.png', 1),
(12, 'Universidad Blas Pascal', 'https://www.ubp.edu.ar/wp-content/uploads/2017/02/logo-ubp-vertical.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_token`
--

CREATE TABLE `password_reset_token` (
  `token_id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `is_claimed` bit(1) NOT NULL,
  `expiry_dt` datetime(6) NOT NULL,
  `token_name` varchar(255) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `persona`
--

CREATE TABLE `persona` (
  `id` int(11) NOT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `calle` varchar(255) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `documento` bigint(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fecha_nacimiento` varchar(255) DEFAULT NULL,
  `localidad` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `numero` varchar(255) DEFAULT NULL,
  `provincia` varchar(255) DEFAULT NULL,
  `puesto` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `zip` varchar(255) DEFAULT NULL,
  `acerca_de` text,
  `institucion_dos` varchar(255) DEFAULT NULL,
  `institucion_uno` varchar(255) DEFAULT NULL,
  `logo_institucion_dos` varchar(255) DEFAULT NULL,
  `logo_institucion_uno` varchar(255) DEFAULT NULL,
  `link_institucion_dos` varchar(255) DEFAULT NULL,
  `link_institucion_uno` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `persona`
--

INSERT INTO `persona` (`id`, `apellido`, `calle`, `ciudad`, `documento`, `email`, `fecha_nacimiento`, `localidad`, `nombre`, `numero`, `provincia`, `puesto`, `telefono`, `zip`, `acerca_de`, `institucion_dos`, `institucion_uno`, `logo_institucion_dos`, `logo_institucion_uno`, `link_institucion_dos`, `link_institucion_uno`) VALUES
(1, 'Silva', 'Florentino Ameghino', 'Avellaneda', 27226548, 'silvaeduardojavier@hotmail.com', '1979-04-13T00:00:00.000Z', 'Avellaneda', 'Eduardo Javier', '567', 'Bs.As.', 'Full Stack Developer Jr.', '1161085258', '1870', 'Martillero Público, Corredor Público y Corredor Inmobiliario. Mi experiencia se basa en más de 20 años de trabajo en importantes empresas de Argentina como son Arlei S.A., Warhol S.R.L. y Autotrol S.A. Considero que mi fortaleza se basa en la confianza y el vínculo humano. Siempre dispuesto a acompañar proyectos creativos que permitan el crecimiento de la empresa, su grupo humano y mi persona. Estudio programación de forma autodidacta desde hace mas de 5 años, y ahora pude lograr la certificación en Full Stack Developer Jr. Gracias a Argentina Programa. Ademas de este proyecto, tengo otro desarrollado en lenguaje Python con el framework Django, en la sección Proyecto se puede acceder al mismo.', 'INTI', 'Argentina Programa', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/INTI_Logo_2019.png/800px-INTI_Logo_2019.png', 'assets/instituciones/APLogo-20-20.png', 'https://www.argentina.gob.ar/inti', 'https://www.argentina.gob.ar/produccion/transformacion-digital-y-economia-del-conocimiento/argentina-programa');

-- --------------------------------------------------------

--
-- Table structure for table `proyecto`
--

CREATE TABLE `proyecto` (
  `id_proyecto` bigint(20) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `fecha` varchar(255) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `nombre_proyecto` varchar(255) DEFAULT NULL,
  `fk_persona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `proyecto`
--

INSERT INTO `proyecto` (`id_proyecto`, `descripcion`, `fecha`, `link`, `nombre_proyecto`, `fk_persona`) VALUES
(148, 'Porfolio desarrollado mediante el Stack tecnológico: Angular + Springboot + Mysql', '24/04/22', 'http://localhost:4200/portfolio', 'Porfolio Full Stack Developer', 1),
(149, 'App desarrollada  mediante el Stack tecnológico: Django(framework de Python) + PostgreSQL.', '22/05/17', 'https://dfconfecciones.herokuapp.com/', 'DF Confecciones', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pwd_reset_token_seq`
--

CREATE TABLE `pwd_reset_token_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pwd_reset_token_seq`
--

INSERT INTO `pwd_reset_token_seq` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `refresh_token`
--

CREATE TABLE `refresh_token` (
  `token_id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `expiry_dt` datetime(6) NOT NULL,
  `refresh_count` bigint(20) DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `user_device_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `refresh_token`
--

INSERT INTO `refresh_token` (`token_id`, `created_at`, `updated_at`, `expiry_dt`, `refresh_count`, `token`, `user_device_id`) VALUES
(196, '2022-04-30 18:26:11.891000', '2022-04-30 18:26:11.891000', '2022-05-30 18:26:11.890000', 0, 'b16a1414-90b2-441a-b8d2-723b23e5a11d', 196),
(198, '2022-04-30 18:32:32.643000', '2022-04-30 18:32:32.643000', '2022-05-30 18:32:32.630000', 0, '5e601fed-8493-47f1-8364-ac51fd8c6f56', 198);

-- --------------------------------------------------------

--
-- Table structure for table `refresh_token_seq`
--

CREATE TABLE `refresh_token_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `refresh_token_seq`
--

INSERT INTO `refresh_token_seq` (`next_val`) VALUES
(199);

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` bigint(20) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(2, 'ROLE_ADMIN'),
(1, 'ROLE_USER');

-- --------------------------------------------------------

--
-- Table structure for table `skill`
--

CREATE TABLE `skill` (
  `id_skill` bigint(20) NOT NULL,
  `dominio` bigint(20) DEFAULT NULL,
  `nombre_skill` varchar(255) DEFAULT NULL,
  `tipo_skill` varchar(255) DEFAULT NULL,
  `fk_persona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `skill`
--

INSERT INTO `skill` (`id_skill`, `dominio`, `nombre_skill`, `tipo_skill`, `fk_persona`) VALUES
(1, 70, 'Inglés', 'hard', 1),
(2, 64, 'Comunicación', 'soft', 1),
(33, 54, 'JavaScript', 'hard', 1),
(37, 21, 'Imaginación', 'soft', 1),
(38, 30, 'Python', 'hard', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `is_email_verified` bit(1) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `created_at`, `updated_at`, `is_active`, `email`, `first_name`, `is_email_verified`, `last_name`, `password`, `username`) VALUES
(1, '2022-04-10 20:41:50.683000', '2022-04-10 20:43:16.940000', b'1', 'portfoliosej@gmail.com', NULL, b'1', NULL, '$2a$10$eosSe5TB25Boxwr800Z70Ope31B83a2PhDYQDoeMIMByEvfCFr29C', NULL),
(32, '2022-04-14 00:27:52.142000', '2022-04-14 00:28:25.440000', b'1', 'claseslapaz@gmail.com', NULL, b'1', NULL, '$2a$10$cKygJ3VZ7iedy4Jfz4eafegs.Y1QhqdJCOKFWQxR3dYoQ3IP.hjNe', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_authority`
--

CREATE TABLE `user_authority` (
  `user_id` bigint(20) NOT NULL,
  `role_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_authority`
--

INSERT INTO `user_authority` (`user_id`, `role_id`) VALUES
(1, 1),
(32, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_device`
--

CREATE TABLE `user_device` (
  `user_device_id` bigint(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `device_id` varchar(255) NOT NULL,
  `device_type` varchar(255) DEFAULT NULL,
  `is_refresh_active` bit(1) DEFAULT NULL,
  `notification_token` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_device`
--

INSERT INTO `user_device` (`user_device_id`, `created_at`, `updated_at`, `device_id`, `device_type`, `is_refresh_active`, `notification_token`, `user_id`) VALUES
(196, '2022-04-30 18:26:11.896000', '2022-04-30 18:26:11.896000', 'D1', 'DEVICE_TYPE_ANDROID', b'1', 'N1', 32),
(198, '2022-04-30 18:32:32.661000', '2022-04-30 18:32:32.661000', 'D1', 'DEVICE_TYPE_ANDROID', b'1', 'N1', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_device_seq`
--

CREATE TABLE `user_device_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_device_seq`
--

INSERT INTO `user_device_seq` (`next_val`) VALUES
(199);

-- --------------------------------------------------------

--
-- Table structure for table `user_seq`
--

CREATE TABLE `user_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_seq`
--

INSERT INTO `user_seq` (`next_val`) VALUES
(34);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `educacion`
--
ALTER TABLE `educacion`
  ADD PRIMARY KEY (`id_educacion`),
  ADD KEY `FKlbu7m8cwnw0e43leb5fsu1v1f` (`fk_persona`);

--
-- Indexes for table `email_verification_token`
--
ALTER TABLE `email_verification_token`
  ADD PRIMARY KEY (`token_id`),
  ADD UNIQUE KEY `UK_idu2ippaks8bn6vcsq62khvdu` (`token`),
  ADD KEY `FKqmvt3qcly3hbvde97srchdo3x` (`user_id`);

--
-- Indexes for table `experiencia`
--
ALTER TABLE `experiencia`
  ADD PRIMARY KEY (`id_experiencia`),
  ADD KEY `FK8cs1uij8vd5wp35g0u9b8i5gl` (`fk_persona`);

--
-- Indexes for table `foto`
--
ALTER TABLE `foto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imagen`
--
ALTER TABLE `imagen`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `imagen_proyecto`
--
ALTER TABLE `imagen_proyecto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK7qdry2e48j202nsm4ypjen9ip` (`fk_proyecto`);

--
-- Indexes for table `institucion`
--
ALTER TABLE `institucion`
  ADD PRIMARY KEY (`id_institucion`),
  ADD KEY `FK594eptxkn37ftfkda5l3g20vh` (`fk_persona`);

--
-- Indexes for table `password_reset_token`
--
ALTER TABLE `password_reset_token`
  ADD PRIMARY KEY (`token_id`),
  ADD UNIQUE KEY `UK_p4ksw3dweftlkig5mtd3onr9a` (`token_name`),
  ADD UNIQUE KEY `UK_s1lpbyg2tdcdxqf3ccnc61fs0` (`token_name`),
  ADD KEY `FK5lwtbncug84d4ero33v3cfxvl` (`user_id`);

--
-- Indexes for table `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id_proyecto`),
  ADD KEY `FKfojvjxvc16p3m31514meg3l5t` (`fk_persona`);

--
-- Indexes for table `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD PRIMARY KEY (`token_id`),
  ADD UNIQUE KEY `UK_8ogx3ejsbfbf2xsgl4758otrm` (`user_device_id`),
  ADD UNIQUE KEY `UK_r4k4edos30bx9neoq81mdvwph` (`token`),
  ADD UNIQUE KEY `UK_ga3cqp73wyumau3ghjfx7vq94` (`token`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`),
  ADD UNIQUE KEY `UK_epk9im9l9q67xmwi4hbed25do` (`role_name`);

--
-- Indexes for table `skill`
--
ALTER TABLE `skill`
  ADD PRIMARY KEY (`id_skill`),
  ADD KEY `FKitlkwnnmalebmiyhgikc80gmy` (`fk_persona`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  ADD UNIQUE KEY `UK_sb8bbouer5wak8vyiiy4pf2bx` (`username`),
  ADD UNIQUE KEY `UK_t8tbwelrnviudxdaggwr1kd9b` (`email`);

--
-- Indexes for table `user_authority`
--
ALTER TABLE `user_authority`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `FKash3fy9hdayq3o73fir11n3th` (`role_id`);

--
-- Indexes for table `user_device`
--
ALTER TABLE `user_device`
  ADD PRIMARY KEY (`user_device_id`),
  ADD KEY `FKd2lb0k09c4nnfpvku8r61g92n` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `foto`
--
ALTER TABLE `foto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `imagen`
--
ALTER TABLE `imagen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `imagen_proyecto`
--
ALTER TABLE `imagen_proyecto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `educacion`
--
ALTER TABLE `educacion`
  ADD CONSTRAINT `FKlbu7m8cwnw0e43leb5fsu1v1f` FOREIGN KEY (`fk_persona`) REFERENCES `persona` (`id`);

--
-- Constraints for table `email_verification_token`
--
ALTER TABLE `email_verification_token`
  ADD CONSTRAINT `FKqmvt3qcly3hbvde97srchdo3x` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `experiencia`
--
ALTER TABLE `experiencia`
  ADD CONSTRAINT `FK8cs1uij8vd5wp35g0u9b8i5gl` FOREIGN KEY (`fk_persona`) REFERENCES `persona` (`id`);

--
-- Constraints for table `imagen_proyecto`
--
ALTER TABLE `imagen_proyecto`
  ADD CONSTRAINT `FK7qdry2e48j202nsm4ypjen9ip` FOREIGN KEY (`fk_proyecto`) REFERENCES `proyecto` (`id_proyecto`);

--
-- Constraints for table `institucion`
--
ALTER TABLE `institucion`
  ADD CONSTRAINT `FK594eptxkn37ftfkda5l3g20vh` FOREIGN KEY (`fk_persona`) REFERENCES `persona` (`id`);

--
-- Constraints for table `password_reset_token`
--
ALTER TABLE `password_reset_token`
  ADD CONSTRAINT `FK5lwtbncug84d4ero33v3cfxvl` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `proyecto`
--
ALTER TABLE `proyecto`
  ADD CONSTRAINT `FKfojvjxvc16p3m31514meg3l5t` FOREIGN KEY (`fk_persona`) REFERENCES `persona` (`id`);

--
-- Constraints for table `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD CONSTRAINT `FKr92opronarwe7pn1c41621grv` FOREIGN KEY (`user_device_id`) REFERENCES `user_device` (`user_device_id`);

--
-- Constraints for table `skill`
--
ALTER TABLE `skill`
  ADD CONSTRAINT `FKitlkwnnmalebmiyhgikc80gmy` FOREIGN KEY (`fk_persona`) REFERENCES `persona` (`id`);

--
-- Constraints for table `user_authority`
--
ALTER TABLE `user_authority`
  ADD CONSTRAINT `FKash3fy9hdayq3o73fir11n3th` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`),
  ADD CONSTRAINT `FKpqlsjpkybgos9w2svcri7j8xy` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `user_device`
--
ALTER TABLE `user_device`
  ADD CONSTRAINT `FKd2lb0k09c4nnfpvku8r61g92n` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
