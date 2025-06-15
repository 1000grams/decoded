#!/bin/bash
# automate-catalog-backend-structure.sh

# Root backend folder
mkdir -p amplify/backend/catalog

# Storage & Hosting
mkdir -p amplify/backend/catalog/storage/s3/raw_uploads
mkdir -p amplify/backend/catalog/storage/s3/preview_mp3s
mkdir -p amplify/backend/catalog/storage/cloudfront

# Compute & API
mkdir -p amplify/backend/catalog/api/appsync_graphql
mkdir -p amplify/backend/catalog/api/apigateway_rest
mkdir -p amplify/backend/catalog/lambda/nodejs
mkdir -p amplify/backend/catalog/lambda/python

# Auth
mkdir -p amplify/backend/catalog/auth/cognito

# Database & Search
mkdir -p amplify/backend/catalog/database/dynamodb
mkdir -p amplify/backend/catalog/database/aurora_postgres
mkdir -p amplify/backend/catalog/search/opensearch

# Caching & Queuing
mkdir -p amplify/backend/catalog/cache/elasticache_redis
mkdir -p amplify/backend/catalog/queue/sqs
mkdir -p amplify/backend/catalog/notification/sns

# CI/CD
mkdir -p amplify/backend/catalog/cicd/amplify_console
mkdir -p amplify/backend/catalog/cicd/codepipeline
mkdir -p amplify/backend/catalog/cicd/codebuild
mkdir -p amplify/backend/catalog/cicd/cloudformation_cdk

# Sample README files for each major category
echo "This folder contains S3 bucket definitions for raw uploads and preview MP3s." > amplify/backend/catalog/storage/README.md
echo "This folder contains AppSync GraphQL and API Gateway REST API definitions." > amplify/backend/catalog/api/README.md
echo "This folder contains Lambda function code (Node.js and Python)." > amplify/backend/catalog/lambda/README.md
echo "This folder contains Cognito authentication setup." > amplify/backend/catalog/auth/README.md
echo "This folder contains DynamoDB and Aurora PostgreSQL database definitions." > amplify/backend/catalog/database/README.md
echo "This folder contains OpenSearch configuration for search and aggregation." > amplify/backend/catalog/search/README.md
echo "This folder contains Redis (Elasticache) and SQS/SNS setup." > amplify/backend/catalog/cache_queue_notification_README.md
echo "This folder contains CI/CD pipeline definitions for Amplify Console, CodePipeline, CodeBuild, and CloudFormation/CDK." > amplify/backend/catalog/cicd/README.md

echo "✅ Backend folder structure for DecodedMusic catalog created."

