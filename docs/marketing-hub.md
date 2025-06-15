# Marketing & Attribution Module

This document outlines the new marketing hub features added to the Decoded Music platform.

## DynamoDB Tables
- **MarketingSpend** – records ad spend entries per artist and campaign.
- **EstimatedEarnings** – projected earnings derived from stream counts.
- **ActualPayouts** – ingestion of royalty statements.
- **Reconciliation** – comparison of expected vs actual revenue.
- **WeeklyArtistStats** – metrics used for attribution calculations.

## Lambda Functions
- `marketingSpendHandler` – CRUD interface for the `MarketingSpend` table.
- `attributionHandler` – correlates ad campaigns with streaming lifts and returns ROI data.

These are exposed via API Gateway under `/marketing`.

## Automation Scripts
- `scripts/socialPostScheduler.js` queues posts to Instagram, Snapchat and YouTube.
- `scripts/trendingReposter.js` reposts content with trending hashtags from Twitter, TikTok and Reddit.

## CloudFormation
The stack defined in `cloudformation/marketing-hub.yml` provisions the DynamoDB tables, Lambda functions and API routes required for the marketing dashboard.

## Dashboard Tabs
The frontend should include tabs for:
1. **Ad Spend Summary** – pulls from `/marketing`.
2. **ROI & Attribution** – queries `/marketing?campaign_id=xyz`.
3. **Post Scheduler** – schedules posts via the social posting script.
4. **Trending-Based Auto-Reposts** – managed by the trending repost script.

This provides artists with label-style marketing automation on AWS.
