import type { Repository } from '@/features/listing/api/types'
import { Box, Center, Spinner } from '@chakra-ui/react'
import type { VirtualItem } from '@tanstack/react-virtual'
import type { FunctionComponent } from 'react'
import RepositoryItem from '../RepositoryItem/RepositoryItem'

type Props = {
  virtualItem: VirtualItem
  repository: Repository
  isLoaderRow: boolean
}

const VirtualRow: FunctionComponent<Props> = ({ virtualItem, repository, isLoaderRow }) => {
  return (
    <Box
      key={virtualItem.key}
      position='absolute'
      top={0}
      left={0}
      width='100%'
      height={`${virtualItem.size}px`}
      transform={`translateY(${virtualItem.start}px)`}
      display='flex'
      alignItems='center'
      role='listitem'
    >
      {isLoaderRow ? (
        <Center width='100%' height='100%' data-testid='loading-spinner'>
          <Spinner size='sm' />
        </Center>
      ) : (
        <RepositoryItem repository={repository} />
      )}
    </Box>
  )
}

export default VirtualRow
