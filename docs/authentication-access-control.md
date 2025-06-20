## Authentication & Access Control

This document outlines how the Artist Dashboard handles user authentication and artist access.

### Spotify OAuth 2.0 Flow
- `GET /api/auth/spotify/login` – Redirects the user to Spotify's authorization endpoint.
- `GET /api/auth/spotify/callback` – Exchanges the authorization code for an access token and stores the tokens in DynamoDB or Amazon Cognito.

### Cognito User Pools
- The project uses an Amazon Cognito User Pool to manage logins. The current pool for **Rue de Vivre** is `5fxmkd`.
- This setup can be expanded in the future to allow multiple artist accounts.
