const enableMocking = async () => {
  if (import.meta.env.VITE_ENABLE_MSW_WORKER === '0') return

  const { worker } = await import('../mocks/browser')
  return worker.start()
}

export default enableMocking
