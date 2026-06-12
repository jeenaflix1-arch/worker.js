export default {
  async fetch(request) {
    const url = new URL(request.url);
    const targetUrl = url.searchParams.get("url");

    if (!targetUrl) {
      return new Response("Error: Please provide URL.", { status: 400 });
    }

    try {
      const pageResponse = await fetch(targetUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
        }
      });
      
      const htmlText = await pageResponse.text();
      const m3u8Regex = /(https:\/\/[^\s"'<>]+\.m3u8[^\s"'<>]*)/;
      const match = htmlText.match(m3u8Regex);

      if (!match) {
        return new Response("Error: M3U8 link not found.", { status: 404 });
      }

      const m3u8Link = match[0];

      const streamResponse = await fetch(m3u8Link, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Referer": "https://tamashaweb.com/",
          "Origin": "https://tamashaweb.com"
        }
      });

      const newHeaders = new Headers(streamResponse.headers);
      newHeaders.set("Access-Control-Allow-Origin", "*");
      
      return new Response(streamResponse.body, {
        status: streamResponse.status,
        headers: newHeaders
      });

    } catch (error) {
      return new Response("Server Error: " + error.message, { status: 500 });
    }
  }
};
