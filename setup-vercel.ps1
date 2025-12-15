# Vercel Deployment Setup Script
# Run this script to prepare for Vercel deployment

Write-Host "🚀 Setting up Project Management Tool for Vercel Deployment" -ForegroundColor Cyan
Write-Host ""

# Check if DATABASE_URL is set
if (-not $env:DATABASE_URL) {
    Write-Host "⚠️  DATABASE_URL environment variable is not set!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please set your PostgreSQL connection string:" -ForegroundColor Yellow
    Write-Host '  $env:DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"' -ForegroundColor Gray
    Write-Host ""
    $dbUrl = Read-Host "Enter your DATABASE_URL (or press Enter to skip for now)"
    if ($dbUrl) {
        $env:DATABASE_URL = $dbUrl
        Write-Host "✓ DATABASE_URL set for this session" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Skipping database setup. You'll need to set DATABASE_URL later." -ForegroundColor Yellow
    }
    Write-Host ""
}

# Install root dependencies
Write-Host "📦 Installing root dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install root dependencies" -ForegroundColor Red
    exit 1
}

# Install backend dependencies
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Cyan
cd backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}

# Generate Prisma Client
Write-Host "🔧 Generating Prisma Client..." -ForegroundColor Cyan
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to generate Prisma Client" -ForegroundColor Red
    exit 1
}

# Run migrations if DATABASE_URL is set
if ($env:DATABASE_URL) {
    Write-Host "🗄️  Running database migrations..." -ForegroundColor Cyan
    npx prisma migrate dev --name init
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Database migrations completed" -ForegroundColor Green
        
        # Ask if user wants to seed
        $seed = Read-Host "Would you like to seed the database with sample data? (y/n)"
        if ($seed -eq "y" -or $seed -eq "Y") {
            Write-Host "🌱 Seeding database..." -ForegroundColor Cyan
            npm run db:seed
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ Database seeded successfully" -ForegroundColor Green
            } else {
                Write-Host "⚠️  Database seeding failed" -ForegroundColor Yellow
            }
        }
    } else {
        Write-Host "⚠️  Database migration failed" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️  Skipping database migrations (DATABASE_URL not set)" -ForegroundColor Yellow
}

cd ..

# Install frontend dependencies
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Cyan
cd frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

cd ..

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Make sure your code is pushed to GitHub" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Prepare for Vercel deployment'" -ForegroundColor Gray
Write-Host "   git push" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Deploy to Vercel:" -ForegroundColor White
Write-Host "   • Go to https://vercel.com/new" -ForegroundColor Gray
Write-Host "   • Import your repository" -ForegroundColor Gray
Write-Host "   • Add DATABASE_URL environment variable" -ForegroundColor Gray
Write-Host "   • Click Deploy" -ForegroundColor Gray
Write-Host ""
Write-Host "3. After deployment, run migrations:" -ForegroundColor White
Write-Host '   $env:DATABASE_URL="your_connection_string"' -ForegroundColor Gray
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npx prisma migrate deploy" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 See DEPLOY.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""
