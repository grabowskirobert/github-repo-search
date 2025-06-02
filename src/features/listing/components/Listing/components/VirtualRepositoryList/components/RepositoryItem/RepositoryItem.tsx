import type { FunctionComponent } from 'react'
import type { Repository } from '../../../../../../api/types'
import { Stack, Text, Box, Link } from '@chakra-ui/react'

type Props = {
  repository: Repository
}

const RepositoryItem: FunctionComponent<Props> = ({ repository }) => {
  return (
    <Box
      width='100%'
      p={4}
      borderBottom='1px solid'
      borderColor='gray.100'
      _hover={{ bg: 'gray.50' }}
      bg='white'
      data-testid='repo-item'
    >
      <Stack align='start'>
        <Link fontWeight='bold' fontSize='lg' href={repository.html_url} target='blank_'>
          {repository.name}
        </Link>
        <Text color='gray.600' fontSize='sm'>
          {repository.description || 'No description'}
        </Text>
      </Stack>
    </Box>
  )
}

export default RepositoryItem
