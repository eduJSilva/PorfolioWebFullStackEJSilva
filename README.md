# Portfolio Web Full Stack · Eduardo J. Silva

Portfolio personal con panel de edición integrado.

| Capa | Tecnología |
|------|------------|
| Front-end | Angular 21 (standalone, signals, zoneless), CSS propio con modo claro/oscuro |
| Back-end | Spring Boot 4.1 · Java 21 · Spring Security 7 + JWT · JPA/Hibernate 7 |
| Base de datos | MySQL (producción) · H2 en memoria (desarrollo) |
| Imágenes | Cloudinary |
| Hosting | Vercel o Firebase Hosting (front) · Koyeb / Docker (API) |

```
Back-End/Back-End-SpringBoot   API REST
Front-End/Front-End-Angular    SPA Angular
DataBase/portfolio.sql         Dump de la base original
```

## Cómo funciona

- **Visitantes**: ven el portfolio sin registrarse (Sobre mí, Experiencia, Educación, Skills, Proyectos, Contacto).
- **Administrador**: entra desde el ícono de acceso del footer (`/login`). Con rol `ADMIN` aparecen botones para
  agregar, editar y eliminar cada elemento, cambiar la foto y la portada. Los cambios se ven al instante, sin recargar.
- Recuperación de contraseña por email (`/recuperar` → link con token → `/restablecer`).

## Desarrollo local

Requisitos: Java 21, Node 22.12+ (o 24).

```bash
# 1) API con H2 + datos de ejemplo (http://localhost:8080, Swagger en /swagger-ui.html)
cd Back-End/Back-End-SpringBoot
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
#    Admin local: admin@portfolio.local / admin12345

# 2) Front-end (http://localhost:4200, apunta a http://localhost:8080)
cd Front-End/Front-End-Angular
npm ci
npm start
```

Tests: `./mvnw test` (back) · `npm run build` (front).

## Producción

### API
Todas las credenciales se leen de **variables de entorno** (ver `Back-End/Back-End-SpringBoot/.env.example`):
`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `APP_JWT_SECRET`, `APP_FRONTEND_URL`, `APP_CORS_ALLOWED_ORIGINS`,
`CLOUDINARY_*`, `MAIL_*`.

```bash
cd Back-End/Back-End-SpringBoot
docker build -t portfolio-api .
docker run -p 8080:8080 --env-file .env portfolio-api
```

Para cargar el contenido nuevo (skills Java, Spring Boot, Angular y MySQL; proyectos de GitHub)
ejecutar una vez `DataBase/actualizacion-2026-10.sql` sobre la base de producción.

La API es compatible con la base MySQL existente (usa la misma tabla `hibernate_sequence`).
El rol `ADMIN` se asigna directamente en la base (tabla `user_authority`); el registro público solo crea usuarios `USER`.

### Front-end
La URL de la API está en `src/environments/environment.ts`.

> Orden de despliegue: primero la API nueva y el script SQL, después el front. El front nuevo
> carga el portfolio sin login, algo que la API anterior no permite.

#### Opción A · Vercel (recomendada: despliegue automático en cada push)
1. En [vercel.com](https://vercel.com) → *Add New… → Project* → importar este repositorio.
2. **Root Directory**: `Front-End/Front-End-Angular`. El resto (instalación, build, carpeta de salida
   `dist/portfolio/browser` y reescritura de rutas para la SPA) ya está en `vercel.json`.
3. *Deploy*. Cada push a `master` publica producción y cada PR genera una URL de vista previa.

Si el front queda en un dominio nuevo (por ejemplo `https://<proyecto>.vercel.app`), actualizar en la API:
- `APP_FRONTEND_URL` → ese dominio (se usa en los links de los emails de verificación y reseteo).
- `APP_CORS_ALLOWED_ORIGINS` → agregar ese dominio (separado por comas).

Vercel solo aloja el front: la API Spring Boot necesita un servicio de contenedores (Koyeb, Render,
Railway, Fly.io…) usando el `Dockerfile` del back-end.

#### Opción B · Firebase Hosting
```bash
cd Front-End/Front-End-Angular
npm ci
npm run build
npx firebase-tools login
npx firebase-tools deploy --only hosting
```
