-- =============================================================================
-- "Full Stack Developer Jr." -> "Full Stack Developer" · MySQL
-- Idempotente: se puede ejecutar más de una vez sin efectos secundarios.
-- =============================================================================
START TRANSACTION;

-- Título del encabezado
UPDATE persona SET puesto = REPLACE(puesto, 'Full Stack Developer Jr.', 'Full Stack Developer')
WHERE puesto LIKE '%Full Stack Developer Jr.%';

-- "Sobre mí"
UPDATE persona SET acerca_de = REPLACE(acerca_de, 'Full Stack Developer Jr.', 'Full Stack Developer')
WHERE acerca_de LIKE '%Full Stack Developer Jr.%';

-- Formación (Argentina Programa)
UPDATE educacion SET titulo = REPLACE(titulo, 'Full Stack Developer Jr.', 'Full Stack Developer')
WHERE titulo LIKE '%Full Stack Developer Jr.%';

COMMIT;
