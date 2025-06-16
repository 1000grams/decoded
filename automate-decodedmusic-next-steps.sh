#!/bin/bash
# automate-decodedmusic-next-steps.sh

# 1. Scaffold React UI with TailwindCSS and shadcn/ui
npx create-react-app decodedmusic-frontend --template cra-template
cd decodedmusic-frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm install @shadcn/ui
cd ..

# 2. Backend infra: CloudFormation/CDK starter structure
mkdir -p backend/catalog/cicd/cloudformation_cdk
cat > backend/catalog/cicd/cloudformation_cdk/README.md <<'EOF'
# CloudFormation/CDK
Place your AWS CDK (TypeScript/Python) or CloudFormation templates here for infrastructure provisioning.
EOF

# 3. AppSync GraphQL schema
mkdir -p backend/catalog/api/graphql
cat > backend/catalog/api/graphql/schema.graphql <<'EOF'
type ASCAP {
  work_id: String!
  ipi_name: String!
  ipi_base_number: String!
  publisher: String!
}

type Track {
  track_id: ID!
  title: String!
  artist: Artist!
  bpm: Int
  key: String
  duration_sec: Int
  price_cents: Int
  ascap: ASCAP!
  preview_url: String!
}

input TrackFilter {
  genre_ids: [ID!]
  mood_ids: [ID!]
  bpm_min: Int
  bpm_max: Int
  duration_min: Int
  duration_max: Int
  license_type: LicenseType
}

type TrackPage {
  items: [Track!]!
  total: Int!
  facets: FacetResults
}

type Query {
  browseTracks(filter: TrackFilter, page: Int!, perPage: Int!): TrackPage!
  getTrack(track_id: ID!): Track
  listGenres: [Genre!]!
  listMoods: [Mood!]!
}

schema {
  query: Query
}
EOF

# 4. Lambda and S3 trigger folders
mkdir -p backend/catalog/lambda/ingestion
mkdir -p backend/catalog/storage/s3/incoming

cat > backend/catalog/lambda/ingestion/README.md <<'EOF'
# Ingestion Lambda
Place your Lambda function code here for processing S3 uploads and extracting metadata.
EOF

cat > backend/catalog/storage/s3/incoming/README.md <<'EOF'
# S3 Incoming
This folder represents the S3 bucket for incoming artist/label uploads.
EOF

# 5. Reminder for deployment
echo "🚀 Project scaffolded!"
echo "Next steps:"
echo "1. Add your CloudFormation/CDK infra code to backend/catalog/cicd/cloudformation_cdk/"
echo "2. Build your React UI in decodedmusic-frontend/"
echo "3. Wire up AppSync schema and connect React Apollo Client."
echo "4. Implement Lambda ingestion logic and S3 triggers."
echo "5. Deploy your infrastructure and verify end-to-end."
