const { spawn } = require('child_process');
const http = require('http');

async function requestJson(url, method = 'GET') {
  const urlObj = new URL(url);
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: method
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse: ${data}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function run() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const port = 9222;
  
  console.log('Starting headless Chrome...');
  const chromeProc = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    '--headless=new',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=' + require('os').tmpdir() + '/chrome-debug-profile'
  ]);

  // Wait for Chrome to open port
  let targets = null;
  for (let i = 0; i < 20; i++) {
    await new Promise(r => setTimeout(r, 500));
    try {
      targets = await requestJson(`http://127.0.0.1:${port}/json/list`);
      if (targets) break;
    } catch (e) {}
  }

  if (!targets) {
    console.error('Failed to connect to Chrome CDP');
    chromeProc.kill();
    process.exit(1);
  }

  const testUrl = process.argv[2] || 'http://localhost:3000';
  console.log('Navigating to target URL:', testUrl);
  const page = await requestJson(`http://127.0.0.1:${port}/json/new?${testUrl}`, 'PUT');
  const ws = new WebSocket(page.webSocketDebuggerUrl);

  ws.onopen = () => {
    ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
    ws.send(JSON.stringify({ id: 2, method: 'Log.enable' }));
  };

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data);
    if (msg.method === 'Runtime.exceptionThrown') {
      console.log('\n--- BROWSER EXCEPTION THROWN ---');
      const details = msg.params.exceptionDetails;
      console.log('Text:', details.text);
      if (details.exception) {
        console.log('Exception description:', details.exception.description);
      }
      if (details.stackTrace) {
        console.log('Call frames:');
        details.stackTrace.callFrames.forEach(f => {
          console.log(`  at ${f.functionName || '(anonymous)'} (${f.url}:${f.lineNumber}:${f.columnNumber})`);
        });
      }
      console.log('--------------------------------\n');
    }

    if (msg.method === 'Runtime.consoleAPICalled') {
      const type = msg.params.type;
      const args = msg.params.args.map(a => a.value || a.description).join(' ');
      console.log(`[Console ${type}] ${args}`);
    }
  };

  // Wait 10 seconds to collect all errors
  await new Promise(r => setTimeout(r, 10000));
  
  ws.close();
  chromeProc.kill();
  console.log('Debugging complete.');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
