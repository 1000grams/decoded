#!/bin/bash
# automate-ingestion-enrichment-pipeline.sh

# S3 for incoming ZIP uploads
mkdir -p amplify/backend/catalog/storage/s3/incoming

# SNS for S3 ObjectCreated notifications
mkdir -p amplify/backend/catalog/notification/sns

# SQS for decoupled ingestion events
mkdir -p amplify/backend/catalog/queue/sqs

# Lambda/Container for Extraction Worker (Node.js and Python)
mkdir -p amplify/backend/catalog/lambda/extraction_worker_nodejs
mkdir -p amplify/backend/catalog/lambda/extraction_worker_python

# Lambda/Container for Audio Analysis (librosa for BPM & key)
mkdir -p amplify/backend/catalog/lambda/audio_analysis

# SageMaker or ML jobs for enrichment
mkdir -p amplify/backend/catalog/ml/sagemaker
mkdir -p amplify/backend/catalog/ml/rule_based_classifier

# Human-in-the-loop review dashboard
mkdir -p amplify/backend/catalog/review_dashboard

# DynamoDB for metadata + ASCAP fields
mkdir -p amplify/backend/catalog/database/dynamodb

# OpenSearch for indexing and CDC
mkdir -p amplify/backend/catalog/search/opensearch

# Aurora for CDC (optional)
mkdir -p amplify/backend/catalog/database/aurora_postgres

# Nightly bulk re-index job
mkdir -p amplify/backend/catalog/jobs/nightly_reindex

# Sample README for pipeline
cat > amplify/backend/catalog/README_INGESTION_PIPELINE.md <<'EOF'
# Ingestion & Enrichment Pipeline

- S3 /incoming: Artists/Labels upload ZIPs here.
- S3 triggers SNS, which triggers SQS.
- Extraction Worker Lambda/Container pulls from SQS, extracts metadata (music-metadata or pymediainfo), and writes to DynamoDB.
- Audio Analysis Lambda/Container (librosa) computes BPM & key.
- ML jobs (SageMaker or rule-based) tag mood/genre.
- Human-in-the-loop dashboard allows review/correction.
- Metadata + ASCAP fields are persisted in DynamoDB.
- CDC (DynamoDB Streams or Aurora) feeds OpenSearch for search.
- Nightly job re-indexes OpenSearch to propagate schema changes.
EOF

echo "✅ Ingestion & Enrichment Pipeline folder structure created under amplify/backend/catalog/"


