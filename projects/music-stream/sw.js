// self.importScripts(''); // Import additional scripts if required
const cacheName = 'dAPC-v1';

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
self.addEventListener('fetch', (event) => {
    console.log('[Service Worker] Fetching', event.request);

    event.respondWith((async () => {
        // If request is cached
        const r = await caches.match(event.request);
        console.log(`[Service Worker] Fetching resource: ${event.request.url}`);
        if (r) return r;

        // Else fetch request from source
        const response = await fetch(event.request);
        const cache = await caches.open(cacheName);
        // 206 partial content
        if (response.status === 206) {
            console.log('do the readable stream??');
            const reader = response.body.getReader();
            return self.readStream(response, reader, event.request);
        } else {
            console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
            cache.put(event.request, response.clone());
        }
        console.log(cache);
        return response;
    })());

    // (async () => {
    //     const response = await fetch(event.request);
    //     console.log(response);
    // })();

    // fetch(event.request).then(response => console.log(response));

    // event.respondWith((async () => {
    //     console.log('respondWith');

    //     const cachedResponse = await caches.match(event.request);
    //     // Return cached response
    //     console.log(cachedResponse);
    //     if (cachedResponse) return cachedResponse;

    //     // Otherwise fetch from source
    //     const response = await fetch(event.request);
    //     // Create data reader
    //     const reader = response.body.getReader();

        // const stream = new ReadableStream({
        //     start(controller) {
        //         return pump();
        //         function pump() {
        //             return reader.read().then(({ done, value }) => {
        //                 console.log(value);
        //                 // When no more data needs to be consumed, close the stream
        //                 if (done) {
        //                     console.log('stream done')
        //                     // saveToCache();
        //                     console.log(response);
        //                     console.log(stream);
        //                     // console.log(new Response());
        //                     controller.close();
        //                     return;
        //                 }
        //                 // Enqueue the next data chunk into our target stream
        //                 controller.enqueue(value);
        //                 return pump();
        //             });
        //         }
        //     }
        // });

    //     const newResponse = new Response(stream);

    //     function saveToCache() {
    //         const cache = caches.open(cacheName);
    //         cache.put(event.request, newResponse);
    //     }

    //     return newResponse;
    //     return new Response(stream);
    // })());
});

function readStream(response, reader, request) {
    const stream = new ReadableStream({
        start(controller) {
            return pump();
            function pump() {
                return reader.read().then(({ done, value }) => {
                    console.log(value);
                    // When no more data needs to be consumed, close the stream
                    if (done) {
                        console.log('stream done')
                        console.log('save to cache');
                        // console.log(response);
                        // console.log(stream);
                        // console.log(new Response());
                        controller.close();
                        self.pleaseCache(request, stream);
                        return;
                    }
                    // Enqueue the next data chunk into our target stream
                    controller.enqueue(value);
                    return pump();
                });
            }
        }
    });

    return new Response(stream);
}

function pleaseCache(request, stream) {
    console.log('SAVING TO CACHE');
    const cache = caches.open(cacheName);
    const response = new Response(stream);
    cache.put(request, response);
}
