# Quick Vercel Deployment Steps

## 🚀 Deploy in 5 Minutes

### 1. Set Up Database (Choose One)

#### Option A: Vercel Postgres (Easiest)
```
1. Go to https://vercel.com/dashboard
2. Click "Storage" → "Create Database" → "Postgres"
3. Copy the DATABASE_URL provided
```

#### Option B: Neon (Free Forever)
```
1. Go to https://neon.tech
2. Sign up and create a project
3. Copy the connection string from dashboard
```

### 2. Deploy to Vercel

#### Using Vercel Dashboard (Recommended)
```
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Leave all settings as default
4. Add Environment Variable:
   Name: DATABASE_URL
   Value: (paste your PostgreSQL connection string)
5. Click "Deploy"
```

#### Using Vercel CLI
```powershell
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variable
vercel env add DATABASE_URL
# Paste your PostgreSQL connection string

# Deploy to production
vercel --prod
```

### 3. Run Database Migration

After your first deployment:

```powershell
# Install dependencies
npm install
cd backend && npm install

# Set your DATABASE_URL
$env:DATABASE_URL="your_postgresql_connection_string_here"

# Run migration
npx prisma migrate deploy

# (Optional) Seed with sample data
npm run db:seed
```

### 4. Done! 🎉

Visit your deployment URL (e.g., `your-app.vercel.app`)

---

## 🔧 What Changed for Vercel

- ✅ Changed database from SQLite to PostgreSQL
- ✅ Created serverless API routes
- ✅ Added Vercel configuration
- ✅ Updated build scripts
- ✅ API and frontend fully integrated

## 📝 Environment Variables Needed

In Vercel Dashboard → Settings → Environment Variables:

| Variable | Value | Example |
|----------|-------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |

## 🐛 Common Issues

### "Prisma Client not initialized"
**Solution**: Run `cd backend && npx prisma generate`

### "Cannot connect to database"
**Solution**: 
- Verify DATABASE_URL is set in Vercel environment variables
- Check if SSL is required: add `?sslmode=require` to connection string
- Example: `postgresql://user:pass@host:5432/db?sslmode=require`

### "Build failed"
**Solution**: Check Vercel build logs, ensure all dependencies are installed

### API routes return 404
**Solution**: 
- Verify [api/index.js](api/index.js) exists
- Check [vercel.json](vercel.json) configuration
- Redeploy the project

## 📚 Full Documentation

See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for complete deployment guide.

## 🌐 Free Database Options

- **Neon**: Free tier with 512MB storage
- **Supabase**: Free tier with 500MB database  
- **Railway**: $5 credit on sign up
- **Vercel Postgres**: Paid ($20/month)

## 💡 Tips

1. **Automatic Deployments**: Every push to `main` branch automatically deploys
2. **Preview Deployments**: Pull requests get preview URLs
3. **Check Logs**: Use Vercel dashboard to view function logs
4. **Custom Domain**: Add your domain in Vercel project settings

## 🔗 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon PostgreSQL](https://neon.tech)
