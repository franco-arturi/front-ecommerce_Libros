# Frontend de Librería JU

Proyecto frontend del TPO de Aplicaciones Interactivas, desarrollado con React y Vite.

## Requisitos

- Node.js 20 o superior.
- npm.

## Cómo ejecutar el proyecto

```bash
npm install
npm run dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación.

## Comandos disponibles

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Organización

```text
src/
├── components/
│   ├── catalogo/     # Buscador, filtros, lista y tarjetas
│   └── comunes/      # Componentes compartidos entre pantallas
├── pages/            # Pantallas completas de la aplicación
└── services/         # Acceso a los datos locales o a la API

public/data/           # JSON que simulan las respuestas del backend
```

## Datos simulados

La pantalla de inicio obtiene libros y categorías desde archivos JSON alojados en `public/data`. Sus campos coinciden con los DTO de listado del backend.

Cuando se realice la integración con Spring Boot, se podrá reemplazar el origen de los datos dentro de `src/services/catalogoService.js` sin modificar los componentes visuales.
