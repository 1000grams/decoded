Write-Host " CREATING AUTH LAMBDA FUNCTIONS FOR S3" -ForegroundColor Cyan
Write-Host "🪣 Using existing bucket: decodedmusic-lambda-code" -ForegroundColor Yellow

$region = "eu-central-1"
$bucketName = "decodedmusic-lambda-code"

# Create Lambda source directory
if (!(Test-Path "lambda-src")) {
    New-Item -ItemType Directory -Path "lambda-src" -Force
    Write-Host " Created lambda-src directory" -ForegroundColor Green
}

# Create authLogin Lambda function
Write-Host "`n Creating authLogin function..." -ForegroundColor Green
$loginCode = @'
exports.handler = async (event) => {
    console.log(' Auth Login - decodedmusic Platform');
    console.log('Event:', JSON.stringify(event, null, 2));
    
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type,Authorization',
                'Access-Control-Allow-Methods': 'POST,OPTIONS'
            },
            body: ''
        };
    }
    
    try {
        const body = event.body ? JSON.parse(event.body) : {};
        const { email, password } = body;
        
        console.log('Login attempt for:', email);
        
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        
        // Mock authentication - replace with real auth logic
        const token = 'jwt-token-' + Date.now();
        const userId = 'user-' + Math.random().toString(36).substr(2, 9);
        
        const response = {
            success: true,
            token: token,
            user: {
                id: userId,
                email: email,
                name: 'Artist User',
                platform: 'decodedmusic'
            },
            message: 'Login successful - Welcome to decodedmusic!',
            timestamp: new Date().toISOString()
        };
        
        console.log('Login successful for:', email);
        
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(response)
        };
    } catch (error) {
        console.error('Login error:', error.message);
        return {
            statusCode: 400,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: false,
                message: error.message,
                platform: 'decodedmusic'
            })
        };
    }
};
