param(
    [string]$StackName = "DecodedMusicBackend",
    [string]$Region    = "eu-central-1"
)

# Determine script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

# Prepend known SAM CLI install dir to PATH if present
$awsSamInstall = 'C:\Program Files\Amazon\AWSSAMCLI\bin'
if (Test-Path "${awsSamInstall}\sam.cmd") {
    Write-Host "Adding AWS SAM CLI dir to PATH: $awsSamInstall"
    $env:PATH = "$awsSamInstall;$env:PATH"
}

# Verify AWS SAM CLI is installed
# Determine SAM executable (support sam and sam.cmd on Windows)
$samExe = Get-Command sam -ErrorAction SilentlyContinue
if (-not $samExe) {
    $samExe = Get-Command sam.cmd -ErrorAction SilentlyContinue
}
if (-not $samExe) {
    Write-Error "AWS SAM CLI not found. Please install AWS SAM CLI and ensure 'sam' or 'sam.cmd' is on your PATH."
    exit 1
}

Write-Host "Changing directory to CloudFormation project..."
# Set the path to the actual SAM project under backend
$cfDir = Join-Path $scriptDir "backend\cloudformation"
if (-not (Test-Path $cfDir)) {
    Write-Error "CloudFormation directory not found: $cfDir"
    exit 1
}
Set-Location $cfDir

Write-Host "Building SAM template using serverless-stack.yaml..."
# Ensure template file exists
$templateFile = "serverless-stack.yaml"
if (-not (Test-Path $templateFile)) {
    Write-Error "Template file not found at $(Get-Location)\$templateFile"
    exit 1
}
& "$($samExe.Path)" build -t $templateFile

Write-Host "Deploying SAM stack '$StackName' in region '$Region' using serverless-stack.yaml with S3 bucket for code artifacts..."
& "$($samExe.Path)" deploy -t $templateFile --stack-name $StackName --region $Region --capabilities CAPABILITY_IAM --s3-bucket decodedmusic-lambda-code --no-confirm-changeset

Write-Host "Retrieving ApiUrl output..."
$apiUrl = aws cloudformation describe-stacks `
    --stack-name $StackName `
    --query "Stacks[0].Outputs[?OutputKey=='ApiUrl'].OutputValue" `
    --region $Region --output text
Write-Host "API URL: $apiUrl"

Write-Host "Updating front-end .env file..."
# Frontend directory is sibling of script directory
$frontendDir = Join-Path $scriptDir "frontend"
$envPath = Join-Path $frontendDir ".env"
if (Test-Path $envPath) {
    # Replace existing or add
    (Get-Content $envPath) -replace '^REACT_APP_API_URL=.*', "REACT_APP_API_URL=$apiUrl" | Set-Content $envPath
} else {
    "REACT_APP_API_URL=$apiUrl" | Out-File -FilePath $envPath -Encoding UTF8
}

Write-Host "Running smoke tests..."
try {
    $vp = Invoke-RestMethod -Uri "$apiUrl/viral-predictions" -Headers @{ Origin = 'https://decodedmusic.com' }
    Write-Host "Viral Predictions Response:`n" ($vp | ConvertTo-Json -Depth 5)
    $sd = Invoke-RestMethod -Uri "$apiUrl/spotify-data" -Headers @{ Origin = 'https://decodedmusic.com' }
    Write-Host "Spotify Data Response:`n" ($sd | ConvertTo-Json -Depth 5)
} catch {
    Write-Error "Smoke test failed: $_"
}
