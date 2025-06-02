import { HttpResponse, delay, http } from 'msw'

export const handlers = [
  http.get('https://api.github.com/search/repositories', async ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')
    const page = Number(url.searchParams.get('page')) || 1
    const perPage = Number(url.searchParams.get('per_page')) || 10

    await delay(import.meta.env.MODE === 'test' ? 0 : 150)

    if (query === 'error-test') {
      return HttpResponse.error()
    }

    if (query === 'empty-test') {
      return HttpResponse.json({
        total_count: 0,
        incomplete_results: false,
        items: [],
      })
    }

    const items = Array.from({ length: perPage }).map((_, i) => ({
      id: page * 1000 + i,
      name: `${query}-repo-${page * 1000 + i}`,
      description: `Mock repository for ${query} (Page ${page})`,
      html_url: `https://${query}-repo-${page * 1000 + i}`,
    }))

    return HttpResponse.json({
      total_count: 1000,
      incomplete_results: false,
      items,
    })
  }),
]
