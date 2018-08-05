const DINAMIC_CACHE_NAME = 'dinamic-cache';

self.addEventListener('install', function(event) {
	console.log('[Service Worker] Instaling...');
})

self.addEventListener('message', function(event) {
	console.log('[Service Worker]' + event.data);

})

self.addEventListener('fetch', function(event) {
		// console.log(event.request.url.includes)
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