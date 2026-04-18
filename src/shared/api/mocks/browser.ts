// import { setupWorker } from "msw/browser";
// import { boardsHandlers } from "./handlers/boards";
// import { authHandlers } from "./handlers/auth";
//
// export const worker = setupWorker(...authHandlers, ...boardsHandlers);

import { setupWorker } from "msw/browser";
import { boardsHandlers } from "./handlers/boards";
import { authHandlers } from "./handlers/auth";

export const worker = setupWorker(...authHandlers, ...boardsHandlers);

export async function enableMocking() {
  return worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
    onUnhandledRequest(req, print) {
      const url = new URL(req.url);
      if (url.protocol === "chrome-extension:") return;
      if (url.pathname.startsWith("/assets/")) return;
      const isImage = /\.(png|jpg|jpeg|gif|svg|webp|ico)(\?.*)?$/i.test(
        url.pathname,
      );
      const isPlaceholder = url.hostname === "placehold.co";
      if (isImage || isPlaceholder) return;
      print.warning();
    },
  });
}
