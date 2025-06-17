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

**Project Layout:**

* `src/` – React components and pages.
* `public/` – static files served by the app such as `index.html` and `favicon.png`.
* `decodedmusic-frontend/` – a secondary example React project with its own `public/` folder.

To update the site icon, replace `public/favicon.png` with your image and ensure `public/index.html` contains:

```html
<link rel="icon" href="%PUBLIC_URL%/favicon.png" />
```

Remove any `favicon.ico` in `public/` before building so the updated icon appears in the browser.

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

## Catalog & Pitch API Setup

The catalog browsing pages and pitch submission form expect API endpoints to be
configured in your `.env` file:

```bash
REACT_APP_PITCH_API_URL=https://your-api-id.execute-api.region.amazonaws.com/prod/pitch
REACT_APP_CATALOG_API_URL=https://your-api-id.execute-api.region.amazonaws.com/prod/catalog
```

These URLs are outputs of the `DecodedMusicBackend` CloudFormation stack.

**Future Development:**

*   Implement backend APIs for user authentication, catalog management, dynamic pricing calculation, licensing, and analytics.
*   Integrate with Stripe for payment processing.
*   Develop the `/catalog`, `/artist/signup`, and other linked pages.
*   Replace placeholder content with dynamic data fetched from the backend.
*   Add actual icons and refine styling based on detailed design assets.
*   See [docs/artist-dashboard-plan.md](docs/artist-dashboard-plan.md) for a
    proposed Artist Dashboard backend and adoption strategy.
*   See [docs/authentication-access-control.md](docs/authentication-access-control.md)
    for an overview of Spotify OAuth and the Cognito user pool.
*   See [docs/catalog-upload-pipeline.md](docs/catalog-upload-pipeline.md)
    for the catalog upload and metadata extraction pipeline.
*   See [docs/subscription-system.md](docs/subscription-system.md)
    for the artist subscription workflow and company revenue reporting.


## Signup Lambda Function
The backend includes a sample AWS Lambda handler at `backend/lambda/signupHandler.js` which emails signup details via SES. Deploy it using the CloudFormation template at `backend/cloudformation/signupLambda.yml`:

```bash
aws cloudformation deploy \
  --template-file backend/cloudformation/signupLambda.yml \
  --stack-name DecodedSignupLambda \
  --region eu-central-1 \
  --capabilities CAPABILITY_NAMED_IAM
```

The API Gateway and Lambda permission configuration lives in `backend/cloudformation/signupApi.yml`. Deploy this CloudFormation stack after uploading `lambda/signup-handler.zip` to S3 to expose a `/signup` endpoint:

```bash
aws cloudformation deploy \
  --template-file backend/cloudformation/signupApi.yml \
  --stack-name DecodedSignupApi \
  --region eu-central-1 \
  --capabilities CAPABILITY_NAMED_IAM
```

## Pitch Lambda Function
The sync licensing pitch handler at `backend/lambda/pitchHandler/index.js` sends templated emails via SES.
Package and upload the code to S3:

```bash
cd backend/lambda/pitchHandler
zip -r pitchHandler.zip .
aws s3 cp pitchHandler.zip s3://decodedmusic-lambda-code/
```

Deploy the resources defined in `backend/cloudformation/decodedMusicBackend.yaml` to expose a `/api/pitch` endpoint:

```bash
aws cloudformation deploy \
  --template-file backend/cloudformation/decodedMusicBackend.yaml \
  --stack-name DecodedMusicBackend \
  --region eu-central-1 \
  --capabilities CAPABILITY_NAMED_IAM
```

## Artist Dashboard API
Several Lambda functions under `backend/lambda/` implement the `/api/dashboard/*` endpoints.
Package and upload the code to S3 before deploying:

```bash
cd backend/lambda/dashboardEarnings && zip -r earnings.zip . && aws s3 cp earnings.zip s3://decodedmusic-lambda-code/ && cd -
```

Repeat for the other dashboard lambda directories (`dashboardStreams`, `dashboardCatalog`, etc.).

Deploy the updated CloudFormation stack:

```bash
aws cloudformation deploy \
  --template-file backend/cloudformation/decodedMusicBackend.yaml \
  --stack-name DecodedMusicBackend \
  --region eu-central-1 \
  --capabilities CAPABILITY_NAMED_IAM
```

Verify the earnings endpoint:

```bash
curl https://n64vgs0he0.execute-api.eu-central-1.amazonaws.com/prod/dashboard/earnings
```

## Running in Codex

If you encounter a message like "Codex couldn't run certain commands due to environment limitations," make sure the container installs dependencies before running tests or other commands. A simple `setup.sh` script can be used. The script uses `npm ci` when a `package-lock.json` file is present, falling back to `npm install` otherwise:

```bash
#!/bin/bash
set -e

if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
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

The CloudFront distribution <https://d1n11wdfy5g0ms.cloudfront.net/> (ID `E3POL8Z7WOOYIC`, ARN `arn:aws:cloudfront::396913703024:distribution/E3POL8Z7WOOYIC`) will serve the updated site once the files are uploaded.

## CloudFormation Deployment

A starter template for the music management backend is provided at
`cloudformation/music-management.yml`. This creates S3 buckets, DynamoDB tables,
a sample Lambda function, and an API Gateway endpoint. Deploy it in the
Frankfurt region (eu-central-1) with a unique stack name:

```bash
aws cloudformation deploy \
  --template-file cloudformation/music-management.yml \
  --stack-name decodedmusic-stack \
  --region eu-central-1 \
  --capabilities CAPABILITY_NAMED_IAM \
  --parameter-overrides EnvName=prod
```

The `EnvName` parameter defaults to `prod`. The example above explicitly
passes `EnvName=prod`, but you can set a different value (e.g. `staging`) to
create additional environments.

### DecodedMusicBackend Stack

Codex automation uses a backend CloudFormation stack named `DecodedMusicBackend`.
It provisions a Lambda function, API Gateway and DynamoDB table. Deploy it with:

```bash
aws cloudformation deploy \
  --template-file backend/cloudformation/decodedMusicBackend.yaml \
  --stack-name DecodedMusicBackend \
  --region eu-central-1 \
  --capabilities CAPABILITY_NAMED_IAM
```

After deployment the CloudFormation console should show a `CREATE_COMPLETE` status.

### Catalog API

Deploy `cloudformation/catalog-api.yml` to expose a simple REST API for listing
and retrieving catalog tracks. Upload `lambda/catalog-handler.zip` with the
code from `backend/lambda/catalogHandler.js` to the referenced S3 bucket.
The API exposes two endpoints:

```
GET /api/catalog      # list public track metadata
GET /api/catalog/{id} # fetch one track by ID
```

`preview_url` values are short-lived signed S3 links (30 seconds) so download
URLs remain hidden.

### Marketing Hub

The `cloudformation/marketing-hub.yml` template provisions DynamoDB tables and
Lambda functions for ad spend tracking and attribution. After deployment the
API Gateway provides `/marketing` endpoints used by the dashboard to record
campaign spend and fetch ROI metrics.

Node scripts are available for social post scheduling and trending topic
reposts under the `scripts/` directory.

## Daily Content Agent

Run `npm run content-agent` to generate an Instagram caption with AWS Bedrock and
queue a post via the Meta Graph API. After publishing, the script fetches basic
insights and sends them back to Bedrock for a short performance summary saved to
`latest_social_summary.txt`.

Configure `INSTAGRAM_TOKEN` and `INSTAGRAM_USER_ID` in your `.env` along with
`AWS_REGION` and optional `BEDROCK_MODEL_ID`.

