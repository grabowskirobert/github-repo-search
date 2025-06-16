import axios from 'axios'

const BASE_URL = 'https://api.github.com'

const githubClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/vnd.github+json',
  },
})

export default githubClient
