import { StrictMode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import type { FunctionComponent, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const queryClient = new QueryClient()

const Provider: FunctionComponent<Props> = ({ children }) => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
      </QueryClientProvider>
    </StrictMode>
  )
}

export default Provider
