import githubClient from '@/api/githubClient'
import type { GitHubRepositoriesResponse } from './types'

const INITIAL_PAGE = 1
const INITIAL_PER_PAGE = 10

const searchRepositories = async (
  query: string,
  page = INITIAL_PAGE,
  perPage = INITIAL_PER_PAGE
): Promise<GitHubRepositoriesResponse> => {
  const response = await githubClient.get('/search/repositories', {
    params: {
      q: query,
      page,
      per_page: perPage,
    },
  })

  return response.data
}

export default searchRepositories
