'use client'

import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import type { FunctionComponent, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Provider: FunctionComponent<Props> = ({ children }) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
}

export default Provider
