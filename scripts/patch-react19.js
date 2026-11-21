const fs = require('fs');
const path = require('path');

function patchFile(file) {
  if (!fs.existsSync(file)) return;
  try {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    if (content.includes('__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED')) {
      content = content.replaceAll(
        '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED',
        '__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE'
      );
      modified = true;
    }

    if (modified) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('[patch-react19] Patched:', file);
    } else {
      console.log('[patch-react19] Clean:', file);
    }
  } catch (err) {
    console.warn('[patch-react19] Warning while patching', file, err.message);
  }
}

const rootDir = path.resolve(__dirname, '..');
const targets = [
  path.join(rootDir, 'node_modules/react-reconciler/cjs/react-reconciler.production.min.js'),
  path.join(rootDir, 'node_modules/react-reconciler/cjs/react-reconciler.development.js'),
  path.join(rootDir, 'apps/web/node_modules/react-reconciler/cjs/react-reconciler.production.min.js'),
  path.join(rootDir, 'apps/web/node_modules/react-reconciler/cjs/react-reconciler.development.js')
];

targets.forEach(patchFile);
