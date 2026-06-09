# 🚀 Deploying to Render

This guide will help you deploy SciPaper AI to Render.

## Important: This is a Web Service (Not Static Site)

SciPaper AI requires:
- ✅ Server-side rendering
- ✅ API routes
- ✅ Database connections
- ✅ Dynamic content

**Select "Web Service" when deploying!**

## Quick Deploy (Automatic Setup)

### Option 1: Deploy with render.yaml (Easiest)

1. **Fork/Push to GitHub** (✅ Already done)

2. **Click Deploy Button**
   
   [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

3. **Connect GitHub**
   - Authorize Render to access your repository
   - Select: `Aravinth8926/Scipaper`

4. **Render will automatically:**
   - Create PostgreSQL database
   - Set up web service
   - Configure environment variables
   - Build and deploy

5. **Wait 5-10 minutes** for deployment to complete

## Manual Setup

If automatic deployment doesn't work, follow these steps:

### Step 1: Create PostgreSQL Database

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   ```
   Name: scipaper-db
   Database: scipaper
   User: scipaper
   Region: Choose closest to you
   Plan: Free
   ```
4. Click **"Create Database"**
5. **Copy "Internal Database URL"** (you'll need this)

### Step 2: Create Web Service

1. Click **"New +"** → **"Web Service"**
2. Connect GitHub repository: `Aravinth8926/Scipaper`
3. Configure:

   ```
   Name: scipaper-ai
   Region: Same as database
   Branch: main
   Runtime: Node
   ```

4. **Build & Deploy Settings:**
   ```
   Build Command:
   npm install && npx prisma generate && npm run build

   Start Command:
   npm start
   ```

5. **Plan:** Select "Free"

### Step 3: Environment Variables

Add these in "Environment" section:

```
DATABASE_URL
Value: [Paste Internal Database URL from Step 1]

NODE_ENV
Value: production

NEXT_PUBLIC_APP_URL
Value: https://scipaper-ai.onrender.com
(Replace with your actual URL)

NEXT_PUBLIC_APP_NAME
Value: SciPaper AI
```

### Step 4: Deploy

1. Click **"Create Web Service"**
2. Wait for build to complete (5-10 minutes)
3. Your app will be live at: `https://scipaper-ai.onrender.com`

## Post-Deployment

### Initialize Database

After first deployment, run migrations:

1. Go to your web service
2. Click **"Shell"** tab
3. Run:
   ```bash
   npx prisma db push
   ```

### Test Your App

1. Visit your URL: `https://your-app.onrender.com`
2. Go to `/sign-up`
3. Create an account
4. Upload a document
5. Verify everything works!

## Important Notes

### Free Tier Limitations

**Render Free Tier includes:**
- ✅ 750 hours/month web service
- ✅ 90 days PostgreSQL database (auto-deletes after)
- ✅ Automatic SSL certificate
- ✅ Custom domain support

**Limitations:**
- ⚠️ App sleeps after 15 minutes of inactivity
- ⚠️ Cold start takes ~30 seconds
- ⚠️ Database deleted after 90 days on free tier

**To avoid cold starts:**
- Upgrade to paid plan ($7/month)
- Or use a service like UptimeRobot to ping your app

### Database Persistence

**Important:** Free PostgreSQL databases are deleted after 90 days!

**Solutions:**
1. Upgrade to paid plan ($7/month for database)
2. Use external database:
   - [Neon.tech](https://neon.tech) - Free forever
   - [Supabase](https://supabase.com) - Free tier
   - [Railway](https://railway.app) - Free tier

## Troubleshooting

### Build Fails

**Error: "Module not found"**
- Check `package.json` has all dependencies
- Run `npm install` locally first
- Commit changes and redeploy

**Error: "Prisma generate failed"**
- Verify `DATABASE_URL` is set correctly
- Make sure Prisma schema uses `postgresql`
- Check database is running

### App Not Loading

**503 Service Unavailable**
- Check build logs for errors
- Verify `npm start` works locally
- Check environment variables are set

**Database Connection Error**
- Verify DATABASE_URL is correct
- Check database is in same region
- Use "Internal Database URL" not External

### Slow Performance

**App takes 30+ seconds to load**
- This is normal for free tier (cold start)
- Upgrade to paid plan for instant response
- Or keep app warm with UptimeRobot

## Upgrading to Production

### When You're Ready for Production:

1. **Upgrade Web Service** ($7/month)
   - No sleep/cold starts
   - Better performance
   - More resources

2. **Upgrade Database** ($7/month)
   - Persistent storage
   - Better performance
   - Daily backups

3. **Add Custom Domain** (Free)
   - Buy domain from Namecheap/GoDaddy
   - Add in Render dashboard
   - Automatic SSL

4. **Enable Monitoring**
   - Use Render's built-in metrics
   - Add Sentry for error tracking
   - Set up uptime monitoring

## Costs

### Free (Good for testing)
- Web Service: Free (with limitations)
- PostgreSQL: Free for 90 days
- **Total: $0/month**

### Starter (Good for production)
- Web Service: $7/month
- PostgreSQL: $7/month
- **Total: $14/month**

### Professional
- Web Service: $25/month
- PostgreSQL: $20/month
- **Total: $45/month**

## Alternative: Deploy to Vercel

If you want instant deploys and no cold starts:

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variables
4. Deploy!

**Note:** You'll still need external PostgreSQL database

## Support

Having issues? 

1. Check [Render Docs](https://render.com/docs)
2. Check [Render Community](https://community.render.com)
3. Open issue on GitHub

---

**Your app will be live in minutes! 🚀**
