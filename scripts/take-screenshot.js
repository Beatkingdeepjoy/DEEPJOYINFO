const { execSync } = require('child_process');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const target = path.join(__dirname, '..', 'homepage.png');

console.log('Capturing to:', target);
execSync(`"${chrome}" --headless=new --window-size=1440,900 "--screenshot=${target}" http://localhost:3000`);
console.log('Done!');
