export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      const fn = url.pathname.replace("/api/", "");

      try {
        const mod = await import(`./functions/${fn}.js`);
        const handler = {
          GET: mod.onRequestGet,
          POST: mod.onRequestPost
        }[request.method];

        if (handler) {
          return handler({ request, env, ctx });
        } else {
          return new Response("Method Not Allowed", { status: 405 });
        }
      } catch (e) {
        return new Response("Function not found or failed to load", { status: 404 });
      }
    }

    // Serve static assets
    return env.ASSETS.fetch(request);
  }
};
