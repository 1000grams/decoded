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
