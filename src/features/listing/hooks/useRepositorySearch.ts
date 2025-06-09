import { useInfiniteQuery } from '@tanstack/react-query'
import searchRepositories from '../api/searchRepositories'

const INITIAL_PAGE = 1
const INITIAL_PER_PAGE = 15

const useRepositorySearch = (query: string) => {
  return useInfiniteQuery({
    queryKey: ['repository-search', query],
    queryFn: ({ pageParam = INITIAL_PAGE, signal }) =>
      searchRepositories(query, pageParam, INITIAL_PER_PAGE, signal),
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.length * INITIAL_PER_PAGE
      return totalFetched < lastPage.total_count ? allPages.length + 1 : undefined
    },
    select: (data) => ({
      ...data,
      flatData: data.pages.flatMap((page) => page.items),
    }),
    enabled: Boolean(query),
    staleTime: 5 * 60 * 1000, // 5 min cache
    retry: import.meta.env.MODE === 'test' ? 0 : 2,
  })
}

export default useRepositorySearch
