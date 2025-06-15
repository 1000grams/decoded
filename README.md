# Decoded Music Landing Page

This repository contains the front-end code for the Decoded Music high-hype landing page, designed to captivate Brands, UGC Creators, and Artists.

The design is based on a detailed blueprint incorporating specific section structures, visual ratios (implemented via CSS layout), a modern aesthetic, and a focus on dynamic pricing and artist empowerment.

**Design Foundation:**

*   **Font:** Helvetica (or a suitable fallback like Arial)
*   **Background:** `#111` (Dark Grey/Black)
*   **Text:** `#fff` (White)
*   **Accent:** `#32C1ED` (Cyan/Aqua)

**Structure:**

The page is built as a sequence of components, each representing a distinct section defined in the blueprint. CSS Modules are used for styling, and layout techniques (Flexbox, Grid) are employed to translate the conceptual "frame ratios" from the design phase into responsive visual structures.

**Conceptual Backend Integration:**

While this repository focuses solely on the front-end UI, the blueprint mentions various backend technologies (AWS services, Stripe, etc.). The front-end code includes placeholder elements and comments indicating where interactions with a backend API would occur (e.g., form submissions, triggering pricing calculations, fetching catalog data). A fully functional application would require implementing these backend services.

**Getting Started:**

1.  Clone the repository: `git clone https://github.com/yourusername/decoded-music-landing-page.git`
2.  Navigate to the project directory: `cd decoded-music-landing-page`
3.  Install dependencies: `npm install` (or `yarn install`)
4.  Start the development server: `npm start` (or `yarn start`)

This will open the landing page in your browser at `http://localhost:3000/`.

**Implementation Notes:**

*   **Frame Ratios:** Visual ratios specified in the blueprint (e.g., 3:2, 1:1, 2:3) are implemented using CSS layout techniques (Flexbox, Grid) and responsive design principles, not actual `<iframe>` elements.
*   **Responsiveness:** The layout is designed to be responsive, stacking sections and grid elements vertically on smaller screens (mobile) and adjusting column layouts for larger screens (desktop).
*   **Placeholder Content:** Content like specific artist details (Rue de Vivre), catalog items, and pricing calculation logic are placeholders. These would connect to a real backend API in a production application.
*   **Icons:** Placeholder text like `[Icon]` is used. You would integrate an icon library (like React Icons) or use SVGs.
  *   **Video:** Ensure `public/p1.mp4` exists for the hero section video.

## Industry Buzz Researcher

The `npm run research` script (see `scripts/musicManagementResearcher.js`)
scans public news sources for updates on labels, sync opportunities, artist
deals, disputes, catalog sales, and contract releases. Results are summarized
using AWS Bedrock and saved to `industry_buzz.txt`.

Copy `.env.example` to `.env` and fill in the required keys (News API, Stripe, AWS). Alternatively you can set the `NEWS_API_KEY` environment variable and AWS credentials before running:

```bash
npm run research
```

Schedule this command to run daily (for example using `cron` or AWS EventBridge) so `industry_buzz.txt` stays up to date.

The generated summary can be shared to social platforms via the
[Threads Graph API](https://developers.facebook.com/docs/threads-api).

The latest summary is displayed in `public/buzz.html`. This page uses Tailwind
via CDN and fetches `industry_buzz.txt` to populate the bullet points when
opened in a browser.

## Spotify Login Setup

The Artist Dashboard now uses Spotify's authorization flow. Create a Spotify
application and add the client ID and redirect URI to your `.env` (based on `.env.example`):

```bash
REACT_APP_SPOTIFY_CLIENT_ID=your_client_id
REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000/dashboard
```

These values are read by the front-end to initiate the login process.

**Future Development:**

*   Implement backend APIs for user authentication, catalog management, dynamic pricing calculation, licensing, and analytics.
*   Integrate with Stripe for payment processing.
*   Develop the `/catalog`, `/artist/signup`, and other linked pages.
*   Replace placeholder content with dynamic data fetched from the backend.
*   Add actual icons and refine styling based on detailed design assets.
*   See [docs/artist-dashboard-plan.md](docs/artist-dashboard-plan.md) for a
    proposed Artist Dashboard backend and adoption strategy.

## Running in Codex

If you encounter a message like "Codex couldn't run certain commands due to environment limitations," make sure the container installs dependencies before running tests or other commands. A simple `setup.sh` script can be used:

```bash
#!/bin/bash
set -e
npm install
```

Run this script manually or in your CI pipeline so the environment has the required packages when Codex executes your commands.

## Deploying from CloudShell

After committing changes to GitHub you can deploy the build output to the Generative AI Application Builder stack.

1. **Clone or update the repository**

   ```bash
   git clone https://github.com/yourusername/decoded-music-landing-page.git
   cd decoded-music-landing-page
   git pull
   ```

2. **Install dependencies and build**

   ```bash
   npm ci
   npm run build
   ```

3. **Sync the `build/` directory to the S3 bucket created by the application builder**

   ```bash
   aws s3 sync build/ s3://YOUR_BUCKET_NAME --region eu-central-1 --delete
   ```

The CloudFront distribution (e.g. <https://d1n11wdfy5g0ms.cloudfront.net/>) will serve the updated site once the files are uploaded.
