// Safe React 19 compatibility polyfill for React 18 Three Fiber / Drei internal hooks
import * as React from "react";

try {
  const anyReact = React as unknown as Record<string, unknown>;
  const internals =
    anyReact.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE ||
    anyReact.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED ||
    { ReactCurrentBatchConfig: { transition: null } };

  if (typeof (internals as Record<string, unknown>).ReactCurrentBatchConfig === "undefined") {
    (internals as Record<string, unknown>).ReactCurrentBatchConfig = { transition: null };
  }

  // Attempt safe defineProperty (non-throwing on frozen ESM namespace)
  try {
    if (!anyReact.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
      Object.defineProperty(anyReact, "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED", {
        value: internals,
        configurable: true,
        writable: true,
      });
    }
  } catch {
    // Ignored in strict frozen ESM
  }

  try {
    if (!anyReact.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) {
      Object.defineProperty(anyReact, "__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE", {
        value: internals,
        configurable: true,
        writable: true,
      });
    }
  } catch {
    // Ignored in strict frozen ESM
  }
} catch {
  // Polyfill safely bypassed without breaking client hydration
}

// Global scope polyfill for browser window/globalThis
if (typeof globalThis !== "undefined") {
  try {
    const g = globalThis as unknown as Record<string, unknown>;
    if (!g.React) g.React = {};
    const gReact = g.React as Record<string, unknown>;
    const batchConfig = { transition: null };

    if (!gReact.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE) {
      gReact.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = {
        ReactCurrentBatchConfig: batchConfig,
      };
    }
    if (!gReact.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED) {
      gReact.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED =
        gReact.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    }
  } catch {
    // Safely ignore
  }
}
