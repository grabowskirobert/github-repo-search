import { Box } from '@chakra-ui/react'
import type { FunctionComponent, ReactNode } from 'react'

type Props = {
  height: number
  children: ReactNode
}

const VirtualListContainer: FunctionComponent<Props> = ({ height, children }) => {
  return (
    <Box height={`${height}px`} position='relative'>
      {children}
    </Box>
  )
}

export default VirtualListContainer
