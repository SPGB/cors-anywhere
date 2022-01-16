import { createServer } from './lib/cors-anywhere';

// Listen on a specific host via the HOST environment variable
const host = String(process.env.HOST || '0.0.0.0');
// Listen on a specific port via the PORT environment variable
const port = Number(process.env.PORT || 8080);

createServer({
  originBlacklist: [],
  originWhitelist: [],
  requireHeader: [],
  removeHeaders: [
    'cookie',
    'cookie2',
    // Strip Heroku-specific headers
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time',
    // Other Heroku added debug headers
    // 'x-forwarded-for',
    // 'x-forwarded-proto',
    // 'x-forwarded-port',
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
    xfwd: false,
  },
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});
