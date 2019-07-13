var dataCacheName = "dataCache-v1";
var cacheName = "appCache-v1-" + new Date().toLocaleDateString('en-IN', {
    day : 'numeric',
    month : 'numeric',
    year : 'numeric'
}).split(' ').join('-');
var filesCache = [
    './',
    './index.html',
    './manifest.json',
    './favicon.ico',
    './scripts/app.js',
    './styles/inline.css',
    './images/icons/icon-tiny.png',
    './images/icons/icon-huge.png'
];

// Install service worker
self.addEventListener('install', function(e) {
    console.log('Service Worker: install');
    e.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log('Service Worker: Caching app shell');
            return cache.addAll(filesCache);
        })
    );
});

// Activer service worker
self.addEventListener('activate', function(e) {
    console.log('Service Worker: activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if(key != cacheName && key != dataCacheName) {
                    console.log('Service Worker: Removing old cache');
                    return caches.delete(key);
                }
            }));
        })
    );

    // To activate service worker faster
    return self.clients.claim();
});


// Fetch service worker
self.addEventListener('fetch', function(e) {
    console.log('Service Worker: Fetch from ' + e.request.url);
    e.respondWith(async function() {
        const response = await caches.match(e.request);
        return response || fetch(e.request);
      }());
});

self.addEventListener('push', event => {
    console.log('Service Worker: Push', event);
});