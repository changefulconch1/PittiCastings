// Pitti Engineering Limited - Modern Mechanical Web Server
// Native Node.js HTTP Server with full MIME support & API endpoints

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3030;
const PUBLIC_DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff'
};

const server = http.createServer((req, res) => {
  // CORS & Security headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = parsedUrl.pathname;

  // API endpoint for mechanical RFQ submission
  if (req.method === 'POST' && pathname === '/api/rfq') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        console.log('[RFQ RECEIVED]', data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          referenceId: 'PITTI-SPEC-' + Math.floor(100000 + Math.random() * 900000),
          message: 'Engineering specification received. Pitti technical design team will review.',
          timestamp: new Date().toISOString()
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON payload' }));
      }
    });
    return;
  }

  // API endpoint for plant status telemetry
  if (pathname === '/api/telemetry') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'OPTIMAL',
      plants: {
        kothur: { activeLines: 14, efficiency: 98.4, sheetThroughputMT: 420 },
        aurangabad: { activeLines: 22, efficiency: 99.1, solarGenerationKW: 890 },
        nandigaon: { activeLines: 8, efficiency: 96.8, fettlingCycles: 1450 },
        macharam: { activeLines: 6, furnaceTempC: 1480, castingMT: 95 },
        tumakuru: { activeLines: 9, efficiency: 97.9, dieCastUnits: 3400 },
        hoskote: { activeLines: 5, efficiency: 98.2, ironPours: 62 }
      },
      gridFrequencyHz: 50.02,
      spindleAverageLoadPercent: 78.6,
      timestamp: Date.now()
    }));
    return;
  }

  // Normalize path
  if (pathname === '/') pathname = '/index.html';
  const filePath = path.resolve(PUBLIC_DIR, '.' + pathname);

  // Security check: ensure path is inside PUBLIC_DIR
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      // Fallback to index.html for SPA if not an asset
      if (!path.extname(pathname)) {
        const indexPath = path.join(PUBLIC_DIR, 'index.html');
        return fs.readFile(indexPath, (err2, content) => {
          if (err2) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(content);
          }
        });
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` PITTI ENGINEERING LIMITED - MECHANICAL WEB ENGINE`);
  console.log(` Local Server: http://localhost:${PORT}`);
  console.log(` Precision Precision Engineering & Lamination Systems`);
  console.log(`======================================================\n`);
});
