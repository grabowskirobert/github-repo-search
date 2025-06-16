import githubClient from './githubClient'
import type { GitHubRepositoriesResponse } from './types'

const searchRepositories = async (
  query: string,
  page: number,
  perPage: number,
  signal: AbortSignal
): Promise<GitHubRepositoriesResponse> => {
  const response = await githubClient.get('/search/repositories', {
    params: {
      q: query,
      page,
      per_page: perPage,
    },
    signal,
  })

  return response.data
}

export default searchRepositories
