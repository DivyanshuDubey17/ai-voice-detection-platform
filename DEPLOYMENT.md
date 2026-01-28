# VoiceDetect - Deployment Guide

Quick start guide for deploying VoiceDetect to production.

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Test the Application

- Visit the homepage to see the main interface
- Test the voice detection tool with audio uploads or recordings
- Check the API documentation at `/api-docs`
- Review privacy policy at `/privacy`
- Test the contact form at `/contact`

## Building for Production

### Build the Project
```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Test Production Build Locally
```bash
npm run build
npm start
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest option - it's built by the Next.js creators.

#### Step 1: Prepare for Deployment
```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Vercel auto-detects Next.js and configures build settings
5. Click "Deploy"

Your app will be live at `yourdomain.vercel.app`

#### Step 3: Custom Domain (Optional)
1. In Vercel dashboard, go to Project Settings
2. Add your custom domain
3. Update DNS records as instructed
4. Deploy completes automatically

### Option 2: Docker & Self-Hosted

#### Create Dockerfile
Already configured in the project. Deploy using:

```bash
# Build Docker image
docker build -t voicedetect:latest .

# Run container
docker run -p 3000:3000 voicedetect:latest
```

#### Deploy to AWS, GCP, Azure
- Push image to container registry
- Deploy to container service (ECS, Cloud Run, Container Instances)
- Configure environment variables

### Option 3: Traditional VPS/Cloud Servers

#### Prerequisites
- Node.js 18+ installed
- npm/yarn package manager

#### Deployment Steps
1. **SSH into your server**
   ```bash
   ssh user@your-server.com
   ```

2. **Clone repository**
   ```bash
   git clone <your-repo-url>
   cd voicedetect
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Build project**
   ```bash
   npm run build
   ```

5. **Install PM2 (process manager)**
   ```bash
   npm install -g pm2
   ```

6. **Start application**
   ```bash
   pm2 start npm --name "voicedetect" -- start
   pm2 save
   pm2 startup
   ```

7. **Setup Nginx (reverse proxy)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

8. **Enable SSL with Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

## Environment Variables

### For Production

Create a `.env.production` file (or set in your hosting platform):

```env
# No external APIs required for basic functionality
# Add these if implementing optional features:

# Database (if implementing history)
DATABASE_URL=your_database_url

# Email Service (if implementing contact form)
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password

# Analytics (optional)
ANALYTICS_KEY=your_analytics_key
```

### For Development

Create a `.env.local` file:

```env
# Development settings
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Post-Deployment Checklist

### Security
- [ ] Enable HTTPS/SSL
- [ ] Set security headers
- [ ] Configure CORS if needed
- [ ] Enable rate limiting
- [ ] Review privacy policy
- [ ] Test audio deletion after analysis

### Performance
- [ ] Test page load speed
- [ ] Verify image optimization
- [ ] Check API response times
- [ ] Monitor server resources
- [ ] Enable caching headers

### Functionality
- [ ] Test voice upload
- [ ] Test audio recording
- [ ] Test all languages
- [ ] Verify API endpoints
- [ ] Check navigation links
- [ ] Test dark/light mode toggle
- [ ] Verify contact form

### SEO & Analytics
- [ ] Add Google Analytics (optional)
- [ ] Setup search console
- [ ] Verify sitemap
- [ ] Test meta tags
- [ ] Check Open Graph tags

## Monitoring & Maintenance

### Uptime Monitoring
```bash
# Use Uptime Robot or similar service
# Monitor: https://yourdomain.com
# Check every 5 minutes
# Alert on downtime
```

### Logs
```bash
# Vercel: Dashboard → Logs
# Docker: docker logs <container-id>
# VPS: tail -f /var/log/application.log
```

### Updates
```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install

# Rebuild and restart
npm run build
pm2 restart voicedetect
```

## Troubleshooting

### Build Fails
- Clear cache: `npm run build -- --reset`
- Check Node version: `node --version` (needs 18+)
- Review build logs for errors

### API Not Responding
- Check network connectivity
- Verify API endpoint is correct
- Check server logs
- Restart application

### Audio Upload Issues
- Verify browser supports File API
- Check CORS headers
- Ensure audio format is supported
- Check file size limits

### Performance Issues
- Check server CPU/memory usage
- Monitor database queries
- Review application logs
- Optimize images and assets

## Scaling Considerations

For production with high traffic:

1. **Database**: Add Supabase or similar for history
2. **Caching**: Implement Redis for frequently accessed data
3. **CDN**: Use Vercel Edge or Cloudflare for content delivery
4. **Load Balancing**: Setup load balancer for multiple servers
5. **Monitoring**: Implement application performance monitoring
6. **Auto-scaling**: Configure auto-scaling policies

## Support

- **Issues**: Check application logs
- **Documentation**: Review `/api-docs` page
- **Contact**: Use `/contact` page or email support

---

**Last Updated**: January 2026
