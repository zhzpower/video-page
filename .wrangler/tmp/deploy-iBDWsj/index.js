"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

  // workers-site/index.js
  addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event.request));
  });
  async function handleRequest(request) {
    const url = new URL(request.url);
    let pathname = url.pathname;
    if (pathname === "/" || pathname === "") {
      pathname = "/index.html";
    }
    const assetUrl = new URL(pathname, url.origin);
    try {
      const response = await fetch(assetUrl);
      if (response.ok)
        return response;
      if (pathname !== "/404.html") {
        const notFoundResponse = await fetch(new URL("/404.html", url.origin));
        if (notFoundResponse.ok)
          return new Response(await notFoundResponse.text(), {
            status: 404,
            headers: { "Content-Type": "text/html" }
          });
      }
      return response;
    } catch (e) {
      return new Response("\u670D\u52A1\u5668\u9519\u8BEF\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5", { status: 500 });
    }
  }
  __name(handleRequest, "handleRequest");
})();
//# sourceMappingURL=index.js.map
