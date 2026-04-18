import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"

import './index.css'

const init = async () => {
  if (import.meta.env.VITE_MSW_ENABLED === "true") {
    const { worker } = await import("@/shared/api/mocks/browser")

    await worker.start({
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      },
      onUnhandledRequest(req, _print) {
        const url = new URL(req.url)

        const isImage = /\.(png|jpg|jpeg|gif|svg|webp|ico)(\?.*)?$/i.test(url.pathname)
        const isPlaceholder = url.hostname === "placehold.co"
        if (isImage || isPlaceholder) return

        // print.warning()
      }
    })
  }

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </StrictMode>
  )
}

init().catch(console.error)
