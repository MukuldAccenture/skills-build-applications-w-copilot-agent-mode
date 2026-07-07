# OctoFit Frontend (React 19 + Vite)

## Environment variable

Define `VITE_CODESPACE_NAME` in a local env file (for example `.env.local`) when running in GitHub Codespaces.

Example `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

When `VITE_CODESPACE_NAME` is set, API calls use:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

When `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

This avoids invalid URLs such as `https://undefined-8000.app.github.dev/...`.
