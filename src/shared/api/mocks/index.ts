let isMockingEnabled = false

export async function enableMocking() {
  if (import.meta.env.PROD || isMockingEnabled) {
    return
  }

  isMockingEnabled = true

  const { worker } = await import('@/shared/api/mocks/browser')

  await worker.start({
    onUnhandledRequest: 'bypass'
  })
}
