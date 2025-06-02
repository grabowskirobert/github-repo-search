import { useState, type FunctionComponent } from 'react'
import VirtualRepositoryList from './components/VirtualRepositoryList/VirtualRepositoryList'
import { Box, Center, Container, Heading, Input } from '@chakra-ui/react'
import { useDebounce } from 'use-debounce'

const Listing: FunctionComponent = () => {
  const [query, setQuery] = useState('')
  const [debouncedSearch] = useDebounce(query, 300)

  return (
    <Box height='100vh' bg='gray.100'>
      <Container width='3/5'>
        <Center>
          <Heading as='h1' size='xl' color='purple.600' my={5}>
            GitHub Repositories
          </Heading>
        </Center>

        <Box bg='white' borderRadius='lg' boxShadow='md' height='550px'>
          <Container>
            <Input
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search repositories...'
              my={4}
            />
            <VirtualRepositoryList query={debouncedSearch} />
          </Container>
        </Box>
      </Container>
    </Box>
  )
}

export default Listing
