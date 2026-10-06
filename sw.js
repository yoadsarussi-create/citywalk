/* offline cache — build 2026-10-06 21:48 */
const V='bp-2026-10-06 21:48';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-180.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  const page=e.request.mode==='navigate'||u.pathname.endsWith('/index.html')||u.pathname.endsWith('/');
  if(page){e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cl=r.clone();caches.open(V).then(c=>c.put('./index.html',cl));return r;}).catch(()=>caches.match('./index.html')));return;}
  const cacheable=u.origin===location.origin||/gstatic\.com$|googleapis\.com$/.test(u.hostname);
  e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(cacheable&&r.ok){const cl=r.clone();caches.open(V).then(c=>c.put(e.request,cl));}return r;})));
});