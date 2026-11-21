const { execSync } = require('child_process');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const target = 'C:\\Users\\DEEPJOY BHOWMIK\\.gemini\\antigravity\\brain\\dae8feff-6380-46a5-ba6b-66a98f07854f\\homepage-hero-live.png';

console.log('Capturing live hero after preloader...');
execSync(`"${chrome}" --headless=new --virtual-time-budget=5000 --window-size=1440,900 "--screenshot=${target}" https://deepjoyinfo.vercel.app`);
console.log('Done!');
