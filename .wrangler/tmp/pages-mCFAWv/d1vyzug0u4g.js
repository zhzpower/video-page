// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: ["/*"],
  exclude: []
};

// ../../../../node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/Users/power/Documents/Study/www/video-page/.wrangler/tmp/pages-mCFAWv/functionsWorker-0.907374053628764.mjs";
import { isRoutingRuleMatch } from "/Users/power/node_modules/wrangler/templates/pages-dev-util.ts";
export * from "/Users/power/Documents/Study/www/video-page/.wrangler/tmp/pages-mCFAWv/functionsWorker-0.907374053628764.mjs";
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        if (worker.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return worker.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  }
};
export {
  pages_dev_pipeline_default as default
};
//# sourceMappingURL=d1vyzug0u4g.js.map
