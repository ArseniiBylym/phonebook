const STATIC_CACHE_NAME = 'static-cache-v1';
const DINAMIC_CACHE_NAME = 'dinamic-cache-v1';

self.addEventListener('install', function(event) {
	console.log('[Service Worker] Instaling...');
	event.waitUntil(
		caches.open(STATIC_CACHE_NAME)
		.then(function(cache) {
			cache.addAll([
				'/',
				'/phonebook'
				'/phonebook/static/js/bundle.js',
				'/phonebook/static/css/main.f9525ea2.css',
				'/phonebook/static/js/main.99c5b923.js',
				'/phonebook/index.html',
				'https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet',
				'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css',
				'https://code.jquery.com/jquery-3.1.1.min.js',
				'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.js',
				'https://vignette.wikia.nocookie.net/disneyzomibes/images/5/5c/Unknown-avatar.jpg/revision/latest/scale-to-width-down/480?cb=20180310223206'
				])
			console.log('[Service Worker] Instaling...');
		})
		.catch(function(err) {
			console.log(err.message);
		})
	)
})

self.addEventListener('message', function(event) {
	console.log('[Service Worker]' + event.data);

})

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(keys) {
			Promise.all(keys.map((key)=> {
				if (key !==STATIC_CACHE_NAME && key !== DINAMIC_CACHE_NAME) {
					return caches.delete(key);
				}
			}))
		}).then(()=> {
			console.log('Cache is clear!')
		})

	)
})

self.addEventListener('fetch', function(event) {
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
})