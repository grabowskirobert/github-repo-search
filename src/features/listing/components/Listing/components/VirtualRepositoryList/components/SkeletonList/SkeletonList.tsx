import { Skeleton, Stack } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'

const SKELETON_AMOUNT = 5

const SkeletonList: FunctionComponent = () => {
  return (
    <Stack>
      {[...Array(SKELETON_AMOUNT)].map((_, i) => (
        <Skeleton key={i} height='85px' width='100%' data-testid='skeleton-item' />
      ))}
    </Stack>
  )
}

export default SkeletonList
