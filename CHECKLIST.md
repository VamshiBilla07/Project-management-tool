# ✅ Pre-Deployment Checklist

Before deploying to Vercel, make sure you've completed these steps:

## 📋 Local Setup

- [ ] PostgreSQL database set up (Vercel Postgres, Neon, Supabase, or Railway)
- [ ] DATABASE_URL obtained from your database provider
- [ ] Run setup script: `.\setup-vercel.ps1`
- [ ] All dependencies installed successfully
- [ ] Prisma client generated
- [ ] Database migrations ran successfully (optional for local testing)

## 🔐 Secrets & Environment Variables

- [ ] DATABASE_URL connection string ready to paste in Vercel
- [ ] Connection string includes `?sslmode=require` if needed
- [ ] Connection string is in format: `postgresql://user:password@host:5432/database`

## 📦 Git Repository

- [ ] Code committed to Git
  ```powershell
  git add .
  git commit -m "Prepare for Vercel deployment"
  ```
- [ ] Repository pushed to GitHub
  ```powershell
  git push origin main
  ```
- [ ] Repository is public or you have Vercel access to private repos

## 🚀 Vercel Setup

- [ ] Vercel account created at https://vercel.com
- [ ] GitHub account connected to Vercel

## 📝 During Deployment

When deploying on Vercel:

1. [ ] Import your GitHub repository
2. [ ] Framework Preset: **Leave as detected** or select "Other"
3. [ ] Root Directory: **.**
4. [ ] Build Command: **Leave default** (uses package.json scripts)
5. [ ] Output Directory: **frontend/dist**
6. [ ] Install Command: **Leave default**
7. [ ] Environment Variables:
   - [ ] Add `DATABASE_URL` with your PostgreSQL connection string
8. [ ] Click "Deploy"

## 🗄️ Post-Deployment

After first successful deployment:

- [ ] Run database migrations:
  ```powershell
  $env:DATABASE_URL="your_postgresql_connection_string"
  cd backend
  npx prisma migrate deploy
  ```
- [ ] (Optional) Seed database:
  ```powershell
  npm run db:seed
  ```
- [ ] Test your deployment URL
- [ ] Verify `/api/health` endpoint works
- [ ] Create a test project to verify full functionality

## 🧪 Testing

- [ ] Frontend loads at your-app.vercel.app
- [ ] API health check works: your-app.vercel.app/api/health
- [ ] Can create a new project
- [ ] Can add tasks to project
- [ ] Can update and delete items
- [ ] No console errors in browser

## 🐛 If Something Goes Wrong

1. Check Vercel deployment logs
2. Check function logs in Vercel dashboard
3. Verify DATABASE_URL is correctly set
4. Ensure database accepts external connections
5. Check browser console for frontend errors
6. See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) troubleshooting section

## 📚 Documentation Files Created

- [x] [DEPLOY.md](DEPLOY.md) - Quick deployment guide
- [x] [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Detailed deployment instructions
- [x] [vercel.json](vercel.json) - Vercel configuration
- [x] [.vercelignore](.vercelignore) - Files to ignore during deployment
- [x] [api/index.js](api/index.js) - Serverless API entry point
- [x] [setup-vercel.ps1](setup-vercel.ps1) - Automated setup script

## 🎉 Success Indicators

You'll know it's working when:
- ✅ Vercel build completes successfully
- ✅ Deployment status shows "Ready"
- ✅ Frontend loads without errors
- ✅ API endpoints respond correctly
- ✅ Database operations work (create, read, update, delete)

---

**Need Help?** Check:
- [DEPLOY.md](DEPLOY.md) for quick start
- [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed guide
- [Vercel Documentation](https://vercel.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
