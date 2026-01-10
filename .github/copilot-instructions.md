# AI Guide: Conapdis Frontend (Vue 2 + TS + Vuetify)

Purpose: Enable quick, correct changes following this project’s patterns.

## Big Picture
- Vue 2 + TypeScript decorators (`vue-class-component`, `vue-property-decorator`).
- Design system based on CoreUI + Vuetify; PWA enabled.
- State via Vuex + `vuex-persistedstate`; HTTP via Axios with interceptors.

## Layout & Key Files
- Entry: src/main.ts → bootstraps router, store, Vuetify, plugins.
- Root: src/App.vue (shell layout + slots).
- Routing: src/router/* (route modules & guards).
- Store: src/store/* (modular Vuex, often using decorators).
- Validation: src/vee-validate.ts (central form validation config).
- UI: src/components/*, src/containers/* (reusable vs. layout-level parts).
- Assets: src/assets/{icons,images,scss}; PWA: public/manifest.json, service-worker.js.

## Dev & Build Workflows
- Install: `npm install`
- Dev server: `npm run serve` (Vue CLI service)
- Production build: `npm run build` (uses `--mode prod`)
- Static preview: `npm run sw-serve` (build + `serve -s dist/`)
- Config touch points: vue.config.js, tsconfig.json, babel.config.js.

## Conventions & Patterns
- Typescript-first: class components, typed stores/actions, `icons.d.ts`.
- Forms: use central `vee-validate.ts` setup; prefer schema validation (`yup`) where present.
- HTTP: configure Axios interceptors (auth, error handling) once; reuse instance.
- UI: favor Vuetify components for consistency; SCSS variables in src/assets/scss.
- Structure: containers compose page layout; components remain presentational and reusable.

## Integration
- Talks to Laravel backends via Axios; persist auth/session in Vuex with `vuex-persistedstate`.
- PDF/export features via `jspdf`, `html2canvas`, and `export-json-excel` as needed.

## Gotchas & Examples
- PWA: check public/service-worker.js and `@vue/cli-plugin-pwa` configs when changing caching.
- Sentry: `@sentry/vue` integrated—ensure DSN/config stays consistent across environments.

Feedback: If API base URLs, auth flows, or validation patterns are unclear, specify the view/module you’re updating so we can document the exact integration.