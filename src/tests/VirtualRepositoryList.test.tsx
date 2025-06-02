import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import Provider from '@/providers/ChakraProvider/Provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import VirtualRepositoryList from '../features/listing/components/Listing/components/VirtualRepositoryList'

const queryClient = new QueryClient()

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </Provider>
)

describe('VirtualRepositoryList', () => {
  vi.mock('@tanstack/react-virtual', () => ({
    useVirtualizer: () => ({
      getVirtualItems: () =>
        Array(5)
          .fill(0)
          .map((_, i) => ({
            key: i,
            index: i,
            start: i * 80,
            size: 80,
          })),
      getTotalSize: () => 400,
    }),
  }))

  test('shows loading state during fetch', async () => {
    render(<VirtualRepositoryList query='test' />, { wrapper: Wrapper })

    expect(screen.getAllByTestId('skeleton-item')).toHaveLength(5)

    await waitFor(() => {
      expect(screen.queryByTestId('skeleton-item')).not.toBeInTheDocument()
    })
  })

  test('displays error state on API failure', async () => {
    render(<VirtualRepositoryList query='error-test' />, { wrapper: Wrapper })

    await waitFor(() => {
      expect(screen.queryByTestId('skeleton-item')).not.toBeInTheDocument()
    })

    expect(screen.getByTestId('error-display')).toBeVisible()
  })

  test('shows empty state when no repositories found', async () => {
    render(<VirtualRepositoryList query='empty-test' />, { wrapper: Wrapper })

    await waitFor(() => {
      expect(screen.queryByTestId('skeleton-item')).not.toBeInTheDocument()
    })

    expect(screen.getByTestId('empty-list')).toBeVisible()
  })

  test('successfully fetches and displays repositories', async () => {
    render(<VirtualRepositoryList query='react' />, { wrapper: Wrapper })

    await waitFor(() => {
      expect(screen.queryByTestId('skeleton-item')).not.toBeInTheDocument()
    })

    expect(screen.getAllByTestId('repo-item').length).toBeGreaterThan(0)
  })

  test('does not fetch when query is empty', async () => {
    render(<VirtualRepositoryList query='' />, { wrapper: Wrapper })

    expect(screen.queryByTestId('skeleton-item')).not.toBeInTheDocument()
    expect(screen.queryByTestId('repo-item')).not.toBeInTheDocument()
  })
})
