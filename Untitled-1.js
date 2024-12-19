const CACHE_NAME = "gourmet-palace-v1";
const urlsToCache = [
    "./",
    "./index.html",
    "./styles.css",
    "./manifest.json",
    "./360_F_787979448_mgi8abtmOhlF3ibIgmC7WcNdp5izIA8q.jpg",
    "./istockphoto-1214416414-612x612.jpg",
    "./istockphoto-534139231-612x612.jpg",
    "./istockphoto-544716244-612x612.jpg"
];


self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
});


self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});


self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
