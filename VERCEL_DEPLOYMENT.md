# Vercel Deployment Guide

## Prerequisites
1. GitHub account with your repository pushed
2. Vercel account (sign up at https://vercel.com)
3. PostgreSQL database (use Vercel Postgres, Neon, Supabase, or Railway)

## Step 1: Set Up PostgreSQL Database

### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel dashboard
2. Click "Storage" → "Create Database"
3. Select "Postgres"
4. Follow the setup wizard
5. Copy the `DATABASE_URL` connection string

### Option B: Neon (Free Tier Available)
1. Go to https://neon.tech
2. Create a free account
3. Create a new project
4. Copy the connection string

### Option C: Supabase (Free Tier Available)
1. Go to https://supabase.com
2. Create a new project
3. Go to Settings → Database
4. Copy the connection string (Connection Pooling recommended)

## Step 2: Push to GitHub
If you haven't already:
```powershell
git init
git add .
git commit -m "Prepare for Vercel deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 3: Deploy to Vercel

### Via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure your project:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: Leave default or use:
     ```
     npm install --prefix backend && npm install --prefix frontend && npm run vercel-build --prefix frontend && npx prisma generate --schema=backend/prisma/schema.prisma
     ```
   - **Output Directory**: `frontend/dist`
   - **Install Command**: Leave default

4. Add Environment Variables:
   - Click "Environment Variables"
   - Add: `DATABASE_URL` with your PostgreSQL connection string
   - Example: `postgresql://user:password@host:5432/database?sslmode=require`

5. Click "Deploy"

### Via Vercel CLI
```powershell
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? (accept default or enter name)
# - In which directory is your code located? ./
# - Want to override settings? No

# Add environment variables
vercel env add DATABASE_URL

# Deploy to production
vercel --prod
```

## Step 4: Run Database Migrations

After deployment, you need to run Prisma migrations:

### Option 1: Using Vercel CLI
```powershell
# Set environment variable locally
$env:DATABASE_URL="your_postgresql_connection_string"

# Generate Prisma Client
cd backend
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed the database
npm run db:seed
```

### Option 2: Using Prisma Data Platform
1. Go to https://cloud.prisma.io
2. Connect your repository
3. Configure and run migrations

### Option 3: Manual SQL Execution
Connect to your database and run the migration SQL from:
`backend/prisma/migrations/20251130100453_init/migration.sql`

## Step 5: Verify Deployment

1. Visit your Vercel deployment URL (e.g., `your-app.vercel.app`)
2. Check that the frontend loads
3. Test API endpoints:
   - `https://your-app.vercel.app/api/health`
   - `https://your-app.vercel.app/api/projects`
4. Create a test project to ensure database connectivity

## Troubleshooting

### Build Errors
- Check Vercel build logs
- Ensure all dependencies are in package.json
- Verify DATABASE_URL is set in environment variables

### Database Connection Errors
- Verify DATABASE_URL format: `postgresql://user:password@host:5432/database?sslmode=require`
- Check if your database allows external connections
- Ensure SSL mode is configured if required

### API Routes Not Working
- Check that [api/index.js](api/index.js) is present
- Verify [vercel.json](vercel.json) routing configuration
- Check Vercel function logs

### CORS Errors
- Backend already configured with CORS middleware
- If issues persist, update CORS settings in [api/index.js](api/index.js)

## Environment Variables Reference

Required environment variables in Vercel:
- `DATABASE_URL`: PostgreSQL connection string

## Continuous Deployment

Once set up, Vercel automatically deploys:
- **Production**: Push to `main` branch
- **Preview**: Open pull requests

## Local Development

To run locally with the new setup:
```powershell
# Set environment variable
$env:DATABASE_URL="your_postgresql_connection_string"

# Install dependencies
npm install
cd backend && npm install
cd ../frontend && npm install

# Run migrations
cd backend
npx prisma migrate dev
npx prisma generate

# Seed database (optional)
npm run db:seed

# Start development servers (from root)
cd ..
npm run dev
```

## Cost Considerations

- **Vercel**: Free tier includes 100GB bandwidth, unlimited hobby projects
- **Vercel Postgres**: Paid add-on ($20/month)
- **Neon**: Free tier includes 512MB storage, 1 compute
- **Supabase**: Free tier includes 500MB database, 1GB bandwidth

## Support

For issues:
1. Check Vercel deployment logs
2. Check browser console for frontend errors
3. Review Vercel function logs for API errors
4. Visit Vercel documentation: https://vercel.com/docs
