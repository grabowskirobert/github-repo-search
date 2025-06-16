import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, expect, test, vi } from 'vitest'
import VirtualRepositoryList from '@/features/listing/components/Listing/components/VirtualRepositoryList'
import Provider from '../../filter/providers/ChakraProvider/Provider'

const queryClient = new QueryClient()

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </Provider>
)

const mockFetchNextPage = vi.fn()

vi.mock('../features/listing/hooks/useRepositorySearch', () => ({
  default: vi.fn(() => ({
    data: {
      pages: [{ items: [{ id: 1, name: 'repo' }] }],
    },
    fetchNextPage: mockFetchNextPage,
    isLoading: false,
    error: null,
    hasNextPage: true,
  })),
}))

vi.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: vi.fn(() => ({
    getVirtualItems: () =>
      Array(10)
        .fill(null)
        .map((_, i) => ({
          key: i,
          index: i,
          start: i * 80,
          size: 80,
        })),
    getTotalSize: () => 800,
  })),
}))

describe('VirtualRepositoryList - Infinite Scrolling', () => {
  test('automatically loads next page when virtual items approach end of list', async () => {
    render(<VirtualRepositoryList query='test' />, { wrapper: Wrapper })

    await waitFor(() => {
      expect(screen.getAllByTestId('repo-item').length).toBeGreaterThan(0)
    })

    expect(mockFetchNextPage).toHaveBeenCalledTimes(1)
  })
})
