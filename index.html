export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response("Error: URL parameter is missing.", { status: 400 });
    }

    try {
      const isM3u8 = targetUrl.toLowerCase().includes(".m3u8");

      if (isM3u8) {
         const response = await fetch(targetUrl, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              "Referer": new URL(targetUrl).origin,
              "Origin": new URL(targetUrl).origin
            }
         });
         const newHeaders = new Headers(response.headers);
         newHeaders.set("Access-Control-Allow-Origin", "*");
         return new Response(response.body, { status: response.status, headers: newHeaders });
      } else {
         const pageResponse = await fetch(targetUrl, {
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" }
         });
         const htmlText = await pageResponse.text();
         const m3u8Regex = /(https:\/\/[^\s"'<>]+\.m3u8[^\s"'<>]*)/;
         const match = htmlText.match(m3u8Regex);

         if (!match) {
            return new Response("Error: M3U8 stream not found on this page.", { status: 404 });
         }

         const extractedM3u8 = match[0];
         const streamResponse = await fetch(extractedM3u8, {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              "Referer": new URL(targetUrl).origin,
              "Origin": new URL(targetUrl).origin
            }
         });

         const newHeaders = new Headers(streamResponse.headers);
         newHeaders.set("Access-Control-Allow-Origin", "*");
         return new Response(streamResponse.body, { status: streamResponse.status, headers: newHeaders });
      }
    } catch (error) {
      return new Response("Server Error: " + error.message, { status: 500 });
    }
  }
};
