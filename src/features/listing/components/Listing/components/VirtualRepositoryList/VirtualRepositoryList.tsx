import { useEffect, useMemo, useRef, type FunctionComponent } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import useRepositorySearch from '../../../../hooks/useRepositorySearch'
import ErrorDisplay from './components/ErrorDisplay'
import SkeletonList from './components/SkeletonList'
import EmptyListInfo from './components/EmptyListInfo'
import ListContainer from './components/ListContainer'
import VirtualListContainer from './components/VirtualListContainer'
import VirtualRow from './components/VirtualRow'

type Props = {
  query: string
}

const ELEMENTS_UNTIL_LOAD = 5

const VirtualRepositoryList: FunctionComponent<Props> = ({ query }) => {
  const { data, fetchNextPage, isFetching, isLoading, error, hasNextPage } =
    useRepositorySearch(query)
  const parentRef = useRef<HTMLDivElement>(null)
  const flatData = useMemo(() => data?.flatData || [], [data?.flatData])

  const isRepositoryListEmpty = !isFetching && flatData.length === 0 && query

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? flatData.length + 1 : flatData.length, // +1 for loading spinner
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    overscan: 3,
  })

  const virtualItems = rowVirtualizer.getVirtualItems()
  const totalSize = rowVirtualizer.getTotalSize()

  useEffect(() => {
    const [lastItem] = virtualItems.slice(-1)

    if (!lastItem || !hasNextPage || isFetching) return

    if (lastItem.index >= flatData.length - ELEMENTS_UNTIL_LOAD) {
      fetchNextPage()
    }
  }, [virtualItems.length, hasNextPage, isFetching, flatData.length])

  if (error) {
    return <ErrorDisplay errorMessage={error.message} />
  }

  if (isLoading) {
    return <SkeletonList />
  }

  if (isRepositoryListEmpty) {
    return <EmptyListInfo />
  }

  return (
    <ListContainer ref={parentRef}>
      <VirtualListContainer height={totalSize}>
        {virtualItems.map((virtualItem) => (
          <VirtualRow
            key={virtualItem.key}
            virtualItem={virtualItem}
            repository={flatData[virtualItem.index]}
            isLoaderRow={virtualItem.index >= flatData.length}
          />
        ))}
      </VirtualListContainer>
    </ListContainer>
  )
}

export default VirtualRepositoryList
