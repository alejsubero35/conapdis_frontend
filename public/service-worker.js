import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';

// This is the code piece that GenerateSW mode can't provide for us.
// This code listens for the user's confirmation to update the app.
self.addEventListener('message', (e) => {
    if (e.data) {
      if (e.data === 'skipWaiting') {
        self.skipWaiting()
      }
    }
  })
  
  /* eslint-disable no-undef */
  //workbox.core.clientsClaim()
  precacheAndRoute(self.__WB_MANIFEST);
  

/* const STATIC_CACHE    = 'static-v1.6';
const DYNAMIC_CACHE    = 'dynamic-v1.6';
const APP_SHELL = [
    '/home',

];

if (workbox) {
    precacheAndRoute(self.__WB_MANIFEST);
}
else {
}


self.addEventListener('install', e => {
    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ,{credentials: 'same-origin'}));
    e.waitUntil( cacheStatic  );
});

self.addEventListener('activate', e => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== STATIC_CACHE && key.includes('static')) {
                return caches.delete(key);
            }
        });
    });

    e.waitUntil( respuesta );
});

function cacheWithNetworkUpdate(e) {
    return caches.match(e.request).then(res => {
        if (res) {
            actualizaCacheStatico(STATIC_CACHE, e.request);
            return res;
        } else {
            e.request.credentials = 'same-origin'
            return fetch( e.request ).then( newRes => {
                return updateCache( DYNAMIC_CACHE, e.request, newRes );
            }).catch((err)=>{
                return new Response({
                    err: 101,
                    message: 'No internet conection'
                })
            });
        }
    });
}


// Guardar  en el cache dinamico
function updateCache( dynamicCache, req, res ) {
    if ( res.ok ) {
        return caches.open( dynamicCache ).then( cache => {
            let response = res.clone()
            cache.put( req, response );
            return res;
        });
    } else {
        return res;
    }
}

// Cache with network update
function actualizaCacheStatico( staticCache, req ) {
    return fetch( req ,{credentials: 'same-origin'})
            .then( res => {
                return updateCache( staticCache, req, res );
            }).catch(err=>{
               
            });

}


   */