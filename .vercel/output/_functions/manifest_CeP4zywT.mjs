import { p as decodeKey } from './chunks/astro/server_DQt7vCd-.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_C_0oM5q-.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/jasonelgin/projects/jasonwrites/","cacheDir":"file:///Users/jasonelgin/projects/jasonwrites/node_modules/.astro/","outDir":"file:///Users/jasonelgin/projects/jasonwrites/dist/","srcDir":"file:///Users/jasonelgin/projects/jasonwrites/src/","publicDir":"file:///Users/jasonelgin/projects/jasonwrites/public/","buildClientDir":"file:///Users/jasonelgin/projects/jasonwrites/dist/client/","buildServerDir":"file:///Users/jasonelgin/projects/jasonwrites/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"essays/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/essays","isIndex":true,"type":"page","pattern":"^\\/essays\\/?$","segments":[[{"content":"essays","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/essays/index.astro","pathname":"/essays","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"ideas/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/ideas","isIndex":true,"type":"page","pattern":"^\\/ideas\\/?$","segments":[[{"content":"ideas","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ideas/index.astro","pathname":"/ideas","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.13.11_@types+node@24.5.2_@vercel+functions@2.2.13_idb-keyval@6.2.2_jiti@2.6.0_l_aebe6078a3c54fddadf58e6b20c4a98c/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/api/keystatic/[...params]","pattern":"^\\/api\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.1.1_react@19.1.1__react@19.1_363d45bf5d2a51f3ee942ccd84ca4a5d/node_modules/@keystatic/astro/internal/keystatic-api.js","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","isIndex":false,"route":"/keystatic/[...params]","pattern":"^\\/keystatic(?:\\/(.*?))?\\/?$","segments":[[{"content":"keystatic","dynamic":false,"spread":false}],[{"content":"...params","dynamic":true,"spread":true}]],"params":["...params"],"component":"node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.1.1_react@19.1.1__react@19.1_363d45bf5d2a51f3ee942ccd84ca4a5d/node_modules/@keystatic/astro/internal/keystatic-astro-page.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/jasonelgin/projects/jasonwrites/src/pages/essays/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/jasonelgin/projects/jasonwrites/src/pages/essays/page/[page].astro",{"propagation":"in-tree","containsHead":true}],["/Users/jasonelgin/projects/jasonwrites/src/pages/ideas/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/jasonelgin/projects/jasonwrites/src/pages/ideas/page/[page].astro",{"propagation":"in-tree","containsHead":true}],["/Users/jasonelgin/projects/jasonwrites/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/jasonelgin/projects/jasonwrites/src/pages/page/[page].astro",{"propagation":"in-tree","containsHead":true}],["/Users/jasonelgin/projects/jasonwrites/src/pages/posts/[slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/posts/[slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/jasonelgin/projects/jasonwrites/src/utils/posts.ts",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/essays/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/essays/page/[page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/ideas/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/ideas/page/[page]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/page/[page]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/jasonelgin/projects/jasonwrites/node_modules/.pnpm/@astrojs+markdoc@0.12.11_@types+react@19.1.13_astro@5.13.11_@types+node@24.5.2_@vercel+_3469cd64ea7c409d2b8254c17de74f49/node_modules/@astrojs/markdoc/components/Renderer.astro",{"propagation":"in-tree","containsHead":false}],["/Users/jasonelgin/projects/jasonwrites/node_modules/.pnpm/@astrojs+markdoc@0.12.11_@types+react@19.1.13_astro@5.13.11_@types+node@24.5.2_@vercel+_3469cd64ea7c409d2b8254c17de74f49/node_modules/@astrojs/markdoc/components/index.ts",{"propagation":"in-tree","containsHead":false}],["/Users/jasonelgin/projects/jasonwrites/src/content/posts/a-new-piece-of-writing.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/jasonelgin/projects/jasonwrites/src/content/posts/a-new-piece-of-writing.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/jasonelgin/projects/jasonwrites/.astro/content-modules.mjs",{"propagation":"in-tree","containsHead":false}],["/Users/jasonelgin/projects/jasonwrites/node_modules/.pnpm/astro@5.13.11_@types+node@24.5.2_@vercel+functions@2.2.13_idb-keyval@6.2.2_jiti@2.6.0_l_aebe6078a3c54fddadf58e6b20c4a98c/node_modules/astro/dist/content/runtime.js",{"propagation":"in-tree","containsHead":false}],["/Users/jasonelgin/projects/jasonwrites/src/content/posts/first-post.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/jasonelgin/projects/jasonwrites/src/content/posts/first-post.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}],["/Users/jasonelgin/projects/jasonwrites/src/content/posts/second-post.mdoc",{"propagation":"in-tree","containsHead":false}],["/Users/jasonelgin/projects/jasonwrites/src/content/posts/second-post.mdoc?astroPropagatedAssets",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.13.11_@types+node@24.5.2_@vercel+functions@2.2.13_idb-keyval@6.2.2_jiti@2.6.0_l_aebe6078a3c54fddadf58e6b20c4a98c/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.1.1_react@19.1.1__react@19.1_363d45bf5d2a51f3ee942ccd84ca4a5d/node_modules/@keystatic/astro/internal/keystatic-api@_@js":"pages/api/keystatic/_---params_.astro.mjs","\u0000@astro-page:src/pages/essays/page/[page]@_@astro":"pages/essays/page/_page_.astro.mjs","\u0000@astro-page:src/pages/essays/index@_@astro":"pages/essays.astro.mjs","\u0000@astro-page:src/pages/ideas/page/[page]@_@astro":"pages/ideas/page/_page_.astro.mjs","\u0000@astro-page:src/pages/ideas/index@_@astro":"pages/ideas.astro.mjs","\u0000@astro-page:node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.1.1_react@19.1.1__react@19.1_363d45bf5d2a51f3ee942ccd84ca4a5d/node_modules/@keystatic/astro/internal/keystatic-astro-page@_@astro":"pages/keystatic/_---params_.astro.mjs","\u0000@astro-page:src/pages/page/[page]@_@astro":"pages/page/_page_.astro.mjs","\u0000@astro-page:src/pages/posts/[slug]@_@astro":"pages/posts/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CeP4zywT.mjs","/Users/jasonelgin/projects/jasonwrites/node_modules/.pnpm/astro@5.13.11_@types+node@24.5.2_@vercel+functions@2.2.13_idb-keyval@6.2.2_jiti@2.6.0_l_aebe6078a3c54fddadf58e6b20c4a98c/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Diq7K2BX.mjs","/Users/jasonelgin/projects/jasonwrites/.astro/content-assets.mjs":"chunks/content-assets_ci5bebGe.mjs","/Users/jasonelgin/projects/jasonwrites/.astro/content-modules.mjs":"chunks/content-modules_Gz6G2ki_.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_UJrh5VnU.mjs","/Users/jasonelgin/projects/jasonwrites/src/content/posts/a-new-piece-of-writing.mdoc?astroPropagatedAssets":"chunks/a-new-piece-of-writing_B43YlnqP.mjs","/Users/jasonelgin/projects/jasonwrites/src/content/posts/first-post.mdoc?astroPropagatedAssets":"chunks/first-post_BXNFVXfD.mjs","/Users/jasonelgin/projects/jasonwrites/src/content/posts/second-post.mdoc?astroPropagatedAssets":"chunks/second-post_CDetogNj.mjs","/Users/jasonelgin/projects/jasonwrites/src/content/posts/a-new-piece-of-writing.mdoc":"chunks/a-new-piece-of-writing_CMpr-if0.mjs","/Users/jasonelgin/projects/jasonwrites/src/content/posts/first-post.mdoc":"chunks/first-post_B332vyVV.mjs","/Users/jasonelgin/projects/jasonwrites/src/content/posts/second-post.mdoc":"chunks/second-post_KUbMXWek.mjs","/Users/jasonelgin/projects/jasonwrites/node_modules/.pnpm/@keystatic+astro@5.0.6_@keystatic+core@0.5.48_react-dom@19.1.1_react@19.1.1__react@19.1_363d45bf5d2a51f3ee942ccd84ca4a5d/node_modules/@keystatic/astro/internal/keystatic-page.js":"_astro/keystatic-page.BbrjxLW5.js","@astrojs/react/client.js":"_astro/client.CFlSv6yj.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/cover.0fMw1CNy.png","/_astro/index.D_NWYAoZ.css","/favicon.svg","/_astro/client.CFlSv6yj.js","/_astro/index.BHg80JXK.js","/_astro/keystatic-page.BbrjxLW5.js","/essays/index.html","/ideas/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"6cM5WgmsIIKQjc9yeu1gJpOU8QIKC61XvrLNyst5tp8="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
