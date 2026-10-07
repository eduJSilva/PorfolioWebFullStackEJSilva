-- Datos de ejemplo para el perfil 'dev' (H2 en memoria). Generado a partir de DataBase/portfolio.sql
-- No contiene usuarios: el administrador de desarrollo lo crea DevDataInitializer.

INSERT INTO role (role_id, role_name) VALUES
(2, 'ROLE_ADMIN'),
(1, 'ROLE_USER');

INSERT INTO persona (id, apellido, calle, ciudad, documento, email, fecha_nacimiento, localidad, nombre, numero, provincia, puesto, telefono, zip, acerca_de, institucion_dos, institucion_uno, logo_institucion_dos, logo_institucion_uno, link_institucion_dos, link_institucion_uno) VALUES
(1, 'Silva', 'Florentino Ameghino', 'Avellaneda', 27226548, 'silvaeduardojavier@hotmail.com', '1979-04-13T00:00:00.000Z', 'Avellaneda', 'Eduardo Javier', '567', 'Bs.As.', 'Full Stack Developer Jr.', '1161085258', '1870', 'Martillero Público, Corredor Público y Corredor Inmobiliario. Mi experiencia se basa en más de 20 años de trabajo en importantes empresas de Argentina como son Arlei S.A., Warhol S.R.L. y Autotrol S.A. Considero que mi fortaleza se basa en la confianza y el vínculo humano. Siempre dispuesto a acompañar proyectos creativos que permitan el crecimiento de la empresa, su grupo humano y mi persona. Estudio programación de forma autodidacta desde hace mas de 5 años, y ahora pude lograr la certificación en Full Stack Developer Jr. Gracias a Argentina Programa. Ademas de este proyecto, tengo otro desarrollado en lenguaje Python con el framework Django, en la sección Proyecto se puede acceder al mismo.', 'INTI', 'Argentina Programa', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/INTI_Logo_2019.png/800px-INTI_Logo_2019.png', 'assets/instituciones/APLogo-20-20.png', 'https://www.argentina.gob.ar/inti', 'https://www.argentina.gob.ar/produccion/transformacion-digital-y-economia-del-conocimiento/argentina-programa');

INSERT INTO experiencia (id_experiencia, descripcion, empresa, fin, imagen, inicio, puesto, fk_persona) VALUES
(7, 'Administración de Inmuebles; Servicios de intermediación, asesoramiento y gestión en transacciones inmobiliarias relacionadas con la compraventa, locación, permuta y cesión de bienes inmuebles; Tasaciones; Planificación de Marketing; Diseño y evaluación de proyectos; CRM.', 'Profesional Independiente', 'presente', 'assets/experiencia_logos/logo_realestate.png', '2017', 'Corredor Inmobiliario', 1),
(8, 'Coordinación de equipos de trabajo; Relevamiento de información; Seguimiento del trabajo de campo: control y cumplimiento de cuotas y cronogramas; Revisión de cuestionarios; Generación de reportes del avance de campo; Monitoreo de la calidad del trabajo, evaluaciones periódicas y devoluciones para mejorar los procesos; Reclutamiento y selección de encuestadores; Administración de bases de datos.', 'Quid Research S.R.L.', '2016', 'assets/experiencia_logos/logo_quid.png', '2015', 'Coordinador de Campo Cuantitativo', 1),
(9, 'Control de almacenes; Gestión de inventarios; Planificación de la producción y distribución; Optimización de costos; Control de facturación; Administración de compras; Desarrollo de proveedores y negociación de tarifas.', 'Warhol', '2014', 'assets/experiencia_logos/logo_warhol.png', '2009', 'Encargado de producción, compras, almacén y distribución', 1),
(10, 'Control, administración y seguimiento de cueros y derivados transportados desde frigoríficos a las respectiva plantas, y de las plantas a los clientes (mercado local, exportaciones); optimización de costos de carga, transporte y servicios a clientes; programación de distribución; control de facturación; desarrollo de proveedores y negociación de tarifas. Gestión de inventarios, auditorias internas, planificación de embarques de mercado exterior.', 'Curtiembre Arlei S.A', '2008', 'assets/experiencia_logos/logo_ARLEI.png', '2000', 'Analista Senior en logística y almacenes', 1);

INSERT INTO educacion (id_educacion, carrera, escuela, estado, fin, imagen, inicio, nivel, puntaje, titulo, fk_persona) VALUES
(2, '#YoProgramo-2da.Etapa Argentina Programa', 'Ministerio de Desarrollo Productivo + Cessi', 'Incompleto', '2022', 'assets/instituciones/APLogo-20-20.png', '2021', 'Curso', 9, 'Full Stack Developer Jr.', 1),
(3, '#SéProgramar-1ra.Etapa Argentina Programa', 'Ministerio de Desarrollo Productivo + Cessi', 'Graduado', '2021', 'assets/instituciones/APLogo-20-20.png', '2021', 'Curso', 9, '#SéProgramar', 1),
(4, 'Martillero, corredor público y corredor inmobiliario', 'Universidad Blás Pascal', 'Graduado', '2020', 'https://www.ubp.edu.ar/wp-content/uploads/2017/02/logo-ubp-vertical.png', '2018', 'Universitario', 8, 'Martillero, corredor público y corredor inmobiliario', 1),
(5, 'Ciencias Antropológicas', 'UBA, Universidad de Buenos Aires', 'Incompleto', '2001', 'https://museodeladeuda.econ.uba.ar/wp-content/uploads/2014/10/Logo-UBA-nuevo-blanco.png', '1998', 'Universitario', 7, 'Antropólogo Social(no obtenido)', 1),
(17, 'Secundario', 'Colegio Pio XII', 'Graduado', '1996', 'https://pbs.twimg.com/profile_images/663823635522695168/yCUNf7iT_400x400.jpg', '1992', 'Secundario', 7, 'Perito Mercantil con especialización contable e impositiva', 1);

INSERT INTO skill (id_skill, dominio, nombre_skill, tipo_skill, fk_persona) VALUES
(1, 70, 'Inglés', 'hard', 1),
(2, 64, 'Comunicación', 'soft', 1),
(33, 54, 'JavaScript', 'hard', 1),
(37, 21, 'Imaginación', 'soft', 1),
(38, 30, 'Python', 'hard', 1);

INSERT INTO proyecto (id_proyecto, descripcion, fecha, link, nombre_proyecto, fk_persona) VALUES
(148, 'Portfolio full stack con panel de administración: Angular 21 + Spring Boot 4 (Java 21, JWT) + MySQL, imágenes en Cloudinary.', '2026', 'https://github.com/eduJSilva/PorfolioWebFullStackEJSilva', 'Portfolio Full Stack', 1),
(149, 'App desarrollada  mediante el Stack tecnológico: Django(framework de Python) + PostgreSQL.', '22/05/17', 'https://dfconfecciones.herokuapp.com/', 'DF Confecciones', 1);

INSERT INTO imagen_proyecto (id, imagen_id, imagen_url, name, fk_proyecto) VALUES
(1, 'qsuzbx0o24tndfnivwod', 'https://res.cloudinary.com/dmfuwxcez/image/upload/v1651327749/qsuzbx0o24tndfnivwod.jpg', 'Eduardo_Silva_Cursando400', 148),
(37, 'hbb8frre63wahejmsc4c', 'https://res.cloudinary.com/dmfuwxcez/image/upload/v1651112145/hbb8frre63wahejmsc4c.jpg', 'dfconfecciones', 149);

INSERT INTO foto (id, imagen_id, imagen_url, name) VALUES
(22, 'qe1begjkdj9czuioimnz', 'https://res.cloudinary.com/dmfuwxcez/image/upload/v1651186797/qe1begjkdj9czuioimnz.png', 'Foto_2021');

INSERT INTO imagen (id, imagen_id, imagen_url, name) VALUES
(56, 'cxzqfm83tlwx5vhcixej', 'https://res.cloudinary.com/dmfuwxcez/image/upload/v1651186141/cxzqfm83tlwx5vhcixej.jpg', 'Eduardo_Silva_Cursando400');

-- Actualización 2026-10 (ver DataBase/actualizacion-2026-10.sql)
INSERT INTO skill (id_skill, dominio, nombre_skill, tipo_skill, fk_persona) VALUES
(39, 65, 'Java', 'hard', 1),
(40, 60, 'Spring Boot', 'hard', 1),
(41, 65, 'Angular', 'hard', 1),
(42, 60, 'MySQL', 'hard', 1);

INSERT INTO proyecto (id_proyecto, descripcion, fecha, link, nombre_proyecto, fk_persona) VALUES
(150, 'Aplicación en Angular 15 + Angular Material para buscar y consultar autos usados, con datos obtenidos mediante web scraping de concesionarias.', '2023', 'https://github.com/eduJSilva/carhero', 'ScrapingCar', 1),
(151, 'Cinco aplicaciones en React + Redux: máquina de citas aleatorias, previsualizador de Markdown, drum machine, calculadora y reloj Pomodoro (25 + 5).', '2022', 'https://github.com/eduJSilva?tab=repositories', 'Mini apps React + Redux', 1);

INSERT INTO experiencia (id_experiencia, descripcion, empresa, fin, imagen, inicio, puesto, fk_persona) VALUES
(11, 'Gestión de compras y abastecimiento para mantenimiento y obras semafóricas y de alumbrado público; Cotizaciones y negociación con proveedores; Emisión y seguimiento de órdenes de compra; Desarrollo y evaluación de proveedores; Coordinación de requerimientos con almacén y áreas operativas', 'Autotrol S.A.', 'presente', NULL, '2022', 'Comprador', 1);

INSERT INTO proyecto (id_proyecto, descripcion, fecha, link, nombre_proyecto, fk_persona) VALUES
(152, 'ERP para PyMEs industriales y de servicios: compras (requerimiento → orden de compra), stock y almacenes, ventas (cotización → cobro), pagos y tesorería, contabilidad y facturación electrónica AFIP (CAE y Libro IVA Digital). Perfiles y permisos por puesto, multi-organización. Stack: Java + Spring Boot, Angular, MySQL y Docker. Próximamente disponible para su comercialización.', '2026 · Próximamente', NULL, 'ERP de gestión integral', 1);

UPDATE persona SET acerca_de = CONCAT('Desde 2022 me desempeño como Comprador en Autotrol S.A., gestionando el abastecimiento de la empresa en el área de mantenimiento y obras semafóricas y de alumbrado público. ', acerca_de) WHERE id = 1;

-- Evita colisiones entre los ids sembrados y la secuencia de Hibernate
ALTER SEQUENCE hibernate_sequence RESTART WITH 1000;
