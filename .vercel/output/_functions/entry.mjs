import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_HI4-18TK.mjs';
import { manifest } from './manifest_CeP4zywT.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/keystatic/_---params_.astro.mjs');
const _page2 = () => import('./pages/essays/page/_page_.astro.mjs');
const _page3 = () => import('./pages/essays.astro.mjs');
const _page4 = () => import('./pages/ideas/page/_page_.astro.mjs');
const _page5 = () => import('./pages/ideas.astro.mjs');
const _page6 = () => import('./pages/keystatic/_---params_.astro.mjs');
const _page7 = () => import('./pages/page/_page_.astro.mjs');
const _page8 = () => import('./pages/posts/_slug_.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.13.11_@types+node@24.5.2_@vercel+functions@2.2.13_idb-keyval@6.2.2_jiti@2.6.0_l_aebe6078a3c54fddadf58e6b20c4a98c/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.1.1_react@19.1.1__react@19.1_363d45bf5d2a51f3ee942ccd84ca4a5d/node_modules/@keystatic/astro/internal/keystatic-api.js", _page1],
    ["src/pages/essays/page/[page].astro", _page2],
    ["src/pages/essays/index.astro", _page3],
    ["src/pages/ideas/page/[page].astro", _page4],
    ["src/pages/ideas/index.astro", _page5],
    ["node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.1.1_react@19.1.1__react@19.1_363d45bf5d2a51f3ee942ccd84ca4a5d/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", _page6],
    ["src/pages/page/[page].astro", _page7],
    ["src/pages/posts/[slug].astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "7565a008-03f1-4f3a-a632-61d6c058bab5",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
