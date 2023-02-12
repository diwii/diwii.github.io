// self.importScripts(''); // Import additional scripts if required
const CACHE_NAME = 'dAPC-v1';

// Installing Service Worker
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    self.skipWaiting();
    // e.waitUntil((async () => {
    //     const cache = await caches.open(cacheName);
    //     console.log('[Service Worker] Caching all: app shell and content');
    //     await cache.addAll(contentToCache);
    // })());
});

// Fetching content using Service Worker
// self.addEventListener('fetch', (event) => {
//     console.log('Handling fetch event for', event.request.url);

//     if (event.request.headers.get('range')) {
//         let pos = Number(/^bytes\=(\d+)\-$/g.exec(event.request.headers.get('range'))[1]);
//         console.log('Range request for', event.request.url,
//           ', starting position:', pos);
//     }
// });

self.addEventListener('fetch', function(event) {
    console.log('Handling fetch event for', event.request.url);
  
    if (event.request.headers.get('range')) {
      var pos =
      Number(/^bytes\=(\d+)\-$/g.exec(event.request.headers.get('range'))[1]);

      console.log('Range request for', event.request.url,', starting position:', pos);
      event.respondWith(
        caches.open(CACHE_NAME)
        .then(function(cache) {
          return cache.match(event.request.url);
        }).then(function(res) {
          if (!res) {
            return fetch(event.request)
            .then(res => {
              return res.arrayBuffer();
            });
          }
          return res.arrayBuffer();
        }).then(function(ab) {
            console.log(
                `slice`, (ab.byteLength - 1), '/', ab.byteLength
            )
          return new Response(
            ab.slice(pos),
            {
              status: 206,
              statusText: 'Partial Content',
              headers: [
                // ['Content-Type', 'video/webm'],
                ['Content-Range', 'bytes ' + pos + '-' +
                  (ab.byteLength - 1) + '/' + ab.byteLength]]
            });
        }));
    } else {
      console.log('Non-range request for', event.request.url);
      event.respondWith(
      // caches.match() will look for a cache entry in all of the caches available to the service worker.
      // It's an alternative to first opening a specific named cache and then matching on that.
      caches.match(event.request).then(function(response) {
        if (response) {
          console.log('Found response in cache:', response);
          return response;
        }
        console.log('No response found in cache. About to fetch from network...');
        // event.request will always have the proper mode set ('cors, 'no-cors', etc.) so we don't
        // have to hardcode 'no-cors' like we do when fetch()ing in the install handler.
        return fetch(event.request).then(function(response) {
          console.log('Response from network is:', response);
  
          return response;
        }).catch(function(error) {
          // This catch() will handle exceptions thrown from the fetch() operation.
          // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
          // It will return a normal response object that has the appropriate error code set.
          console.error('Fetching failed:', error);
  
          throw error;
        });
      })
      );
    }
});
