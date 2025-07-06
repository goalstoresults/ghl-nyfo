export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // If it's an API call, delegate to Pages Functions
    if (url.pathname.startsWith("/api/")) {
      return env.ASSETS.fetch(request);
    }

    // Otherwise serve the static site
    return env.ASSETS.fetch(request);
  }
};
