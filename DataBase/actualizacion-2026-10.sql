-- =============================================================================
-- Actualización de contenido del portfolio (octubre 2026) · MySQL
-- Ejecutar una sola vez sobre la base de producción.
-- Usa la tabla hibernate_sequence para asignar los ids, igual que la API,
-- así no hay choques con registros creados desde el panel de administración.
-- =============================================================================
START TRANSACTION;

SELECT next_val INTO @id FROM hibernate_sequence FOR UPDATE;

-- Skills técnicas
INSERT INTO skill (id_skill, dominio, nombre_skill, tipo_skill, fk_persona) VALUES
(@id,     65, 'Java',        'hard', 1),
(@id + 1, 60, 'Spring Boot', 'hard', 1),
(@id + 2, 65, 'Angular',     'hard', 1),
(@id + 3, 60, 'MySQL',       'hard', 1);

-- Proyectos publicados en GitHub
INSERT INTO proyecto (id_proyecto, descripcion, fecha, link, nombre_proyecto, fk_persona) VALUES
(@id + 4, 'Aplicación en Angular 15 + Angular Material para buscar y consultar autos usados, con datos obtenidos mediante web scraping de concesionarias.', '2023', 'https://github.com/eduJSilva/carhero', 'ScrapingCar', 1),
(@id + 5, 'Cinco aplicaciones en React + Redux: máquina de citas aleatorias, previsualizador de Markdown, drum machine, calculadora y reloj Pomodoro (25 + 5).', '2022', 'https://github.com/eduJSilva?tab=repositories', 'Mini apps React + Redux', 1);

UPDATE hibernate_sequence SET next_val = @id + 6;

-- El proyecto del portfolio apuntaba a localhost: se actualiza con el stack y el repositorio actuales
UPDATE proyecto
SET nombre_proyecto = 'Portfolio Full Stack',
    descripcion = 'Portfolio full stack con panel de administración: Angular 21 + Spring Boot 4 (Java 21, JWT) + MySQL, imágenes en Cloudinary.',
    fecha = '2026',
    link = 'https://github.com/eduJSilva/PorfolioWebFullStackEJSilva'
WHERE id_proyecto = 148;

COMMIT;
