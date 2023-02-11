importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js'); if (workbox){ workbox.navigationPreload.enable(); workbox.core.skipWaiting(); workbox.core.clientsClaim(); workbox.core.setCacheNameDetails({ prefix: 'thn-sw',suffix: 'v22',precache: 'install-time',runtime: 'run-time'}); const FALLBACK_HTML_URL = '/offline.html';const version = workbox.core.cacheNames.suffix;workbox.precaching.precacheAndRoute([{url: FALLBACK_HTML_URL, revision: null},{url: '/manifest.json', revision: null},{url: '/img/favicon.ico', revision: null},{url: '/favicon.ico', revision: null}]);workbox.routing.setDefaultHandler(new workbox.strategies.NetworkOnly());workbox.routing.registerRoute( new RegExp('.(?:xml|js|png|jpg|jpeg|json|svg|svg+xml|css|ico|woff2|gif)$'), new workbox.strategies.CacheFirst({cacheName: 'html-xml-js-css-img-image-images-png-jpg-jpeg-json-svg-svg+xml-ico-gif-woff2-' + version,plugins: [new workbox.expiration.ExpirationPlugin({maxAgeSeconds: 60 * 24 * 60 * 60,maxEntries:200,purgeOnQuotaError: true})],}),'GET');workbox.routing.registerRoute(/^https?:.*.(xml|js|png|jpg|jpeg|json|css.svg|svg|svg+xml|css|ico|woff2|gif)$/, new workbox.strategies.StaleWhileRevalidate(), 'GET');workbox.googleAnalytics.initialize({});workbox.routing.setCatchHandler(({event}) => {switch (event.request.destination) {case 'document':return caches.match(FALLBACK_HTML_URL);break;default: return Response.error();}});self.addEventListener('activate', function(event) {event.waitUntil(caches .keys().then(keys => keys.filter(key => !key.endsWith(version))).then(keys => Promise.all(keys.map(key => caches.delete(key)))));});}else {console.log('Oops! not load');}