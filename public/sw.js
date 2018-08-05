const DINAMIC_CACHE_NAME = 'dinamic-cache-v1';

self.addEventListener('install', function(event) {
	console.log('[Service Worker] Instaling...');
})

self.addEventListener('message', function(event) {
	console.log('[Service Worker]' + event.data);

})

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(keys) {
			Promise.all(keys.map((key)=> {
				if (key !== DINAMIC_CACHE_NAME) {
					return caches.delete(key);
				}
			}))
		}).then(()=> {
			console.log('Cache is clear!')
		})

	)
})

self.addEventListener('fetch', function(event) {
		if(event.request.url.includes('firebase')) {
			event.respondWith(
			caches.match(event.request)
				.then(function(response) {
					return response || fetch(event.request).then(function(response) {
						return caches.open(DINAMIC_CACHE_NAME).then(function(cache) {
							cache.put(event.request, response.clone());
							return response;
						});
					});
				})
			)
		}
})