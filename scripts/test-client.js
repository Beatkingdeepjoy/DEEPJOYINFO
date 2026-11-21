const { spawn } = require('child_process');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const chrome = spawn(chromePath, [
  '--headless=new',
  '--enable-logging=stderr',
  '--v=1',
  '--dump-dom',
  'http://localhost:3000'
]);

let stderr = '';
let stdout = '';

chrome.stdout.on('data', (d) => stdout += d.toString());
chrome.stderr.on('data', (d) => stderr += d.toString());

chrome.on('close', (code) => {
  console.log('EXIT CODE:', code);
  // find console.error or exceptions in stderr
  const lines = stderr.split('\n').filter(l => l.includes('CONSOLE') || l.includes('Error') || l.includes('Uncaught'));
  console.log('CONSOLE ERRORS:', lines.join('\n'));
});
