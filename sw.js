// Service worker hry (PWA): po první návštěvě má hra všechny soubory u sebe a jde hrát
// i bez internetu. Vyrábí ho vite.config.ts při sestavení – do CACHE doplní číslo
// sestavení a do FILES seznam souborů hry.
//  - soubory hry: nejdřív z mezipaměti (mají v názvu otisk obsahu, nemění se),
//  - stránka (index.html): nejdřív ze sítě, bez sítě z mezipaměti,
//  - version.json a vše mimo hru (Firebase, PeerJS…): jen ze sítě – kontrola nové verze
//    (app/updateCheck.ts) musí vidět opravdový stav serveru.
const CACHE = 'ba2-2026-11-20T12:15:51.526Z';
const FILES = ["./assets/Cache-fEtFvAzf.js","./assets/CanvasPool-BZ0sA3Gt.js","./assets/Filter-OkrPcSWo.js","./assets/GCManagedHash-B_jK_A5g.js","./assets/GraphicsContext-Bh-6kARE.js","./assets/RenderTargetSystem-DP5bAK2C.js","./assets/banner-blue-CDDSKohZ.webp","./assets/banner-red-B_uzS9P2.webp","./assets/bone-bar-liquid-el9YcXf0.webp","./assets/bone-track-BIEqdnja.webp","./assets/browserAll-lYpd2WCU.js","./assets/canvasUtils-BlnLdLY1.js","./assets/desert-B2m0pOuO.webp","./assets/eczar-devanagari-700-normal-DcHHwPh7.woff","./assets/eczar-devanagari-700-normal-i8LN1Zyg.woff2","./assets/eczar-devanagari-800-normal-0RPIPFzW.woff2","./assets/eczar-devanagari-800-normal-p_pDOI08.woff","./assets/eczar-greek-700-normal-DRsR3abG.woff2","./assets/eczar-greek-700-normal-yfI_OjYr.woff","./assets/eczar-greek-800-normal-2R1n9rBy.woff","./assets/eczar-greek-800-normal-bHQimybo.woff2","./assets/eczar-greek-ext-700-normal-Cs_ZbNxu.woff","./assets/eczar-greek-ext-700-normal-DdyjcHzn.woff2","./assets/eczar-greek-ext-800-normal-Dwrdj8SO.woff2","./assets/eczar-greek-ext-800-normal-scFetvI7.woff","./assets/eczar-latin-700-normal-BFY--h7D.woff2","./assets/eczar-latin-700-normal-CYZucReG.woff","./assets/eczar-latin-800-normal-DNw9Xe7c.woff","./assets/eczar-latin-800-normal-DyN1rZYA.woff2","./assets/eczar-latin-ext-700-normal-CqDgi1uU.woff2","./assets/eczar-latin-ext-700-normal-DP12nQhZ.woff","./assets/eczar-latin-ext-800-normal-C2SvJ4qP.woff2","./assets/eczar-latin-ext-800-normal-Dp0dNhA4.woff","./assets/eruption-ash-QVrnBjad.webp","./assets/eruption-burst-DQ9J-Maz.webp","./assets/eruption-end-ItOhgQcm.webp","./assets/eruption-peak-Cl_qIi7H.webp","./assets/eruption-start-CzdvmuEK.webp","./assets/getTexelRangeRects-fgmo4L6v.js","./assets/getTextureBatchBindGroup-CckcnH94.js","./assets/hide-tag-CobBZqkc.webp","./assets/icon-attack-C48rBpSZ.webp","./assets/icon-coin-OD3DbCM-.webp","./assets/icon-gear-CO-59Evt.webp","./assets/icon-hammer-DTyiVp-v.webp","./assets/icon-health-pjuPMRyF.webp","./assets/icon-hourglass-Djn5Ky_u.webp","./assets/icon-meteor-DqrxHLwu.webp","./assets/icon-people-0owjyZea.webp","./assets/icon-tower-CVKfq3D0.webp","./assets/icon-upgrade-BypdIBGJ.webp","./assets/icon-walls-DFGK2hpR.webp","./assets/init-C9PWrvAC.js","./assets/lava-blob-CEWkB9Pg.webp","./assets/leagues-C4ubsTy0.js","./assets/main-BcB-tGrP.js","./assets/main-MkitSBrl.css","./assets/manifest.json","./assets/prehistoric-forest-CZ2HYcD4.webp","./assets/smoke-1-8KLvjJBv.webp","./assets/smoke-2-CwpuS8jo.webp","./assets/smoke-3-Bjyf-jMM.webp","./assets/smoke-4-IeBykyid.webp","./assets/snowy-tundra-ianA6F4u.webp","./assets/stone-meadow-CKNwqQN5.webp","./assets/stone-plaque-BLolS6fS.webp","./assets/stone-round-DJJdRqOP.webp","./assets/stone-square-FyFiAr_7.webp","./assets/stone/stone-bases.png","./assets/stone/stone-bases.png.json","./assets/stone/stone-bases.webp","./assets/stone/stone-bases.webp.json","./assets/stone/stone-fx.png","./assets/stone/stone-fx.png.json","./assets/stone/stone-fx.webp","./assets/stone/stone-fx.webp.json","./assets/stone/stone-turrets.png","./assets/stone/stone-turrets.png.json","./assets/stone/stone-turrets.webp","./assets/stone/stone-turrets.webp.json","./assets/stone/stone-units.png","./assets/stone/stone-units.png.json","./assets/stone/stone-units.webp","./assets/stone/stone-units.webp.json","./assets/swamp-CiOw-9C7.webp","./assets/volcanic-waste-CGTcOEhM.webp","./assets/web-C3yFG601.js","./assets/web-C6cIRlFC.js","./assets/web-C6uisile.js","./assets/web-iqUQBA1L.js","./assets/webworkerAll-D6Z3Q9-u.js","./assets/wiki-DAXGNA8M.css","./assets/wiki-xKQji9xX.js","./audio/music/future-climax.m4a","./audio/music/future.m4a","./audio/music/medieval-climax.m4a","./audio/music/medieval.m4a","./audio/music/menu.m4a","./audio/music/modern-climax.m4a","./audio/music/modern.m4a","./audio/music/renaissance-climax.m4a","./audio/music/renaissance.m4a","./audio/music/stone-climax.m4a","./audio/music/stone.m4a","./audio/sfx.m4a","./icons/apple-touch-icon.png","./icons/favicon-64.png","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png","./manifest.webmanifest","./wiki.html"];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(['./', ...FILES]))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('ba2-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const scope = new URL(self.registration.scope);
  if (url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;
  if (url.pathname.endsWith('/version.json')) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          void caches.open(CACHE).then((cache) => cache.put('./', copy));
          return response;
        })
        // Bez sítě: uložená stránka (wiki.html…), jinak hra.
        .catch(() =>
          caches
            .match(request, { ignoreSearch: true, ignoreVary: true })
            .then((hit) => hit ?? caches.match('./', { ignoreVary: true }))
            .then((hit) => hit ?? Response.error()),
        ),
    );
    return;
  }

  event.respondWith(
    // ignoreVary: skripty (type=module, crossorigin) posílají hlavičku Origin a server
    // odpovídá s Vary: Origin – bez toho by uložená kopie nikdy neseděla a hra by
    // bez internetu nenaběhla. Soubory hry mají otisk v názvu, liší se jen adresou.
    caches.match(request, { ignoreSearch: true, ignoreVary: true }).then(
      (hit) =>
        hit ??
        fetch(request).then((response) => {
          if (response.ok && response.type === 'basic') {
            const copy = response.clone();
            void caches.open(CACHE).then((cache) => cache.put(request, copy));
          }
          return response;
        }),
    ),
  );
});
