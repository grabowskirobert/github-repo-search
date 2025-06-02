import type { FunctionComponent } from 'react'
import { Center, Text } from '@chakra-ui/react'

type Props = {
  errorMessage: string
}

const ErrorDisplay: FunctionComponent<Props> = ({ errorMessage }) => {
  return (
    <Center height='100%' data-testid='error-display'>
      <Text color='red.500'>Error: {errorMessage}</Text>
    </Center>
  )
}

export default ErrorDisplay
