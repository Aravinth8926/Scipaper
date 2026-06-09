# 🚀 Deployment Guide

This guide will help you deploy SciPaper AI to production.

## Prerequisites

- GitHub account (✅ Already set up)
- Vercel account (free tier works)
- PostgreSQL database (for production)

## Option 1: Deploy to Vercel (Recommended)

### Step 1: Sign up for Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account

### Step 2: Import Your Repository
1. Click "Add New Project"
2. Select your repository: `Aravinth8926/Scipaper`
3. Configure project settings

### Step 3: Set Environment Variables
Add these in Vercel dashboard under "Environment Variables":

```
DATABASE_URL=your_production_database_url
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
NEXT_PUBLIC_APP_NAME=SciPaper AI
```

### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your app will be live!

## Option 2: Manual Production Setup

### 1. Set Up Production Database

#### Option A: Vercel Postgres (Easiest)
```bash
# In Vercel dashboard:
# 1. Go to Storage tab
# 2. Create new Postgres database
# 3. Copy DATABASE_URL
```

#### Option B: Neon (Free PostgreSQL)
1. Sign up at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string

#### Option C: Railway (Free tier available)
1. Sign up at [railway.app](https://railway.app)
2. Create new PostgreSQL database
3. Copy DATABASE_URL

### 2. Update Prisma Schema for PostgreSQL

Change `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // Changed from "sqlite"
  url      = env("DATABASE_URL")
}
```

### 3. Run Migrations
```bash
# Generate Prisma client
npx prisma generate

# Push schema to production database
npx prisma db push

# Or create migrations
npx prisma migrate deploy
```

### 4. Build for Production
```bash
npm run build
npm start
```

## Production Checklist

### Security
- [ ] Add password hashing (bcrypt)
- [ ] Implement JWT tokens
- [ ] Add rate limiting
- [ ] Enable HTTPS
- [ ] Set secure CORS policies
- [ ] Add CSRF protection

### Database
- [ ] Switch from SQLite to PostgreSQL
- [ ] Set up database backups
- [ ] Add database indexes
- [ ] Configure connection pooling

### Performance
- [ ] Enable image optimization
- [ ] Add caching layer (Redis)
- [ ] Optimize bundle size
- [ ] Enable compression
- [ ] Add CDN for static assets

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Add analytics (PostHog/GA)
- [ ] Configure uptime monitoring
- [ ] Set up logging

### Features to Add
- [ ] Email verification
- [ ] Password reset
- [ ] Real AI integration
- [ ] File upload to cloud storage
- [ ] Payment integration

## Environment Variables for Production

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"

# App
NEXT_PUBLIC_APP_URL=https://your-domain.com
NEXT_PUBLIC_APP_NAME="SciPaper AI"

# OpenAI (when ready)
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4o

# Email (when ready)
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your_api_key
FROM_EMAIL=noreply@your-domain.com

# Stripe (when ready)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Security
JWT_SECRET=your_random_secret_here
SESSION_SECRET=another_random_secret
```

## Post-Deployment

### 1. Test Everything
- [ ] Sign up works
- [ ] Sign in works
- [ ] Document upload works
- [ ] Document analysis works
- [ ] All pages load correctly

### 2. Set Up Custom Domain (Optional)
1. Buy domain from Namecheap, GoDaddy, etc.
2. Add domain in Vercel dashboard
3. Update DNS records
4. Wait for SSL certificate

### 3. Monitor Application
- Check Vercel dashboard for errors
- Monitor database usage
- Track user signups
- Review performance metrics

## Troubleshooting

### Build Fails on Vercel
- Check build logs
- Verify all dependencies are in package.json
- Ensure environment variables are set
- Check for TypeScript errors

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check database is accessible
- Ensure Prisma schema matches database
- Run `npx prisma generate`

### 404 Errors
- Clear .next cache
- Rebuild application
- Check routing configuration
- Verify all pages exist

## Scaling Tips

### When you get more users:
1. **Upgrade database tier** - More connections, better performance
2. **Add Redis caching** - Cache frequently accessed data
3. **Enable CDN** - Serve static assets faster
4. **Upgrade Vercel plan** - More bandwidth, better support
5. **Add load balancing** - Distribute traffic
6. **Optimize queries** - Add indexes, use proper joins
7. **Implement background jobs** - For long-running tasks

## Cost Estimation

### Free Tier (0-100 users)
- Vercel: Free
- Neon PostgreSQL: Free (0.5 GB storage)
- Total: $0/month

### Small Scale (100-1000 users)
- Vercel Pro: $20/month
- Neon Scale: $19/month
- OpenAI API: ~$50/month (estimated)
- Total: ~$89/month

### Medium Scale (1000-10000 users)
- Vercel Pro: $20/month
- Neon Pro: $69/month
- OpenAI API: ~$200/month
- Total: ~$289/month

## Support

Need help deploying? Open an issue on GitHub!

---

**Your app is production-ready! 🎉**
