const fs = require('fs');
const path = require('path');

console.log('[patch-react19] Starting comprehensive React 19 compatibility patch...');

function findFiles(dir, matchFileName) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== '.git' && entry.name !== '.next') {
          results.push(...findFiles(full, matchFileName));
        }
      } else if (entry.isFile() && matchFileName(entry.name, full)) {
        results.push(full);
      }
    }
  } catch (e) {}
  return results;
}

const rootDir = path.resolve(__dirname, '..');

// 1. Patch react-reconciler files
const reconcilerFiles = findFiles(path.join(rootDir, 'node_modules'), (name, full) => {
  return full.includes('react-reconciler') && name.endsWith('.js');
});

console.log(`[patch-react19] Found ${reconcilerFiles.length} react-reconciler files to inspect.`);

reconcilerFiles.forEach(file => {
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
      console.log('[patch-react19] Patched reconciler file:', file);
    }
  } catch (err) {
    console.warn('[patch-react19] Error patching:', file, err.message);
  }
});

// 2. Patch react package index.js and cjs files
const reactIndexFiles = findFiles(path.join(rootDir, 'node_modules'), (name, full) => {
  return (full.endsWith('react/index.js') || full.endsWith('react\\index.js'));
});

reactIndexFiles.forEach(file => {
  try {
    const patchedCode = `'use strict';

let reactExports;
if (process.env.NODE_ENV === 'production') {
  reactExports = require('./cjs/react.production.js');
} else {
  reactExports = require('./cjs/react.development.js');
}

const internals = reactExports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE || reactExports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED || {};
if (!internals.ReactCurrentBatchConfig) {
  internals.ReactCurrentBatchConfig = { transition: null };
}
if (!internals.ReactCurrentOwner) {
  internals.ReactCurrentOwner = { current: null };
}
if (!internals.ReactCurrentDispatcher) {
  internals.ReactCurrentDispatcher = { current: null };
}
if (!internals.ReactCurrentActQueue) {
  internals.ReactCurrentActQueue = { current: null };
}

if (!reactExports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
  reactExports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = internals;
}
if (!reactExports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) {
  reactExports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = internals;
}

module.exports = reactExports;
`;
    fs.writeFileSync(file, patchedCode, 'utf8');
    console.log('[patch-react19] Patched React entry point:', file);
  } catch (err) {
    console.warn('[patch-react19] Error patching react index:', file, err.message);
  }
});

// 3. Patch react.production.js directly
const reactCjsFiles = findFiles(path.join(rootDir, 'node_modules'), (name, full) => {
  return (name === 'react.production.js' || name === 'react.development.js');
});

reactCjsFiles.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('patch-react19-applied')) {
      const injection = `
/* patch-react19-applied */
if (typeof ReactSharedInternals !== 'undefined') {
  if (!ReactSharedInternals.ReactCurrentBatchConfig) {
    ReactSharedInternals.ReactCurrentBatchConfig = { transition: null };
  }
  if (!ReactSharedInternals.ReactCurrentOwner) {
    ReactSharedInternals.ReactCurrentOwner = { current: null };
  }
  if (!ReactSharedInternals.ReactCurrentDispatcher) {
    ReactSharedInternals.ReactCurrentDispatcher = { current: null };
  }
}
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ReactSharedInternals;
`;
      content += injection;
      fs.writeFileSync(file, content, 'utf8');
      console.log('[patch-react19] Injected bridge into:', file);
    }
  } catch (err) {
    console.warn('[patch-react19] Error patching react cjs:', file, err.message);
  }
});

console.log('[patch-react19] Patching completed successfully.');
