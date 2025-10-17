import * as Sentry from '@sentry/vue';
import { Integrations } from '@sentry/tracing';
import Vue from 'vue';
import router from '@/router';

const dsn = process.env.VUE_APP_SENTRY_DSN;
const isProd = (process.env.NODE_ENV === 'production') || (process.env.VUE_APP_SENTRY_ENV === 'production');

// Solo inicializar Sentry en producción y si hay DSN
if (dsn && isProd) {
  Sentry.init({
    Vue,
    dsn,
    environment: process.env.VUE_APP_SENTRY_ENV || process.env.NODE_ENV || 'development',
    integrations: [
      new Integrations.BrowserTracing({
        tracingOrigins: ['localhost', /^https?:\/\/conapdis\.test/, window.location.origin],
        routingInstrumentation: Sentry.vueRouterInstrumentation(router)
      })
    ],
    // En producción puedes ajustar estas tasas vía variables de entorno
    tracesSampleRate: Number(process.env.VUE_APP_SENTRY_TRACES || 0),
    replaysSessionSampleRate: Number(process.env.VUE_APP_SENTRY_REPLAYS_SESSION || 0),
    replaysOnErrorSampleRate: Number(process.env.VUE_APP_SENTRY_REPLAYS_ON_ERROR || 1.0),
    beforeSend(event) {
      if (event.request && event.request.headers) {
        delete (event.request.headers as any)['authorization'];
      }
      return event;
    }
  });

  (window as any).testSentryVueError = () => { throw new Error('Vue Sentry test error'); };
  (window as any).testSentryVueMessage = async () => {
    const id = Sentry.captureMessage('Vue Sentry test message', 'info');
    // Forzar flush (dev server) para ver inmediatamente en panel
    try { await Sentry.flush(2000); } catch (e) { /* ignore */ }
    console.log('Sentry message eventId:', id);
    return id;
  };
}
