const { execSync } = require('child_process');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const artifactDir = 'C:\\Users\\DEEPJOY BHOWMIK\\.gemini\\antigravity\\brain\\dae8feff-6380-46a5-ba6b-66a98f07854f';

console.log('Capturing Desktop Hero...');
execSync(`"${chrome}" --headless=new --virtual-time-budget=6000 --window-size=1440,960 "--screenshot=${path.join(artifactDir, 'jayesh-patil-hero-live.png')}" https://deepjoyinfo.vercel.app`);

console.log('Capturing Mobile View (390x844)...');
execSync(`"${chrome}" --headless=new --virtual-time-budget=6000 --window-size=390,844 "--screenshot=${path.join(artifactDir, 'jayesh-patil-mobile-live.png')}" https://deepjoyinfo.vercel.app`);

console.log('Done capturing live theme screenshots!');
