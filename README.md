# GitHub Repo Search

Author: Robert Grabowski

## Getting Started

### Environment Setup

1. Copy the .env.example file and rename it to .env.

2. Set the variable `VITE_ENABLE_MSW_WORKER=1` if you want to enable MSW (Mock Service Worker) for development and testing.

### Mock Behavior

- Enter error-test in the search input to simulate an error response via MSW.
- Enter empty-test in the search input to simulate an empty result set via MSW.

### Install dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

### Run Tests

```bash
npm run test
```