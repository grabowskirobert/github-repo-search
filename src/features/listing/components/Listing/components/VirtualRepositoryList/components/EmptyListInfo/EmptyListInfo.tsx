import { Center, Text } from '@chakra-ui/react'
import type { FunctionComponent } from 'react'

const EmptyListInfo: FunctionComponent = () => {
  return (
    <Center height='100%' data-testid='empty-list'>
      <Text>No repositories found</Text>
    </Center>
  )
}

export default EmptyListInfo
