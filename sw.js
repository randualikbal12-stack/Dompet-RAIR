const C='dompet-digital-v20';
const FILES=['./','./app.js','./libs.js','./seed.js','./inv.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
async function clean(r){return r&&r.redirected?new Response(await r.blob(),{status:200,headers:r.headers}):r}
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;
 if(q.mode==='navigate'){e.respondWith((async()=>{const c=await caches.open(C);const hit=await c.match('./');
   const net=fetch('./',{cache:'no-store'}).then(async r=>{if(r&&r.ok)await c.put('./',await clean(r.clone()));return clean(r)}).catch(()=>null);
   return hit?clean(hit):(await net)||new Response('Buka sekali dengan internet untuk memasang app.',{headers:{'Content-Type':'text/plain'}})})());return}
 if(new URL(q.url).origin!==location.origin)return;
 e.respondWith(caches.match(q,{ignoreSearch:true}).then(r=>r||fetch(q).then(async res=>{if(res.ok){const c=await caches.open(C);c.put(q,await clean(res.clone()))}return res})))});
