# Front-end · Angular 21

- `npm start` → http://localhost:4200 (usa `environment.development.ts`, API en `http://localhost:8080/`)
- `npm run build` → `dist/portfolio/browser` (usa `environment.ts`, API de producción)

Estructura:

```
src/app/core      servicios (API, auth JWT, store con signals, tema, toasts)
src/app/sections  secciones del portfolio (hero, sobre mí, experiencia, …)
src/app/admin     formularios de edición (solo visibles con rol ADMIN)
src/app/pages     páginas (home, login, recuperar, restablecer, 404)
src/app/shared    componentes reutilizables (íconos, modal, logo, subida de imágenes)
```
