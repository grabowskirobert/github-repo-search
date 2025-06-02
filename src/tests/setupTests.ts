import { beforeAll, afterAll, afterEach } from 'vitest'
import { server } from '../mocks/server'
import '@testing-library/jest-dom/vitest'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
