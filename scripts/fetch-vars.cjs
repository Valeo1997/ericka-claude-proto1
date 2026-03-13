const https = require('https');

function fetchUrl(url) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      let redirectUrl = res.headers.location;
      if (!redirectUrl.startsWith('http')) {
        redirectUrl = 'https://unpkg.com' + redirectUrl;
      }
      return fetchUrl(redirectUrl);
    }
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      const matches = data.match(/--[a-zA-Z0-9-]+/g);
      if (matches) {
        const unique = [...new Set(matches)].sort();
        console.log(unique.join('\n'));
      }
    });
  });
}

fetchUrl('https://unpkg.com/@elevenlabs/convai-widget-embed');
