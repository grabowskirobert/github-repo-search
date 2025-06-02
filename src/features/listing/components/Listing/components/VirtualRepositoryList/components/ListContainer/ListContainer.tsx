import { Box } from '@chakra-ui/react'
import type { FunctionComponent, ReactNode, RefObject } from 'react'

type Props = {
  ref: RefObject<HTMLDivElement | null>
  children: ReactNode
}

const ListContainer: FunctionComponent<Props> = ({ ref, children }) => {
  return (
    <Box
      ref={ref}
      height='455px'
      overflow='auto'
      border='1px solid'
      borderColor='gray.200'
      borderRadius='md'
      role='list'
      aria-label='Repository list'
      data-testid='list-container'
    >
      {children}
    </Box>
  )
}

export default ListContainer
