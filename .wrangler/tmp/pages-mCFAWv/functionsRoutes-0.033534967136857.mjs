import { onRequest as ____path___js_onRequest } from "/Users/power/Documents/Study/www/video-page/functions/[[path]].js"
import { onRequest as ___middleware_js_onRequest } from "/Users/power/Documents/Study/www/video-page/functions/_middleware.js"
import { onRequest as __index_js_onRequest } from "/Users/power/Documents/Study/www/video-page/functions/index.js"

export const routes = [
    {
      routePath: "/:path*",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [____path___js_onRequest],
    },
  {
      routePath: "/",
      mountPath: "/",
      method: "",
      middlewares: [___middleware_js_onRequest],
      modules: [__index_js_onRequest],
    },
  ]