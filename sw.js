const V="cm-1786f844b1";
const PRE=["d1.webp", "d2.webp", "d3.webp", "d4.webp", "fonts/anuphan.woff2", "fonts/dmmono-400.woff2", "fonts/dmmono-500.woff2", "fonts/isans.woff2", "fonts/iserif-i.woff2", "fonts/iserif.woff2", "fonts/mali-500.woff2", "fonts/mali-600.woff2", "hero.webp", "ic/coffee.webp", "ic/croissant.webp", "ic/khaosoi.webp", "ic/lantern-hd.webp", "ic/lantern.webp", "ic/lounger.webp", "ic/pizza.webp", "ic/plane.webp", "ic/songthaew.webp", "ic/suitcase.webp", "ic/sushi.webp", "ic/temple.webp", "ic/wine.webp", "icon-180.png", "icon-192.png", "icon-512.png", "manifest.json", "pano.webp", "veh/b1-sh.webp", "veh/b1.webp", "veh/b2-sh.webp", "veh/b2.webp", "veh/b3-sh.webp", "veh/b3.webp", "veh/b4-sh.webp", "veh/b4.webp", "veh/plane-sh.webp", "veh/plane.webp", "veh/river-fg.webp", "veh/s1-sh.webp", "veh/s1.webp", "veh/s2-sh.webp", "veh/s2.webp", "veh/t1-sh.webp", "veh/t1.webp", "veh/t2-sh.webp", "veh/t2.webp", "index.html"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(PRE.map(f=>f==="index.html"?"./":f))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const r=e.request; if(r.method!=="GET") return;
  if(r.mode==="navigate"){ // fresh page when online, cached page when not
    e.respondWith(fetch(r).then(res=>{const cp=res.clone(); caches.open(V).then(c=>c.put("./",cp)); return res}).catch(()=>caches.match("./",{ignoreSearch:true})));
    return; }
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>hit||fetch(r).then(res=>{ if(res.ok&&new URL(r.url).origin===location.origin){const cp=res.clone(); caches.open(V).then(c=>c.put(r,cp))} return res })));
});
