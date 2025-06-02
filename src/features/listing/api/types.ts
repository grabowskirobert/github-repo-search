type GitHubRepositoriesResponse = {
  items: Repository[]
  total_count: number
}

type Repository = {
  id: number
  name: string
  description: string
  html_url: string
}

export type { GitHubRepositoriesResponse, Repository }
