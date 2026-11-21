const { execSync } = require('child_process');
const path = require('path');

const chrome = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const base = 'http://localhost:3000';

const routes = [
  { name: 'homepage', url: `${base}/` },
  { name: 'resume', url: `${base}/resume` },
  { name: 'blog', url: `${base}/blog` },
  { name: 'blog-post', url: `${base}/blog/btech-hostel-life-tripura` },
  { name: 'project-detail', url: `${base}/projects/shudh-desi` },
  { name: 'guestbook', url: `${base}/guestbook` },
  { name: 'admin-console', url: `${base}/admin` },
];

routes.forEach((r) => {
  const dest = path.join(__dirname, '..', `${r.name}.png`);
  console.log(`Capturing ${r.name} from ${r.url}...`);
  try {
    execSync(`"${chrome}" --headless=new --window-size=1440,900 "--screenshot=${dest}" "${r.url}"`);
    console.log(`Saved ${r.name}.png`);
  } catch (err) {
    console.error(`Failed ${r.name}:`, err.message);
  }
});
console.log('All screenshots captured successfully!');
